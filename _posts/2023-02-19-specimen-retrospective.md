---
layout: post
title:  "Specimen Devlog"
date:   2023-02-19 13:05 -0800
tags:   Projects GameDev
---

Last Tuesday I uploaded the v1.0 release of our game *[Specimen](https://metapilgrim.itch.io/specimen)*, a top-down RPG in the style and vein of [Diablo](https://diablo2.blizzard.com/en-us/). *Specimen* was the culmination of just over seven months of work with [Neil Quillen](http://www.neilquillen.com/) and [Zane Heer](https://www.artstation.com/zanheer/profile). Check it out on my [itch page](https://metapilgrim.itch.io) along with the [rest of my games](https://grahamewatt.com/games). It takes about ~45 minutes to play all the way through. We're pumped about the final result and I hope you enjoy it!  

<iframe width="560" height="315" src="https://www.youtube.com/embed/XZYR8pxTXVU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Conception

Neil and I got the project started fairly soon after wrapping up our GMTK 2023 entry, [Casting Lots](https://r0nnie.itch.io/castinglots). I had finally started to settle into our new life in Seattle, my work-life balance was pretty solid, and I was looking for something a bit more involved than you normally get out of a game jam experience. It's one thing to hack a game together in a mad scramble for the finish, another thing entirely to have to come up with a project plan, iterate, and develop in a more "professional" capacity. I wanted to know what that process was like, where the pitfalls lay, and understand what parts of my <span name="just-software">tech background actually apply</span> to game dev.

<aside name="just-software">It is just software development after all</aside>

We agreed on a time frame of 4-6 months, working part time. Evenings here, weekends there, that sort of thing. Neil, a professional composer, was going to do absolutely <span name="no-composition">no composition</span> for the game and instead take on the game design role. I wasn't really interested in doing much design; I was more interested in better understanding the operation and production process, as well as getting to program something a little bit more sophisticated than the bodged-together products I'd done in the past.

<aside name="no-composition">Well, not *zero* composition, but it certainly wasn't going to be his primary focus&mdash;that would be too much like work</aside>

We roped in Zane, who we'd worked with on [Some of Our Parts](https://metapilgrim.itch.io/some-of-your-parts) to do art. Between us, that was a full squad with all the major disciplines more-or-less covered, and so in early August 2022 we began to brainstorm.

## Ideation

Because it was a fully-volunteer project we hadn't set any constraints on the type of game we were going to make. We didn't really have many scope constraints either beyond "what do we think we can make in six months?" That was an important constraint, but we didn't really tie much to it beyond evaluating the various pitches with the gut feeling of "what feels big." And since we were all trying to push ourselves to do new things and explore new areas, none of us had particularly well-calibrated sensors to judge things with.

We spent about a month and a half meeting about ideas, sketching out mechanics and concept art. We had a few really interesting ideas come out of the whole process&mdash;perhaps they'll resurface in future games:

- *Merchant's Journey*, an upbeat deck-building adventure based around negotiations and bargaining,
- *Runebearers*, a JRPG-style adventure where the characters all manifest magic runes that change depending on player decisions,
- *Empty Planet*, an open-world planet exploration game with *Myst*-style puzzles
- *Fauna,* where *Princess Mononoke* meets the evolution-mechanics of *Spore*

<figure>
    <img src="/img/fauna2.jpg" class="faint-border"/><figcaption>Concept art for Fauna<br>Artist: Zane Heer</figcaption>
</figure>

Ultimately, we went with what would become *[Specimen](https://metapilgrim.itch.io/specimen)*, a *Diablo*-inspired adventure game about a mad scientist exploring a scary forest with a bunch of freaky minions. The player would train their minions to fight with the monsters of the forest and have some limited control by issuing rally orders and throwing bait. They could power up their minions with the biomass left by slain monsters and by mysterious mutation powerups which would give their minions whole new abilities. Think *Pokemon* played by a necromancer.

We also made the decision to go 3D instead of 2D, which was definitely going to push all of us. I hadn't done a 3D game since I made *[Corvebawl](https://grahamewatt.com/games/corvebawl)*, and Zane was signing up to <span name="bold-move">dive headfirst</span> into the world of 3D modelling.

<aside name="bold-move">Bold. We like bold.</aside>

## Development

*Specimen* was built in [Unity](https://unity.com), as it was the engine the team had the <span name="familiarity">most familiarity with.</span> We took a top-down approach in keeping with the early '00s aesthetic. Things actually went pretty smoothly on the development front, due to a strategy of "delegating responsibility." Wearing my programming hat, I could focus on building features needed for the game and make them modular and easy to tweak. Then I could hand them off to Neil and move onto the next thing, while he worked on actually making use of the feature in game. It was an "a-ha" moment for me to understand that the role of the programmer in game dev is much more about building the infrastructure that can be used to put together a game than actually building the game. A well-programmed, modular set of features can transfer easily between games; spending the time to be intentional doesn't just benefit the current project but can benefit projects down the line as well.

![Specimen screenshot](/img/specimen-topdown.png)

<aside name="familiarity">My only one for 3D and Neil's only one period</aside>

It was also just pleasant to not have to worry about design decisions for a change. I wear the product manager hat fairly frequently during the day, and it comes with a not-insignificant amount of cognitive load. Being able to sit down with the project and just work through a list of discrete problems was a breath of fresh air. In many ways, it was similar to [NaNoWriMo](https://nanowrimo.org); focus on the words immediately in front of you and don't get bogged down with wondering about the correctness of decisions.

Delegation to design and a lot of the flexibility we were able to take advantage of boiled down to an early architecture decision: inverting control of behaviors to `ScriptableObject` instances. By defining abstract classes that inherited from `ScriptableObject` we <span name="interfaces">defined interfaces</span> for those behavior types. We would give game entities a component took an array of implementing behaviors, and then could just run through the list and execute code whenever the object was triggered in game.

<aside name="interfaces">There were some differences of course, most notably that they didn't use the actual C# interface feature&mdash;which also meant that composition was a bit more awkward. But for behavior delegation where you were just moving 1-2 functions into code it worked like a charm.</aside>

```csharp
public abstract class DamageBehavior : ScriptableObject 
{
    public abstract void Damage(DamageableEntity entity, DamageSource source);
}

public class MutateOnFireDamageBehavior : DamageBehavior 
{
    [Range(0f, 1f)]
    [SerializeField] float mutateChance;
    [SerializeField] MutationList mutations
    
    public override void Damage(DamageableEntity entity, DamageSource source) 
    {
        if (source.DamageType != DamageType.Fire) { return; }

        if (Random.Range(0f, 1f) < mutateChance) 
        {
            var mutator = entity.GetComponent<MutatableEntity>();
            if (mutator != null) 
            {
                mutator.Mutate(mutations.GetRandom());
            }
        }
    }
}

public class DamageableEntity : Monobehaviour 
{
    [SerializeField] List<DamageBehavior> behaviors;

    public void Damage(DamageSource source) 
    {
        foreach (var behavior in behaviors) 
        {
            behavior.Damage(this, source);
        }
    }
}
```

This sort of structure meant that Neil could build up unique powerups and events by simply assembling lists of `ScriptableObjects`, and didn't need to worry about how everything coupled. It also made debugging a lot easier&mdash;just had to look at the given behavior to see if was doing what we expected.

Of course, there were plenty of other bugs, including a few highly pernicious ones we were troubleshooting right up until the last second. A big source of issues for us came from over-engineering our AI system. We wanted to have it also be modular and designer-friendly, but ended up using behavior trees that were totally designed in code, making debugging a lot trickier than it needed to be. Combined with the fact we changed the game from a totally flat world to having slopes and other 3D elements, and I suddenly found myself with all sorts of mysterious bugs with the AI that didn't make sense based on the code. Turns out, they all were rooted in the initial flat-world assumption. We had built our models with their coordinates at their base, as though it was a board game, but the logic of the 3D world assumed that the coordinates were at a model's center. So the AI displayed all sorts of kooky behavior simply because it was looking in the wrong direction for other entities. Easy enough to fix, but incredibly tricky to diagnose.

The most frustrating bug was one that seemed totally random. Every so often, the player would open up one of the menus that listed all of their monsters, only to have the entries show up several times. We worked on that one for weeks to no avail. Part of what was so mystifying was that the UI was not coupled to the game, but would just read the current data and display it. We fixed the most obvious cases, but it would still randomly occur. So we launched, and chalked it up to a mystery that hopefully people wouldn't run across...

...until Neil figured it out! There's an interactable that takes control of the player and minions to help them jump between points. When it returned control, it was <span name="separate">reinitializing the minions...</span>which would add themselves again to the list of minions in the game. So there would be duplicate entries which the UI would then cheerfully display.

<aside name="separate">A perfect example of why a method should do one thing and one thing well&mdash;big Initialize() functions that do 50 different things can haunt you in all sorts of ways</aside>

## Thoughts on Process

While the list of new insight and bits of wisdom I gained from this project can go for miles, I think the most visceral understanding I gained involved actually managing a longer-term project. Or, in our case, the lack of process and management and how exactly it affected things.

We had initially set up an issue-based system: a board, with cards and status for those cards. We weren't exactly following an agile paradigm due to the highly asynchronous way we were working, but our structure was similar enough. Every Monday evening we met to discuss process, demo new features and content, and figure out the priorities for the upcoming week. That part of our workflow was completely invaluable; everyone had accountability to do what they said they were going to do, everyone could see progress and understand the current problems, and there was always a forum to discuss the project.

Where we fell flat was in our tracking and management systems. We operated pretty much exclusively out of a working Google sheet for tasks, concepts, brainstorming, etc., which was fine when we were doing greenfield development but fell down hard when we started polishing and tackling bugs. Because the format was basically "jot down notes and hope the other person understands them," there was a huge amount of waste in the back-and-forth trying to understand what was actually an issue, how to replicate the issue, and who was actually responsible for fixing it. This (lack of) process made the already aggravating bugs listed above far more painful to sort out.

<figure>
    <img src="/img/bad-project-management.png" class="faint-border"/><figcaption>Maybe not the best way to do things...</figcaption>
</figure>

What I found to be particularly interesting was how the process problems didn't show themselves until we had a significant amount of work and complexity to handle. It literally seemed like a switch was flipped. One day we were cruising through the game, things coming together like magic; then the next day came and everything was pure frustration. We hit that <span name="gdc-talk">critical mass of waste</span> and suddenly we were spending more time fighting our project than improving it.

<aside name="gdc-talk">There's a <a href="https://www.youtube.com/watch?v=t9HRzE7_2Xc">great talk</a> that was given by Seth Coster of Butterscotch Shenanigans at GDC in 2021 I always reference when discussing process and DevOps. Definitely give it a watch.</aside>

Being more diligent about the process up front would have also helped in the spans where the project had stopped being fun and started feeling more like a chore. It's a lesson I've learned in the past from NaNoWriMo, but having atomized tasks ("write 1600 words," "add a new collectable type") is a huge benefit when you're in the slog stage. You don't spend energy hemming and hawing over what to do next, you just do the next thing, and the thing after that. Setting up a system where you can "do the next right thing" and trust you'll eventually get there is a secret weapon to success.

Setting up such a system is particularly tricky because you don't see the benefits immediately&mdash;ideally you won't ever notice the system because it just works. In practice, work systems do make themselves felt as an additional annoyance, not a benefit. Particularly in small teams where you can get away with bad process (until you hit a critical mass of waste), tracking your tasks and taking time to build out backlogs seems like an onerous chore. Going into my next project I'll be thinking about ways to incentivize a system and stick to it. Making the delayed benefits clearer up front has real benefits that need to be felt, not just have lip service paid to them.

## Final Notes

*[Specimen](https://metapilgrim.itch.io/specimen)* is live now; it's a free download on itch.io along with [the rest of my games](https://grahamewatt.com/games). Pick it up, leave us a note on the game page if you enjoyed it or find any bugs, and have fun with it!
