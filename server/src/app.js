import path from 'path';
import express from 'express';
import md5 from 'md5';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();
const publicPath = express.static(path.join(__dirname, '../../public'));

app.use(publicPath);
app.use(cookieParser())
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const database = {
  sessions: [
  //   {
  //   username: '9987331130',
  //   liveSessions: ['n783hf38hf3478hf3487hf34u']
  // }
  ],
  users: [
    {
      email: 'piyush@email.com',
      mobile: '9987331130',
      name: 'piyush',
      password: '86f500cd7b7d38e5d4ae6cde3920f589'
    }
  ]
};

const getUserObject = (username) => database.users.find((user) => user.mobile === username || user.email === username);

const addSession = (userObject, credentials, userAgent) => {
  const sessionId = credentials.username+Date.now();
  const sessionIndex = database.sessions.findIndex((sessionObject) => sessionObject.username === userObject.mobile || sessionObject.username === userObject.email);
  if (sessionIndex !== -1) {
    database.sessions[sessionIndex].liveSessions = [...database.sessions[sessionIndex].liveSessions, sessionId];
  } else {
    database.sessions = [...database.sessions, {
      liveSessions: [sessionId],
      userObject
    }];
  }
  return sessionId;
};

const removeSession = (removeSessionId, sessionIndex) => {
  const sessionList = database.sessions[sessionIndex].liveSessions;
  const newSessionList = sessionList.filter((sessionId) => sessionId !== removeSessionId);
  database.sessions[sessionIndex].liveSessions = newSessionList;
}

const addUser = (name, email, mobile, password, car) => {
  const userObject = {
    name,
    email,
    mobile,
    password: md5(password),
    car,
  };
  database.users = [...database.users, userObject];
  return userObject;
}

app.post('/api/register', jsonParser, (req, res) => {
  const { name, email, mobile, password, car } = req.body;
  const userAgent = req.headers['user-agent'];
  const doesUserExistMobile = getUserObject(mobile);
  const doesUserExistEmail = getUserObject(email);
  if (doesUserExistMobile || doesUserExistEmail) {
    return res.send({error: true, message: 'Username already exists.'});
  }
  const userObject = addUser(name, email, mobile, password, car);
  const sessionId = addSession(userObject, {username:email, password}, userAgent);
  res.cookie('findPoolSessionId', sessionId, { httpOnly: true });
  res.send({
    error: false,
    name: userObject.name,
  });
})

app.post('/api/login', jsonParser, (req, res) => {
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
  res.cookie('findPoolSessionId', sessionId, { httpOnly: true });
  res.send({
    error: false,
    name: userObject.name,
  });
})

app.get('/api/**',(req, res) => {
  const sessionId = req.cookies.findPoolSessionId;
  if (!sessionId) {
    return res.redirect({redirect: true, location: '/login', reason: 'You are not logged in.'});
  }
  const sessionObject = database.sessions.find((sessionObject) => sessionObject.liveSessions.indexOf(sessionId) !== -1); 
  if (!sessionObject) {
    return res.redirect({redirect: true, location: '/login', reason: 'You are logged out.'});
  }
  res.send({
    "error": true,
    "message": "No such API found"
  });
})

