const dotenv = require('dotenv');
dotenv.config();
const AWS     = require('aws-sdk')

function createTable() {

  // Create the DynamoDB service object
  var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

  var params = {
    AttributeDefinitions: [
      {
        AttributeName: 'ID',
        AttributeType: 'S'
      },
    ],
    KeySchema: [
      {
        AttributeName: 'ID',
        KeyType: 'HASH'
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    },
    TableName: 'EMPLOYEE',
    StreamSpecification: {
      StreamEnabled: false
    }
  };

  // Call DynamoDB to create the table
  ddb.createTable(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Table Created", data);
    }
  });
}

module.exports = createTable;