---
title: "HBM: The History of Stacked Memory and Where It's At Now"
date: 2026-03-27
description: "From Fiji to MI300X — how HBM went from a niche GPU trick to the backbone of every serious AI accelerator."
tags: [hbm, memory, amd, nvidia, sk-hynix, samsung, micron, ai, gpu, hardware-history]
---

High Bandwidth Memory is one of the more interesting technologies to trace because it started as a solution to a very specific problem, spent years as a curiosity on a handful of enthusiast GPUs, and then quietly became the thing that makes modern AI infrastructure possible. The jump from Fiji to Blackwell is a wild arc. Let's walk through it.

---

## The Problem HBM Was Built to Solve

By 2008, GPUs had grown faster than GDDR could keep up with. The issue wasn't just raw bandwidth numbers — it was physics. GDDR runs on a relatively narrow bus (256-bit was typical) at very high frequencies, which creates signal integrity headaches, burns significant power in the I/O, and takes up board space for the traces. You could keep pushing the clock, but each step got harder and less efficient.

AMD's internal team, led by Senior Fellow Bryan Black, had a different idea: instead of making the interface faster, make it *wider*. A 1024-bit bus running at lower frequencies would blow past what GDDR could do while using less power — but you can't route a 1024-bit interface on a normal PCB. The traces would be physically enormous.

The solution was to not route it on the PCB at all. Sit the memory dies directly on the same silicon interposer as the GPU, connect them through thousands of Through-Silicon Vias (TSVs), and stack multiple DRAM dies vertically to get density. TSMC would later market their version of this packaging as CoWoS (Chip-on-Wafer-on-Substrate). The whole package — GPU die and memory stacks together — mounts on a substrate like any other component.

AMD brought in SK Hynix to build the actual memory dies. SK Hynix had been working on 3D-stacked DRAM and was the right partner. The first HBM chip came out of SK Hynix in 2013. JEDEC formalized it as JESD235 in October of that year.

---

## HBM1 (2013–2015)

**Bandwidth:** 128 GB/s per stack (512 GB/s with four stacks)
**Capacity:** Up to 1 GB per stack
**Interface:** 1024-bit per stack, 8 channels
**Max pin speed:** 1 Gbps
**Stack height:** 2-Hi or 4-Hi
**Process node:** 28nm DRAM
**Maker:** SK Hynix only

The first generation shipped on AMD's Fiji GPU in mid-2015. That translated to three consumer cards:

- **Radeon R9 Fury X** — June 2015
- **Radeon R9 Fury** — July 2015
- **Radeon R9 Nano** — September 2015
- **Radeon Pro Duo** (dual Fiji) — April 2016

Each Fiji chip used four HBM1 stacks. Four stacks × 1 GB × 128 GB/s = 4 GB total and 512 GB/s aggregate bandwidth across a 4096-bit interface. For reference, the GTX 980 Ti running GDDR5 had 336 GB/s on a 384-bit bus. HBM1 wasn't even close on bandwidth.

The catch was capacity. Four stacks of 1 GB was a hard ceiling, and 4 GB was already looking thin when the competition was shipping 8 GB and beyond. AMD had to live with this for the entire Fiji generation, and it hurt in scenarios where VRAM actually mattered.

HBM1 was only ever made by SK Hynix. No other manufacturer produced it.

---

## HBM2 (2016–2020)

**Bandwidth:** Up to 256 GB/s per stack
**Capacity:** Up to 8 GB per stack (8-Hi)
**Interface:** 1024-bit per stack, 8 channels
**Max pin speed:** 2 Gbps
**Stack height:** 2-Hi, 4-Hi, 8-Hi
**Process node:** 20nm DRAM
**Makers:** SK Hynix, Samsung

JEDEC published HBM2 as JESD235A in January 2016. Samsung started mass production the same month — their entry into HBM manufacturing. HBM2 doubled per-pin bandwidth and dramatically increased capacity by supporting 8-Hi stacks. You could now get 8 GB from a single stack, which fixed the Fury's biggest problem.

