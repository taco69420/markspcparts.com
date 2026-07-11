---
title: What Phase Shedding Is — and Why I Turned It Off on the Dominus
date: 2026-07-10
description: Phase shedding parks most of your VRM at idle to save a few watts. On a board with 32 teamed power stages, that's oddly fascinating — here's what it does, how the Dominus Extreme handles it, and why I run all 32 stages all the time anyway.
tags: [asus, rog, dominus-extreme, lga3647, xeon, vrm, bios]
relatedFinds: [rog-dominus-extreme, xeon-w-3175x]
---

Last post I told you the [Dominus Extreme VRM will basically last forever](/blog/dominus-extreme-vrm-overbuilt) — 32 teamed power stages, a CPU that can't even make them break a sweat, every stage loafing at a fifth of its rating. That was the "why it never dies" story.

This is the flip side of the same coin. Because most of the time, on most boards, **most of those stages aren't even switched on.**

That's phase shedding. And on my board, I turned it off — I run all 32 stages, all the time. Let me explain what that even means, why the feature exists, and why I made the call I did.

---

## What phase shedding actually is

A multi-phase VRM is a bunch of little power converters wired in parallel, all feeding the same CPU rail. The Dominus has a lot of them. Your cheap B-series board has a few. Doesn't matter — the principle is the same.

Here's the thing people don't realize: running *every* phase *all the time* is not free. Each phase has costs that don't care how much current it's actually delivering. It's switching on and off hundreds of thousands of times a second, charging and dumping gate capacitance, burning a little in the driver and the core losses every single cycle. Call it overhead. That overhead is roughly **fixed per phase** — it's there whether the phase is pushing 30 amps or half an amp.

Now picture your PC sitting at the desktop doing nothing. The CPU might be pulling a couple of amps total. Spread that whisper of current across a big array of phases and each one is delivering almost nothing — but still paying its full switching overhead. You're running a dozen little converters flat-out just to keep the lights on, and the useful work each one does is a rounding error next to the overhead it burns.

That's dumb, and VRM controllers know it's dumb. So they **shed phases**: at light load they shut some phases off entirely and pile the (tiny) load onto the few that stay awake. Fewer phases burning fixed overhead = better efficiency exactly when the machine is idle, which — let's be honest — is most of the time.

Then you launch something heavy, the load ramps, and the controller **wakes the parked phases back up** so the current spreads out again and no single phase cooks. Shed when idle, wake under load. That's the whole dance.

![Diagram — the same VRM array in two states. Left: idle, only a couple of phases lit green and actively switching, the rest greyed out and parked. Right: full load, every phase lit and carrying current. Caption showing shed-at-idle versus wake-under-load](/images/posts/dominus-extreme-phase-shedding/shed-vs-full.svg)

---

## Why the efficiency actually improves

Quick bit of the physics, because it's the part that makes it click.

A power stage loses energy two ways. **Conduction losses** — the current fighting through the resistance of the parts — scale with the *square* of the current (I²R, the same relationship that makes [the Dominus run so cool under load](/blog/dominus-extreme-vrm-overbuilt)). And **switching losses** — the overhead of turning on and off — which are basically flat per phase, set by the switching frequency and voltage, not the load.

At **high** current, conduction losses dominate, and spreading the load across many phases is a huge win — each phase carries less current, and since it's squared, the total heat drops off a cliff. That's the case *for* lots of phases.

At **low** current, it flips. Conduction losses are tiny (small number, squared, is a *very* small number). Now the flat switching overhead is the whole bill. And the only way to shrink a flat-per-phase cost is to run **fewer phases**. So you shed.

That's the elegant part: the exact same array wants *many* phases under load and *few* phases at idle. Phase shedding is just the controller picking the right answer for the current conditions instead of committing to one.

---

## How the Dominus does it specifically

Here's where it gets fun, because the Dominus doesn't shed the way a normal board does.

Those 32 stages aren't 32 independent phases. The board is run by a single **ASP1405I** controller — which is ASUS's badge on Infineon's **IR35201**, a digital multiphase controller that tops out at **eight phases**. So ASUS took its eight control phases and fanned *each one* out to **four IR3555 power stages** wired in direct parallel. Eight phases × four teamed stages = the 32 you see on the board. No doublers in the middle — [I got into why ASUS skipped those last time](/blog/dominus-extreme-vrm-overbuilt) — just four real stages taking the same PWM signal and sharing the load blind.

