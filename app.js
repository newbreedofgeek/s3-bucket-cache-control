var AWS = require('aws-sdk');
var S3 = new AWS.S3();
var s3Bucket = "your-bucket-name"; // your bucket name
var cacheControl = 'public, max-age=31536000'; // this is your new desired cache-control header

S3.listObjects({Bucket: s3Bucket}, function(err, objData) {
    if (err) {
        console.error('Cant complete .listObjects, error details are: ');
        console.log(err, err.stack);
    }
    else {
        console.log('.listObjects done, ' + objData.Contents.length + ' items found lets continue...');

        objData.Contents.forEach(function(currObj, i) {
            // Note: I do it in smaller batches of 100 as I had over 600 objects. I recommend this, but if you don't want to just comment out the IF statement below here
            if (i > -1 && i < 100) {
                S3.headObject({Bucket: s3Bucket, Key: currObj.Key}, function(err, headData) {
                    if (err) {
                        console.error('Cant complete .headObject, error details are: ');
                        console.log(err, err.stack);
                    }
                    else {
                        console.log('lets update ' + currObj.Key +'('+headData.ContentType+')' + ' to have the new cache control headers...');

                        var paramObj = {
                            Bucket: s3Bucket,
                            Key: currObj.Key,
                            ACL: 'public-read',
                            CopySource : s3Bucket + '/' + currObj.Key,
                            CacheControl: cacheControl,
                            MetadataDirective: 'REPLACE',
                            ContentType: headData.ContentType
                        };

                        S3.copyObject(paramObj, function(err, objCpyData) {
                            if (err) {
                                console.error('Cant complete .copyObject for '+currObj.Key+', error details are: ');
                                console.log(err, err.stack);
                            }
                            else {
                                console.error('.copyObject done and headers should be updated for : '+currObj.Key);
                            }
                        });
                    }
                });
            }
        });
    }
});
