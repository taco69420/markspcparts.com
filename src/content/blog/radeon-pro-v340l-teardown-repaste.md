---
title: Radeon Pro V340L Teardown and Repaste
date: 2026-06-02
description: "A full teardown of the AMD Radeon Pro V340L — dual Vega 10 XL GPUs, 16GB HBM2, SR-IOV MxGPU virtualization, and a repaste after years of server life. Part number 109-D05387, formerly in Google Stadia."
tags: [gpu, teardown, amd, server, homelab, vega]
---

Placeholder intro paragraph — brief hook about acquiring the V340L and why it warranted a teardown.

![AMD Radeon Pro V340L fully assembled hero shot](/images/posts/v340l-repaste/hero-1.jpg)

---

## What Is The Radeon Pro V340L

Think of the V340L as the server big brother of the Fiji Pro Duo — AMD's answer to the question "what if we put two high-end GPUs on one card, but for the datacenter instead of the living room." Where the Pro Duo was aimed at content creators and VR enthusiasts, the V340L is pure enterprise iron.

The card carries two Vega 10 XL GPUs on a single PCIe board, each one paired with 4GB HBM2 stacks for 8GB per GPU and 16GB total. That HBM2 is part of what makes this card interesting — the same high-bandwidth memory you'd find on a [Vega 64](/blog/vega-64-lc-powercolor) or [Vega 56](/blog/vega-56-strix-hbm), just doubled up on one board. It runs passively cooled, which means there's a substantial heatsink doing all the work and it needs proper airflow from the server chassis to survive. AMD rates it at 300W TDP with dual 8-pin power connectors to match.

The real reason this card exists is SR-IOV. Through AMD's MxGPU technology, the V340L can expose up to 16 virtual GPUs to a hypervisor — hardware-level GPU virtualization without the driver gymnastics that software approaches require. That makes it a natural fit for VDI workloads, cloud gaming infrastructure, and virtualized compute environments. It's part number 109-D05387 if you're trying to track one down, and you may recognize its lineage from Google Stadia, where these cards were running in Google's datacenter racks serving game streams.

There's also a Microsemi SmartFusion2 security processor onboard — a microcontroller with FPGA fabric that handles secure boot and platform management functions. It's the kind of component you don't see on consumer cards and it's one of the more interesting things to find when you crack this open. For the full story on HBM2 and where it fits in the memory lineage from Fiji through the current datacenter generation, I wrote up [the complete HBM history here](/blog/hbm-memory-history).

![AMD Radeon Pro V340L part number 109-D05387 on PCB](/images/posts/v340l-repaste/amd-logo.jpg)
*Part number 109-D05387 stamped right on the board.*

---

## Disassembly

![AMD Radeon Pro V340L side profile with blue shroud](/images/posts/v340l-repaste/side-profile.jpg)
*The V340L fully intact before anything comes off.*

**Step 1 — Shroud removal.** Three screws on each side of the shroud, six total. They're straightforward Phillips heads along the edges. Once they're out the shroud lifts straight off — no clips, no prying needed.

![Three side screws holding the V340L shroud in place](/images/posts/v340l-repaste/side-screws.jpg)
*Step 1: three screws each side and the shroud is free.*

![Blue shroud being removed from Radeon Pro V340L](/images/posts/v340l-repaste/shroud-coming-off.jpg)
*Shroud coming straight off — no resistance.*

![V340L blue shroud laid flat showing interior](/images/posts/v340l-repaste/shroud-flat.jpg)
*The shroud laid flat. Simple construction.*

**Step 2 — I/O bracket.** Two screws hold the I/O bracket to the PCIe slot end of the card. Pull those and set the bracket aside.

![IO bracket screws on the Radeon Pro V340L](/images/posts/v340l-repaste/io-screws.jpg)
*Step 2: two screws and the I/O bracket comes off.*

**Step 3 — Backplate.** This is where you need patience. There are 23 screws holding the backplate and VRM area down. Count them. The one I nearly missed is hiding under a sticker — peel it back before you start hunting for why the backplate won't budge. Once all 23 are out the backplate lifts straight off without any force.

![View of all 23 backplate screws on the V340L](/images/posts/v340l-repaste/backplate-23.jpg)
*Step 3: 23 screws total. Count before you start.*

![Hidden screw under sticker on V340L backplate](/images/posts/v340l-repaste/sticker-screw.jpg)
*That sticker is hiding a screw. Don't skip it.*

![All 23 backplate screws removed and laid out](/images/posts/v340l-repaste/23-screw-out.jpg)
*All 23 out. The backplate is ready to lift.*

![V340L backplate being lifted off](/images/posts/v340l-repaste/backplate-off.jpg)
*Backplate off. The full PCB is exposed.*

**Step 4 — Core retention bracket.** The retention bracket around the GPU dies comes off next. Work the screws out in a cross pattern — same as you would with a CPU cooler — to release the pressure evenly.

![Core retention bracket on Radeon Pro V340L](/images/posts/v340l-repaste/retention-bracket.jpg)
*Step 4: cross pattern on the retention bracket screws.*

