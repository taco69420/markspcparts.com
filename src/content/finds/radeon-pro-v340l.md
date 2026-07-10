---
title: AMD Radeon Pro V340L
date: 2026-06-02
category: GPU
description: Dual Vega 10 XL server card with 16GB HBM2 and hardware GPU virtualization — part number 109-D05387, formerly running in Google Stadia's datacenter racks. Sniped for $30.
specs:
  - label: GPUs
    value: 2x AMD Vega 10 XL on one PCIe board
  - label: Memory
    value: 16GB HBM2 (8GB per GPU)
  - label: Virtualization
    value: MxGPU SR-IOV — up to 16 vGPUs
  - label: Cooling
    value: Passive — dual vapor-chamber heatsinks
  - label: TDP
    value: 300W · dual 8-pin
  - label: Part Number
    value: 109-D05387
  - label: Onboard Security
    value: Microsemi SmartFusion2 (secure boot / platform mgmt)
  - label: Provenance
    value: Google Stadia surplus
  - label: Price Paid
    value: $30
images:
  - src: /images/posts/v340l-repaste/hero-1.jpg
    alt: AMD Radeon Pro V340L fully assembled hero shot
  - src: /images/posts/v340l-repaste/side-profile.jpg
    alt: AMD Radeon Pro V340L side profile with blue shroud
  - src: /images/posts/v340l-repaste/hero-2.jpg
    alt: AMD Radeon Pro V340L bare PCB with clean dual Vega dies exposed
  - src: /images/posts/v340l-repaste/hbm.jpg
    alt: HBM2 memory stacks on Vega 10 interposer
  - src: /images/posts/v340l-repaste/left-die-shot.jpg
    alt: Close up of bare left Vega 10 die
  - src: /images/posts/v340l-repaste/right-die-shot.jpg
    alt: Close up of bare right Vega 10 die
  - src: /images/posts/v340l-repaste/smartfusion.jpg
    alt: Microsemi SmartFusion2 security processor on Radeon Pro V340L
  - src: /images/posts/v340l-repaste/amd-logo.jpg
    alt: AMD Radeon Pro V340L part number 109-D05387 on PCB
tags:
  - gpu
  - vega
  - hbm2
  - server
relatedPosts:
  - radeon-pro-v340l-teardown-repaste
  - hbm-memory-history
relatedFinds:
  - vega-64-lc
  - vega-56-strix
hallOfFame: true
rank: 4
---

Stadia shut down in January 2023, and over the next year the hardware started moving — eBay listings, surplus auctions, all the server gear Google quietly decommissioned. I sniped this one for $30. Thirty dollars for a dual Vega 10 XL server card with 16GB HBM2 and hardware GPU virtualization. The seller had no idea what they had. I wasn't going to explain it.

Think of the V340L as the server big brother of the Fiji Pro Duo — two high-end GPUs on one board, but built for the datacenter. Two Vega 10 XL dies, 8GB HBM2 each, passively cooled off chassis airflow, 300W across dual 8-pin. The real reason it exists is SR-IOV: through AMD's MxGPU tech it can expose up to 16 virtual GPUs to a hypervisor. There's even a Microsemi SmartFusion2 security processor onboard — a component you never see on a consumer card.

Tore it fully down and repasted it — years of continuous server workloads had cooked the paste dry and cracked across both dies. The heatsinks turned out to be actual vapor chambers, the PCB was clean, and both bare Vega dies with their HBM stacks sitting right on the interposer are genuinely something to look at.

*Headed into a homelab Proxmox build — the whole point is carving it into vGPU slices with MxGPU. Full teardown on the blog.*
