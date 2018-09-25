qs = require('querystring');

// function to send a json object
const respondJSON = (request, response, status, object, type) => {
  // set status code and content type (application/json)
  response.writeHead(status, { 'Content-Type': type });
  // stringify the object (so it doesn't use references/pointers/etc)
  // but is instead a flat string object.
  // Then write it to the response.
  response.write(JSON.stringify(object));
  // Send the response to the client
  response.end();
};

const getUsers = (request, response) => {
  var requestBody = '';
  var results;
  request.on('data', function(data) {
    requestBody += data;
  })

  request.on('end', function(){
    results = qs.parse(requestBody);
    console.log(results);
    if(results.method == 'get'){
      const responseJSON = {
        message: users,
        id: 'Users',
      };
      if(results.url == 'notReal'){
        const responseJSON2 = {
          message: "page not found"
        }
        return respondJSON(request, response, 404, responseJSON2, 'application/json');
      }
      return respondJSON(request, response, 200, responseJSON, 'application/json');
    }
    else if(results.method == 'head'){
      const responseJSON={};
      if(results.url == 'notReal'){
        return respondJSON(request, response, 404, responseJSON, 'application/json');
      }
      return respondJSON(request, response, 200, responseJSON, 'application/json');
    }
    return respondJSON(request, response, 200,{message:"internal Error"},'application/json')
  })
}

const addUser = (request, response, params) => {
  
  var requestBody = '';
  var results;
  request.on('data', function(data) {
    requestBody += data;
  })

  request.on('end', function(){
    results = qs.parse(requestBody);
    console.log(results);
    const responseJSON = {
      message: 'Invalid Input',
    };
      // if the request does not contain a valid=true query parameter
    if (results.name && results.age) {
      for(var x = 1; x < users.length; x++){
        if(users[x].name == results.name){
          users[x].age = results.age;
          responseJSON.message='';
          console.log(users);
          return respondJSON(request, response, 204, responseJSON, 'application/json');
        }
      }
      responseJSON.message='Success';
      users.push({name: results.name, age: results.age})
      console.log(users)
      return respondJSON(request, response, 201, responseJSON, 'application/json');
    }
    return respondJSON(request, response, 400, responseJSON, 'application/json');
  })
};

// function to show not found error
const notFound = (request, response) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return our json with a 404 not found error code
  respondJSON(request, response, 404, responseJSON, 'application/json');
};
/*
//exports to set functions to public.
//In this syntax, you can do getIndex:getIndex, but if they
//are the same name, you can short handle to just getIndex, */
module.exports = {
  addUser,
  notFound,
  getUsers,
};

var users=[];