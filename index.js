'use strict';

let AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';
let s3 = new AWS.S3({apiVersion: '2006-03-01'});
let request = require('request');
var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer;

const subsplash_rss = 'http://podcasts.subsplash.com/5be1639/podcast.rss';
const podcast_url = 'http://media.downtowncornerstone.org/podcast.xml';

exports.handler = function(event, context, callback) {
  console.log('Running index.handler');
  console.log('==================================');
  console.log('event', event);
  console.log('==================================');
  request(subsplash_rss, function(err, res, body){
    if (err) { return console.log(err); }
    transformFeedXML(body);
  });
};

function transformFeedXML(rawxml){
  var doc = new DOMParser().parseFromString(rawxml);
  // Update the atom:link to match our URL
  doc.getElementsByTagName('atom:link')[0].setAttribute('href', podcast_url);
  var newxml = new XMLSerializer().serializeToString(doc);
  uploadPodcastToS3(newxml);
};

function uploadPodcastToS3(xml){
  var uploadParams = {
    Bucket: 'media.downtowncornerstone.org',
    Key: 'podcast.xml',
    Body: xml,
    ContentType: 'application/rss+xml'};
  s3.upload(uploadParams, function(err, data) {
    if (err) {
      console.log("Error uploading data: ", err);
    } else {
      console.log("Successfully updated feed at " + uploadParams['Bucket'] + '/' + uploadParams['Key']);
    }
  });
};

