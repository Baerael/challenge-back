const { v4: uuidv4 } = require('uuid');
var AWS = require("aws-sdk");
var fs = require('fs');


function loadData() {
  const docClient = new AWS.DynamoDB.DocumentClient();

  console.log("Import data");
  
  const allEmployees = JSON.parse(fs.readFileSync('employee.data.json', 'utf8'));

  allEmployees.forEach((employee) => {
    const params = {
      TableName: "EMPLOYEE",
      Item: {
        ID:               uuidv4(),
        FirstName:        employee.FirstName,
        MiddleInitial:    employee.MiddleInitial,
        LastName:         employee.LastName,
        DateOfBirth:      employee.DateOfBirth,
        DateOfEmployment: employee.DateOfEmployment,
        Status:           employee.Status,
      }
    };
  
    docClient.put(params, function(err, data) {
      if (err) {
        console.error("Unable to add employee", employee.LastName, ". Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("PutItem succeeded:", employee.LastName);
        }
    });
  });
}