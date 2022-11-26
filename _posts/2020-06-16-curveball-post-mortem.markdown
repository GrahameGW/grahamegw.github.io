---
layout: post
title:  "Post-mortem: Curveball"
date:   2020-06-16 10:59 -0700
tags:   [Game Development, Projects]
---

I spent a couple of days rebuilding the classic flash game <a href="http://curveball-game.com">Curveball</a> in Unity. You can play the <a href="https://grahamewatt.com/games/corvebawl/">game</a> in the <a href="https://grahamewatt.com/games/">Games</a> section of my website. As always, I put together the following collection of thoughts lessons learned from the development process.

<h3>Architecture</h3>

Corvebawl is a simple game and has a simple code base as a result. A <code>Game</code> manager controls the game state, a <code>UI</code> manager controls the UI (menus, volume, score), the players each extend a <code>Paddle</code> class with the <code>PlayerPaddle</code> containing input logic and the <code>PaddleAI</code> containing AI logic. The ball itself contains the most complicated series of scripting: it has several functions used to handle how it behaves when hit by each paddle, how spin and curve is calculated, and path tracing used by the AI paddle to predict where it will end up. A few other special effects scripts round out the code base.

None of this required anything particularly complex to implement. In fact, my biggest mistake in programming was likely overbuilding things to start with. I had barely set up the game arena in the Unity editor before I was creating classes for every single object in the scene. I did manage to dial a chunk of it back, but my code is still somewhat overbuilt for what it needed to be. I wrote several classes that I ultimately ended up deleting, as they had no real purpose. 

<strong>Lesson:</strong> Don't build things until you need them. Keep it simple and clean.

<h3>AI Implementation</h3>

Perhaps the biggest challenge I had in programming was creating a competent AI. Initially, my plan was to implement a solution I had found on <a href="https://gamedev.stackexchange.com/a/57397">Stack Exchange</a>:

<blockquote class="wp-block-quote"><strong>Invisible Ball AI</strong><em>AI Setup:</em> When the ball reflects off your paddle, you know where it is and how fast it is going. Spawn an invisible ball at that point but at a greater speed. It will wind up where the visible ball is going. Each frame, have the AI move towards the location of the invisible ball. Stop the invisible ball once it reaches the AI's side, so it is where the AI should move its paddle. 

<em>Results: </em>The AI looks like it's trying to predict the path of the ball. Say the player has reflected the ball at a steep angle so that it will bounce off a wall. The AI will track the ball down a little ways, and then—being slower than the ball—will fail to track it back up fast enough. You have tricked the AI, and it looks fairly logical from a human point of view. You can see the computer trying to predict where the ball will go, and then it moves—oh, it missed, it was too slow, and you have won a point. 

This is significantly better than inserting randomness, since it makes the AI look relatively intelligent. A worthy opponent. It also lets the AI play by the exact same rules as the human, which looks better to the player and makes your job easier.</blockquote>

It took me a little bit, but I implemented this without too much difficulty... and it didn't work. The AI was good for a point or two, but then would seem to completely fly off the rails. What was going on?

The solution I was attempting to use is great for 2D pong. It is, in effect, a form of raytracing with a ray that isn't instantaneous. It is not great for pong with spin and curve, since increasing the speed of the ball increases the distance it moves in each frame, which requires adjusting all of the other variables in the curve, which means essentially creating a new position function on the fly that matches the standard function.

It was a mess, and so after I was unable to wrap my head around the required <span name="calculus">multivariable calculus,</span> I implemented the current solution. The AI now ignores spin entirely, and draws a path from the ball to the back wall, bouncing it off the sides as appropriate. It then moves towards the XY coordinates of that spot. The AI does not have perfect predictive power, but it's actually a good thing: it feels flawed, which is appealing to the player.

<aside name="calculus">LPT: If multivariable calculus shows up in your video game, you're doing it wrong</aside>

To improve the realism, I limited the AI to only be able to count a maximum of two bounces, which causes it to go the wrong way as the ball ricochets around the arena. Looks very human, and provides a solid challenge.

<strong>Lesson:</strong> In game dev, "good-enough" simple solutions are often better than complicated "perfect" ones

<h3>Input Management</h3>

Normally, input is not an issue for me. It was one of the first things I learned how to do, and I'm comfortable using the Unity Input Manager to control keybindings, and even allow the user to program their own bindings. For a game like Corvebawl, where it was only ever going to go on the internet, I could have even hard-coded my input controls.

But then the shiny new <a href="https://blogs.unity3d.com/2019/10/14/introducing-the-new-input-system/">Input System</a> caught my eye, and I thought I would make the switch. After all, newer is better right?

Wrong. The Input System is definitely more advanced, and I can see where the flexibility would be an advantage. Unfortunately, it meant learning a whole new system, one that is by all accounts not quite finished. I spent a lot more time than was necessary trying to figure out how to make the new system do what I wanted it to do, things that normally would have taken a few seconds for me to code.

<strong>Lesson:</strong> Stick with what you know. Newer is not always better.

<h3>Project Scope</h3>

I think the biggest challenge in any creative exercise is setting boundaries and a defined target and then staying on the path. Doing so flies in the face of our instincts and requires delaying gratification. It feels so satisfying in the moment to imagine complicated structures, elegant flows, worlds that seem so perfect in our head, and it sucks when imagination hits the brutal reality of the real world.

I had similar issues sticking to scope with this game. Even a game as simple as pong gets the juices flowing. I wanted first to extend it into a VR tennis-type game, then I wanted to have power-ups and spin options, then I wanted to implement a zillion game modes... all of which I still can do in the future. But limiting my scope to one game mode (endless pong w/ difficulty settings) allowed me to focus, and wrestle with the challenges I was avoiding in UI and shader development.

It's the question of making the build process feel a bit more like work and less like fun in exchange for having a final product you can be proud of.

<strong>Lesson</strong>: Set a scope, ideally up front, and don't be distracted by all the crazy ideas the build process generates—they'll still be there for the next one.
