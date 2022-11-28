---
layout: post
title:  "Building a Free Website (LEMP on AWS) | Part 5 &ndash; Wordpress"
date:   2020-03-21 16:07 -0700
tags:   Projects Tech
---
You've made it this far. I've made it this far. We've made it this far together.

Welcome to the final installment of Building a Free Website. We have a database, we have a server, and we've connected them all up. Now the time has come to install WordPress and launch our free site for the world to see. We'll also take care of some security things and set up our very own CDN.

<figure><img src="https://iristech.co/wp-content/uploads/2018/04/blue-light-glowing.jpg" alt="" width="384" height="261"/><figcaption>*epic music plays*</figcaption></figure>

As the series has progressed, we've gotten a bit more technical and I've tried to hold your hand a bit less. We'll be kicking that up a notch here as well.

[Part 1]({% post_url 2019-11-12-building-a-free-website-part-1 %}) | 
[Part 2]({% post_url 2019-11-27-building-a-free-website-part-2 %}) | 
[Part 3]({% post_url 2019-12-28-building-a-free-website-part-3 %}) | 
[Part 4]({% post_url 2020-01-20-building-a-free-website-part-4 %}) | 
[Epilogue]({% post_url 2020-10-25-building-a-free-website-epilogue %})

Now, without further ado, let's get to it.

<h2>Installing WordPress</h2>

<a href="https://wordpress.org">WordPress.org</a> (not to be confused with <a href="https://wordpress.com">WordPress.com</a>, which is a whole other thingThough both run by Automattic) is the home of the WordPress open-source content management system. We'll want to grab the installer from their site and put it into our web server. Once we have it up and running, we're going to configure NGINX to route HTTP requests to WordPress, which will do some magic under the hood and return a fully formed webpage, complete with dynamic theme to the visitor.

If we were downloading it onto our computer, we'd need to visit the website, download the installer, and run it. However, we have a Linux server, and package managers to make the whole thing easier for us.

SSH into your EC2 instance and <code>cd</code> to your website folder at <code>/var/www/mywebsite.com</code>. Once there, we'll need to download and install WordPress, and we can do so through the magic of <code>wget</code> (use <code>sudo</code> if you aren't the root user):

<pre><code class="language-shell">$ wget https://wordpress.org/latest.tar.gz
$ tar -xzvf latest.tar.gz
</code></pre>
<code>wget</code> goes to the WordPress site and downloads the latest stable build of WordPress for us. We use <code>tar</code> to unzip the compressed archive file... and that's it. WordPress is installed!

<figure><img src="https://www.staples-3p.com/s7/is/image/Staples/sp36619013_sc7?wid=512&amp;hei=512" alt="" width="256" height="256"/><figcaption>That was easy</figcaption></figure>

<ul><li>If your EC2 instance doesn't have <code>wget</code>, you can install it with the following command: <code>apt install wget</code>.</li><li>You need to be a user with root access to download and install WordPress (and <code>wget</code>). Either prepend <code>sudo</code> to the previous commands or <code>sudo su root</code> before starting.</li></ul>

WordPress will have self-created a directory, which will be the home of our website. However, we need to move it up to the root of our website directory, as <a href="https://wordpress.org/support/article/how-to-install-wordpress/">per the installation directions</a>, otherwise it won't work. We want to copy all of the contents of the <code>wordpress</code> directory into <code>/var/www/mydomain.com</code>. We can get rid of the downloads afterwards.

<pre><code>$ cp -a wordpress/. .$ rm -R wordpress$ rm latest.tar.gz</code></pre>

WordPress has been installed... but we need to configure it to work with our AWS setup. Specifically, we need to tell it how to talk to our RDS instance. We do that by creating and editing the <code>wp-config</code> file, which provides all the various parameters and configuration options WordPress needs to keep track of. Our install comes with a sample config file, so copy it into a new active file:

<pre><code>$ cp wp-config-sample.php wp-config.php</code></pre>

