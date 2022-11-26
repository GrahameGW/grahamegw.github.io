---
layout: post
title:  "Building a Free Website (LEMP on AWS) | Part 4 &ndash; Databases"
date:   2020-01-20 16:11 -0700
tags:   Projects Tech
---

<span style="font-style:italic">This article was previously titled "Part 4: MySQL, Amazon RDS, and PHP"</span>

AWS can be used for so many things. A person could spend a lifetime playing with all the different tools they make available to you in the cloud. But you ain't got time for that, so read on for part four of my series on setting up a website using only free infrastructure. We'll be getting a database set up to power the Wordpress CMS with, the final piece of groundwork necessary  to launch our site.

 <a href="https://grahamewatt.com/building-a-free-website-lemp-on-aws-part-1/">Part 1</a> | <a href="https://grahamewatt.com/building-a-free-website-lemp-on-aws-part-2-setting-up-an-ec2-instance/">Part 2</a> | <a href="https://grahamewatt.com/building-a-free-website-lemp-on-aws-part-3-nginx/">Part 3</a><a href="https://grahamewatt.com/building-a-free-website-lemp-on-aws-part-1/"> </a>| <a href="https://grahamewatt.com/building-a-free-website-lemp-on-aws-part-5-wordpress/">Part 5</a>

Last time, we installed NGINX, configured the DNS to use our domain name, and got a primer in how NGNIX manages websites and serves pages to visitors. We also got familiar with the command line, and computing without help from the windows and folders we're so familiar with. Doing so takes care of the 'L' and 'E' in 'LEMP', which means the 'M' is up next: MySQL on Amazon RDS.

<h2>Why do we need a database? (CMS Overview)</h2>

We discovered last time that we can directly edit and update web pages within NGINX, and serve them to our visitors, no database necessary. While editing things in nano/vim isn't exactly a quick process, it's not at all unreasonable to think we could manually code our web pages locally, and use an FTP client like <a href="https://filezilla-project.org/">FileZilla</a> or even good old <strong>secure copy </strong>to get them up to our web server. We could even install things like <a href="https://nodejs.org">NodeJS</a> or <a href="https://php.net">PHP</a> to give our site cool modern functionality and never go anywhere near a database. 

So what gives? Why set up a database?

The answer, in a nutshell, is <a href="https://wordpress.org">WordPress</a>. WordPress is a <strong>content management system</strong>, or CMS, and is by far the most popular one on the internet. True to their name, content management systems manage content: files, photos, web pages, videos, music, etc. Designing, launching, and maintaining a website is a LOT easier when using a good CMS, to the point where there are literally thousands of <span name="start-a-blog">tutorials on how to build a WordPress site</span> out there. WordPress has the added advantage of being highly customizable thanks to a wide universe of <a href="https://wordpress.org/plugins/">3rd-party plugins</a>, most of which are free.

<aside name="start-a-blog">It seems that every blog has at least one post on starting your own website, from <a href="https://pinchofyum.com/resources/how-to-start-a-food-blog">cooking</a> to <a href="https://www.mrmoneymustache.com/2013/01/17/how-to-start-a-blog/">personal finance</a> blogs.</aside>

Since WordPress will be managing our content, it needs somewhere to store it. Individual files (pictures, movies) <span name="storing-content">can be stored on the server</span> in the file structure, but posts and pages are a little tricker. WordPress uses PHP, and serves web pages based on matching rules in template files with the relevant information for that post or page. The template files get stored on the server, but the information goes in the database so it can be queried and delivered as fast as humanly possible.

<aside name="storing-content">Though we will be setting up AWS s3 to keep our server free of having to host those images in a later tutorial</aside>

This is <span name="not-a-primer">not a primer</span> on database administration, or even how databases work. And to be honest, it's completely irrelevant to what we're trying to do here. AWS's <strong>Relational Database Service</strong> (RDS) lets you set up all the config without writing a single line of SQL, and WordPress will configure the database for us. We just need to get everything wired up.

<aside name="not-a-primer">That would take way longer than a 4-5 part series and I'm definitely not qualified to give it anyway</aside>

