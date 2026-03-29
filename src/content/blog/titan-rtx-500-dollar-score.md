---
title: "I Got NVIDIA's Forgotten $2500 GPU for $500"
date: 2026-03-28
description: "The Titan RTX is the full unlocked TU102 die with 24GB of GDDR6 — and in 2026 that VRAM matters more than ever for local AI. I grabbed one off Facebook Marketplace for $500."
tags: ["nvidia", "gpu", "turing", "titan", "ai"]
---

So if you saw the video, you already know the deal. I picked up an NVIDIA Titan RTX off Facebook Marketplace from a local collector for $500. These go for $700+ on eBay consistently, and mine is essentially brand new. Guy tested it once and let it sit. That's the kind of score that makes the whole sourcing grind worth it.

But beyond the deal, there's a reason I'm actually keeping this one instead of flipping it immediately: 24 GB of GDDR6 VRAM. In 2026, that number matters a lot more than it did when this card launched in 2018.

![NVIDIA Titan RTX — matte gold shroud, full TU102 die](/images/posts/titan-rtx/card.jpg)

---

## Why VRAM is the bottleneck for local AI

If you've tried running large language models locally, you've hit the wall. Most consumer GPUs top out at 8, 12, maybe 16 GB of VRAM. The moment your model weights exceed that, you're either quantizing down to fit, offloading to system RAM (slow), or just giving up. 24 GB gives you real breathing room — you can run 13B parameter models comfortably, push into 30B territory with decent quantization, and actually experiment without constantly fighting your hardware.

That's the play here. This card is going into an AI/LLM build. And depending on whether I can source a second one at a reasonable price, there's a dual NVLink setup on the table too — more on that below.

![Titan RTX with original box](/images/posts/titan-rtx/card-with-box.jpg)

---

## What the Titan RTX actually is

The Titan RTX is built on NVIDIA's TU102 die — the same chip inside the RTX 2080 Ti, except the 2080 Ti shipped with 4 of its 72 Streaming Multiprocessors disabled for yield reasons. The Titan RTX runs the full die: 4,608 CUDA cores, 576 Tensor cores, 72 RT cores, all of it. TU102 with nothing left on the table.

It launched in December 2018 at $2,499, which put it in a weird spot. Too expensive to justify for gaming when a 2080 Ti at half the price was right there, but significantly cheaper than the Quadro RTX 6000 which offered similar specs for around $6,000. It was always aimed at researchers, developers, and content creators who needed the memory headroom. In 2018 that was a niche use case. In 2026 that's basically just "anyone running local AI."

The 2080 Ti launched with 11 GB of VRAM, which at the time seemed like plenty. Nowadays you can actually fill that running modern games at high resolution, let alone any AI workload. The Titan RTX's 24 GB across a 384-bit bus at 672 GB/s bandwidth hasn't aged out the same way.

![Titan RTX rear outputs — DisplayPort and HDMI](/images/posts/titan-rtx/ports.jpg)

---

## The NVLink thing

Two Titan RTXs can be connected via an NVLink bridge, which runs at up to 100 GB/s of total bandwidth between the cards. This also enables memory pooling — but it's worth being precise about what that means. It's not simply 48 GB of unified VRAM that everything can use. Specific ML frameworks and renderers that explicitly support NVLink can treat the combined memory as one large pool. Most software can't. It's a software-dependent feature, not a hardware guarantee. When it works, it's legitimately useful for training runs that exceed a single card's memory. When it doesn't, the cards just run independently.

So the dual build is interesting but not magic. More on that when it actually happens.

![Titan RTX side profile](/images/posts/titan-rtx/side-shot.jpg)

---

## The card itself

Mint condition. Matte gold shroud, polished accents, the Titan logo on the top edge lights up white. Same dual-fan NVTTM cooler as the 2080 Ti Founders Edition underneath, just dressed differently. Fans spin smooth, no coil whine, no signs of ever being in a compute rack. $500 off Facebook Marketplace. Sometimes this hobby pays off.

![Titan RTX backplate](/images/posts/titan-rtx/back-card.jpg)

---

## Specs

| | |
|---|---|
| GPU | TU102-400 (full die, no disabled blocks) |
| CUDA Cores | 4,608 |
| Tensor Cores | 576 |
| RT Cores | 72 |
| VRAM | 24 GB GDDR6, 384-bit |
| Memory Bandwidth | 672 GB/s |
| Boost Clock | 1,770 MHz |
| TDP | 280W (2x 8-pin) |
| Launch Price | $2,499 (Dec 2018) |
| What I paid | $500 |
