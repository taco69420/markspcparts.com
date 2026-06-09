---
title: "I Paid $280 for a Dual-Socket DDR4 Workstation With Noctua Coolers Already On It"
date: 2026-06-09
description: "ASUS Z10PE-D16, dual E5-2620 v4, 64GB DDR4 ECC, two Noctua NH-D9DX coolers, full IPMI. $280 shipped. Here's the board, the test results, and the split plan."
tags: ["dual-socket", "workstation", "server", "ASUS", "Xeon", "Z10PE-D16", "IPMI", "homelab", "Proxmox", "hardware flip", "DDR4 ECC"]
---

![ASUS Z10PE-D16 with dual Xeon E5-2620 v4 and Noctua NH-D9DX coolers, top-down view](/images/posts/dual-socket-16/hero-dual.jpg)

$280 shipped. Dual-socket DDR4 ECC workstation board, two Xeons, 64GB of registered ECC, and two Noctua NH-D9DX tower coolers already mounted. The seller had no idea. Nobody bid against me. Same story as [the Z9PE-D8 WS before it](/blog/lga2011-dual-socket-cheat-code) — and this one is better.

---

## The Bundle

Here's exactly what came in the box:

- **ASUS Z10PE-D16 WS** — dual LGA2011-3, C612 chipset, SSI-EEB
- **2x Intel Xeon E5-2620 v4** — 8c/16t each, 16 cores / 32 threads total
- **64GB DDR4 ECC RDIMM** — 4x 16GB Micron MTA18ASF2G72PDZ-2G3B1IK, PC4-2400T, 2Rx8
- **2x Noctua NH-D9DX i4 3U** — with NM-XFB3 LGA2011 Square-ILM brackets

The coolers are the part I keep coming back to. The NH-D9DX i4 is the specific Noctua model built for LGA2011 workstation sockets — it fits the Square ILM retention and clears the DIMM slots on most server-class boards. They go for $70-90 each new. The seller just threw them in. I didn't ask why.

---

## What the Z10PE-D16 Is

![Z10PE-D16 PCB name printed between the two CPU DIMM banks](/images/posts/dual-socket-16/name-shot.jpg)

The "D16" is the important part. Sixteen DIMM slots — eight per CPU, quad-channel per socket. That's the whole board. Where cheaper dual-socket platforms cut corners on memory slots, ASUS built this one out fully. Fill it with 64GB LRDIMMs and you've got a 1TB system. Fill it with the 16GB RDIMMs that came in this bundle and you've got 256GB with slots to spare.

The rest of the spec sheet: dual Intel i350 Gigabit LAN onboard, seven PCIe 3.0 x16 slots, C612 chipset, SSI-EEB form factor. The seven PCIe slots aren't a typo — this board was designed for multi-GPU visualization workloads, so ASUS populated it properly. In a homelab context that means room for GPUs, HBAs, NVMe controllers, and 10GbE cards without fighting over slots.

It needs a server case, pedestal workstation chassis, or open bench. It's too big for a standard ATX enclosure.

![Side profile of the Z10PE-D16 showing IO area and DIMM slots](/images/posts/dual-socket-16/side-shot.jpg)

---

## The IPMI

![Bottom-left corner of the Z10PE-D16 showing the ASPEED AST2300 BMC chip](/images/posts/dual-socket-16/left-cornor.jpg)
*The ASPEED AST2300 is right there on the PCB. That chip is the whole reason this board commands a premium over consumer HEDT.*

The ASUS ASMB8-iKVM module is what separates this from anything in the consumer HEDT world. Full IPMI 2.0 out-of-band management through a dedicated management port, powered by the ASPEED AST2300 SoC — its own processor, its own memory, its own network connection, completely independent of the main system.

What that means in practice: you can power the machine on or off remotely even when the OS is dead. You get a full KVM-over-IP browser session — keyboard, video, mouse — so you see POST messages, BIOS screens, and OS boot failures without a monitor attached. You can mount an ISO over the network as a virtual optical drive and do a completely headless Proxmox install. You can hook it into ipmitool and automate power management from other machines. You get SNMP and SMTP alerting on fan failures, voltage drift, and temperature spikes before they become real problems.

You won't find this on any mainstream consumer board. Z390, standard X299, consumer Threadripper — none of them ship with IPMI as a built-in feature. Workstation and rack-oriented variants from ASRock Rack and Supermicro do exist with IPMI on those chipsets, but they're a completely different product category at a very different price. The Z10PE-D16 has the ASMB8-iKVM built in from the factory because this board shipped into server rooms, not gaming setups. The BIOS even has a dedicated "Server Mgmt" menu tab — visible right in the POST shot below.

