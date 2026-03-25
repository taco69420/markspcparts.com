---
title: I Liquid Cooled a GTX 1650 Super With a Kraken G12
date: 2026-03-25
description: Drilled custom holes, cut brackets, and got it to post — then found out the PCB was too short to actually cool anything.
tags: [gpu, nvidia, gtx-1650-super, nzxt, kraken-g12, aio, liquid-cooling, modding]
---

It was near the end of quarantine and I was losing my mind.

I had a GTX 1650 Super — the OEM one that came out of an HP Pavilion. Me and my brother had teamed up to buy that machine, so it was technically the family GPU, but it's what I had. And I was absolutely fiending to do something cool. Something nobody had really done before. So I started digging around and landed on the NZXT Kraken G12 GPU cooler bracket and a cheap 120mm AIO, and decided I was going to liquid cool this thing.

![GTX 1650 Super with Kraken G12 AIO mounted — full build shot](/images/posts/1650s/main-shot.JPG)

---

## The Build

My grandpa helped me put it together again. We had the G12 bracket, the AIO, and a 1650 Super that was never meant to see anything like this.

The problem was immediately obvious: nothing lined up.

The mounting holes on the G12 didn't match what the 1650 Super's PCB was offering. So we got the drill out. Custom drilled new holes directly into the G12 bracket to make the geometry work. Then the stock mounting brackets needed to go — we cut those down too so they'd clear the card's components without shorting anything out.

![Showcase view — Kraken G12 bracket and AIO pump head seated on the 1650 Super](/images/posts/1650s/showcase-shot.JPG)

It was the kind of thing where every step required another workaround. Not elegant. But it was coming together.

---

## The Radiator

![120mm radiator mounted — AIO rad with fan attached](/images/posts/1650s/rad.JPG)

The AIO was cheap — a basic 120mm. Nothing fancy. The whole point was just to get cold water touching the GPU die and see what happened.

---

## Seating It

![GPU seated in PCIe slot — full card installed in the system](/images/posts/1650s/pcie-slot.JPG)

When we finally got it seated in the PCIe slot and I hit the power button, it posted.

I freaked out.

Genuinely. After all the drilling and cutting and improvising, the thing booted. Seeing a display output on a GPU that looked like it had been through a field surgery was one of those moments. But the setup was fragile in a way that was hard to ignore — similar to the mounting hardware situation on the ROG Dominus Extreme, where you can torque it down infinitely and never know you've gone too far. Uneven mounting pressure on something like this and you can crack the die. You had to be careful every single time you touched it.

---

## The Back

![Back of the card — bare PCB with no backplate, VRAM chips exposed](/images/posts/1650s/back.JPG)

And here's where it fell apart.

Looking at the back of the card tells the whole story. The PCB on the 1650 Super is short. The Kraken G12 pump head was making contact with the GPU die, but the VRAM chips sitting further out on the board? They were getting nothing. No cooling whatsoever. Under load, the VRAM was just out there on its own, cooking.

The mod worked on paper. It just didn't work in practice.

---

## The End of It

After running it for a while and watching the temperatures, it became clear this wasn't going anywhere useful. The VRAM was the bottleneck and there was no clean fix for it without a completely different approach.

I tore it down, listed it on eBay as-is, and it sold.

Never heard from the buyer.

---

*GTX 1650 Super — OEM HP Pavilion card, Kraken G12 bracket, 120mm AIO, custom drilled mounting, zero VRAM coverage. Status: sold, gone, probably in a drawer somewhere.*
