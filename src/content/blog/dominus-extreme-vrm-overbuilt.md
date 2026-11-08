---
title: Why the ROG Dominus Extreme VRM Has So Much Headroom
date: 2026-06-15
updatedDate: 2026-11-08
description: 32 teamed IR3555 power stages and a cited 570A+ sustained rating. By my estimates a stock W-3175X uses about a third of that, and a hard overclock uses 60–70%. Here's the math, the board, and what I haven't measured yet.
tags: [asus, rog, dominus-extreme, lga3647, xeon, vrm]
---

I've owned a few of these boards now. [Flipped my first one for $300](/blog/dominus-extreme-first-board/), [brought a dead one back with a CMOS button](/blog/dominus-extreme-resurrection/), [fought the DIMM.2 slots over RAM thermals](/blog/dominus-extreme-dimm2-problem/). And the more time I spend with the ROG Dominus Extreme, the more I keep landing on the same thought:

The VRM on this board has a lot of headroom. That's not a guarantee it can't fail — manufacturing defects happen, accidents happen — but by the numbers, the usual wear mechanisms (heat, thermal cycling) shouldn't be what takes it out first.

Let me show you why. And fair warning: I redid this post's math in November, because my first version got the current wrong. The corrected numbers are less dramatic and a lot more honest.

![ROG Dominus Extreme laid flat on the bench — thermal pad material laid over the full VRM array, scissors on standby, LGA 3647 socket visible](/images/posts/dominus-extreme-first/vrm-prep.jpg)

That's the bare VRM from when I was prepping one for an EKWB block. Thermal pads laid over the phases, scissors out. Look at how far that power delivery array runs down the left edge of the board. That's not a normal motherboard VRM. That's a power supply that happens to be soldered to a motherboard.

---

## What's actually on there

ASUS built the Dominus Extreme power delivery out of **32 IR3555 PowIRstages** — Infineon's (International Rectifier) integrated stages. Each one of those is rated to handle **60 amps**. Each stage gets its own high-permeability alloy-core choke rated for **40 amps**. Thirty-two of them, lined up down the side of the board.

