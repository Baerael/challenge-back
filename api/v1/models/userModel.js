const dotenv = require('dotenv');
dotenv.config();

function userModel() {
  const db = new AWS.DynamoDB();

  const employeeTable = {
    TableName : "employeeTable",
    KeySchema: [
      {
          AttributeName: "Email",
          KeyType: "HASH", 
      },
  ],
  AttributeDefinitions: [
    {
      AttributeName: "Email",
      AttributeType: "S"
    },
  ],
    ProvisionedThroughput: {    
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10
    }
  }

  db.createTable(employeeTable, (err, data) => {
    if (err) {
      console.log('failed to create', err);
    } else {
      console.log('success', data);
    }
  })
}

module.exports = userModel;