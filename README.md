# aws-lambda-podcast
An AWS Lambda function to generate the DCC Sermon Podcast.

## What?
Subsplash provides a CMS for volunteers to post sermons, which is then distributed to end users via a Mobile App, Media Page, and a Podcast RSS Feed (http://podcasts.subsplash.com/5be1639/podcast.rss). 

## Why?
We want to 
1. provide a way for us to *tweak* the feed (since Subsplash doesn't give full control)
2. make it so that if we decide not to stay with subsplash in the long term we can simply change the data source

## How
To accomplish these goals, we simlpy 
1. download the RSS XML feed from subsplash
2. transform it to our liking
3. save the RSS feed to our S3 Media Bucket

## When?
Lambda is relatively inexpensive (see https://aws.amazon.com/lambda/pricing/) for small numbers of requests like here in this use case, but even if we scheduled a refresh once per hour, we'd still be extremely under the free requests limit. For simplicity, we'll just schedule (http://docs.aws.amazon.com/lambda/latest/dg/tutorial-scheduled-events-schedule-expressions.html) a refresh of the feed once an hour, which should be sufficient for our purposes of posting a new episode once a week.

## Development
For testing and development you'll need npm, nodejs, and the AWS cli installed. Then clone this repo, and setup the AWS CLI with your IAM user's API Credentials (http://docs.aws.amazon.com/cli/latest/userguide/cli-config-files.html). Next install the required node dependencies. This uses *node-lambda* for locally running and deploying to AWS Lambda. See the node-lambda docs (https://www.npmjs.com/package/node-lambda), and the scripts section in the package.json file for how to setup, test, package, and deploy this function.
