const dotenv  = require('dotenv');
const express = require('express');
const AWS     = require('aws-sdk');
const router  = express.Router();
const { v4: uuidv4 } = require('uuid');

dotenv.config();

const authkey = 'asdf1234'
const docClient = new AWS.DynamoDB.DocumentClient();
const SELECT_TABLE = 'EMPLOYEE'

// Get EmployeeSSSSSSSSS 
router.get('/employees', async (req, res, next) => {
  console.log('employeesz')
  var params = {
    TableName : SELECT_TABLE
  }

  try {
    return res.json(await docClient.scan(params).promise())
    //return res.json(result);
  } catch (err) {
    console.error('Unablle to get items', err);
    res.sendStatus(500);
  }
})


// Insert Employee
router.post('/:id', async (req, res, next) => {
  console.log('v2 create')
  console.log(req.body)
  const params = {
    TableName: SELECT_TABLE,
    Item: {
      ID: uuidv4(),
      FirstName: req.body.FirstName,
      MiddleInitial: req.body.MiddleInitial,
      LastName: req.body.LastName,
      DateOfBirth: req.body.DateOfBirth,
      DateOfEmployment: req.body.DateOfEmployment,
      Status: req.body.Status,
    }
  }
  console.log(params)

  try {
    const result = await docClient.put(params).promise()
  } catch (err) {
    console.log('Unablle to add item', err);
    res.sendStatus(500)
    next(err)
  }
})


// Get Employee
router.get('/:id', async (req,res, next) => {
  console.log('isthis called')
  const params = {
    TableName: SELECT_TABLE,
    Key: {
      'ID': req.params.id,
    }
  }

  try {
    const result = await docClient.get(params).promise();
    if(result.Item) { 
      res.json(result);
    } else {
      // 404
      //res.json({Item: {error: 'user does not exist'}});
      next(result)
    }
  } catch (err) {
    console.log('Unablle to get item', err);

    res.sendStatus(500)
  }
})


// Update Employee
router.put('/:id', async (req, res, next) => {
  console.log(req.body)
  console.log(req.params)

  const params = {
    TableName: SELECT_TABLE,
    Item: {
      ID: req.params.id,
      FirstName: req.body.FirstName,
      MiddleInitial: req.body.MiddleInitial,
      LastName: req.body.LastName,
      DateOfBirth: req.body.DateOfBirth,
      DateOfEmployment: req.body.DateOfEmployment,
      Status: req.body.Status
    }
  }

  try {
    const result = await docClient.put(params).promise();
    res.json(result);
  } catch (err) {
    console.log('Unablle to add item', err);
  }
})


// Delete Employee
router.delete('/:id', async (req, res, next) => {
  const checkAuth = isAuth(
    req.headers.authorization.split(' ')[1]
  )

  if(checkAuth) {
    const params = {
      TableName: SELECT_TABLE,
      Key: {
        ID: req.params.id
      }
    }

    try {
      const result = await docClient.delete(params).promise();
      res.json(result);
    } catch (err) {
      console.log('Unablle to add item', err);
      // fix status middleware
      next(err)
    }
  } else {
    res.status(401).json({ message: 'Invalid Authentication Credentials' })
  }
})


// set up dependency injection
const isAuth = (authHeader) => {
  return authHeader === authkey ? true : false;
}


module.exports = router;