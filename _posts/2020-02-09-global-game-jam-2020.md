---
layout: post
title:  "Global Game Jam 2020"
date:   2020-05-09 10:06 -0700
tags:   [Game Development, Projects]
---

# Build a game in 48 hours

Last weekend (Jan 28), nearly sixty people descended on <a href="https://www.cdm.depaul.edu/about/Pages/School-of-Computing.aspx">DePaul's CDM</a> to take part in the 2020 edition of the <a href="https://globalgamejam.org/">Global Game Jam</a>. As I've been getting more and more involved in the video game development community, and my computer programming skills have improved to the level of barely competent thanks to time spent messing around with <a href="https://unity.com/">Unity</a>, I decided that I would dive in for forty-eight hours of video game development madness.

<div class="wp-block-image"><figure class="alignright size-large is-resized"><img src="https://cdn.grahamewatt.com/wp-content/uploads/2020/02/05141144/tux-repair-banner.png" alt="" class="wp-image-372" width="392" height="225"/></figure></div>

The results?

<a href="https://grahamewatt.com/tux-repair/">Tux Repair: Dungeon Cleanup</a>

Our game wasn't quite what we scoped and it has plenty of bugs and weird behaviors I still can't figure out—but I couldn't be more proud of it. I would absolutely do another game jam soon (though I'm not sure I'm ready to commit to <a href="https://trainjam.com/">Train Jam</a>...). 

You can play our game here, and you can check out all the amazing games developed at DePaul at the <a href="https://globalgamejam.org/2020/jam-sites/depaul-university/games">Global Game Jam website</a>. 

<h2>What is a (Global) Game Jam anyway?</h2>

First, some context. A game jam is a video game version of a hackathon or 24-/48-/72-hour film/design/create challenge. Teams get a short window to create a video game <span name="from-scratch">"from scratch",</span> based on a prompt or challenge. At the end of the challenge, everyone demos their games, and gets to see what everyone else put together. There are sometimes prizes; for the DePaul Global Game Jam (GGJ) the winning team received a tour of <a href="https://irongalaxystudios.com/">Iron Galaxy Studios</a>, current home of <a href="https://www.ultra-combo.com/">Killer Instinct</a>, <em>Extinction</em>, and several popular system ports.

<aside name="">You weren't required to build a game engine, but you weren't supposed to bring in any prebuilt projects. So <a href="https://www.nownovel.com/blog/what-is-nanowrimo/">NaNoWriMo rules</a>.</aside>

<div class="wp-block-image"><figure class="alignright size-large"><img src="https://media.giphy.com/media/MvedbKot538WY/source.gif" alt=""/></figure></div>

The <a href="https://globalgamejam.org">Global Game Jam</a> is a global game jam.<aside name="">Shocker.</aside> Started by <a href="https://www.cdm.depaul.edu/Faculty-and-Staff/Pages/faculty-info.aspx?fid=516">Susan Gold</a> in 2008, the GGJ has grown to 113 countries and develops <strong>over 9,000 games </strong>annually. That includes all of the official statistics; I quickly learned from some of the folks there that it is common for developers to skip the official jam but take the chance to leverage an artificial deadline to get the creative juices flowing.

Teams usually assemble on the day of the event, though, it being held at DePaul, there were several pre-formed teams consisting of current CDM students. The rest of us found each other that day. Before assembling, Susan Gold (who is also a DePaul faculty member as well as a game jam founder) gave a talk to the <span name="jammer">assembled jammers.</span> Her talk was followed by the kickoff video/keynote, and then we were off to the races.

<aside name="jammer">Demonym: one who participates in a game jam.</aside>

<div class="wp-block-image"><figure class="aligncenter size-large is-resized"><img src="https://cdn.grahamewatt.com/wp-content/uploads/2020/02/09141800/ggg.jpg" alt="Susan Gold speaking at GGJ 2020" class="wp-image-396" width="572" height="359"/><figcaption> Susan Gold speaking at GGJ 2020 (Photo: Ross Hersemann, IGDA) </figcaption></figure></div>

