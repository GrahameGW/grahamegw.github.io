---
layout: post
title:  "New Year, New Website"
date:   2023-03-31 12:10 -0700
tags:   Projects Tech
---

This is the second iteration of a "from scratch" website in the vein of my series [How to Build a Free Website]({% post_url 2019-11-12-building-a-free-website-part-1 %}). The new stack consists of [Jekyll](https://jekyllrb.com/) served on [Github Pages](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll), and takes a lot of design inspiration from the <span name="support-tom">[The Featherweight Website](https://macwright.com/2016/05/03/the-featherweight-website.html)</span>, where I originally got the idea from. 

Ironically, the new version is 100% free whereas the old version was only free until I ran out of AWS free tier credits. This one will remain free in perpetuity (or at least until Microsoft starts charging for Github). Because of how Github Pages works, the source code, drafts, and notes are all publicly visible on my [Github](https://github.com/GrahameGW/grahamegw.github.io), which felt weird at first but I now find I actually prefer it this way. I can always keep personal stuff saved in my storage and I've been leaning more into the idea of [working with the garage door up](https://notes.andymatuschak.org/About_these_notes?stackedNotes=z21cgR9K3UcQ5a7yPsj2RUim3oM2TzdBByZu), even if I've not been that successful about implementing it to date.

<aside name="support-tom">Tom MacWright <a href="https://ko-fi.com/s/76c66ec563">sells his theme on ko-fi</a> if you're interested in the aesthetic and want something that isn't bodged together this site.</aside>

## Visions of Magnificence

The redesign is an interesting case study in the siren song of inspiration. I don't remember the specific moment I decided to dive in and redo things, but it certainly involved someone sending me the tongue-in-cheek <span name="not-porn">[Motherfucking Website](https://motherfuckingwebsite.com/)</span>. My website had languished a bit (last post was in 2020), and it was physically painful to open the Wordpress backend, which had bloated with update alerts, ads, and <span name="blame-covid">general clutter.</span> It was the proverbial sink full of dirty dishes not getting cleaned because of how big a job it promised to be.

<aside name="not-porn">Not porn</aside>

<aside name="blame-covid">COVID may have also hurt things in this regard</aside>

So I burned it all down (mostly) and rebuilt it into what you see today. It was going to be simple, elegant, fast; a new aesthetic for a new age. <span name="asides">Jekyll means articles</span> in Markdown and Liquid-infused HTML for pages; images go in an `img` folder versus a CDN; templates don't have boilerplate unless I add it. The tech would *force* me to do things the "right way" and in doing so I would reach a permanent process-based flow state that would rekindle my prolific ambitions.

<aside name="asides">I was also able to implement asides, something I've always admired from <a href="https://gameprogrammingpatterns.com/introduction.html">Game Programming Patterns</a></aside>

As far as these things go, I achieved some of my "goals" for the project. The tech does force simplicity and Jekyll is a pretty elegant platform. My site is clean and direct; I don't get distracted with Wordpress plugins and fighting uber-complex CSS (my whole stylesheet is 275 lines). No more FTP! Everything has a place and everything in its place.

Armed with my new platonic ideal of a website, surely I have published dozens of articles and was inspired to new levels of creative inspiration?

Articles written: One

Huh. Guess not.

## The Shine Wears Off

There are still site improvements langishing in my to-do list (you can check out the [README](https://github.com/GrahameGW/grahamegw.github.io) for the latest status if you're curious). They range in size and scope: some small and fiddly, others large and imposing. All of them will require focus and commitment on my part to implement; none of them are as simple as adding another game to my [Games](/games.html) page. Yet, none of them are insurmountable; I know *how* to approach each task and am generally confident in my abillities to complete them.

The main difference is that none of the things on my list are "new" things. They are incremental improvements (a better nav bar for mobile) and process-driven items (write more articles). None of them promise to be novel or inspiring; it's as if I've put down my website for the <span name="godot">latest shiny toy</span> to catch my attention. The [one article I wrote]({% post_url 2023-02-19-specimen-retrospective %}) was a capstone to an entirely separate project and something I felt like I *had* to do, not something I was inspired to do. Without accountability, I got bored and gave up.

<aside name="godot"><a href="https://godotengine.org/article/godot-4-0-sets-sail/">Godot 4</a> in this case</aside>

I'm sure fading motivation is a problem endemic to the human condition and not just something I face. Finding external sources of accountability has always been critical to succeeding with long-term projects. Self-accountability is not a system that works for me; not due to a lack of work ethic but because there are just too many cool new things out there to discover. If you have any tips on this front I'm all ears.


> "Un ouverage n'est jamais achevé...mais abandoneé." &nbsp;&mdash; Paul Valéry

A project is never finished, it is abandoned. The trick is finding a way to ensure you can't abandon it before you're reasonably satisfied, lest you decide to start all over and do it right this time. 

I've redone this website. It's better, but I don't know that I did it "right." The ported articles are a mess of boilerplate HTML and markdown; I've got inline styles and CSS that is probably full of holes; my little asides run with *jQuery* of all things. There are so many things wrong with it, so many things I still think could be done better but were launched because it did the thing and I don't want to think about it anymore.

The new website is not right this time. It's just wrong differently. 

And yet, despite being painfully aware of all the warts, flaws, and broken features, it has done what I wanted it to do. It's easier to maintain, looks cleaner and simpler, and represents me in a way I'm comfortable to be represented.

It's wrong, but it's wrong my way. I won't be changing it ever again.

Probably.