**Step 5 — Left GPU heatsink.** Once the bracket is off, carefully lift the left GPU heatsink off the left die. It should come up cleanly. Don't rock it or slide it — straight up.

![Left GPU heatsink being lifted off Radeon Pro V340L](/images/posts/v340l-repaste/left-die-pull.jpg)
*Step 5: left heatsink lifts straight off.*

**Step 6 — Right GPU heatsink.** Same deal on the right side. Lift it straight up off the right die. Take your time — the HBM stacks are sitting right there.

![Right GPU heatsink being lifted off Radeon Pro V340L](/images/posts/v340l-repaste/right-die-pull.jpg)
*Step 6: right heatsink off. Both dies are now exposed.*

**Step 7 — VRM heatsink.** The VRM heatsink is held down by its own screws and uses thermal pads rather than paste. Lift it gently and let the pads stay on whichever surface they've bonded to — trying to peel them off at this stage just tears them. You can deal with pad replacement separately if needed.

![VRM heatsink being removed from V340L](/images/posts/v340l-repaste/vrm-heatsink-off.jpg)
*Step 7: VRM heatsink off. Let the pads grip where they want.*

---

## What I Found Inside

Placeholder — describe the condition of the original thermal paste: dried out, cracked, poor coverage, age, anything unexpected on the PCB, VRM layout, capacitors, overall build quality impressions.

![Vapor chamber heatsinks alongside bare V340L PCB showing dies and screws](/images/posts/v340l-repaste/heatsinks-and-pcb.jpg)
*The vapor chamber heatsinks next to the bare PCB.*

![AMD Radeon Pro V340L bare PCB with clean dual Vega dies exposed](/images/posts/v340l-repaste/hero-2.jpg)
*Both Vega 10 dies exposed with the heatsinks gone.*

![Close up of bare left Vega 10 die on Radeon Pro V340L](/images/posts/v340l-repaste/left-die-shot.jpg)
*Left Vega 10 die, up close.*

![Close up of bare right Vega 10 die on Radeon Pro V340L](/images/posts/v340l-repaste/right-die-shot.jpg)
*Right Vega 10 die, up close.*

![HBM2 memory stacks on Vega 10 interposer V340L](/images/posts/v340l-repaste/hbm.jpg)
*The HBM2 stacks sitting on the interposer next to each die.*

![Microsemi SmartFusion2 security processor on Radeon Pro V340L](/images/posts/v340l-repaste/smartfusion.jpg)
*The Microsemi SmartFusion2 — not something you see on consumer cards.*

---

## Repaste

Placeholder — describe the repaste process: cleaning the old paste off, product used, application method, reinstalling the heatsink, torque pattern on screws, any thermal pad replacements.

![Thermal paste applied to both bare Vega 10 dies on V340L](/images/posts/v340l-repaste/paste.jpg)
*Fresh paste on both dies, ready for the heatsinks to go back on.*

---

## Whats Next

Placeholder — plans for the card: what system it will go into, intended workload (AI inference, vGPU, compute, homelab use), any follow-up posts planned on temperatures or benchmarks.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the AMD Radeon Pro V340L?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Radeon Pro V340L (part number 109-D05387) is a server-class GPU from AMD that puts two Vega 10 XL dies on a single PCIe card. It has 16GB of HBM2 memory split as 8GB per GPU, runs fully passively cooled, draws 300W via dual 8-pin connectors, and supports hardware GPU virtualization through AMD's MxGPU SR-IOV technology for up to 16 virtual GPUs. It also carries a Microsemi SmartFusion2 security processor for secure boot and platform management."
      }
    },
    {
      "@type": "Question",
      "name": "What is AMD MxGPU and SR-IOV?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MxGPU is AMD's hardware GPU virtualization technology built on the PCI-SIG SR-IOV (Single Root I/O Virtualization) standard. SR-IOV allows a single physical PCIe device to present multiple independent virtual functions directly to a hypervisor, bypassing the need for software emulation. On the Radeon Pro V340L this means up to 16 virtual GPUs can be assigned to separate virtual machines simultaneously, each with direct hardware access and isolated resources — making it well-suited for VDI, cloud gaming, and virtualized compute workloads."
      }
    },
    {
      "@type": "Question",
      "name": "Was the Radeon Pro V340L used in Google Stadia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The Radeon Pro V340L was used in Google's Stadia cloud gaming infrastructure. The card's dual-GPU layout and MxGPU SR-IOV hardware virtualization made it a practical fit for serving multiple simultaneous game streaming sessions from a single physical card installed in a server rack."
      }
    },
    {
      "@type": "Question",
      "name": "How do you repaste a bare die GPU like the Vega 10?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Repasting a bare die GPU involves removing the cooler, cleaning the old thermal compound off the exposed silicon die with isopropyl alcohol and a lint-free cloth, then applying a thin, even layer of fresh thermal paste directly to the die surface. Because there is no integrated heat spreader, use minimal paste — a small dot or thin spread — and reseat the cooler with even pressure following a cross pattern on the retention screws. Take care not to stress the die edges or the HBM stacks on the interposer when lifting and replacing the heatsink."
      }
    }
  ]
}
</script>
