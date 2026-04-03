---
title: "Meta Ray-Ban + VisionClaw: The Complete Windows Setup Guide (And My Honest Review)"
description: "I've been wearing Meta Ray-Ban Gen 2 smart glasses for weeks. Here's my honest take on the camera, the AI features, the livestreaming bait and switch — and a full walkthrough of setting up VisionClaw on Windows with an Android phone."
date: 2025-04-03
tags: ["meta ray-ban", "visionclaw", "smart glasses", "AR", "android", "gemini", "setup guide"]
---

I picked these up for $417 a few weeks ago with a pretty specific use case in mind: hands-free POV footage for my TikTok and YouTube content. When you're elbow-deep in a server board or chasing down a short on a dead VRM, you can't exactly hold a phone. The Ray-Ban Gen 2s seemed like the obvious answer — ultra-wide camera, sits on your face, shoots while your hands do the actual work.

The reality has been... mostly great, with one genuinely frustrating asterisk.

---

## The Livestreaming Bait and Switch

Let's get this out of the way first because it actually annoyed me.

Meta marketed livestreaming to Facebook and Instagram as a feature. It was there. People built workflows around it. Then they quietly killed it in a firmware update.

That's not a minor omission — that's pulling the rug out from under creators who bought the glasses specifically for that. The whole appeal for someone like me is broadcasting a live hardware teardown or a POST code diagnosis directly to my audience in real time, no phone mount, no tripod, just first-person raw footage. Gone. No replacement, no timeline for bringing it back.

It's the kind of move that makes you wonder what else gets quietly deprecated the next time Meta decides to "simplify" the product. Frustrating doesn't cover it.

---

## The 1080p Incident

Okay, so this one's on me, but it's still funny.

I took my e-bike out around the neighborhood specifically to test the camera. Full confidence. Sun was out, good lighting, interesting terrain — perfect conditions. I get back, pull the footage, and it looks good but not *great*. Something feels off about the sharpness.

Turns out the glasses ship defaulting to 1080p. Not 3K. 1080p. I didn't catch it in the settings before I headed out.

Here's the thing though — even at 1080p, the color science on this camera is legitimately impressive. The sky tones, the color balance, the way the ultra-wide handles exposure across a high-contrast scene — it all held up better than I expected for a pair of glasses. If the footage looks that clean at 1080p, I'm genuinely excited to see what 3K pulls. That's the real test, and I haven't done it yet because I want to set up a proper teardown session as the first real shoot.

---

## The Feature That Actually Changes My Workflow

Here's where these glasses earn their keep.

The multimodal AI — the "look and ask" stuff — is kind of absurd in the best way when you're doing hardware work. I was looking at a proprietary header on a flipped motherboard the other day, both hands occupied, and I just asked what I was looking at. The glasses identified it.

Think about what that replaces: setting the board down, picking up my phone, Googling a blurry photo, sifting through forum posts from 2019, picking the board back up. That whole loop, gone. The answer just comes back while I'm still holding the board.

For someone working on exotic or enterprise hardware — stuff where documentation is sparse, headers are unlabeled, and you're piecing things together from scattered sources — this form factor is legitimately useful in a way that a phone assistant never quite is. The hands-free part isn't a gimmick. It's the whole point.

---

## Where This Is All Going

I think AR glasses replace smartphones. Not next year, probably not in five years, but that's the direction and I don't think it's really a question of *if* anymore.

What gets me excited is the open-source side of what's being built around hardware like this. Projects like VisionClaw are working toward letting you control a home PC or run local LLMs remotely — just by talking, just by looking — from anywhere. The idea that I could be on campus and pipe a question to my home rig through my glasses, get a response from a locally running model, all without pulling out a phone — that's a genuinely different way of interacting with your own compute.

The hard problem that still needs solving is video calls. Right now, when you're on a call through glasses, the other person sees nothing. You're a disembodied voice. There's no face, no presence, no eye contact. Real-time 3D avatars are the only real fix — something that reconstructs your face convincingly enough that a video call through glasses doesn't feel like talking to a ghost. The technology is getting there, but it's not there yet, and until it is, there's a ceiling on how seriously people will adopt this as a daily communication device.

The glasses are good now. They're going to be interesting later. And if Meta stops quietly deleting features people actually paid for, maybe they'll be the ones around to see it.

---

## VisionClaw Setup Guide: Windows + Android (Meta Ray-Ban Gen 2)

I kept talking about VisionClaw like it was hypothetical. It's not anymore.

Got it running this week on my ROG Phone 8 Pro and a Windows laptop. The short version: Gemini can now see through my Ray-Ban camera in real time, and I can talk to it hands-free. The longer version involves enough gotchas that I'm documenting them here so nobody else wastes an afternoon on it.

### Prerequisites

- **Meta AI app Developer Mode** — not the glasses firmware settings, not your phone's dev options. Open the Meta AI app, tap the gear icon, scroll all the way to App Info, and tap the app version number five times. This one trips everyone up because "developer mode" sounds like it should be a top-level toggle somewhere obvious.
- **Android Developer Mode** — on a ROG Phone 8, the build number in About Phone is a tappable tile, not a text field. Had to scroll around to find it.
- **USB Debugging** enabled on your phone.
- A free **Gemini API key** from [aistudio.google.com/apikey](https://aistudio.google.com/apikey).
- A **GitHub Personal Access Token** with `read:packages` scope from [github.com/settings/tokens](https://github.com/settings/tokens).

### Setup Steps

**1. Install Android Studio and Git on your Windows machine**, then clone the repo:
```bash
cd ~
git clone https://github.com/sseanliu/VisionClaw.git
```

Don't skip the `cd ~` first. Cloning into `C:\Windows\system32` causes permission denied errors. Obvious in hindsight.

**2. Open `VisionClaw/samples/CameraAccessAndroid`** in Android Studio — not the root folder, specifically that subdirectory.

**3. Fix `gradle.properties` immediately.** The repo has a Mac Java path hardcoded:
/Applications/Android Studio.app/Contents/jbr/Contents/Home

Replace it with your Windows path:
C:\Program Files\Android\Android Studio\jbr

**4. Bump the JVM heap** in `gradle.properties` from `-Xmx2048m` to `-Xmx4096m`. The Gradle daemon crashes with the default 2GB on Windows, especially with other things running.

**5. Add your GitHub token to `local.properties`:**
github_token=YOUR_TOKEN_HERE

Not `gpr.key`. Not `gpr.user`. Specifically `github_token` — the wrong property name returns a silent 401 and you'll spend way too long figuring out why.

**6. Copy `Secrets.kt.example` to `Secrets.kt`** and paste your Gemini API key in.

**7. Plug in your phone via USB, hit Run.** App installs, tap "Connect my glasses," glasses feed appears on screen. Tap the AI button and Gemini is now seeing through your Ray-Ban camera in real time.

### Current Status

Voice and vision are working. Web search requires a separate OpenClaw setup I haven't gotten to yet, so that's still offline. But the core loop — look at something, ask about it, get an answer — is running on free-tier Gemini with no subscription, no cloud fees, no phone in my hand.

The blog post version of this was "imagine controlling your home PC from campus just by talking to your glasses." The installed version of this is me pointing my face at a motherboard header and getting an answer back in a few seconds. It's early. It's a little janky. It's also genuinely the most interesting thing I've set up in a while.