<h2>Setting Up AWS RDS</h2>

Setting up a free RDS instance is actually one of the easiest things we're doing in this series. Navigate to the RDS service and press the big <strong>Create Database</strong> button on the dashboard to get started.

Choose <strong>Standard Create</strong>, <strong>MySQL</strong>, and <strong>Free Tier</strong> in the first three sections. The default version of MySQL is fine for our purposes (at the time of this writing it was 5.7.22). We will need to configure the database credentials in the settings menu, and double check our connectivity settings to make sure our EC2 instance can see our database.

Fill out the settings with a database name, and a username for the database administrator. I used "wpdatabase" and "dbadmin" for mine, but it can be anything you can remember. Fill and confirm a <a href="https://passwordsgenerator.net/">secure password</a>; MAKE SURE YOU WRITE IT DOWN. You'll only need to type it in once, so it's fine if its hypercomplicated.

Under config, review the default settings. If this is your first time with AWS, you should only have the default VPC available. <span name="too-advanced">If you've set up other VPCs</span> in past projects, make sure you're launching your database in the same VPC as your EC2 instance. Also make sure that it has the same security groups assigned as your EC2 instance.

<aside name="too-advanced">But if you're advanced enough to have multiple VPCs, why are you reading this series?</aside>

<blockquote class="wp-block-quote"> A <strong>virtual private cloud</strong> (VPC), is best thought of as a room in a house. Everyone in the room can see and speak with one another, but they cannot see and speak with folks in other rooms without opening windows and doors. In this analogy, our various instances will be able to see and speak with one another since they are part of the same VPC, but if we launched another EC2 instance in a different VPC, we would not be able to connect the instances without some extra networking work. The analogy breaks down somewhat when you start hosting VPCs within VPCs, but hopefully the main concept is clear. You gotta share a cloud with someone to talk to it.</blockquote>

I also give my database access to the same security groups as my EC2 instance so I don't have issues later because I forgot to poke holes in my security group. I think this is technically not best practice, but in reality if an attacker got this far we're completely pwned anyway, so it doesn't matter too much.

<div class="wp-block-image"><figure class="aligncenter size-large is-resized"><img src="https://cdn.grahamewatt.com/wp-content/uploads/2020/01/25123016/rds-security-config-817x1024.jpg" alt="" class="wp-image-296" width="570" height="714"/><figcaption>The goal. Make sure to also add your EC2 instance security group along with the default one.</figcaption></figure></div>

You can set some <strong>additional configuration</strong> preferences as suit you. I turned on <strong>error log</strong> and <strong>general log</strong>, left <strong>auto backup</strong> and <strong>auto minor version upgrade </strong>enabled, and turned on <strong>deletion protection</strong>. 

Also buried in the additional configuration preferences is the <strong>Initial database name</strong> field. You must set this! We can in theory do this later, but it's easier to do it now

Once you're all set, launch the database instance to finish up.

AWS will begin spinning up your shiny new database instance. Once the instance is running, it will automagically create an empty database we can connect to. It doesn't take AWS too long to set up, so while it does that, let's poke some more holes in our security group so that AWS isn't blocking the database and Wordpress from talking to each other.

Go back to the EC2 instance dashboard, and edit the security group assigned to your instance. We need to add an inbound rule for port 3306 (the MySQL port):

<ul><li>Type: MySQL/Aurora</li><li>Port: 3306</li><li>Source: The security group.</li></ul>

It's a little weird, but essentially your database sends traffic out into the VPC, and it is filtered by the security group before it reaches the EC2 instance. So we need to allow the traffic back in; hence our new rule.

<h2>Installing MySQL </h2>

We're going to run WordPress in our EC2 instance, so SSH back into your web server. Since we set up our database to run MySQL, we'll need to install the appropriate software on our web server so we can issue the database commands. It's one line:

<pre class="EnlighterJSRAW" data-enlighter-theme="enlighter">$ sudo apt install mysql-server</pre>

MySQL installed! On to the next thing!

Well, not really. The installation is up and active, but there are some security issues we should spend a moment fixing. Run the included security script:

