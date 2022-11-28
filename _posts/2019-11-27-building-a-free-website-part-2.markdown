---
layout: post
title:  "Building a Free Website (LEMP on AWS) | Part 2 &ndash; EC2 Instances"
date:   2019-11-27 12:50:03 -0700
tags:   Projects Tech
---

This tutorial is the second in my series on setting up a website using free infrastructure. In this section we'll cover booting up and connecting to your EC2 instance, configuring security groups, and some basic command line tools for folks who have never used the command line before.

[Part 1]({% post_url 2019-11-12-building-a-free-website-part-1 %}) | 
[Part 3]({% post_url 2019-12-28-building-a-free-website-part-3 %}) | 
[Part 4]({% post_url 2020-01-20-building-a-free-website-part-4 %}) | 
[Part 5]({% post_url 2020-03-21-building-a-free-website-part-5 %}) | 
[Epilogue]({% post_url 2020-10-25-building-a-free-website-epilogue %})

<h2>EC2 overview</h2>

EC2 stands for <strong>Elastic Cloud Compute</strong>, and is a service that provides "computers" over the internet. EC2 instances and their equivalents at Google and Azure are the backbone of the cloud revolution. Before cloud services, using web servers and infrastructure usually meant buying physical servers, or buying time from dedicated hosts. Now, we can rent computer time for pennies, configure it however we want from the comfort of  a home or office, and wire it up to all the other crazy features AWS has to offer.

EC2 instances are powerful tools, made more so by something AWS provides called an <strong>Elastic Load Balancer.</strong> As traffic grows, an ELB will split  it between duplicate instances to keep one from being overwhelmed. AWS will even let you script initialization of new instances so the service will maintain them as necessary. Pretty cool.

EC2 instances are run out of tremendously complex server farms scattered across the globe, but for the sake of what we're doing it's helpful to think about our instance as a single computer in a building somewhere. The computer never turns off, and has only the software <span name="no-norton">we decide we want</span> on it.

<aside name="no-norton">No Norton Antivirus or bloatware for us!</aside>

Our EC2 configuration will be fairly straightforward for this series; we aren't going to be adding some of those more advanced features, which are a) overkill, and b) cost money, thereby defeating the purpose of a series on free websites. But know that most SaaS platforms on the web use some combination of EC2 and ELBs for the majority of their horsepower.

<h2>Setting up an EC2 instance</h2>

Launching an EC2 instance is very straightforward. After logging into AWS, check your <span name="ideally-close">region</span> and navigate to the EC2 dashboard (you can search from the "Services" dropdown in the top menu bar). Select <strong>Instances</strong> from the left menu, and click the big blue <strong>Launch Instance</strong> button to start the EC2 launch wizard.

<aside name="ideally-close">Ideally you're as physically close to your main traffic as possible; more important though is that you're consistent as we'll be setting up our other services in later tutorials and we'll need to make sure they're all in the same building so they can easily connect.</aside>

The first decision to make is which image to select. An image is essentially a set of software and configuration files which represents the computer it was taken from--a snapshot of a computer in time. You can use these snapshots to set up other machines to be exactly the same as the original.

There are a number of free-tier eligible machines available; we want the one called <span name="ubuntu-version"><strong>Ubuntu Server 18.04 LTS.</strong></span> On the <strong>Instance Type </strong>page, select the <strong>t2.micro</strong>, the only instance available for free, and press the <strong>Review and Launch </strong>button. Review your image and instance type, and press the <strong>Launch </strong>button to get started.

<aside name="ubuntu-version">The version may be different</aside>

AWS will prompt you to select a key pair. We're going to create a new key pair; name your pair and press the <strong>Download</strong> button to save the private key.

<figure>
    <img src="https://cdn.grahamewatt.com/wp-content/uploads/2019/11/16110224/image-300x213.png" alt="Download Private Key">
</figure>

<strong>DO NOT LOSE YOUR PRIVATE KEY!</strong> Our private key file is essentially our password; we need it to log into our instance. Save it in a safe place; if you do lose it you'll lose access to your website infrastructure and will need to build everything over again.

Your instance will spend a few minutes booting up and configuring itself. You can watch it from the EC2 dashboard. When it's ready, you'll be able to get its IP address, which will allow you to see it from anywhere on the internet.

