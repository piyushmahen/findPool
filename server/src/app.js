import path from 'path';
import express from 'express';
import md5 from 'md5';

import responseListApi from './json/carOwnersList';

const app = express();
const publicPath = express.static(path.join(__dirname, '../../public'));

app.use(publicPath);

const database = {
  sessions: [
  //   {
  //   username: '9987331130',
  //   liveSessions: [{
  //     sessionId: 'n783hf38hf3478hf3487hf34u',
  //     userAgent: 'MacOS Chrome'
  //   }]
  // }
  ],
  users: [
    {
      email: 'piyush@email.com',
      mobile: '9987331130',
      name: 'piyush'
    }
  ]
};

const getUserObject = (username) => database.users.find((user) => user.mobile === username || user.email === username);

const addSession = (userObject, credentials, userAgent) => {
  const sessionId = credentials.username+Date.now();
  const sessionIndex = database.sessions.findIndex((sessionObject) => sessionObject.username === userObject.mobile || sessionObject.username === userObject.email);
  if (sessionIndex !== -1) {
    database.sessions[sessionIndex].liveSessions = [...database.sessions[sessionIndex].liveSessions, {
      sessionId,
      userAgent
    }];
  } else {
    database.sessions = [...database.sessions, {
      liveSessions: [{
        sessionId,
        userAgent
      }],
      userObject
    }];
  }
};

const addUser = (credentials, name) => {
  const type = isNaN(credentials.username) ? 'email' : 'mobile';
  const userObject = {
    name,
    [type]: credentials.username
  };
  database.users = [...database.users, userObject];
  return userObject;
}

app.get('/api/register',(req, res) => {
  const { credentials, name } = req.body;
  const userAgent = req.headers['user-agent'];
  const doesUserExist = getUserObject(credentials.username);
  if (doesUserExist) {
    return res.send({error: true, message: 'Username already exists.'});
  }
  const userObject = addUser(credentials, name);
  const sessionId = addSession(userObject, credentials, userAgent);
  res.cookie('findPoolSessionId', sessionId, { httpOnly: true, secure: true });
  res.send({
    error: false,
    name: userObject.name,
  });
})

app.get('/api/login',(req, res) => {
  const credentials = req.body;
  const userAgent = req.headers['user-agent'];
  const userObject = getUserObject(credentials.username);
  if (!userObject) {
    return res.send({error: true, message: 'Please check username, could not find user.'});
  }
  if (userObject && userObject.password !== md5(credentials.password)) {
    return res.send({error: true, message: 'Please check password, and try again'});
  }
  const sessionId = addSession(userObject, credentials, userAgent);
  res.cookie('findPoolSessionId', sessionId, { httpOnly: true, secure: true });
  res.send({
    error: false,
    name: userObject.name,
  });
})

app.get('/api/**',(req, res) => {
  const sessionId = req.cookies.findPoolSessionId;
  if (!sessionId) {
    return res.send({redirect: true, location: '/login', reason: 'You are not logged in.'});
  }
  const sessionObject = database.sessions.find((sessionObject) => sessionObject.liveSessions.indexOf(sessionId) !== -1); 
  if (!sessionObject) {
    return res.send({redirect: true, location: '/login', reason: 'You are logged out.'});
  }
  res.send({
    "error": true,
    "message": "No such API found"
  });
})

app.get('/api/location-search',(req, res) => {
  const sessionId = req.cookies.findPoolSessionId;
  if (!sessionId) {
    return res.send({redirect: true, location: '/login', reason: 'You are not logged in.'});
  }
  const sessionObject = database.sessions.find((sessionObject) => sessionObject.liveSessions.indexOf(sessionId) !== -1); 
  if (!sessionObject) {
    return res.send({redirect: true, location: '/login', reason: 'You are logged out.'});
  }
  const { userObject } = sessionObject;
  const { source, destination, clientHash } = req.body;
  const responseList = responseListApi;

  //  Logic to check for data change, and if nothing has changed, respond falsy
  const hash = md5(JSON.stringify(responseList));
  if (hash === clientHash) {
    return res.send({
      "error": false,
      "message": "",
      hasChanged: false,
    });
  }
  res.send({
    "error": false,
    "message": "",
    hasChanged: true,
    responseList,
    clientHash: hash,
  });
});

app.get('/api/select-car',(req, res) => {
  const sessionId = req.cookies.findPoolSessionId;
  if (!sessionId) {
    return res.send({redirect: true, location: '/login', reason: 'You are not logged in.'});
  }
  const sessionObject = database.sessions.find((sessionObject) => sessionObject.liveSessions.indexOf(sessionId) !== -1); 
  if (!sessionObject) {
    return res.send({redirect: true, location: '/login', reason: 'You are logged out.'});
  }
  const { userObject } = sessionObject;
  const { id } = req.body;

  res.send({
    "error": false,
    "message": "",
    success: true,
    id,
  });
});

app.get('**',(req, res) => {
  res.sendFile(path.join(__dirname, '../../public/dist', 'index.html'));
});

export default app;