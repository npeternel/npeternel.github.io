---
layout: post
title: Photo Framer
date: 2020-10-01
personal: ''
---

The Photo Framer is a Slack app that generates custom profile picture frames in a company's Slack workspace.

<!-- more -->

Mapbox has a custom Slack command `@mapbox` with a wide variety of commands, from meme generations to [incident response](https://blog.mapbox.com/building-on-call-mapboxs-managed-incident-response-tool-59fadd87317a).

In 2020, when Hacktober, our annual security-awareness month, was coming up, we realized we'd no longer be able to continue our annual tradition of awarding physical participation stickers because the entire company was remote.

A co-worker and I set out to solve this problem using a unique asset that every person at the company has: their Slack profile picture.

We added a new custom Slack command called `@mapbox photo-frame`, where a user can specify which photo frame they want to apply to their Slack profile picture. For example, if I sent the Slack message `@mapbox photo-frame hacktober2020`, I'd receive a direct message from our Photo Framer Slack app that automatically frames my current Slack profile picture with a fun Hacktober frame.

![hacktober](/assets/images/photo-framer/hacktober.png)

But we soon realized this didn't need to be limited to Hacktober participation! Right as October ended, another major event was approaching: Election Day. "I Voted" stickers are typically distributed at polling places after a ballot is cast, but again, due to the limited, in-person interactions this year, most folks were probably not voting by mail or able to sport their sticker. So we added another photo frame!

![i-voted](/assets/images/photo-framer/i-voted.png)

The goal here is that as we continue to shelter-in-place, we can continue to drive virtual engagement through this Slack app. Anyone in the company can contribute their own frame - all it takes is a Pull Request with a PNG file and a 3-line code change!

Let's dive into the architecture a bit further. By utilizing Slack webhook events to an AWS API Gateway, we're able to build an event-driven system powered by AWS Lambda. The photo-framer Lambda function fetches the user's original photo from AWS S3 based on the user's Slack ID. If there is no file, that means it's the user's first time getting their photo framed. We upload the original photo to S3, frame it, and then send it back to the user through the Slack API. Now, the next time the user runs this command, we can grab their original, un-framed photo and apply whatever new frame they specify!

![architecture diagram](/assets/images/photo-framer/photo-frame-diagram.png)