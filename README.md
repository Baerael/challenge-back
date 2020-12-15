## DynamoDB CRUD APP
### Instructions
- POST    `/api/employee/${id}`
- GET     `/api/employee/${id}`
- PUT     `/api/employee/${id}`
- DELETE  `/api/employee/${id}`
- GET     `/api/employee/employees`

### Object Format
```js
  const data = {
    ID:                UUID,
    FirstName:         firstname,
    LastName:          lastname,
    MiddleInitial:     middleinitial,
    DateOfBirth:       dob,
    DateOfEmployment:  doe,
    Status:            status
  }
```

### Setup Env File
- ```AWS_ACCESS_ID```=```SET_KEY_HERE```
- ```AWS_ACCESS_SECRET```=```SET_KEY_HERE```
