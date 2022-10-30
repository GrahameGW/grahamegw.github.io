---
layout: post
title:  "The Plan | Building a Free Website (LEMP on AWS) | Part 1"
date:   2019-11-12 21:10 -0700
tags:   Projects Tech
---
<p>I have a website! And not just any website. One with my name on it. One where I totally unnecessarily configured every square inch of it. One that is totally overkill for what it's actually being used for. But it uses entirely <span name="almost-free">free</span> infrastructure, thanks to the magic of AWS free tier infrastructure. Will it be free forever? No. But I currently save $9-10/month on hosting costs, and learned a bunch of cool new skills in the process.</p>

<aside name="almost-free" style="top:265px"><p>Almost. Occasionally there's about $1/month in overages, and the <a href="https://grahamewatt.com">grahamewatt.com</a> domain cost $12 when I originally purchased it.</p></aside> 

<p>In this series, I'm going to cover how to set up your own "free" website on AWS. We'll get a site set up exactly as this one is. <a href="https://grahamewatt.com">grahamewatt.com</a> runs using LEMP infrastructure (<strong>L</strong>inux, <span name="e-for-engine"><strong>N</strong>GINX,</span> <strong>M</strong>ySQL, <strong>P</strong>HP) on EC2, s3, and RDS, using CloudFront for its CDN and Wordpress for its CMS.</p>
<aside name="e-for-engine" style="top:396px">It's "E" for "eNGINe - X".</aside>

<p><a href="https://grahamewatt.com/building-a-free-website-lemp-on-aws-part-2-setting-up-an-ec2-instance/">Part 2</a> | <a href="https://grahamewatt.com/building-a-free-website-lemp-on-aws-part-3-nginx/">Part 3</a> | <a href="http://part 4" data-wplink-url-error="true">Part 4</a> | <a href="https://grahamewatt.com/building-a-free-website-lemp-on-aws-part-5-wordpress/">Part 5</a></p>
<h2>Getting Started</h2>


<p>To build a similar site, you will need the following:</p>

<ul><li>AWS Account (sign up for free at aws.amazon.com)</li><li>A domain <ul><li>I purchased mine from Google Domains, but AWS also resells domains (which will allow you to save yourself a little bit of time editing nameservers). If you want a vanity domain (.blog, .tv, .fm, etc.) you may have to check a few different registrars to figure out who sells those domains. </li></ul></li><li>SSH client <ul><li>I use <a href="https://www.putty.org/">PuTTY</a> but anything will work.</li></ul></li><li>FTP client<ul><li>I use <a href="https://filezilla-project.org/">FileZilla</a>. Use whatever you want.</li></ul></li><li>Patience<ul><li>In my experience, it is a rare tutorial that works flawlessly end-to-end first go. And even when they do, it is far too easy to accidentally misread or skip a step, and then be very confused. Networking is also just...frustrating sometimes, so be patient and you will get there. I believe in you.</li></ul></li></ul>

<p>Once you've got all your tools, it's time to dive in.</p>

<h2>System Overview</h2>

<figure>
    <img src="https://cdn.grahamewatt.com/wp-content/uploads/2019/11/12120608/image1-1024x1024.png" /><figcaption>General infrastructure diagram</figcaption>
</figure>

<p>This is what we're building. It looks fairly messy (and the stack isn't exactly correct) but it's actually not too bad. Here's what's happening:</p>

<ul><li><strong>Route 53</strong><ul><li>DNS management. Tells the internet where to go when someone types in "grahamewatt.com" into their browser bar.</li></ul></li><li><strong>EC2</strong><ul><li>A computer. This one happens to be running Ubuntu, which is a Linux operating system. You can get them to run Windows too. AWS never turns them off and they have zillions of them to choose from, including the t2.micro instance I am using for this site. We're using it as a server, which will serve our website to the internet. Since it hosts our website, it is our <span name="keep-up">web host.</span></li></ul></li>
<aside name="keep-up">Try to keep up</aside>