Open our new <code>wp-config.php</code> with <code>nano</code> or <code>vi</code> and scroll down to the MySQL settings section. You'll see four <code>define()</code> blocks, each with two parameters. We need to update the second parameter of each block with our database information from [Part 4]({% post_url 2020-01-20-building-a-free-website-part-4 %}):

<pre><code class="language-php">/** The name of the database for WordPress */
define( 'DB_NAME', 'wpdatabase' );

/** MySQL database username */
define( 'DB_USER', 'dbadmin' );

/** MySQL database password */
define( 'DB_PASSWORD', 'your_password' );

/** MySQL hostname */
define( 'DB_HOST', 'wpdatabase.cabthgz5oiyo.us-east-1.rds.amazonaws.com' );
</code></pre>

<blockquote class="wp-block-quote"><code>DB_NAME</code> is the name of your database, not your database instance. When I set them up I used the same name for both, but if you used different ones make sure to use the correct name. <code>DB_HOST</code> is the full URL of your database instance.</blockquote>

Next, we need to secure our connections by filling out the <strong>Authentication Unique Keys and Salts </strong>section. WordPress uses these for pretty much anything privileged involved in running the website (i.e., all site administration). To do so, simply copy salts from WordPress' <a href="https://api.wordpress.org/secret-key/1.1/salt/">salt generator</a> and paste them in place of the existing ones already in the file (if you're using nano: <strong>Ctrl + Shift + K </strong>to delete the placeholder lines; <strong>Right Click</strong> to paste the new ones).

<pre><code class="language-php">// Not real keys. Obviously

define('AUTH_KEY',         '5KQCDaR3`Z`fn*N#,&gt;c&gt;orRvr2T.=R6%=Vuo=6+.2T,1f9rW+O(RekX3+gx:31t&gt;');
define('SECURE_AUTH_KEY',  '#7&lt;86DjJ$aQr,-8[L+Ty%iwL~Xc/&gt;po]R,S3ef/2Z;OnGSnu:Mm1lHPe*[o|UP.+');
define('LOGGED_IN_KEY',    'FE&amp;-XI=v1l&lt;)v*K!(=6azJBDHT^o^d&lt;NjLys-D=4&amp;+ [ .^=ebN/md-[4&gt;HCt.wU');
</code></pre>

Save the file and restart NGINX. If everything is configured properly, you should now be able to go to your domain and you'll be greeted by the WordPress launcher page. Follow the steps and you'll have a WordPress site ready for configuration and launch!

<figure><img src="https://images.theconversation.com/files/281623/original/file-20190627-76705-1uxqb1f.jpg?ixlib=rb-1.1.0&amp;q=45&amp;auto=format&amp;w=1200&amp;h=1200.0&amp;fit=crop" alt="" width="300" height="300"/></figure>

From here, you can get started building your website. You can draft pages, download and install themes, write blog posts—the world is your oyster. However, stay with us—we're not quite done dotting our I's and crossing our T's just yet.

<h2>HTTPS Always: SSL Certificates</h2>

When doing anything on the internet, privacy and security should always be in the back of your mind. Our site management and servers are pretty well protected by our use of SSH and complex passwords (built on one of the most robust and secure cloud platforms out there), so we don't need to worry about unauthorized users breaking in and defacing our website or stealing our AWS credentials. However, our website is public in the most literal way possible: whenever someone visits our site and asks for a page (a <a href="https://www.w3schools.com/tags/ref_httpmethods.asp">GET request</a>), we send the relevant HTML completely unencrypted.

This is not the end of the world—after all, our website is public, so <span name="spying">if <a href="https://spreadprivacy.com/protection-from-isp-spying/">someone was spying</span> on our user</a>, they could figure out what the user was looking at by simply visiting the same page as they did. What is more problematic is the fact that sometimes users want to input information into a website. Information like passwords. Like, say, on an admin login screen...

<aside name="spying">While DNS requests aren't exactly public, due to the nature of how the internet works there are several third parties who handle web traffic, and have to see the to/from destination addresses in order to facilitate the request. Your ISP definitely tracks this info, and its safe to say there are probably a few other folks who do too</aside>

