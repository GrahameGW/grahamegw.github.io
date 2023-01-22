---
layout: post
title:  "Human Readable Format Kata"
date:   2020-03-03 14:53 -0700
tags:   C# Puzzles
---

I've been learning C# for close to a year now. I've pursued several different avenues, all of which rely on free resources on the internet. One of my favorite training resources is <a href="http://www.codewars.com">CodeWars</a>, a community training site run by <a href="https://www.qualified.io/">Qualified</a>. Qualified provides coding tests and challenges for firms looking to hire programmers. CodeWars is a community platform they provide to help develop those tests, and is free to join. Beginners start with the easiest problems, or "kata," and work their way up the ranks to tougher and tougher problems.

I've been doing CodeWars on and off for a while now, and it's helped me a lot in improving my programming skills—though at a much more fundamental level than working directly in Unity or on an established project has. I've gotten further up into the ranks, and I plan on sharing my solutions and critiques more often as I go to help solidify my takeaways.

You can check out a previous kata I did: <a href="https://grahamewatt.com/tortoise-race-kata/">Tortoise Race Kata</a>.

<h2>Problem:</h2>

Your task in order to complete this Kata is to write a function which formats a duration, given as a number of seconds, in a human-friendly way.

The function must accept a non-negative integer. If it is zero, it just returns&nbsp;<code>"now"</code>. Otherwise, the duration is expressed as a combination of&nbsp;<code>years</code>,&nbsp;<code>days</code>,&nbsp;<code>hours</code>,&nbsp;<code>minutes</code>&nbsp;and&nbsp;<code>seconds</code>.

It is much easier to understand with an example:
<pre><code>formatDuration (62)    // returns "1 minute and 2 seconds"
formatDuration (3662)  // returns "1 hour, 1 minute and 2 seconds"</code></pre>

For the purpose of this Kata, a year is 365 days and a day is 24 hours.

<h2>My answer:</h2>
<pre><code>using System.Linq;

public class HumanTimeFormat
{
    public static string formatDuration(int seconds)
    {
        if (seconds == 0)
        {
            return "now";
        }

        int[] time = new int[5];
        time[0] = seconds / 31536000;
        seconds -= time[0] * 31536000;
        time[1] = seconds / 86400;
        seconds -= time[1] * 86400;
        time[2] = seconds / 3600;
        seconds -= time[2] * 3600;
        time[3] = seconds / 60;
        seconds -= time[3] * 60;
        time[4] = seconds;
        
        string concat = "";
        
        int fields = time.Where(w =&gt; w &gt; 0).Count();
        
        for (int i = 0; i &lt; time.Length; i++) {
            if (time[i] &gt; 0) {
                concat = concat + LabelField(i, time[i], fields);
                fields--;
            }
        }
        
        return concat;   
    }
    
    public static string LabelField(int index, int val, int fields) 
    {
        string str = "";

        switch (index) 
        {
            case 0:
                str += val == 1 ? "1 year" : val.ToString() + " years";
                break;
            case 1:
                str += val == 1 ? "1 day" : val.ToString() + " days";
                break;
            case 2:
                str += val == 1 ? "1 hour" : val.ToString() + " hours";
                break;
            case 3:
                str += val == 1 ? "1 minute" : val.ToString() + " minutes";
                break;
            case 4:
                str += val == 1 ? "1 second" : val.ToString() + " seconds";
                break;
        }
        
        if (fields &gt;= 3) 
            return str + ", ";
        else if (fields == 2)
            return str + " and ";
        else return str;
    }
}</code></pre>

My answer is orderly and readable, but is somewhat inelegant in that it uses two functions and a bunch of extra switch statements. I also use the <code>ToString()</code> function unnecessarily when concatenating my strings (integers will concatenate without any issue, and it's more readable), and rely on LINQ to figure out how to function my text builder:

<ol><li>I parse the seconds out into years/days/hours/minutes/seconds and somewhat inelegantly subtract the difference vs. using a modulo. Each of these fields are put into an array, <code>time</code>.</li><li>I use LINQ to figure out how many different fields will be needed to express the answer, and store it as an integer <code>fields</code>. </li><li>I loop through the array, concatenating any non-zero values. I also add the correct label using my <code>LabelField()</code> function and concatenating to the existing string.  <code>LabelField()</code> takes the current value, its index, and the number of fields to process. Using that information, it figures out whether the label should be plural, and whether it should be followed by a comma, "and," or nothing. The  <code>fields</code> value is decreased before the end of the loop to avoid adding the wrong suffix later.</li></ol>

<h2>Preferred Solution</h2>

I actually quite like the preferred solution. It does a number of things well, and remains elegant and easy to read. The concept here is quite simple:

<ol><li>It creates two arrays, one <code>int[]</code> with the time divisions, and one <code>string[]</code> with the base labels. Crucially, they use multiplications of each time type instead of googling the number of seconds in a year (3,1536,000, if you're curious), which helps readability.</li><li>They loop through the <code>divArray</code>, testing to see if there are enough seconds to warrant the division. If there are, they overwrite the remaining <code>sec</code> with the remainder (using a modulo).</li><li>Next, they check to see if anything has been added to the output string already. If there has, they run a check to see if this is to be the last division by seeing how many <code>sec</code> remain, and add the comma or "and" <em>before</em> appending the new value.</li><li>Finally, they add the correct label, and check to see if it needs to be pluralized. Since the labels are also in an array, it's as easy as calling the correct index and appending an "s" (or not).</li></ol>

<pre><code>public class HumanTimeFormat
{
    public static string formatDuration(int seconds){
        string s = "";
        int sec = seconds;
        int[] divArr = { 60 * 60 * 24 * 365, 60 * 60 * 24, 60 * 60, 60, 1 };
        string[] nameArr = {"year","day","hour","minute","second"};

        if (seconds == 0)
        {
            s = "now";
        }

        for (int i = 0; i&lt; divArr.Length; i++)
        {
            int k = sec / divArr[i];
            sec = sec % divArr[i];
            if (k != 0)
            {
                string pref = "";
                if (s != "")
                {
                    if (sec == 0)
                    {
                        pref = " and ";
                    }
                    else
                    {
                        pref = ", ";
                    }
                }
                s = s + pref + k.ToString() + " " + nameArr[i];
                s += k &gt; 1 ? "s" : "";
            }
        }
        return s;
    }
}
</code></pre>
