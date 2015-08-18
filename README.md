# S3 Bucket Cache Control

* A simple nodeJS script that uses the "aws-sdk" NPM module.
* I built it because I had a huge bucket full of images on S3, and I needed to add cache-control headers to all those images.
* AWS S3 (at this time) does not support adding cache-control in a bucket level, so…
* I had to write this script, that goes into a bucket, takes each object, adds the correct cache-control header and "replaces" itself.
* In the end, your bucket content (should) remain unchanged, but all objects will have the new cache-content headers.
* This script can be effectively used to update any meta data for objects in S3 buckets.



#### (Huge) Disclaimer: I built this as a trial and I have tested it… but be very careful using this script in a production environment. Do your due diligence first, there is a risk involved as we are updating the raw S3 objects on the fly!  