Which means the controller doesn't shed *stages*. It sheds **phases** — and on this board, every phase is a team of four. So when the Dominus drops a phase at idle, it isn't parking one power stage. **It's parking four at once.** Shedding happens in chunks of four. Drop down to a couple of active phases at the desktop and you've got maybe 8 of your 32 stages actually switching, the other 24 sitting dark.

![Diagram — the Dominus power path: one ASP1405I / IR35201 controller driving 8 phase channels, each channel fanning out to 4 teamed IR3555 stages, totaling 32. Highlight that shedding removes a whole phase channel at a time, i.e. 4 stages in one chunk](/images/posts/dominus-extreme-phase-shedding/dominus-shed-groups.svg)

---

## This isn't a fancy-board feature — cheap boards do it too

Don't let the 32-stage monster fool you into thinking phase shedding is some halo-tier trick. It's the opposite. **Almost every board sheds phases**, from $80 budget boards up. It's baked into basically every modern VRM controller because idle efficiency is something manufacturers get judged on, and shedding is free power savings that costs them nothing to enable.

Your little four- or six-phase B-series board is quietly shutting half its phases off while you read this. The mechanism is identical to what the Dominus does — there are just fewer phases to play with, so the shedding is coarser and matters less. If anything, a $3,000 halo board with 32 stages has *more* room to shed than a budget board does, not less.

So when someone tells you their fancy motherboard "has phase shedding" like it's a selling point — it's not. The one down the shelf for a quarter of the price does it too.

---

## So why did I turn it off?

On ASUS boards this lives in BIOS under **CPU Power Phase Control**. You get roughly three flavors:

- **Standard** — sheds based on load, stock behavior.
- **Optimized** — ASUS's tuned profile for daily use where load bounces around.
- **Extreme** — never sheds. Every phase stays lit, all the time, full stop.

I run mine on **Extreme**. All 32 stages, awake, permanently. And I'll be honest with you about why, including the part where it doesn't really matter.

The *reason* you'd disable shedding is transient response and stability margin. When the controller has parked most of the array and a sudden load slams in, it has to wake those phases back up — and there's a tiny lag before they're all pulling their weight. For a stable overclock chasing every last bit of margin, some people don't want the VRM ever having to "catch up." Keep all phases hot and there's nothing to wake. The load always lands on the full array instantly.

Now the honest part: on **this** board, the downside of doing that is almost nothing. The reason shedding saves meaningful power on a normal board is that the switching overhead is a real fraction of a small total. But the Dominus is [so absurdly overbuilt](/blog/dominus-extreme-vrm-overbuilt) that its stages barely generate heat even at full tilt — running all 32 at idle costs me a handful of watts of switching overhead that vanishes into the noise of a 400-watt-capable [W-3175X](/blog/xeon-w-3175x-270-dollar-monster) platform. I'm not saving the planet by shedding phases on a board that already needs [dual 24-pin and quad 8-pin inputs](/blog/dominus-extreme-vrm-overbuilt) to feed it.

So the math is easy. On a normal board, shed — the efficiency win is real and the transient cost is theoretical. On the Dominus, the efficiency win is a rounding error and I'd rather keep the whole array hot and never think about wake-up lag again. Different board, different call.

There's also just something I like about it. This board was built to run 32 teamed stages. So I run 32 teamed stages. All of them. All the time. Feels right.

![Diagram — BIOS CPU Power Phase Control settings compared: Standard and Optimized shedding phases at idle for efficiency, versus Extreme keeping all 32 stages lit permanently, with a small callout that the idle-power difference on this specific board is negligible](/images/posts/dominus-extreme-phase-shedding/phase-control-modes.svg)

---

## The short version

Phase shedding parks VRM phases at idle so the fixed switching overhead doesn't eat you alive when the CPU's doing nothing, then wakes them under load so the current spreads and nothing overheats. Every modern board does it, cheap ones included. The Dominus does it in chunks of four, because each of its eight control phases is a team of four stages.

And I turn it off — not because shedding is wrong, but because on a VRM this overbuilt the savings don't matter, and I'd rather run all 32 stages the way the board was clearly meant to.

*ROG Dominus Extreme — 32× IR3555 stages, 8 phases of 4 teamed each, run off a single ASP1405I (IR35201) controller, phase shedding disabled, all 32 stages lit permanently against a [W-3175X](/blog/xeon-w-3175x-270-dollar-monster) that couldn't stress them if it tried.*
