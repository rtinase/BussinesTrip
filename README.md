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


## General Information 

This website was not hosted, because the node.js module needs to be installed onto cloud hosting (what costs money)

## Website Functionality Summary

Trip Management: <br/>
View All Trips: Browse through a list of available trips. <br/>
Add Trip to List: Add trips to a personal list of selected trips. <br/>
View Selected Trips: See a list of selected trips with detailed information. <br/>

Trip Interaction: <br/>
Delete Trip: Remove a trip from the selected trips list. <br/>
Edit Trip: Modify trip details including title, start date, end date. <br/>
Save Changes: Save edited trip details to update the trip list. <br/>
Cancel Edit: Discard changes made during the edit process. <br/>

User Interface:<br/>
Snackbar Notifications: Receive notifications for actions like adding trips to the list. <br/>

Additional Features: <br/>
Back Navigation: Navigate back to the home page. <br/>
Delete All Trips: Delete all trips from the selected trips list in one go. <br/>