## Connecting to your EC2 instance

The next step is to connect to your new instance. I've always used PuTTY to do so, but with the recent Windows update that installs <a href="https://www.howtogeek.com/336775/how-to-enable-and-use-windows-10s-built-in-ssh-commands/">OpenSSH by default</a> you can also connect via the command line. We'll cover both in this section.

If you've already been through <a href="https://grahamewatt.com/building-a-free-website-lemp-on-aws-part-1/">Part One</a> and have downloaded the PuTTY client, go ahead and boot it up via the start menu.

<figure>
    <img src="https://cdn.grahamewatt.com/wp-content/uploads/2019/11/26135621/Annotation-2019-11-26-135557-300x273.jpg" class="faint-border"/>
    <figcaption>The PuTTY client</figcaption>
</figure>

There are a LOT of options and features in PuTTY, but we don't need the vast majority of them. All we need to do is provide a username, our EC2's IP address, and our private key, and we're good to go.

The username and IP address are easy. If you used the Ubuntu AMI, AWS defaults the username to "ubuntu". You can find the IP address in the EC2 instance dashboard, under the <strong>IPv4 Public IP </strong>heading. Both of these go into the <strong>Host Name</strong> field using the following format:

<em>username@IPaddress</em>

Which will look something like:

<em>ubuntu@4.52.32.101</em>

Lastly, we need to add our private key. We do that by going to the <strong>Auth </strong>tab in the Category menu (under Connection/SSH). The default settings can be left the same, but when we press the <strong>Browse</strong> button to add our key and navigate to the folder we stored it in, we find we can't actually use it. What gives?

It turns out AWS provides keys using the <em>.pem</em> format, but PuTTY only accepts the <em>.ppk</em> format. Luckily, PuTTY provides a tool as part of the installation process called PuTTYGen that will translate for us. Open it up, press the <strong>Load</strong> button to find &amp; convert your key, and then <strong>Save Private Key</strong> to save the new version. PuTTYGen will complain about a passphrase, which you can add or not as you prefer, and then save it.

<figure>
    <img src="https://cdn.grahamewatt.com/wp-content/uploads/2019/11/26141457/Annotation-2019-11-26-141229-300x67.png" alt="PuTTYGen">
</figure>

Back in PuTTY, add the new <em>.ppk</em> key and head back to the <strong>Session</strong> tab. You can save your login credentials by filling out the <strong>Saved Sessions</strong> field and pressing the <strong>Save</strong> button, which will keep you from having to fill everything out every single time. Once saved, <strong>Open</strong> the session to begin connecting...

...except nothing happens. We can't connect, and eventually the session will time out.

It turns out that AWS is providing an additional layer of security we need to edit. So log back into AWS, open up the EC2 service, and select <strong>Security Groups</strong> from the side menu.

<h3>AWS Security Groups</h3>

AWS security groups behave the same way as a firewall does: they allow you to manage the flow of traffic to services protected by them based on where the traffic is going to/coming from, and what <span name="port">port</span> the traffic is trying to enter through. By default, inbound ports start off closed, which keeps all traffic out. We need to open a door.
<aside name="port">A <em>port</em> is essentially just a door that you can either open or close. An AWS security group has 65536 ports (0-65535), which are all closed by default.</aside>
Select the security group attached to your EC2 instance and select the <strong>Inbound</strong> tab. Press the edit button to open up the edit wizard.

First, we need to make a hole for our SSH traffic to enter through. Delete the default rules and create a new rule of type SSH. The wizard will automatically fill out the port &amp; protocol fields (22, TCP), leaving you to fill out your IP address. You can fill it out manually, but it's much easier to select the "My IP" option from the source dropdown and let the wizard do it for you.

We have now opened a hole in the firewall we can connect through. Save the new rules and try to connect again. This time, it should work:

<figure>
    <img src="https://cdn.grahamewatt.com/wp-content/uploads/2019/11/26144742/A384F8FA-30E9-418A-8F88-27EB05E64295-300x177.png" alt=""/>
    <figcaption>Et voila!</figcaption>
</figure>

