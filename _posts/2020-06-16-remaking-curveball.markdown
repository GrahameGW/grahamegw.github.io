---
layout: post
title:  "Remaking Curveball"
date:   2020-06-16 09:59 -0700
tags:   [Game Development, Projects]
---

# Only 90's kids will remember this

For those of us who grew up in the 90's, surfing the internet was like traveling to California during the gold rush. DSL and Broadband was starting to leak out into the consumer market, freeing us from the tyranny of dial-up modems and metered connections. Consolidation had yet to happen, despite the best efforts of Yahoo, AOL, and MySpace; the diversity of websites was BANANAS. People had bookmark lists in the hundreds; <span name="gross">ebaumsworld was a thing,</span> and there was one glorious new technology that had captured the hearts and minds of kids and teens around the world:

<aside name="gross">*shudders*</aside>

Flash games.

Powered by Macromedia (now Adobe) Flash, the internet was awash in games and cartoons of all shapes and sizes. Some were funny (Decline of Video Games), some were chaos (Boxhead), some were just weird (Homestar Runner), and some?

Some were awesome.

<figure><img src="/img/curveball-screenshot.png" alt=""/><figcaption>A classic</figcaption></figure>

<a href="http://curveball-game.com">Curveball</a> was one of those games. Not much more than 3D Pong, it somehow managed to become one of the most played flash games of the late 90s. Not that Pong wasn't addictive in its time, but Curveball managed to shine in a world that was not just discovering video games for the first time. <span name="technical-spin">It's anyone's guess as to why,</span> but if I had to guess, I'd say it was the spin mechanic: by moving the paddle as the ball made contact with it, you could apply topspin to the ball, causing it to hook and bend like crazy. It felt realistic, it felt controllable, and it was SO MUCH FUN.

<aside name="technical-spin">Technically, it's just spin since there's no gravity. Backspin works when there's a force pulling against the direction the ball wants to go.</aside>

Unfortunately, Curveball relies on Flash. <a href="http://reddit.com/r/explainlikeimfive/comments/h7jwsz/eli5_why_is_adobe_flash_so_insecure/">Flash is insecure</a> for a number of reasons, and most of the major browsers are in the process of <span name="no-support">phasing out support for the technology.</span>

<aside name="no-support">Chrome and Firefox have already stopped supporting it</aside> So playing it requires going back to Internet Explorer. Which I'm not willing to do.

So I decided to build it myself. Over the last year or so, I've been teaching myself to program and have been playing around with Unity, one of the two major game engines on the market today. Building a clone meant I would have a finished game under my belt, which is a milestone I had yet to reach. It was a fun process, challenging at times, but I build a complete v1 game that used most of the main systems in Unity:

<ul><li>Physics Engine</li><li>Input Manager</li><li>Shaders/Textures</li><li>Post-processing effects</li><li>Audio</li><li>UI </li></ul>

The result? <a href="https://grahamewatt.com/games/corvebawl/">Corvebawl</a>:

<figure><img src="/img/games/corvebawl-screenshot.png" alt=""/></figure>

I'm <a href="https://grahamewatt.com/games/corvebawl/">hosting it here</a>, so please check it out and let me know what you like/dislike about it. If you're interested in playing around with the project yourself, I've uploaded the <a href="https://cdn.grahamewatt.com/wp-content/uploads/2020/06/12132224/corvebawl.unitypackage">unitypackage</a> file for you to download.

I have a [full post-mortem]({% post_url 2020-06-16-curveball-post-mortem %}) you can check out if you're interested in some of the lessons learned and challenges I faced in actually building the game.
