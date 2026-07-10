---
title: ASUS Z9PE-D8 WS + Dual Xeon E5-2697
date: 2026-03-27
category: Motherboard
description: Dual-socket LGA 2011 workstation board with two Xeon E5-2697s and 256GB of DDR3 ECC — $150 off eBay. The would-be poor man's AI lab. Sold the RAM for more than the whole bundle cost.
specs:
  - label: Sockets
    value: Dual LGA 2011 (Socket R)
  - label: Included CPUs
    value: 2x Intel Xeon E5-2697 (14C/28T each · Sandy/Ivy Bridge-EP)
  - label: Chipset
    value: Intel C602
  - label: Memory
    value: DDR3 ECC RDIMM (came with 256GB)
  - label: Form Factor
    value: SSI-EEB / EEB workstation
  - label: Condition
    value: Top-left I/O corner bent in shipping — untested since RAM pull
  - label: Price Paid
    value: $150 (board + both CPUs + 256GB RAM)
images:
  - src: /images/posts/dual-socket-ai-lab/front-board.jpg
    alt: ASUS Z9PE-D8 WS dual socket LGA 2011 workstation board with both E5-2697s installed
  - src: /images/posts/dual-socket-ai-lab/2-cpu-sockets.jpg
    alt: Both E5-2697 CPUs seated in their LGA 2011 sockets on the Z9PE-D8 WS
  - src: /images/posts/dual-socket-ai-lab/chip.jpg
    alt: Close-up of an E5-2697 being seated into the LGA 2011 socket
  - src: /images/posts/dual-socket-ai-lab/bent-mobo.jpg
    alt: Top left IO corner of the Z9PE-D8 WS showing the shipping damage bend
  - src: /images/posts/dual-socket-ai-lab/ipmi.jpg
    alt: ASPEED IPMI controller on the Z9PE-D8 WS
tags:
  - motherboard
  - dual-socket
  - LGA2011
relatedPosts:
  - dual-socket-ai-lab
relatedFinds:
  - z10pe-d16
---

I was scrolling eBay one night and saw a listing that made no sense — an ASUS Z9PE-D8 WS dual-socket workstation board with two Xeon E5-2697s and 256GB of DDR3 ECC. Originally listed at $230, dropped week after week down to $150. Two watchers. The RAM alone was worth more than the ask. I bought it immediately.

The plan was a poor man's AI lab — 256GB of ECC is a lot of addressable memory, load models into system RAM and run inference off it. Slow, but it works. Grabbed a couple of cheap coolers and started planning. Then I noticed the top-left I/O corner was bent from shipping, and around the same time realized DDR3 ECC on dual E5-2697s was going to be painfully slow for inference. The novelty wore off.

So I sold the 256GB DDR3 ECC kit for $200 and put it toward the [Dominus](/finds/rog-dominus-extreme). Paid $150 for board + RAM + two CPUs, sold just the RAM for $200 — the board and both E5-2697s are sitting here essentially free. My cousin got me an IPMI module for it that's still in a drawer. The dream is technically still alive.

*ASUS Z9PE-D8 WS, dual E5-2697, bent corner, collecting dust. Might post. Only one way to find out.*