Products that shipped on HBM2:

| GPU | Config | Bandwidth | Year |
|---|---|---|---|
| NVIDIA Tesla V100 SXM2 16 GB | 4 stacks × 4 GB | 900 GB/s | 2017 |
| AMD Radeon Vega Frontier Edition | 2 stacks × 8 GB | 512 GB/s | 2017 |
| AMD Radeon RX Vega 64 | 2 stacks × 8 GB | 512 GB/s | 2017 |
| AMD Radeon RX Vega 56 | 2 stacks × 4 GB | 410 GB/s | 2017 |
| NVIDIA Titan V | 3 stacks | 652 GB/s | 2017 |
| NVIDIA Tesla V100 32 GB | 4 stacks × 8 GB | 900 GB/s | 2018 |
| AMD Radeon VII | 4 stacks × 4 GB = 16 GB | 1024 GB/s | 2019 |

The V100 was arguably the more important launch. NVIDIA used HBM2 for data center compute rather than consumer graphics, and that framing — HBM as a serious accelerator technology rather than a consumer gimmick — stuck. The V100's 900 GB/s on the SXM2 form factor set the standard for what serious compute memory looked like.

AMD's Vega architecture was supposed to recapture the GPU lead. It didn't, but the Vega 56 and Vega 64 were at least respectable parts with interesting bandwidth characteristics. The Radeon VII in 2019 was essentially a compute card with 1 TB/s+ memory bandwidth shoved into a gaming SKU — wildly overbuilt for games, interesting for compute work.

---

## HBM2E (2020–2022)

**Bandwidth:** Up to 410 GB/s per stack (some variants to 460+ GB/s)
**Capacity:** Up to 16 GB per stack (8-Hi), up to 32 GB (16-Hi)
**Interface:** 1024-bit per stack, 8 channels
**Max pin speed:** 3.2 Gbps
**Stack heights:** 8-Hi, 12-Hi, 16-Hi
**Makers:** SK Hynix, Samsung

HBM2E wasn't a new JEDEC standard number — it was an extension of the HBM2 spec that pushed per-pin rates from 2 to 3.2 Gbps and unlocked taller stacks. Samsung announced 12-Hi HBM2E in October 2019 with 16 GB per stack. The "E" nomenclature became common shorthand even though JEDEC didn't give it its own number.

This is the generation that made NVIDIA's A100 possible:

| Accelerator | Config | Total Memory | Total Bandwidth | Year |
|---|---|---|---|---|
| AMD Instinct MI100 | 4 stacks × 8 GB | 32 GB | 1,228 GB/s | 2020 |
| NVIDIA A100 40 GB (SXM4) | 5 stacks × 8 GB | 40 GB | 1,555 GB/s | 2020 |
| NVIDIA A100 80 GB | 5 stacks × 16 GB | 80 GB | 2,039 GB/s | 2020/2021 |
| AMD Instinct MI250X | 8 stacks × 16 GB | 128 GB | 3,277 GB/s | 2021 |

The A100 was the product that made people take GPU compute seriously at scale. The 80 GB version with HBM2E, doing 2 TB/s, became the workhorse of early LLM training infrastructure. Entire data center strategies were built around it.

The MI250X's 128 GB / 3.27 TB/s numbers are impressive on paper — AMD used two compute dies in one package and strapped eight HBM2E stacks to it. In practice the multi-die architecture had latency implications, but for memory bandwidth-bound workloads it was competitive.

Notably: Micron skipped this entire era of HBM entirely. They weren't a player from HBM1 through HBM2E.

---

## HBM3 (2022–2024)

**Bandwidth:** Up to 819 GB/s per stack
**Capacity:** Up to 24 GB per stack (12-Hi)
**Interface:** 1024-bit per stack, **16 channels** (doubled from HBM2E)
**Max pin speed:** 6.4 Gbps
**Stack heights:** 8-Hi, 12-Hi, 16-Hi
**Core voltage:** 1.1V (down from 1.2V)
**JEDEC standard:** JESD238, January 2022
**Makers:** SK Hynix (first to market), Samsung