<figure><img src="https://cdn.grahamewatt.com/wp-content/uploads/2020/03/23125200/wp-login.jpg" alt="" width="358" height="384"/><figcaption>Oh snap!</figcaption></figure>

Yep. You sent your password unencrypted to your webserver when you logged into the admin portal at your mydomain.com/login page. The good news is you <span name="probably-ok">did not get your password stolen.</span> But this is a gap, and we need to plug it.

<aside name="probably-ok">With 99% certainty. Don't sue me if your 30 IE toolbars put keyloggers on your machine and you did lose it. It's your fault for installing browser toolbars in the first place.</aside>

Enter the <strong>Secure Socket Layer</strong> (SSL). Similar to the public key/private key method of authentication in use when we access our EC2 instance via PuTTY, setting up our website with a SSL certificate will allow our website and any visitors to conduct their browsing session via an encrypted channel (HTTPS), instead of sending things in plain text over the internet (HTTP).

<figure><img src="/img/http-vs-https-comparison.png" alt="A graphic showing what it looks like when you use a password with an encrypted system versus a non-encrypted system." width="380" height="361"/><figcaption>Source: <a href="https://cheapsslsecurity.com/blog/http-vs-https-security-the-differences-between-these-protocols/">Savvy Security</a></figcaption></figure>

SSL certificates are issued by a number of registrars, who are responsible for confirming the domain belongs to the requester and maintaining those lists and records. In the old days, companies would charge for this service (and most still do, especially for more <a href="https://www.liquidweb.com/blog/ssl-certificates/">advanced SSL certifications</a>). But in this modern day and age, we have <span name="support-letsencrypt"><a href="https://letsencrypt.org/#">Let's Encrypt</a>.</span>

<aside name="support-letsencrypt">Let's Encrypt is a non-profit that does great work, and is one of several security and privacy organizations dedicated to keeping the internet a vibrant and safe place. If you can spare it, it's worth <a href="https://letsencrypt.org/donate">shelling out a few bucks to help them</a> in their mission.</aside>

<h3>Installing an SSL Certificate</h3>

Let's Encrypt provides a free automated SSL management tool called Certbot which does everything we want (and then some). Certbot will install our certificate, update our <code>nginx.conf</code> file to redirect all HTTP requests to HTTPS, and set a timer to re-run the protocol every 90 days to keep the certificates fresh and active.

To get started, grab the Certbot repository and add it to your EC2 instance. Accept any TOS or other conditions, and install using <code>apt</code>:

<pre><code class="language-shell">$ sudo add-apt-repository ppa:certbot/certbot
$ sudo apt install python-certbot-nginx
</code></pre>

Certbot is now ready to go. Provided you've been following along, it should automatically be able to find your website, located at <code>/etc/nginx/sites-available/mydomain.com</code>, and use the info in the <code>conf</code> file to issue the certificates. If you did anything weird/different, go to your site's <code>conf</code> file and check that you have both a <code>www</code> and <code>root</code> entry in the server_name line.

<pre><code>// Your conf file should have this line somewhere
// If it doesn't, add it/fix it, save, and restart nginx

// ...
server_name mydomain.com www.mydomain.com
</code></pre>

Certbot will also need port 443 open on our firewall. Port 443 is the default HTTPS port, and should already be open (as of this writing, the EC2 image used by AWS came with 443 already configured). You can check with the command <span name="ufw"><code>sudo ufw status</code>.</span> In the <strong>To</strong> column, you should have entries for <code>Nginx Full</code> &amp; <code>Nginx Full (v6)</code>. If you only have entries for <code>Nginx HTTP</code>, you need to delete and replace them:

<pre><code class="language-shell">$ sudo ufw allow 'Nginx Full'
$ sudo ufw delete allow 'Nginx HTTP'
</code></pre>

<aside name="ufw"><code>ufw</code> = "Ubuntu Firewall"</aside>

We are now finally ready to let Certbot work its magic. Run the NGINX plugin for your domains to get a certificate:

<pre><code class="language-shell">$ sudo certbot --nginx -d mydomain.com -d www.mydomain.com</code></pre>

Certbot will prompt you for some things (email address, TOS confirmation), and then will ask you if you want to redirect HTTP traffic to HTTPS.

The answer is yes. Yes, you want to redirect traffic. Otherwise why did you bother reading this section?

Certbot will run, and will probably reload NGINX. Then it will be done, and will give you the output info, along with some <span name="donate">links to donate</span> to Let's Encrypt and the EFF. Certbot will have also automatically set up the 90-day renewal process by creating a <code>cron</code> job in our server, which will run the script we just ran every 90 days. You can test the script by doing a dry run:

<pre><code class="language-shell">$ sudo certbot renew --dry-run</code></pre>

<aside name="donate">Which you should do. Freeloader.</aside>

And that's it! Reload your site and you should see the little padlock in the browser bar that indicates success. You can also run security tests (Google SSL Server Test for a whole host of test) to see how your site stacks up.

<figure><img src="https://cdn.grahamewatt.com/wp-content/uploads/2020/03/24113447/image.png" alt=""/><figcaption>The mark of a job well done</figcaption></figure>

<h2>CloudFront CDN</h2>

By any measure, setting up a content delivery network (CDN) is completely optional. If you don't intend on using your site for much more than a contact form and an "About" page, I wouldn't blame you for skipping this section. But if you intend to do things that will build a media library over time (e.g., write a blog w/ lots of images, distribute your e-book), then I highly recommend setting up a CDN. And, thanks to the magic of free tier, we can do it right here on AWS for FREE!

Amusingly, this is actually the most involved process in this article. None of the steps are particularly hard, but there are several of them. We need to:

<ol><li>Set up an S3 bucket to store our media</li><li>Set up a CloudFront Distribution</li><li>Create a subdomain for our CDN</li><li>Install and configure Offload Media Lite, syncing our website with our CDN</li></ol>

<h3>The AWS Part</h3>

The first three steps will take place in AWS, so go ahead and log into the console. Navigate to the <strong>S3</strong> service and press the orange <strong>Create Bucket</strong> button. We have a few options covering name and access. Since the items in this bucket are for public consumption, we want to turn off the <strong>Block all public access</strong> setting.

As for name? It's going to be the same as our subdomain. This is not optional—it's a quirk of how Cloudfront works and if the bucket is not properly named, we cannot issue it an SSL certificate nor can we properly point Cloudfront to serve files from the bucket. I recommend something simple (e.g., <code>cdn.mydomain.com</code>). You can ignore advanced settings, and press <strong>Create Bucket</strong> to finish up. The bucket should appear in your bucket list as "Public," meaning that items within the bucket can be viewed anywhere on the web—though the bucket console itself cannot. You can test by uploading an item to the bucket via the console, selecting it, and pasting the <strong>Object URL </strong>into an incognito browser window. You should be able to see the file you uploaded without needing to log in.

Next, <span name="bucket-pattern">head over to Cloudfront</span> and press the <strong>Create Distribution</strong> button in the main dashboard. Choose a <strong>Web</strong> delivery method to find yourself presented with a whole bunch of settings to address. Thankfully, the defaults will mostly work for us.

Put your S3 bucket in <strong>Origin Domain Name</strong> and fill out an <strong>Origin ID</strong> that will help you keep track of it. Next, scroll down to <strong>Viewer Protocol Policy </strong>and change it to <span name="use-https">"Redirect HTTP to HTTPS."</span> Finally, scroll down to the Distribution Settings menu and add our subdomain to <strong>Alternate Domain Names</strong>.

<aside name="bucket-pattern">AWS will search it for you and provide the correct domain for the bucket; it should have the pattern of <code>[BUCKET_NAME].s3.amazon.aws.com</code></aside>

<aside name="use-https">It's 2020 after all. No need to use HTTP if you don't have to.</aside>