Let's go ahead and add a few more rules while we're in here. We're going to need to allow web traffic from anywhere once we get our website running, so we need to add an <span name="http-allows">HTTP and HTTPS rule</span> that allows all traffic. If you're someone who works from a few locations, you'll also need to add additional SSH rules to include the IP addresses of your other networks. I wouldn't recommend allowing SSH connections from anywhere as you leave your EC2 instance accessible to SSH attempts from anywhere in the world. If you're the kind of person who lives on <span name="other-networks">Starbucks &amp; hotel wi-fi,</span> look into getting a VPN service and allowing SSH from the VPN's IP address instead.

<aside name="http-allows">We need to allow HTTP traffic as people will come via insecure connections whether we want them to or not. We'll redirect them to HTTPS once they arrive</aside>
<aside name="other-networks">Office, parents', girl/boyfriend's, that one guy you met in line at the deli, etc.</aside>

<figure>
    <img src="https://cdn.grahamewatt.com/wp-content/uploads/2019/11/26152719/Annotation-2019-11-26-143620-1024x337.jpg" alt="firewall rules" class="faint-border">
</figure>

### Connecting via the command line

<em><strong>NOTE:</strong> Even if you're not interested in using the CLI to connect to your instance and prefer to stick with PuTTY, if you are a complete newbie to shell commands it's worth reading this section as we'll cover a few basic shell commands you'll need moving forward.</em>

An alternate method for connecting to your instance uses the <strong>Command Line Interface</strong> (CLI) and <a href="https://www.openssh.com/">OpenSSH</a>, an open-source SSH tool that comes default with Linux, Mac, and even Windows 10 machines. If your computer doesn't have OpenSSH, it's worth getting--the utility also comes with secure copy (scp) and secure FTP (sFTP), which are both quite handy to have in a pinch.

To use OpenSSH, open up your preferred CLI interface. The default program on Macs is called Terminal; Windows have both Command Prompt and Powershell; I use PowerShell as it has a lot more support and a few nice features that make things a little more manageable when using it. You'll be greeted with a line of text that looks something like this:

<figure>
    <img src="https://cdn.grahamewatt.com/wp-content/uploads/2019/11/27100835/Annotation-2019-11-27-100816.jpg" alt="opening powershell">
</figure>

The line where you're cursor is blinking shows the folder you're currently in. <code>C:\Users\Grahame</code> can be navigated to via the File Explorer and we can see all the folders within the <code>Grahame</code> folder. We can also use the command line to see what files are in the <code>Grahame</code> folder. Type the following into the command line and press enter:

<pre><code>$ ls</code></pre>

You should see a list of all the files and folders in your current folder. Excellent! You can change folders using the <code>cd</code> command. For example, to change into the <code>Videos</code> folder, I type

<pre><code><span name="cd">$ cd Videos</span>
</code></pre>

<aside name="cd">cd stands for "change directory"</aside>

and here we are. My cursor is now blinking next to <code>C:\Users\Grahame\Videos</code> and I can now run commands in the <code>Videos</code> folder.

You can jump directly to a specific folder by following <code>cd</code> with the path name of the folder you want to access. We need to find our private key, so use <code>cd</code> to travel through your folders until you reach the folder with your key. Once you reach the right folder, use <code>ls</code> again to confirm the key is there, and then check that OpenSSH is installed and running properly by using the <code>ssh</code> command:

<pre><code>$ ssh</code></pre>

If OpenSSH is properly installed, you'll be presented with a list of command flags: <code>-b</code>, <code>-c</code>, <code>-D</code>, etc. The command flags allow us to modify a command and pass it additional parameters and information. To use OpenSSH with a key file, we need to pass it the <code>-i</code> flag with the name of our private key (including the <code>.pem</code>). We'll use the same <code>host@IPADDRESS</code> path for our connection, and we'll let OpenSSH handle the rest as the defaults are good enough for us. So our command is:

<pre><code>$ ssh ubuntu@IPADDRESS -i private_key.pem</code></pre>

If it works, you'll connect to your EC2 instance (you may have to accept a warning about your certificate identity), and we'll be good to go.

## I'm in! Now what?

We now have a running EC2 instance we can securely connect to. We can run shell commands within the instance the same way we can on our local machine. And we can control the AWS security groups to change the flow of traffic to and from our instance.

In Part 3, we will configure our EC2 instance to serve as our web host, and configure our DNS so that we can use a domain name instead of an IP address to reach our website.
