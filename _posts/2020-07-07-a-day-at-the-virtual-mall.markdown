---
layout: post
title:  "A Day at the (Virtual) Mall"
date:   2020-07-07 10:06 -0700
tags:   Tech VR
---

Two years ago it was <em>Ready Player One</em>. Two decades ago it was <em>The Matrix</em>. Two score years ago it was <em>Tron</em>. For as long as computers have been able to create and display virtual worlds, humans have dreamed of building a second digital world, one where the laws of physics are more like guidelines and building blocks are free to everyone.

In certain realms, we are seeing the promised future unfold. VR games are a real, viable product that consumers can buy and enjoy from the comfort of their living room. You think zombie games are scary? Try playing them in VR, where reloading is an actual thing you have to do (not just press a button and wait for an animation) and getting your face eaten because you fumbled the fresh clip is now on the table. Or don't get to the zombie parts, and spend hours drawing on a window with whiteboard markers instead. It's up to you.

<figure><img src="/img/half-life-alyx-shots.jpg" alt="" width="768" height="498"/><figcaption>Option A: Fight sci-fi monsters. Option B: MATH! <em>(Images: Valve)</em></figcaption></figure>

In other realms, VR adoption is noticeably absent. I don't put on a VR set to go to the office, even though social distancing and quarantine has provided the perfect opportunity to try it out. I don't use VR to play board games with friends, even though Zoom meetings still leave a lot to be desired. Something is missing that keeps VR from attaining mass adoption in the mundane. But what?

There are several use cases we need to explore to understand the lack of mass adoption. They are by no means the only use cases that could drive VR adoption; half the excitement that VR generates comes from the fact that there are so many possibilities out there to be discovered. However, if current trends and past analogous technologies are to be believed, we will not see mass consumer VR adoption until it is a viable and compelling option to improve the way we shop, the way we stay connected, or the way we stay creative and inspired. VR doesn't need to do all of these, but it should do at least one well.

I hope to cover many of the future use cases for VR and adoption, but right now I need to buy a new pair of tennis shoes, and I need to make sure they fit. Shoe stores are closed right now thanks to COVID, but I've got everything needed to visit a VR store. So let's go to the (digital) mall.

<figure><img src="/img/lets-go-to-the-mall.gif" alt="Lets Go To The Mall GIF | Gfycat"/></figure>

<h2>The Shopping Experience</h2>

The obvious place to start an exploration of the tech required to relive the shopping scene from <em>Ready Player One</em> is on the client side. What do I, as a visitor to the virtual mall, need to have to facilitate a pleasant experience, one that makes me think it's worth it to continue shopping online?

It's also the wrong place to start. Any number of tech solutions are conceivable when it comes to interacting with VR environments, ranging from existing consumer technology to sci-fi style neural interfaces (à la <em>The Matrix</em>). I've not got time to write about every single configuration possible, and it's not that interesting a discussion anyway; I would rather focus on exploring the gap between mass VR adoption and the current state of affairs. So our digital mall will be something that could be developed using current software technology, likely Unreal Engine or Unity (or another equivalent 3D game engine).

Our digital mall:

<ul><li>Will host storefronts and billboards for vendors to advertise to users</li><li>Will filter and display stores based on what the user is looking for</li><li>Will provide a way for users to interact with virtual models of products</li><li>Will have a "forum" or other central area that users share with one another as they shop, promoting both a community experience and giving vendors another opportunity to advertise (e.g., clothes, accessories)</li><li>Will support <a href="https://newatlas.com/eye-tracking-vr-infinite-walking/54824/">walking</a> and <a href="https://www.engadget.com/2016-10-07-why-teleportation-makes-sense-in-virtual-reality.html">teleportation</a> methods of movement</li><li>Will be on the internet</li></ul>

Pretty simple. In fact, there are <span name="platforms">several software platforms</span> that already have most of these features. While there's definitely some additional dev work required to implement the instancing and sorting/filtering required to complete the mall environment, it certainly is not out of the realm of possibility for a well-resourced team of developers to knock out in a few months or years.

<aside name="platforms"><a href="https://altvr.com/">AltspaceVR</a> and <a href="http://spatial.io">Spatial</a>, to name two</aside>

The important pieces here are the hardware requirements our mall has outlined for use. Our future VR set must:

<ul><li>Enable users to easily handle 3D models of products</li><li>Allow users to closely examine products without <a href="{% post_url 2020-05-19-vergence-accomodation-effect %}">causing dizziness or headaches</a></li><li><span name="look-down">Look at users' feet without the headset shifting</span></li><li>Be comfortable enough to wear for long stretches of time<ul><li>The assumption here is that vendors want users in their "store" as long as possible</li></ul></li><li>Include easy-to-use headphone/microphone setups that allow users to communicate with store staff (whether human-controlled avatars or chatbots) </li></ul>

<aside name="look-down">Hence the reason we're using shoes as the example here</aside>

<h2>The Gaps</h2>

<blockquote>Our VR set must enable users to easily handle 3D models of products</blockquote>

