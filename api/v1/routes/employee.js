const dotenv  = require('dotenv');
const express = require('express');
const AWS     = require('aws-sdk');
const router  = express.Router();
const { v4: uuidv4 } = require('uuid');
dotenv.config();

const authkey = 'asdf1234'

const docClient = new AWS.DynamoDB.DocumentClient();

// Get EmployeeSSSSSSSSS 
router.get('/employees', async (req, res, next) => {
  var params = {
    TableName : "employeeTable"
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
  const params = {
    TableName: 'employeeTable',
    Item: req.body,
    ConditionExpression: `attribute_not_exists(${req.body.Email})`
  }

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
    TableName: 'employeeTable',
    Key: {
      'Email': req.params.id,
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

  const params = {
    TableName: 'employeeTable',
    Item: req.body 
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
      TableName: 'employeeTable',
      Key: {
        Email: req.params.id
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