<li><strong>RDS</strong><ul><li><strong>R</strong>elational <strong>D</strong>atabase <strong>S</strong>ervice. Runs the database that makes the Wordpress CMS work. We're using MySQL (the "M" in LEMP).</li></ul></li>
<li><strong>S3</strong><ul>
<li>Folders of files. S3 is <span name="differences">basically the same</span> as the file explorer on your computer, with folder hierarchies and sorting. We're passing off all the images and media to be stored in a separate system for two reasons: 1) the EC2 instance we're using doesn't exactly have a massive amount of storage, and 2) using S3 means we can use a CDN, resulting in super fast image load speeds and less work for the EC2 instance to do.</li></ul></li>

<aside name="differences">There are some differences in how things work under the hood, but they aren't going to matter for this series</aside>

<li><strong>CloudFront</strong><ul><li>A content delivery network (<strong>CDN</strong>). CDN's are networks of servers that cache websites and images around the world, so that users in Tokyo only need to connect to a computer in Seoul to get your cat GIFs, instead of connecting to Chicago.</li></ul></li></ul>

<p>That's the macro-level stuff on AWS. All of it is either free-tier eligible or just free forever (Route 53).  You can get by without S3 and CloudFront in this assembly, but they're not hard to get going.  There are also a couple of pieces of software running on our EC2 instance:</p>

<ul><li><strong>NGNIX</strong><ul><li>NGNIX is one of a couple popular web server technologies available out there. Perhaps slightly less common for a basic website than Apache server, I just happen to be more familiar with it due to some work I did using the video streaming plugin <a href="https://github.com/arut/nginx-rtmp-module">NGINX-RTMP</a> so it's my default server of choice. </li></ul></li><li><strong>Wordpress</strong><ul><li>Our content management system (CMS). Far and away the most popular choice of CMS for websites great and small. Wordpress makes it easy to create or modify custom themes, build new web pages, start a blog, the works. </li></ul></li><li><strong>Certbot</strong> (not pictured)<ul><li>Free, auto-renewing SSL certificates. SSL is the "S" at the end of HTTPS, and makes that little padlock appear in your address bar on any site properly maintained. There is literally no reason in this day and age to not have an HTTPS connection when <span name="https-everywhere">browsing the web.</span></li></ul></li>
<aside name="https-everywhere">The browser plugin <a href="https://www.eff.org/https-everywhere">HTTPS Everywhere</a> (eff.org/https-everywhere) is also something I highly recommend to help improve your web security.</aside>

<li><strong>TiddlyWiki</strong> (&amp; NodeJS)<ul><li>Not relevant for this series, but it's a cool piece of software that does well as a wiki or personal notes system. I included it in the diagram to show an example of how port forwarding works and also to give it a plug because I really like it. Check it out at <a href="https://tiddlywiki.com/">tiddlywiki.com</a></li></ul></li></ul>

<p>There are also a bunch of default software packages that come preinstalled on Ubuntu, Again, all of these things are free and open source, so no need to bust out the credit card. </p>

<h2>The Road Ahead</h2>

<p><a href="https://grahamewatt.com/building-a-free-website-lemp-on-aws-part-2-setting-up-an-ec2-instance/">Part 2</a> of this series covers setting up an EC2 instance and connecting to it. <a href="https://grahamewatt.com/building-a-free-website-lemp-on-aws-part-3-nginx/">Part 3</a> will cover installing NGINX, and configuring your DNS to serve your domain to your web host. Part four will cover setting up WordPress, and launching your website. Part five will cover the finishing flourishes: setting up the CDN and s3 offload. </p>



<p>As someone who does not have a formal background in computer science, I intend to keep the tutorial focused on the core contents and the logic behind each step. I always prefer to understand the "why" when I am doing things so that I have a solid grasp of the core concepts and can then leap off to explore the next thing in the future.</p>



<p>If you have questions, I am happy to answer them in the comments below!</p>



<p>Next up is <a href="https://grahamewatt.com/building-a-free-website-lemp-on-aws-part-2-setting-up-an-ec2-instance/">Part 2: Setting up an EC2 Instance</a></p>