app.post('/api/location-search', jsonParser, (req, res) => {
  const sessionId = req.cookies.findPoolSessionId;
  if (!sessionId) {
    return res.redirect({redirect: true, location: '/login', reason: 'You are not logged in.'});
  }
  const sessionObject = database.sessions.find((sessionObject) => sessionObject.liveSessions.indexOf(sessionId) !== -1); 
  if (!sessionObject) {
    return res.redirect({redirect: true, location: '/login', reason: 'You are logged out.'});
  }
  const { userObject } = sessionObject;
  const { source, destination, clientHash } = req.body;
  const cars = [
    {
      name: 'Mohit Agarwal',
      id: '38dhj38hd',
      currentLocation: {
        lat: 12.9698,
        lng: 77.7499,
      },
      awaySeconds: '360',
      car: {
        name: 'Polo',
        segment: 'Premium Hatchback'
      },
      seatsAvailable: 3,
      phone: '+919987329290',
      rating: '4.5',
      source,
      destination,
    },
    {
      name: 'Mohit Agarwal',
      id: '48wfhi',
      currentLocation: {
        lat: 12.9698,
        lng: 77.7499,
      },
      awaySeconds: '360',
      car: {
        name: 'Polo',
        segment: 'Premium Hatchback'
      },
      seatsAvailable: 3,
      phone: '+919987329290',
      rating: '4.5',
      source,
      destination,
    },
    {
      name: 'Mohit Agarwal',
      id: '384735yf',
      currentLocation: {
        lat: 12.9698,
        lng: 77.7499,
      },
      awaySeconds: '360',
      car: {
        name: 'Polo',
        segment: 'Premium Hatchback'
      },
      seatsAvailable: 3,
      phone: '+919987329290',
      rating: '4.5',
      source,
      destination,
    },
    {
      name: 'Mohit Agarwal',
      id: '47gf74gf',
      currentLocation: {
        lat: 12.9698,
        lng: 77.7499,
      },
      awaySeconds: '360',
      car: {
        name: 'Polo',
        segment: 'Premium Hatchback'
      },
      seatsAvailable: 3,
      phone: '+919987329290',
      rating: '4.5',
      source,
      destination,
    },
  ]
  const carList = cars;

  //  Logic to check for data change, and if nothing has changed, respond falsy
  const hash = md5(JSON.stringify(carList));
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
    carList,
    clientHash: hash,
  });
});

app.get('/api/select-car',(req, res) => {
  const sessionId = req.cookies.findPoolSessionId;
  if (!sessionId) {
    return res.redirect({redirect: true, location: '/login', reason: 'You are not logged in.'});
  }
  const sessionObject = database.sessions.find((sessionObject) => sessionObject.liveSessions.indexOf(sessionId) !== -1); 
  if (!sessionObject) {
    return res.redirect({redirect: true, location: '/login', reason: 'You are logged out.'});
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

app.get('/login',(req, res) => {
  const sessionId = req.cookies.findPoolSessionId;
  if (sessionId) {
    const sessionObject = database.sessions.find((sessionObject) => sessionObject.liveSessions.indexOf(sessionId) !== -1); 
    if (sessionObject) {
      return res.redirect('/');
    }
  }
  
  res.sendFile(path.join(__dirname, '../../public/dist', 'index.html'));
});

app.get('/register',(req, res) => {
  const sessionId = req.cookies.findPoolSessionId;
  if (sessionId) {
    const sessionObject = database.sessions.find((sessionObject) => sessionObject.liveSessions.indexOf(sessionId) !== -1); 
    if (sessionObject) {
      return res.redirect('/');
    }
  }
  
  res.sendFile(path.join(__dirname, '../../public/dist', 'index.html'));
});

app.get('/logout',(req, res) => {
  const sessionId = req.cookies.findPoolSessionId;
  if (sessionId) {
    const sessionIndex = database.sessions.findIndex((sessionObject) => sessionObject.liveSessions.indexOf(sessionId) !== -1); 
    if (sessionIndex !== -1) {
      removeSession(sessionId, sessionIndex);
    }
  }
  res.redirect('/login');
});

app.get('**',(req, res) => {
  const sessionId = req.cookies.findPoolSessionId;
  if (!sessionId) {
    return res.redirect('/login');
  }
  const sessionObject = database.sessions.find((sessionObject) => sessionObject.liveSessions.indexOf(sessionId) !== -1); 
  if (!sessionObject) {
    return res.redirect('/login');
  }
  res.sendFile(path.join(__dirname, '../../public/dist', 'index.html'));
});

export default app;