HBM3 was a genuine architectural revision. The channel count doubled from 8 to 16 per stack (with pseudo-channels effectively giving 32 sub-channels), per-pin rates jumped to 6.4 Gbps, and on-die ECC got upgraded. The result was nearly 820 GB/s per stack — more than double HBM2E.

SK Hynix started mass production in June 2022, just in time for the H100.

| Accelerator | Config | Total Memory | Total Bandwidth | Year |
|---|---|---|---|---|
| NVIDIA H100 SXM5 | 5 stacks × 16 GB | 80 GB | 3.35 TB/s | 2022 |
| NVIDIA H100 PCIe | 5 stacks × 16 GB | 80 GB | 2.0 TB/s | 2022 |
| AMD Instinct MI300X | 8 stacks × 24 GB | 192 GB | 5.3 TB/s | 2023 |
| Intel Gaudi 3 | 6 stacks | 96 GB | 3.7 TB/s | 2024 |

The H100 is the product that turned the AI infrastructure market into a frenzy. Three and a half terabytes per second of memory bandwidth on a single package, in a standardized SXM5 form factor, available for dense cluster deployment. SK Hynix was the sole supplier at H100 launch; Samsung qualified later.

AMD's MI300X response with 192 GB and 5.3 TB/s across 8 stacks was legitimately impressive. It's still one of the highest-capacity single-package accelerators you can actually buy. The 192 GB isn't just a number — it's the threshold where you can fit the weight tensors for very large models without splitting across multiple cards.

---

## HBM3E (2024–present)

**Bandwidth:** ~1.2 TB/s per stack
**Capacity:** Up to 24 GB per stack (8-Hi), up to 36 GB (12-Hi)
**Interface:** 1024-bit per stack, 16 channels
**Max pin speed:** 9.2–9.8 Gbps
**Stack heights:** 8-Hi, 12-Hi
**Makers:** SK Hynix, Samsung, **Micron**

HBM3E pushed pin speeds from 6.4 to ~9.6 Gbps and introduced the 12-Hi stack configuration that enables 36 GB per stack. The 12-Hi build required JEDEC to relax the maximum stack height spec from 720 μm to 775 μm to make it work.

Micron finally entered the HBM market here, and not quietly. They announced HBM3E in July 2023 at 9.6 Gbps, claimed 30% better power efficiency versus the competition, and began mass production in February 2024 for the NVIDIA H200. Going from 5% market share to 21% in a single year is not nothing.

| Accelerator | HBM3E Config | Total Memory | Total BW | Year |
|---|---|---|---|---|
| NVIDIA H200 SXM5 | 5× 24 GB 8-Hi | 141 GB | 4.8 TB/s | 2024 |
| AMD Instinct MI325X | 8× 32 GB | 256 GB | 6.0 TB/s | 2024 |
| NVIDIA B200/B100 (Blackwell) | 8× 24 GB 8-Hi | 192 GB | 8.0 TB/s | 2025 |
| NVIDIA GB300 (Blackwell Ultra) | 8× 36 GB 12-Hi | 288 GB | 8.0 TB/s | 2025 |
| AMD Instinct MI350X | 8× 36 GB 12-Hi | 288 GB | ~8 TB/s | 2025 |

The Blackwell generation is the current ceiling. 288 GB and 8 TB/s on a single package. The GB300's 12-Hi stacks (36 GB each) represent the upper end of what HBM3E can do.

---

## The Three Players

**SK Hynix** built the first HBM chip in 2013 and has been first-to-market on every generation since. They hold roughly 57–62% of the HBM market as of early 2026 and reportedly have NVIDIA supply agreements locked in through 2026. The HBM business was significant enough that SK Hynix briefly overtook Samsung as the world's largest DRAM maker in early 2025 — first time that's happened.

