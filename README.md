# S3 Bucket Cache Control

* A simple nodeJS script that uses the "aws-sdk" NPM module.
* I built it because I had a huge bucket full of images on S3, and I needed to add cache-control headers to all those images.
* AWS S3 (at this time) does not support adding cache-control in a bucket level, so…
* I had to write this script, that goes into a bucket, takes each object, adds the correct cache-control header and "replaces" itself.
* In the end, your bucket content (should) remain unchanged, but all objects will have the new cache-content headers.
* This script can be effectively used to update any meta data for objects in S3 buckets.




## Get Stared...

* Clone this repo and run "npm install" to install the dependencies
* Export two ENV variables called "AWS_ACCESS_KEY_ID" and "AWS_SECRET_ACCESS_KEY" with your AWS Developer details as the value. This is a requirement of the "aws-sdk" NPM package. 
* Once done, open app.js and add your bucket name to the "s3Bucket" variable
* Set your desired Cache-Control header to the "cacheControl" variable
* In Line 15, I have an IF statement that can be used to do this in smaller batches, I recommend this, but you can comment out the IF statement if you want.
* Once done, run "node app.js"
* Sit back until it finishes, then relaunch your website (then reload it again to enjoy the new cache control headers) and enjoy the speedy load time!!!




#### (Huge) Disclaimer: I built this as a trial and I have tested it and used it on my own production blog called [wisdomtoinspire.com](http://wisdomtoinspire.com)… but be very careful using this script in a production environment. Do your due diligence first, there is a risk involved as we are updating the raw S3 objects on the fly!  