![Top-down view of both Noctua coolers showing CPU power connectors between them](/images/posts/dual-socket-16/top-right.jpg)
*Both 8-pin EPS connectors visible between the coolers. This board wants a server PSU or a quality ATX unit with dual CPU power.*

---

## Testing

Set it up on an open bench — GPU for video out, PSU, power on.

![Full open bench test of Z10PE-D16 with MSI GPU, PSU, and Noctua coolers connected](/images/posts/dual-socket-16/testing-shot.jpg)

Posted first try. Both CPUs detected, all four DIMMs recognized, ECC active, hardware monitoring live. BIOS revision 3703, build date 04/24/2018. BMC initialized without issue.

![BIOS screen showing 65536MB total memory and BIOS version 3703](/images/posts/dual-socket-16/post-shot.jpg)
*65536 MB. That's 64GB exactly, all of it showing up clean.*

![Intel Xeon E5-2620 v4 seated in CPU1 socket on Z10PE-D16](/images/posts/dual-socket-16/cpu-shot.jpg)
*E5-2620 v4, SR2R6, 2.10GHz. Low-end Broadwell-EP — not exciting, but it proves the sockets work and the platform is functional.*

Board is confirmed working. Nothing to hedge on.

---

## The IO and Storage End

![Bottom-right corner of Z10PE-D16 showing SATA ports and M.2 slot](/images/posts/dual-socket-16/right-cornor.jpg)

![Angled view of Z10PE-D16 SATA and storage connectivity area](/images/posts/dual-socket-16/sata.jpg)
*SATA ports, M.2, and headers all clean. No damage, no missing caps, nothing bent.*

The IO corner is fine — worth noting because this is where I found damage on [the Z9PE-D8 before this one](/blog/lga2011-dual-socket-cheat-code). This board traveled well.

---

## How I'm Splitting It

Same playbook as the Z9PE-D8 flip. Three-way split, RAM first.

**Noctua coolers first — already sold.** Listed both NH-D9DX i4 3U units individually at $50 each. Gone. $100 recovered before anything else shipped.

**RAM next.** The 64GB DDR4 ECC RDIMM kit is listed at $200. Four matched Micron 16GB PC4-2400T sticks — exactly what LGA 2011-v3 homelabbers are buying right now, and those buyers don't negotiate because they know what they need.

→ **[RAM LISTING]**

**Board and CPUs as a combo.** Z10PE-D16 with both E5-2620 v4s listed at $200, sold tested and confirmed. The E5-2620 v4 is not a glamorous CPU — 2.1GHz base, eight cores — but two of them gives a Proxmox buyer 16 cores / 32 threads, quad-channel DDR4 ECC per socket, full IPMI, dual Gigabit LAN, and seven PCIe slots in a confirmed-working package. That's a real homelab server at surplus pricing, and the buyer that wants it will pay for a tested combo over a gamble.

→ **[BOARD+CPU LISTING]**

Total gross on the full split: **$500** before fees on a $280 buy-in.

---

## The DDR4 ECC Market Right Now

If you're reading this because you're thinking about buying into a LGA 2011-v3 platform: do it now, not later.

TrendForce data through Q1 2026 shows DDR4 ECC RDIMM pricing up roughly 90–95% year-over-year. 16GB sticks that were $15 used in early 2025 are clearing $65–95 now depending on config and compatibility. Industry consensus on relief is 2027 at the earliest.

This matters because LGA 2011-v3 platforms require registered ECC — you can't sub in consumer DDR4. The boards are cheap because they're old server gear. The RAM isn't cheap anymore because enterprise demand ate the supply. The window where you can buy a complete, tested bundle with RAM already included at a reasonable all-in price is closing.

The RAM in this bundle is what makes the math work. $280 for the whole thing, and the RAM alone is currently worth $200+ by itself. The rest is gravy.

---

Coolers are already gone. RAM and board are live above.

---

As much as I'd love to keep this thing and play with 256GB of DDR4 ECC and a full IPMI setup — I've got something way more fun in the works. New build coming together around an ASUS ROG Z490 Apex and I'm pushing the memory to something stupid like 4000MHz CL15. Very different energy from a dual-socket server board, but that's kind of the point. Stay tuned.

*Previous flip in the same series: [Dual-Socket LGA 2011 Bundles Are Free Money If You Know What You're Looking At](/blog/lga2011-dual-socket-cheat-code).*