<pre class="EnlighterJSRAW" data-enlighter-theme="enlighter">$ sudo mysql_secure_installation</pre>

Respond <strong>yes </strong>(<code>y</code>) to everything until presented with the password policy validation menu:

<pre class="EnlighterJSRAW" data-enlighter-theme="enlighter">There are three levels of password validation policy: 

LOW Length &gt;= 8 
MEDIUM Length &gt;= 8, numeric, mixed case, and special characters 
STRONG Length &gt;= 8, numeric, mixed case, special characters and dictionary file 

Please enter 0 = LOW, 1 = MEDIUM and 2 = STRONG: 1</pre>

If you entered a strong password earlier, you should be able to enter <strong>2</strong>. Otherwise, select whatever tier is appropriate. The script will ask you to set the password; go ahead and retype your database password. Continue spamming  <code>y</code> until the script completes.

<h2>Installing PHP &amp; Configuring NGNIX</h2>

One of the upsides of NGINX is the fact it comes completely stripped out, keeping it lightweight and free of bloat. In this case, it's also a minor downside--NGINX cannot understand PHP programs since it lacks a PHP processor. However, it's a simple enough install to get the necessary package, <code>php-fpm</code>. While we're at it, let's go ahead and add the PHP MySQL extension, <code>php-mysql</code>. We'll need it later.

<pre class="EnlighterJSRAW" data-enlighter-theme="enlighter">$ sudo apt install php-fpm php-mysql</pre>

And everything is installed! However, we still need to tell NGINX that it now has the ability to process PHP. So we're headed back to our handy-dandy config file:


<pre class="EnlighterJSRAW" data-enlighter-theme="enlighter">$ sudo nano /etc/nginx/sites-available/mywebsite.com</pre>

We need to make the following changes:

<ul><li>Uncomment the PHP sections, specifically the <code>location ~ \.php$</code> and <code>location ~ /\.ht</code> sections</li><li>Delete <code>listen [::]:80 default_server;</code> </li><li>Change the <code>server_name</code> to <code>mywebsite.com</code></li><li>Change the version of <code>fastcgi_pass</code> from <code>.../php7.0-fpm.sock</code> to <code>7.2</code></li><li>Add <code>index.php</code> to the list of indices</li></ul>

Our new configuration should look like this:

<pre class="EnlighterJSRAW" data-enlighter-theme="enlighter">server {
        listen 80 default_server;
        root /var/www/mywebsite.com;

        index index.html index.htm index.nginx-debian.html;

        server_name mywebsite.com;

        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                try_files $uri $uri/ =404;
        }

        location ~ \.php$ {
                include snippets/fastcgi-php.conf;
                fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
        }

        location ~ /\.ht {
                deny all;
        }

&nbsp;	access_log /var/www/mywebsite.com/logs/access.log;&nbsp;
        error_log /var/www/mywebsite.com/logs/error.log;
}
</pre>

Test for typos with <code>sudo nginx -t</code>, save, and reload nginx with <code>sudo service nginx reload</code>.

We can test that PHP was successfully stalled by creating a quick info page. Create a new file in your <code>/var/www/mywebsite.com</code> folder called <code>test.php</code> and put the following in it:

<pre class="EnlighterJSRAW" data-enlighter-theme="enlighter">&lt;?php
phpinfo();</pre>

Save the file and then navigate in your browser to <code>mywebsite.com/test.php</code>. If all is well, you should be greeted with the following info page:

<figure class="wp-block-image size-large is-resized"><img src="https://cdn.grahamewatt.com/wp-content/uploads/2020/01/25160404/php-splash-1024x451.jpg" alt="" class="wp-image-306" width="592" height="261"/></figure>

That's it! The LEMP has been launched! An open source miracle has occurred!

Well, sort of. But our infrastructure is now fully configured and ready for us to set up WordPress. In Part 5 we'll investigate just how to set up WordPress so it can use our networked RDS instance and our EC2 LEMP server, take care of security issues &amp; install SSL certificates, and set up a private CDN using AWS s3 and CloudFront.

<a href="https://grahamewatt.com/building-a-free-website-lemp-on-aws-part-5-wordpress/">Part 5: WordPress</a>