I was on a team of four, which was either the <span name="not-solo">smallest or second-smallest team</span> at DePaul. Our group consisted of:

<aside name="not-solo">Doesn't include the solo developer. Because solo ≠ team.</aside>

<ul><li><strong>Ryan Sizemore, </strong>3D artist/designer,</li><li><strong>Rob Goetz</strong>, lead programmer,</li><li><strong><a href="http://www.andreschamat.com">Andres Chamat</a></strong>, musician and sound designer,</li><li><strong>Me</strong>, jack-of-all-trades and rookie programmer</li></ul>

<div class="wp-block-image"><figure class="aligncenter size-large"><img src="https://cdn.grahamewatt.com/wp-content/uploads/2020/02/10160711/ateam.png" alt="" class="wp-image-421"/><figcaption>The assembled team</figcaption></figure></div>

We got the prompt: "Repair," and sorted out some logistics. And then it was time to make a game!

<h2>Late nights are fun, right?</h2>

We spent a good twenty minutes trying to find an unlocked room somewhere in the CDM where we could huddle and come up with something. While hunting, we began batting around ideas having to do with "repair." Reassembling sci-fi dystopias, repairing broken relationships, fixing robots—all these and more were discussed. But ultimately it was Ryan's pitch of a dungeon cleanup crew that won us over. It was a simple enough idea to execute, the scope could be managed more or less on the fly, and we could build a 2D pixel art game à la <em>The Legend of Zelda</em> that would also be a crowd pleaser. Two of us had also played <a href="https://store.steampowered.com/app/246900/Viscera_Cleanup_Detail/">Viscera Cleanup Detail</a>, and I think the irreverence of the concept also appealed to everyone.

We ironed out a few more details:

<ul><li><strong>Protagonist: </strong>Nigel the Penguin. There was a claymation penguin in the GGJ intro video, so we went with it.</li><li><strong>Obstacles:</strong> Dungeon enemies, traps, and the adventurers hell bent on making messes for you to clean up. Crucially, the job was to be made harder by the fact that you were not immune from the perils of the dungeon, meaning that repairs had to be done strategically to avoid trapping yourself.</li><li><strong>Engine: </strong><a href="https://phaser.io/phaser3">Phaser</a>. Rob recommended it, as he is primarily a JavaScript developer and web dev has really short iteration cycles. No need to wait for a compiler—just refresh the page. I have some limited JS experience thanks to my last job, so there was the added benefit of my being able to actually provide some programming support.</li><li><strong>Infrastructure</strong>: I set up a <a href="https://github.com/Metapilgrim/GGJ2020">GitHub repo</a> and a Google Drive folder for us to pass around assets, and wrote a game design document (my main contribution).</li></ul>

And divided up responsibilities:

<ul><li><strong>Andres</strong> would write all the music, and figure out sound effects for smashing vases, rebuilding skeletons, opening doors, etc.</li><li><strong>Ryan </strong>was in charge of all the art, a challenge complicated by the team's decision to go with 2D pixel art, a novel medium for him. </li><li><strong>Rob</strong> would write the game code, and take advantage of <a href="http://www.mapeditor.org/">Tiled </a>to quickly iterate on level design. </li><li><strong>Grahame</strong> would do the UI development.</li></ul>

And then we were off. Andres and Ryan began cranking out the game assets, while Rob and I began building the game.

On the asset side of the house, Ryan and Andres knocked it out of the park. Andres, who worked from his home studio for most of the jam, put together a series of classic dungeon themes, perfect for the tense crawl/campy eighties game vibe we were going for. Ryan mixed and matched publicly available assets with his own creations; the look and feel of the game is all due to him:

<div class="wp-block-image"><figure class="aligncenter size-large is-resized"><img src="https://globalgamejam.org/amazons3/image-derivative/ggj/styles/game_content__normal/games/screenshots/2020/02/290072/1.png?itok=q-LOfMtu&amp;timestamp=1580661094" alt="" width="458" height="326"/><figcaption>Screenshot from Tux Repair</figcaption></figure></div>

On the programming side of things, it's safe to say Rob carried the team. Using a combination of JavaScript chops and Google-fu, Rob figured out how to directly load maps built in Tiled, create events and behaviors for the various game entities, and even get the sound effects and some of the animations working. He had to pull an all-nighter on Saturday, but doing so made it so we had a game to turn in and present.

I was less productive than I'd hoped to be. After dealing with the infrastructure and project setup, the best way for me to contribute was through programming. So I dove in, writing a UI manager class and status bar for the game to show the key bits of info to the player:

<ul><li><strong>Health</strong>, consisting of three Zelda-style heart sprites</li><li><strong>Time to the Next Hero</strong>, telling the player how long they had until a new adventurer would enter the dungeon and start breaking things again</li><li><strong>Coins</strong>, the amount of wealth the player had pocketed while resetting things</li><li><strong>Bones,</strong> the number of skeleton parts the player had with which they could rebuild the dungeon's monsters</li></ul>

Writing the logic for each part of the UI was pretty easy and it took me maybe an hour to get it all sorted out. My issues came up when I tried to connect it to the actual game.

<h3>Issue #1: Node.js ≠ JavaScript</h3>

In retrospect, this goes without saying. Node.js is a JavaScript framework that messes around with how the language does certain things. So all Node is JavaScript, but not all JavaScript is Node. However, I was inexperienced enough at coding not to know that the work I'd done on a Node web app was not directly analogous to general JavaScript development.

I've been teaching myself Unity, and the way it passed around classes and properties is very similar to the way the Node web app I'd worked on had passed things around. It is much easier to take advantage of <strong>encapsulation</strong> when using Node and other ES6 JS frameworks, and I had not realized how core object-oriented programming was to how I had been learning to program. 

Classic JavaScript is more of a functional language, which I still have trouble with as a paradigm. It shies away from mutable states and data, which was how I'd written things for the UI. When I went to connect them with the Phaser engine, I got errors ranging from basic <code>import</code> issues to all sorts of crazy complicated stack issues I still don't really understand.

Finally, though, I got my UI connected to the game, and was successfully using <code>console.log()</code> to display UI changes. I also learned a bit about a new (to me) programming paradigm.

<h3>Issue #2: Callbacks</h3>

I needed to write a timer that restarted every time a new hero appeared in the dungeon. While the timer was actually a game element and not a UI element, I needed it in place if I was going to ship a working UI. Since Rob was occupied making the game actually work, I took a crack at it.

Quick game development lesson: all game engines have an <code>update()</code> function, which contains a set of instructions the game runs prior to drawing a new frame on screen. So in pseudo code, every time your screen refreshes, your game engine is doing something like:
<pre class="EnlighterJSRAW" data-enlighter-theme="enlighter">// example pseudocode...
function update() { 
    getPlayerInfo(); 
    getEnemyInfo(); 
    calculatePhysics(); 
    updateUI(); 
    // ... 

    render(); 
}</pre>
So you need a timer that counts down and then triggers something (e.g., a timer reset) every X number of seconds. How would you do it?

The obvious solution is to simply increment a counter every frame, and when it hits X seconds, do the thing:
<pre class="EnlighterJSRAW" data-enlighter-theme="enlighter">// assuming 60fps
int frameCount;

function update() { 
    frameCount++;
    checkTimer(); 
}

function checkTimer() {
    if (frameCount &gt;= 600) // 60fps * 10 sec = 600 frames
        // DO THE THING
}</pre>
There's an issue here, though: not everyone's monitor refreshes at 60fps. Some people refresh faster (gamers often have 144Hz monitors); folks on crappy PCs will refresh slower. A person's hardware should not directly affect how the game runs.

So we need a timer. And to write a timer in Phaser, you need to use <em>callbacks</em>.

