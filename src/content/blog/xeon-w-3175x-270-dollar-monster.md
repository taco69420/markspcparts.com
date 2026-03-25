---
title: I Paid $270 for Intel's Most Unhinged CPU
date: 2026-03-25
description: The only consumer 28-core chip Intel ever made, bought off eBay for $270. It has lived a hard life and does not care.
tags: [intel, xeon, w-3175x, cpu, power, lga3647, ebay, deal]
---

Back in April 2025 I grabbed a Xeon W-3175X off eBay for $270. That's not a typo.

This thing launched at **$2,999**. It's the only consumer-facing 28-core chip Intel ever shipped, and it only worked in a handful of boards — the ASUS ROG Dominus Extreme, the Gigabyte C621 Aorus Xtreme, and the EVGA SR-3 Dark (I've actually had two of those). Not a long list. You couldn't just drop this into any LGA 3647 server board and call it a day — it needed a platform built around its unlocked multiplier and extreme power delivery. One chip, a few very specific boards, one insane platform. And I got the CPU for the price of a mid-range GPU.

---

## It Came From China and It Showed

I knew what I was getting into. The listing was honest — shipped from overseas, no box, cosmetic wear noted. When it showed up I could see why.

![Intel Xeon W-3175X — IHS showing visible scratches and thermal paste residue on LGA pads](/images/inventory/xeon-w-3175x/3175x1.jpg)

Scratches across the IHS. Thermal paste residue caked on the back of the chip around the LGA pads. This thing had clearly been in a system, pulled out without much care, and shipped across the world in a padded envelope.

But here's the thing — none of that matters. The IHS is cosmetic. The paste residue cleaned up. What matters is whether the silicon works and whether the IMC trains, and on both counts this chip came in swinging. Dropped it into the Dominus Extreme, populated 6 channels of DDR4, and it posted first try. IMC tested clean. Not a single issue.

![Xeon W-3175X seated in ROG Dominus Extreme socket — LGA 3647, full 28-core configuration](/images/inventory/xeon-w-3175x/3175x2.jpg)

It's been sitting in that board ever since.

---

## 400 Watts. At Stock.

Here's where this chip gets truly unhinged.

The official TDP is 255W. Which is already a lot. But TDP is a thermal envelope number, not a real power figure — and the W-3175X will absolutely blow past it if you let it. Running all-core loads at stock settings, with no manual power limits, I've watched this chip pull **400 watts** through the Dominus Extreme's power delivery.

Four hundred watts. From a single CPU. At stock clocks. No overclocking required.

The Dominus Extreme has the VRM to handle it — ASUS built that board specifically for this chip, and they didn't cut corners. But it still feels absurd to watch a CPU eat 400W and just keep going. The Noctua cooler on it is working hard. The whole platform runs warm. It doesn't care.

---

## The Reticle Limit

This is the other thing I love about this chip and not enough people talk about it.

The W-3175X die hits the **reticle limit** — the physical maximum size of a silicon die that the fab's lithography machines can produce in a single exposure. At Intel's 14nm node, that ceiling was around 700mm². The W-3175X die comes in just under it.

That means Intel wasn't holding back. They used every millimeter the process would allow. The die is *huge* — you can see it when you look at the chip, this massive piece of silicon sitting under the IHS, much larger than anything in a normal consumer CPU. It's one of the reasons the power draw is what it is, and it's one of the reasons Intel never made anything like it again. You can't really go bigger on a monolithic die at that node. This was the ceiling.

There's something I find genuinely cool about owning a chip that represents a hard physical limit of what the fab could make at the time.

---

## $270 for All of This

I keep coming back to the price. $270 for a 28-core, 56-thread Xeon with an unlocked multiplier, 6-channel DDR4 support, and 48 PCIe lanes. A chip that launched at $3,000 and ate 400 watts and hit the reticle limit of 14nm lithography.

It's a terrible practical CPU in 2026. The platform is expensive, power hungry, and loud. There are modern chips that will outperform it in almost every workload.

But that's not why you get one.

---

*Intel Xeon W-3175X — 28C/56T, LGA 3647, currently living in the ROG Dominus Extreme. Scratched up. Running great.*