**Samsung** entered with HBM2 in 2016 and has been present in every generation. They had a rough patch with HBM3E — took longer to qualify with NVIDIA than expected — and watched their market share drop to around 15% at the low point. They're recovering, targeting a 50% capacity expansion in 2026 and positioning HBM4 as the generation where they close the gap.

**Micron** skipped everything through HBM3 and came in at HBM3E with a strong product and better power numbers than the Korean competition. That 9-year gap probably cost them a massive amount of long-term market position, but they're clearly committed to catching up. US government interest in domestic HBM supply doesn't hurt their positioning either.

---

## The Standards Timeline

| Standard | Gen | Published | Per-Pin Speed | BW/Stack |
|---|---|---|---|---|
| JESD235 | HBM1 | Oct 2013 | 1 Gbps | 128 GB/s |
| JESD235A | HBM2 | Jan 2016 | 2 Gbps | 256 GB/s |
| JESD235B ext. | HBM2E | ~2020 | 3.2 Gbps | 410 GB/s |
| JESD238 | HBM3 | Jan 2022 | 6.4 Gbps | 819 GB/s |
| JESD238 amend. | HBM3E | ~2023 | 9.6 Gbps | ~1.2 TB/s |
| JESD270-4 | HBM4 | Apr 2025 | 8–13 Gbps | 2–2.8 TB/s |

---

## HBM4 and What's Next

HBM4's JEDEC standard (JESD270-4) was published in April 2025 and it's a bigger jump than any previous generation. The interface doubles from 1024-bit to **2048-bit per stack**. That alone doubles theoretical bandwidth before you even touch the pin speed. Combined with pushing speeds to 8–13 Gbps depending on variant, you get stacks in the 2–2.8 TB/s range.

The other major change is the base die. Previous HBM generations used a simple passive I/O die at the bottom of the stack. HBM4 moves to a logic-process base die — initially on something like 12nm, moving toward 3nm for enhanced variants. This enables more sophisticated signaling, better power delivery, and things like programmable bandwidth modes.

Micron is already in high-volume HBM4 production. Samsung shipped HBM4 samples at 11.7 Gbps in late 2025 and officially has product shipping as of early 2026. SK Hynix is ramping in parallel.

The first major target is NVIDIA's **Vera Rubin GPU**, targeting H2 2026. Numbers floating around: up to 288 GB HBM4 per package, up to 22 TB/s total bandwidth. The Vera Rubin NVL72 system (72 of those GPUs) is the compute platform AMD and the hyperscalers are building toward next.

**HBM4E** comes after that — targeting roughly 2027 production, 12.8–13 Gbps per pin, ~3.25 TB/s per stack, still on the 2048-bit interface from HBM4. Samsung has put a 3.25 TB/s target on record. TrendForce projects HBM4E will represent 40% of total HBM bit demand in 2027.

---

## Where Things Stand

The market is supply-constrained in a way that would have sounded absurd five years ago. SK Hynix is reportedly sold out of HBM supply through 2026. Both Samsung and SK Hynix are planning double-digit price hikes on HBM3E. The whole market is running hot enough that HBM is expected to grow from ~$35 billion in 2025 to potentially $100 billion by 2028.

The reasons are obvious in retrospect. Training large language models is almost entirely a memory bandwidth problem. The math units in an H100 or MI300X are fast enough that the bottleneck is almost always getting weights and activations in and out of memory quickly enough. More bandwidth means higher utilization, which means more useful work per dollar.

HBM was invented to solve the memory wall for gaming GPUs. It kind of failed at that — GDDR6X is fast enough and way cheaper for consumer graphics, and HBM never made sense on sub-$1000 cards. But the same properties that made it compelling for compute — insane bandwidth, dense packaging, lower power per bit — turned out to be exactly what AI infrastructure needed.

From Fury X to Vera Rubin in eleven years. Not a bad run for a memory standard nobody outside of hardware enthusiasts had heard of in 2015.