<figure>
    <div class="img-row faint-border">
        <div class="img-column-50">
            <img src="https://cdn.grahamewatt.com/wp-content/uploads/2020/04/12133922/image.png" alt="" height="373">
        </div>
        <div class="img-column-50">
            <img src="https://cdn.grahamewatt.com/wp-content/uploads/2020/04/12135726/image-3.png" alt="" height="301">
        </div>
    </div>
    <figcaption>What we're going for</figcaption>
</figure>

Our distribution will not launch without an SSL certificate to secure it. AWS will happily do this for us. Click the <strong>Request a Certificate with ACM</strong> button to launch the AWS Certificate Manager (ACM) in a new tab. The wizard is pretty straightforward; simply add our new <code>cdn.mydomain.com</code> domain, and click through to "Step 5: Validation" (we can leave the defaults alone). ACM will show our newly certified domain as "Pending." It will periodically check our DNS until it finds the CNAME record it provided. You can manually copy it over, or you can let AWS do the heavy lifting for you—expand the field and press the <strong>Add to Route 53</strong> button to automatically copy the record into the DNS. Doing so will also trigger another test by the ACM, so everything should all sync up in a matter of minutes.

<blockquote class="wp-block-quote"><strong>Couldn't we have done this for our other SSL certificates?</strong> Sure, but it never hurts to learn two different ways of doing things. In addition, our method of using Certbot within our web server is applicable to cloud hosts and other hosts outside of AWS, and keeps our DNS records a little bit tidier.</blockquote>

Once the SSL certificate moves from "Pending" to "Issued," go back to our CloudFront tab. Select <strong>Custom SSL Certificate</strong> and add our new certificate <span name="autofill">to the field.</span> Check everything over once more, and create the distribution. It'll take a few minutes to spin up, but we can move on while it does.

<aside name="autofill">AWS should auto-fill the field as you type; if it doesn't refresh the form so it can collect the new certificate from ACM.</aside>

With the bucket and distribution set up, we need to make changes to our DNS so that when our images are linked into our site pages from <code>cdn.mydomain.com</code>, the traffic is properly directed to Cloudfront and the image. Grab the <strong>Domain Name</strong> from our distribution (<code>[ID].cloudfront.net</code>) and create a CNAME record for <code>cdn.mydomain.com</code> with <code>[ID].cloudfront.net</code> as the value.

<h3>The WordPress Part</h3>

We are in the home stretch. All the infrastructure has been set up. Our website now looks just like our diagram. All we have left to do is connect our website to S3, and for that we'll use <a href="https://wordpress.org/plugins/amazon-s3-and-cloudfront/">Offload Media Lite</a>.

<figure class="wp-block-image size-large"><img src="https://cdn.grahamewatt.com/wp-content/uploads/2019/11/12120608/image1-1024x1024.png" alt="" class="wp-image-190"/></figure>

As with any WordPress plugin, we can download and install them directly to our website from within the WordPress CMS. Log into your website and open the <strong>Plugins</strong> page from the left menu to see your current plugins. WordPress automatically comes with a few defaults; you can explore, add, or remove them at your leisure.

To get the Offload Media Lite plugin, press <strong>Add Plugin</strong> to visit the plugins catalog, and use the search function to find the plugin. Installation is easy as clicking <strong>Install Now</strong>—WordPress will automatically download and install the plugin for you. Once it's done, press <strong>Activate</strong> and refresh the page. If you check the <strong>Settings</strong> dropdown in the left menu, Offload Media Lite will have magically appeared, ready for configuration.

<figure><img src="https://cdn.grahamewatt.com/wp-content/uploads/2020/04/12153058/image-4.png" alt="" /><figcaption>Bam!</figcaption></figure>

Open 'er up, and fill out the fields in the <strong>Media Library</strong> tab as follows:

<ul><li><strong>Provider: </strong>Amazon S3</li><li><strong>Bucket: </strong>The name of your S3 bucket (<code>cdn.mydomain.com</code>)</li><li><strong>Path: </strong>wp-content/uploads/</li><li><strong>Custom Domain:</strong> <code>cdn.mydomain.com</code></li></ul>