<strong>Problem</strong>: I had no idea what a callback was.

<strong>Solution:</strong> I forced myself to learn about them while super sleep deprived.

A callback, I now know, is just a function passed to another function as an argument. The first function runs the second function as part of its routine. Which is perfect, because we can set rules on if/when the second function executes.

And, as it turned out, Phaser has built-in support for managing game time. So creating a timer was as simple as launching the level with a function that would callback a function every second:
<pre class="EnlighterJSRAW" data-enlighter-language="js" data-enlighter-theme="enlighter">function create() {    
    // ...

    var timedEvent = this.time.addEvent({
      delay: 1000, // delay each event 1000 ms (1 second)
      callback: onEvent, // run onEvent() when executing callback
      callbackScope: this,
      loop: true // repeat forever
    });
}

function onEvent() {
  timer -= 1; // subtract 1 from timer
  UI.time = timer; // update UI
  if (timer &lt;= 0) {
    world.newHero(); // create new adventurer
    timer = world.heroTime; // reset timer
  }
}</pre>
And that was it. Callbacks!

In terms of return, callbacks have got to be one of the most useful tools I picked up at the GGJ. I've since implemented callbacks in a number of places in my personal video game project, and they solved a lot of issues I was trying to resolve.

<h3>Issue #3: How do you actually show the UI?</h3>

The next thing to do was to actually show the UI. How to do so was not readily apparent to me. I floundered around for a little bit in the Phaser documentation and on various forums before I discovered that Phaser allows you to overlay a <code>&lt;div&gt;</code> element and edit it using the DOM manipulation techniques jQuery provides. It took me a little bit before I got the DOM tools set up and figured out how to anchor element coordinates... but then there was hope! I had a box in which I could put my UI.

There was just one problem. <span name="no-jquery">I don't actually know how to use jQuery.</span>

<aside name="no-jquery">Still don't.</aside>

Upon realizing this fact, a good 2-3 hours of despair set in. It was also right around the time Rob had hit a wall on getting the doors to work properly, and it seemed, with less than sixteen hours to go, we were not going to have a finished game.

I poured over the Phaser docs, forum posts, StackOverflow, looking for something to spark understanding or an answer. But then, finally, after fourteen hours of solid coding, I had that little switch flip, and I understood how to show and edit text and sprites.

I got the bar working, and showing, and finally relaxed... only to panic when it disappeared and no one could bring it back. It was a puzzle we did not solve in time, forcing Rob to use an older UI build where some of the sprite textures were broken in order for us to have a working game. 

The issue? I had zoomed the camera in to improve the feel of the game... which zoomed it in past the UI. 

<div class="wp-block-image"><figure class="aligncenter size-large is-resized"><img src="https://cdn.grahamewatt.com/wp-content/uploads/2020/02/09150152/3a116884945f870924f1ffd3f36fc0151.png" alt="" class="wp-image-405" width="204" height="240"/></figure></div>

<h2>Wrapping Up</h2>

We submitted our game on Sunday. Ryan whipped up a banner and a name for our project, <strong>Tux Repair: Dungeon Cleanup,</strong> and demoed it to the rest of the DePaul jammers. The demo went well (minus some broken UI sprites), and since we were first we got it out of the way quickly, so we got to relax and watch the other games come in. They were all extremely creative and there were some unique takes on the "Repair" theme. Games ranged from restocking Costco to a cowboy duel on the moon.

The winner at DePaul was <a href="https://globalgamejam.org/2020/games/tomar-love-angel-7">Tomar the Love Angel</a>, a Metroidvania where you play an angel trying to repair a broken heart (from the inside). You can download the game (and all the other games) from the <a href="https://globalgamejam.org/2020/jam-sites/depaul-university/games">DePaul GGJ Games Page</a>. And you can play a slightly modified version of our game at <a href="https://grahamewatt.com/tux-repair/">grahamewatt.com/tux-repair</a>

Enjoy!