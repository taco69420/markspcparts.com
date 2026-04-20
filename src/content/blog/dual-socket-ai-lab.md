---
title: "I Almost Built a Poor Man's AI Lab for $150"
date: 2026-03-27
description: "Dual socket LGA 2011, two Xeon E5-2697s, and 256GB of DDR3 ECC for $150 off eBay. The plan was a cheap local AI lab. Then I found the shipping damage."
tags: ["dual-socket", "lga2011", "xeon", "e5-2697", "asus", "z9pe-d8", "ecc", "ddr3", "workstation", "ebay", "deal", "ai", "ram", "ipmi"]
---

I was scrolling eBay one night and saw a listing that made no sense. An ASUS Z9PE-D8 WS — dual socket LGA 2011 workstation board — with two Xeon E5-2697s and 256GB of DDR3 ECC RAM. Originally listed at $230. Nobody bought it. So the seller just kept dropping the price, week after week, all the way down to $150 over the course of about a month.

Two watchers. That's it.

I couldn't figure out why nobody had touched it. The RAM alone was worth more than what he was asking. I bought it immediately.

![ASUS Z9PE-D8 WS dual socket LGA 2011 workstation board with both E5-2697s installed](/images/posts/dual-socket-ai-lab/front-board.jpg)

---

## The Plan

This was right around when running LLMs locally was becoming a thing people actually did. The idea was simple: 256GB of ECC RAM is a lot of addressable memory. You can load models into system RAM and run inference off it — it's slow, but it works. Pair that with a 3090 Ti for the GPU side and you've got a genuinely capable local AI rig for basically nothing. (I later went the GPU VRAM route instead — the [Titan RTX with 24GB](/blog/titan-rtx-500-dollar-score) is a much better answer to this problem.)

Poor man's AI lab. That was the vision.

I grabbed two cheap Amazon coolers for about $20 and started planning the build.

![Both E5-2697 CPUs seated in their LGA 2011 sockets on the Z9PE-D8 WS](/images/posts/dual-socket-ai-lab/2-cpu-sockets.jpg)

![Close-up of an E5-2697 being seated into the LGA 2011 socket](/images/posts/dual-socket-ai-lab/chip.jpg)

---

## The Damage

One night I'm inspecting the board and I notice the top left corner — right by the IO — is bent. Shipping damage. Not catastrophic, but it's there.

At that point I was already losing the thread on this build. The bend was just another reason to not bother.

![Top left IO corner of the Z9PE-D8 WS showing the shipping damage bend](/images/posts/dual-socket-ai-lab/bent-mobo.jpg)

---

## The Recovery

Honestly I was already losing interest. The ROG Dominus Extreme was calling and I needed money to fund it. And the more I thought about the AI lab idea the more I realized — DDR3 ECC on dual E5-2697s was going to be horrendously slow for inference. Like, painfully slow. The novelty of the $150 deal was wearing off and the reality of what the actual performance would look like was setting in.

So I sold the 256GB DDR3 ECC kit for $200 and put that toward the [Dominus](/inventory/rog-dominus-extreme).

Paid $150 for the board, RAM, and two CPUs. Sold just the RAM for $200. The board and both E5-2697s are just sitting here, essentially free.

My cousin got me an IPMI module for this board for Christmas which is sitting in a drawer. The board is collecting dust. The dream is technically still alive.

![ASPEED IPMI controller on the Z9PE-D8 WS — still unused](/images/posts/dual-socket-ai-lab/ipmi.jpg)

---

## Where It Stands

If enough people are interested I'll grab some cheap DDR3 ECC, throw it in, and see if the board even posts with the bent corner. Could be fine. Could be dead. Only one way to find out.