And turn all the switches to the "On" position. This will tell Offload Media Lite to move all files and images over to s3 whenever you upload them, organize them the same way WordPress would, and then remove them from your EC2 instance, saving space on our little hard drive.

<figure><img src="https://cdn.grahamewatt.com/wp-content/uploads/2020/04/12154625/image-5.png" alt="" width="373" height="672"/><figcaption>Settings here at grahamewatt.com</figcaption></figure>

<em>"But wait! When I chose Amazon S3 for my storage provider, it said something about access keys?"</em>

Oh. Yeah, I suppose it would.

After you save your configuration and try and test the plugin, <span name="failure-expected">it will fail.</span> You'd think it should just work, since the server is within the VPC, but we need to create a "user" for Offload Media Lite to use to access the s3 bucket. We're done with configuration here in WordPress, but we need to make one final pit stop in AWS, in the Identity and Access Management (<strong>IAM)</strong> service.

<aside name="failure-expected">Probably.</aside>

<h3>The Other AWS Part (IAM)</h3>

Create a new user (<strong>Users --&gt; Create User</strong>) and give it <strong>Programmatic Access</strong>. Call it something you can easily identify (e.g. "offload-lite"), and move to the "Permissions" step.

If you'd like a challenge, this is a good opportunity. We need to give the user the ability to <code>PUT</code> new items in our <code>cdn.mydomain.com</code> bucket, <code>GET</code> items from the bucket, <code>DELETE</code> objects within the bucket, and see a <code>LIST</code> of some or all of the items in our bucket. You can either create another security group, or just attach those rules directly.

If you can't solve it, or you'd rather just copy-paste the answer, take the following code and paste it into the JSON editor (<strong>Attach existing policies directly --&gt; Create policy --&gt; JSON</strong>):
<pre><code>{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:CreateBucket",
                "s3:DeleteObject",
                "s3:Put*",
                "s3:Get*",
                "s3:List*"
            ],
            "Resource": [
                "arn:aws:s3:::cdn.mydomain.com",
                "arn:aws:s3:::cdn.mydomain.com/*"
            ]
        }
    ]
}
</code></pre>

Click through the rest of the steps, and make sure to save the Access Key and Secret Key assigned to the user. If you lose them, we have to reset them, so keep them in a safe place (with your private ssh keys is a good option).

The keys go in your <code>wp-config</code> file. SSH into your EC2 instance, and navigate to the file. Add the following lines above the <code>/* That's all, stop editing! Happy blogging. */</code> comment:

<pre><code class="language-php">define('AS3CF_AWS_ACCESS_KEY_ID', '[ACCESS_KEY_ID]');
define('AS3CF_AWS_SECRET_ACCESS_KEY', '[SECRET_ACCESS_KEY]');
</code></pre>

Save and close. To check it's working, refresh the Offload Media Lite settings menu. All errors should have disappeared. You can test it by uploading a file or image to your website through the <strong>Media</strong> <strong>Library</strong> in your WordPress CMS, and then looking for it in your S3 bucket. If there is a file or folders magically there that weren't before, you're all set!

<h2>Final Thoughts</h2>

Congratulations on building your free website! While it's a little more technically involved than most of the "start-your-own-website" posts out there, this <span name="nearly-free">website setup will be free</span> for all of the next twelve months. Hopefully you've also learned a fair amount about how websites are put together and what goes on behind the scenes.

<aside name="nearly-free">Or very close. Occasionally you might end up spending a few extra cents on computing time as you continue to work and improve your site</aside>

As someone who finds joy in building and creating, this was a wonderful project and has continued to pay dividends down the line. I didn't cover any of the things involved in designing or managing a website, and there are plenty of other things to explore involving setting up email, contact forms, comments, etc. There are free options out there for all of these things and more, and while they take a little more messing around with, I'm sure many of you will find the experience of tackling that challenge rewarding. You might even learn something in the process.

I hope you enjoyed the series, and I look forward to sharing the next project with you soon!
