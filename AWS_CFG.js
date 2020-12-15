const AWS = require('aws-sdk');

module.exports = AWS 
AWS.config = new AWS.Config({
  accessKeyID: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_ACCES_SECRET,
  region: 'us-east-2'
})