And these aren't doubled phases. ASUS ran them **teamed in direct parallel** — no phase doublers sitting in the middle adding latency and a failure point, just 32 real stages sharing the load directly. The whole thing is cited at **over 570 amps sustained**. There are fans buried in the VRM heatsink, and ASUS says they turn on above 30°C. In my experience they basically never spin up on their own — [Tom's Hardware](https://www.tomshardware.com/reviews/overclocking-intel-xeon-w-3175x,6097.html) saw the same. I've since set mine to max RPM, because it's barely louder than my case fans.

Stack that up:

- 32 stages × 60A = **1,920 amps** of raw stage capacity
- **570A+ sustained** — widely cited for this board, though I haven't been able to trace it back to an ASUS source. Treat the denominator below with the same caution as the rest of the table.
- Fans that mostly sit idle on their own

That second number is the one that matters. The stages add up to 1,920A, but the chokes, copper and everything else cap the board far below that. If you want to know how hard the VRM is working, compare against 570A, not against 32 × 60.

---

## What the CPU actually asks for

The chip this board exists for is the [Xeon W-3175X](/blog/xeon-w-3175x-270-dollar-monster/) — 28 cores, unlocked, and a part that pulls serious power. Here's where my first version of this post went wrong.

I divided watts by about 1 volt, called it 400 amps, and spread that across 32 stages. But the W-3175X has its voltage regulation on the chip itself. The motherboard doesn't feed the cores directly — it feeds a higher input rail called **VCCIN**, and the chip steps that down internally. In [Tom's Hardware's overclock](https://www.tomshardware.com/reviews/overclocking-intel-xeon-w-3175x,6097.html), VCCIN sat at **1.9V** while Vcore was only **1.17V**. The board's VRM sees current at the *input* voltage, which is closer to 1.8–1.9V than 1V.

So the real current is lower than I first claimed: power divided by roughly 1.8–1.9V, not 1V. Using Tom's Hardware's [published power numbers](https://www.tomshardware.com/reviews/intel-xeon-w-3175x-cpu,5976.html) for the chip — about 318W at stock, and 676W (792W with AVX) at their 4.6 GHz all-core overclock — here's what that works out to:

| Scenario | CPU power | Assumed VCCIN | Total current | Per stage | % of one stage's 60A | % of the cited 570A |
|---|---|---|---|---|---|---|
| Stock | ~318W | 1.8V | ~177A | ~5.5A | 9% | 31% |
| 400W | 400W | 1.8V | ~222A | ~6.9A | 12% | 39% |
| 4.6 GHz overclock | ~676W | 1.9V | ~356A | ~11A | 19% | 62% |
| 4.6 GHz overclock, AVX | ~792W | 1.9V | ~417A | ~13A | 22% | 73% |

![Diagram — four bars showing estimated VCCIN current for a W-3175X at stock, 400 watts, a 4.6 GHz overclock and a 4.6 GHz AVX overclock, against the cited 570 amp sustained figure marked as a dashed red line. Estimates, not measurements](/images/posts/dominus-extreme-vrm/load-spread.svg)

These are **estimates, not measurements**. They assume all the reported CPU power flows through VCCIN, that the 32 stages share the load equally, and that VCCIN sits at the voltages I listed. I haven't put a probe on my board's VCCIN, and I don't know exactly how Tom's measured their power. Package-power numbers alone can't tell you the real current. Treat the table as a sense of scale.

But the scale is useful. At stock, the VRM is asked for about a third of its rated sustained current. Push a hard overclock with a heavy AVX load and it's running somewhere around 60–70% of its rating. That's still under the ceiling, with real margin left — but it's a long way from "barely working," which is what my first version of this post said.

---

## Why headroom still matters

Here's the thing people miss about VRM longevity. The two things that actually kill power delivery over time are **heat** and **thermal cycling** — components getting hot, expanding, cooling, contracting, over and over, until a solder joint fatigues or a stage cooks itself.

Conduction loss in a power stage scales with the *square* of the current through it (I²R). So a stage carrying half the current produces roughly a quarter of the conduction heat. That's why spreading a load across 32 stages helps so much, and why running well under a stage's rating keeps things cool. (Switching and gate-drive losses are roughly fixed per active stage and don't scale with current — which is exactly why [phase shedding](/blog/dominus-extreme-phase-shedding/) exists in the first place.)

That's the mechanism in theory. It's a projection from the math, not a measurement off my board. I haven't logged VRM temperatures yet — not the sensor, not the workload — so I'm not going to put a number on how cool it runs. "A lot of headroom" is what the specs and the estimates above support. A lifetime guarantee isn't.

---

## The input side is equally ridiculous

It's not just the output stages. Look at what ASUS gave this thing to *feed* those 32 phases:

- **Dual 24-pin** ATX connectors
- **Quad 8-pin** EPS connectors
- **Dual 6-pin** supplementary

That is a genuinely absurd amount of input copper for a single-socket board. Typical consumer boards give you one or two 8-pin EPS connectors. This board wants up to **eight power connectors** because ASUS designed the input rails to never be the bottleneck either. The whole power path, input to output, is built like a substation that wandered into an ATX case.

![Diagram — power input map: dual 24-pin, quad 8-pin EPS, and dual 6-pin connectors feeding the 32-stage teamed VRM array, which feeds the W-3175X socket, showing the absurd amount of input copper relative to a normal two-EPS board](/images/posts/dominus-extreme-vrm/power-input-map.svg)

---

## And it's a big board

The Dominus Extreme is **14 inches by 14 inches** — bigger than the E-ATX boards that sit at the top of most lineups. I work at Pizza Hut, so I'll give it to you in units I actually know: that's the exact footprint of a **large hand-tossed**. Fourteen by fourteen. You could box this motherboard in a pizza box and it would fit like it was made for it. It runs **12 DIMM slots**, a 32-stage teamed VRM, eight power inputs, and a socket built for a 28-core workstation chip, all on one slab of PCB that barely fits in normal cases.

![Diagram — board footprint comparison: ROG Dominus Extreme (14 by 14 inches, 12 DIMM slots) overlaid against a standard ATX board and a current E-ATX flagship, with a large hand-tossed pizza outline at the same 14 by 14 size for scale, showing how much larger the Dominus is](/images/posts/dominus-extreme-vrm/size-comparison.svg)

I'm not going to tell you current boards are flimsy by comparison, because they're not. ASUS's [ROG Maximus Z890 Extreme](https://rog.asus.com/motherboards/rog-maximus/rog-maximus-z890-extreme/) lists 24 CPU power stages at 110A each, for chips in the 250–300W range. ASUS's [Pro WS WRX90E-SAGE SE](https://www.asus.com/us/motherboards-components/motherboards/workstation/pro-ws-wrx90e-sage-se/) lists 32 CPU power stages. Modern VRMs are strong, and a lot of that is the same idea — more stages, less current each.

What the Dominus has is the whole package at once: the size, the 12 DIMM slots, the eight power plugs, and a teamed 32-stage array built for one halo Xeon. It's a one-off board for a one-off chip, and I think that's what makes it fun to own.

---

## Where that leaves it

So here's the honest version. The Dominus Extreme VRM has a lot of headroom — about two-thirds of its rated current left over at stock, and still a real margin under a hard overclock, by my estimates. The VRM is unlikely to be what kills one of these boards first. But that's math and published specs, not something I've measured on my own board yet, and the closer you push the chip, the less spare you have.

---

*ROG Dominus Extreme — 32× IR3555 teamed power stages, 60A each, cited 570A+ sustained rating, fed by dual 24-pin / quad 8-pin / dual 6-pin inputs. By my estimates a [W-3175X](/blog/xeon-w-3175x-270-dollar-monster/) uses roughly a third of that figure at stock and 60–70% at a hard overclock. Estimates, not measurements.*
