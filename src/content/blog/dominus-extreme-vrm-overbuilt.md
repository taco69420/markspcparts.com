---
title: Why the ROG Dominus Extreme VRM Has So Much Headroom
date: 2026-06-15
updatedDate: 2026-11-08
description: 32 teamed IR3555 power stages and a 570A+ sustained figure ASUS quotes. By my estimates a stock W-3175X uses about a third of that, and the two overclocked tests use 62–73%. Here's the math, the board, and what I haven't measured yet.
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

And these aren't doubled phases. ASUS ran them **teamed in direct parallel** — no phase doublers sitting in the middle adding latency and a failure point, just 32 real stages sharing the load directly. ASUS's [product page](https://rog.asus.com/motherboards/rog-dominus/rog-dominus-extreme-model/) says the active heatsink lets the board handle a sustained power draw of **over 570 amps**. There are fans buried in the VRM heatsink, and ASUS says they turn on above 30°C. I run mine at max RPM, because it's barely louder than my case fans.

Stack that up:

- 32 stages × 60A = **1,920 amps** — that's just the sum of the PowIRstage component ratings, not something the board can do. ASUS also lists 40A chokes, and its specs don't say which part sets the board's sustained limit
- **570A+ sustained** — this one comes straight from ASUS's [Dominus Extreme page](https://rog.asus.com/motherboards/rog-dominus/rog-dominus-extreme-model/), under Cooling → Active Heatsink: the heatsink is there to "allow ROG Dominus Extreme to handle sustained power draw of over 570 amps." ASUS frames it as a cooling spec — what the active heatsink lets the board sustain — not as a standalone VRM rating. It's a manufacturer reference figure, so I compare against it below and treat the table as estimates against that reference.

That second number is the one I'm comparing against. It's the figure ASUS quotes, not a standalone VRM rating — and 32 × 60 isn't a board capability, so I'm not using it as the denominator.

---

## What the CPU actually asks for

The chip this board exists for is the [Xeon W-3175X](/blog/xeon-w-3175x-270-dollar-monster/) — 28 cores, unlocked, and a part that pulls serious power. Here's where my first version of this post went wrong.

I divided watts by about 1 volt, called it 400 amps, and spread that across 32 stages. But the W-3175X has its voltage regulation on the chip itself. The motherboard doesn't feed the cores directly — it feeds a higher input rail called **VCCIN**, and the chip steps that down internally. In [Tom's Hardware's overclock](https://www.tomshardware.com/reviews/overclocking-intel-xeon-w-3175x,6097.html), VCCIN sat at **1.9V** while Vcore was only **1.17V**. The board's VRM sees current at the *input* voltage, which is closer to 1.8–1.9V than 1V.

So the real current is lower than I first claimed: power divided by roughly 1.8–1.9V, not 1V. Using Tom's Hardware's [published power numbers](https://www.tomshardware.com/reviews/intel-xeon-w-3175x-cpu,5976.html) for the chip — about 318W at stock, and 676W (792W with AVX) at their 4.6 GHz all-core overclock — here's what that works out to:

| Scenario | CPU power | Assumed VCCIN | Total current | Per stage | % of one stage's 60A | % of ASUS's 570A |
|---|---|---|---|---|---|---|
| Stock | ~318W | 1.8V | ~177A | ~5.5A | 9% | 31% |
| 400W (illustrative) | 400W | 1.8V | ~222A | ~6.9A | 12% | 39% |
| My rig, Cinebench (HWiNFO-reported ~400W, measured VIN) | ~400W | 1.876V | ~213A | ~6.7A | 11% | 37% |
| 4.6 GHz overclock | ~676W | 1.9V | ~356A | ~11A | 19% | 62% |
| 4.6 GHz overclock, AVX | ~792W | 1.9V | ~417A | ~13A | 22% | 73% |

![Diagram — five bars showing estimated VCCIN current for a W-3175X at stock, an illustrative 400 watts, my rig at 400 watts with a measured 1.876 volts, a 4.6 GHz overclock and a 4.6 GHz AVX overclock, against the 570 amp figure ASUS quotes marked as a dashed red line. Estimates, not measurements](/images/posts/dominus-extreme-vrm/load-spread.svg)

These are **estimates, not measurements**. They assume all the reported CPU power flows through VCCIN, that the 32 stages share the load equally, and that VCCIN sits at the voltages I listed. I haven't measured current on my board. I did put a meter on its VIN pad for [the probe-point post](/blog/dominus-extreme-probe-point-voltages/) — it read 1.875–1.880V under Cinebench, and that's where the 1.876V in my-rig row comes from. That's a voltage, not a current, and HWiNFO's own VCCIN reading disagreed with it (1.749V; I don't know why). I also don't know exactly how Tom's measured their power. Dividing package power by an assumed VCCIN is still an estimate, because the CPU has more than one supply rail. Treat the table as a sense of scale.

But the scale is useful. At stock, the VRM is asked for about a third of the 570A figure ASUS quotes. Push a hard overclock and it's 62–73% of that reference across the two overclocked tests. That's still under the reference, with margin left — but it's a long way from "barely working," which is what my first version of this post said.

---

## Why headroom still matters

Here's the thing people miss about VRM longevity. The two things that actually kill power delivery over time are **heat** and **thermal cycling** — components getting hot, expanding, cooling, contracting, over and over, until a solder joint fatigues or a stage cooks itself.

Conduction loss in a power stage scales with the *square* of the current through it (I²R). So a stage carrying half the current produces roughly a quarter of the conduction heat. That's why spreading a load across 32 stages helps so much, and why running well under a stage's rating keeps things cool. (The gate-drive part of the switching overhead is roughly fixed per active stage at a given switching frequency and drive voltage, though MOSFET turn-on and turn-off losses scale with current too — the fixed part is why [phase shedding](/blog/dominus-extreme-phase-shedding/) exists in the first place.)

That's the mechanism in theory. It's a projection from the math, not a measurement off my board. I haven't logged VRM temperatures yet — not the sensor, not the workload — so I'm not going to put a number on how cool it runs. "A lot of headroom" is what the specs and the estimates above support. A lifetime guarantee isn't.

---

## And the connector count is ridiculous too

It's not just the output stages. Here's the board's power connector inventory:

- **Dual 24-pin** ATX connectors
- **Quad 8-pin** EPS connectors
- **Dual 6-pin** EATX 12V connectors — these two feed the CPU VRM
- **One 6-pin EZ_PLUG** — supplementary PCIe slot power for multi-GPU, not CPU power

That is a genuinely absurd amount of input copper for a single-socket board. Typical consumer boards give you one or two 8-pin EPS connectors. This board has up to **eight power inputs**, plus the EZ_PLUG. The two 6-pin EATX 12V connectors feed the CPU VRM — I confirmed that on my board. I haven't found a source that traces the rest to it, and some of them probably feed other parts of the board, so read this as an inventory, not a map of what feeds the 32 stages. Either way, that's a lot of connectors for one board.

![Diagram — the board's power connector inventory: 2× 24-pin ATX, 4× 8-pin EPS, 2× 6-pin EATX 12V that feed the CPU VRM, and the 6-pin EZ_PLUG for supplementary PCIe slot power, compared with a normal two-EPS board](/images/posts/dominus-extreme-vrm/power-input-map.svg)

---

## And it's a big board

The Dominus Extreme is **14 inches by 14 inches** — bigger than the E-ATX boards that sit at the top of most lineups. I work at Pizza Hut, so I'll give it to you in units I actually know: that's the exact footprint of a **large hand-tossed**. Fourteen by fourteen. You could box this motherboard in a pizza box and it would fit like it was made for it. It runs **12 DIMM slots**, a 32-stage teamed VRM, eight power inputs, and a socket built for a 28-core workstation chip, all on one slab of PCB that barely fits in normal cases.

![Diagram — board footprint comparison: ROG Dominus Extreme (14 by 14 inches, 12 DIMM slots) overlaid against a standard ATX board and a current E-ATX flagship, with a large hand-tossed pizza outline at the same 14 by 14 size for scale, showing how much larger the Dominus is](/images/posts/dominus-extreme-vrm/size-comparison.svg)

I'm not going to tell you current boards are flimsy by comparison, because they're not. ASUS's [ROG Maximus Z890 Extreme](https://rog.asus.com/motherboards/rog-maximus/rog-maximus-z890-extreme/) lists 24 CPU power stages at 110A each, for chips in the 250–300W range. ASUS's [Pro WS WRX90E-SAGE SE](https://www.asus.com/us/motherboards-components/motherboards/workstation/pro-ws-wrx90e-sage-se/) lists 32 CPU power stages. Modern VRMs are strong, and a lot of that is the same idea — more stages, less current each.

What the Dominus has is the whole package at once: the size, the 12 DIMM slots, the eight power plugs, and a teamed 32-stage array built for one halo Xeon. It's a one-off board for a one-off chip, and I think that's what makes it fun to own.

---

## Where that leaves it

So here's the honest version. The Dominus Extreme VRM has a lot of headroom — about two-thirds of the 570A ASUS quotes left over at stock, and still a real margin under a hard overclock, by my estimates. The VRM is unlikely to be what kills one of these boards first. But that's math and published specs, not something I've measured on my own board yet, and the closer you push the chip, the less spare you have.

---

*ROG Dominus Extreme — 32× IR3555 teamed power stages, 60A each, 570A+ sustained figure ASUS quotes, with dual 24-pin / quad 8-pin / dual 6-pin inputs. By my estimates a [W-3175X](/blog/xeon-w-3175x-270-dollar-monster/) uses roughly a third of that figure at stock and 62–73% in the two overclocked tests. Estimates, not measurements.*