As anyone who has played a VR game knows, this requirement is all about degrees of fidelity. The ability to manipulate objects in space is here today and gets better with each successful iteration. Most VR systems use handheld controllers that are lightweight, relatively intuitive, and work. While the current consumer standard doesn't give much range in terms of <span name="fine-control">finer motor controls</span> the envelope continues to move: the Valve Index allows users to modulate their grip and play Rock, Paper, Scissors, and both Oculus and Vive are rumored to be working on controller-free systems for the next generation.

<aside name="fine-control">Using wands to pick up objects means you're either holding something or not; there's no variance in how you hold something</aside>

<figure><img src="/img/vr-controllers.jpg" alt="" width="581" height="128"/><figcaption>Choose your weapon</figcaption></figure>

The ultimate reach goal for handling objects is<a href="https://haptx.com/"> haptic controllers</a>. Haptics provide sensory feedback when touching objects in the world, and would allow users to feel the different materials and heft of the object in the VR simulation. There are a few teams working on haptic gloves and equipment, but there's a long way to go before they're consumer-ready. In my book, haptics are a nice-to-have but not at all mandatory for extended VR activities. If you're insistent about rebuilding the <em>Ready Player One</em> world, just remember that Wade Watts didn't get anything that fancy until the second act. If they aren't mandatory in sci-fi, they aren't mandatory in the real world.

<blockquote>Our VR set must allow users to closely examine products without causing dizziness or headaches</blockquote>

I'm not going to spend much time here, as I've covered it in a <a href="https://grahamewatt.com/why-does-vr-make-my-eyes-hurt/">previous article</a>. The summary is that the vergence-accommodation effect is a big barrier to making this a real possibility in VR, and until we solve our VR shopping experience will be uncomfortable at best, nauseating at worst.

<blockquote>Our VR set must allow users to look at their feet without the headset shifting</blockquote>

This is more of a personal soapbox than an actual gap. We have the capability to build headsets and headwear today that allows us to move our heads without feeling like we're about to lose our cap. However, most consumer VR sets ship with elasticized head straps—intended to improve headset comfort, but the culprit of many a headset shift when trying to pick something up. Not being on the product team at HTC, I can only imagine it was a cost-benefit decision and better-fitting headsets are in our future. If designers needs some inspiration, check out baseball, where fitted caps are a <a href="https://en.wikipedia.org/wiki/New_Era_Cap_Company">multi-million dollar industry</a>, and Little League teams across the country are equipped with one-size-fits-all batting helmets that stay on in all sorts of violent collisions and crazy plays.

<blockquote>Our VR set must be comfortable enough to wear for long stretches of time</blockquote>

Similar to the point above, our headset needs to be comfortable enough to wear for hours on end, removed only for a coffee break or to make some lunch. Consumer headsets are pretty good; I can usually wear my Vive for ~90 minutes without getting an itchy/pinching sensation on my head. If the Vive actually fit my big head properly, I'm sure that time would go up at least a little bit.

However, designers have to cope with heads that do not remain static in shape and profile. We sweat, our heads grow and shrink ever so slightly, and headsets by definition put weight in weird places around our cranium, which can put pressure on spots we aren't used to and don't find comfortable. This is solvable with current technology, and I don't believe it is holding VR adoption back. Quite the opposite; as VR adoption grows, there will be a larger incentive for manufactures to to spend the kind of R&amp;D money on headset comfort that Nike and Adidas do on cap fit, and the market will sort itself out.

<blockquote>Include easy-to-use headphone/microphone setups that allow users to communicate with store staff</blockquote>

Not a gap. The audio configuration in some of the sets is weird, but it's more due to concerns being elsewhere during development. Audio works today and will only improve over time. The main body of work here will need to be done on the software side; developers will need to figure out how to handle conversations within a VR environment to mimic real-world conversations as much as possible.

<h2>The Takeaway</h2>

From a technical standpoint, we are close to our shopping experience. The software technology to host a virtual mall for hundreds or thousands of people either exists right now or is entirely possible through extensions and integrations of other existing platforms. Developing our virtual mall isn't a trivial exercise, but would be well within the scope of a large, highly skilled software development team. Manipulation of objects in VR is here now and will only get better; short of a haptics revolution, we won't get quite the same experience of testing fabric and quality that we would in a physical shop, but for most items the convenience and social possibilities will win out.

There are still hardware challenges to be overcome. Vergence-accommodation conflict is still the big one, and there are other issues involving ergonomics and comfort that haven't quite received the love they need for VR marathons to be a real thing people are excited about. Neither are insurmountable; I would be surprised if solutions for each are not available on the market within the next five years.

Once the technical challenges are solved, will we have VR malls? Will we even see improved VR adoption? It's hard to say. But VR will never leave the realm of "experiences" and move into the more mundane realm of everyday life until putting on a headset stops being a commitment and starts being natural. Without solving the head comfort and vergence-accommodation issues, we will never know what VR is truly capable of, and what a world where VR sets are as common as game consoles would look like.
