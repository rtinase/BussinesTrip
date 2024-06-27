## Quick Start


The program has two modules (programs): backend (a server with node) and frontend (react)
To let the program to function properly, the server is needed.

As a prerequisite you have to have:

```
npm
js
node.js
```

To start the program, inside BussinesTrip folder go to backend and start the server:
(For the first time you will need ```express``` module. If you have it already, you can skip second step)

```
cd backend
npm install express    // skip if you have it
node server.js
```

Then open a new terminal (you are not allowed to do something in the terminal with the server while it works) and start the frontend:
(For the first time you will need ```cross-env``` module. If you have it already, you can skip second step)

```
cd frontend
npm install cross-env    // skip if you have it
npm start
```

Now everything works!


