# findPool
Find cars going in the same direction as you, and preserve the planet (and your wallet).

Demo hosted at: http://139.59.70.7:8082/

The project is built using React/ Redux, and Express as server.

To start the WebApp, server and client needs to be bundled separately (this is to separate frontend and server bundling logic.)

More focus is given on JS, and less on UI. Also, there is no DB used, any login sessions/ registrations are stored in server memory, and will be lost if you make changes to server/ restart server.

1)  To start server, go to /server, and
  a)  execute `yarn` ('make you have yarn installed').
  b)  execute `yarn run start`. (P.S. Port is set to 8082, to change, goto /server/src/index.js)

2)  To bundle client, go to /client, and
  a)  execute `yarn` ('make you have yarn installed').
  b)  execute `yarn run build:prod`.

3) To goto app, go to http://localhost:8082

