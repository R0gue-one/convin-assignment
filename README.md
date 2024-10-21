# Expense Sharing Web App
## About
This backend service is designed for a Daily Expenses Sharing Application. The app allows users to add expenses and split them using three different methods: exact amounts, percentages, and equal splits. 
It also provides features to manage users, validate inputs, and generate downloadable balance sheets for individual and overall expenses.

## Features

- **User Management**
  - User registration and authentication
  - User profile management with email, name, and mobile number

- **Expense Management**
  - Add new expenses
  - Split expenses using three methods:
    1. Equal Split
    2. Exact Amount Split
    3. Percentage Split
  - View individual expenses
  - View overall expense of all users
  - Generate and download balance sheets

## Technology Stack

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT) for authentication
  
## Installation

1. Clone the repository
```bash
git clone git@github.com:R0gue-one/convin-assignment.git
cd convin-assignment
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the `backend` folder with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000
```
 or you can download the file frome [here](https://drive.google.com/file/d/17xrcvhwWO3dkmZQndqUO_WVnM0xlUhRu/view?usp=drive_link)

4. Start the server
```bash
npm start
```


## API Endpoints

### Authentication
- `POST /signup` - Register a new user
- `POST /login` - Login user

### User Management
- `POST /addFriend` - Add a friend

### Expense Management
- `POST /expense` - Add a new expense
- `GET /balanceSheet` - Get user's balance sheet
- `GET /balanceSheet-overall` - Get overall expenses
- `GET /balanceSheet/download` - Download balance sheet
