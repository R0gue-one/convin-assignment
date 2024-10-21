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
cd convin-assignment/backend
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


## API Endpoints and Usage

### Authentication
- `POST /signup` - Register a new user
- `POST /login` - Login user
  <br>
  
#### Signup:
Body:
```
{
    "email": "jason@gmail.com",
    "name": "jason",
    "mobile": 96453219656,
    "password": "******"
}
```

Response:
![image](https://github.com/user-attachments/assets/473de5cf-fc04-45b5-a188-d9d2956a04fc)
error handling:
![image](https://github.com/user-attachments/assets/3083c6ce-8fe0-48f4-a43d-dab6c4b4352b)

#### Login:
Body:
```
{
    "email": "jatin@email.com",
    "password": "********"
}
```

Response:
![image](https://github.com/user-attachments/assets/b760fb15-ba4d-427c-ba90-8c2086b756f2)

Error handling:
![image](https://github.com/user-attachments/assets/62aaac04-6803-408c-976a-d4f5e30423bf)
![image](https://github.com/user-attachments/assets/e5edca8a-cb58-4540-b06f-9f7ead6637d8)


### User Management
- `POST /addFriend` - Add a friend

  <br>
Body:
```
{
    "friendEmail": "vansh@gmail.com"
}
```
Authorization:
![image](https://github.com/user-attachments/assets/e457526c-fd39-43d0-8782-1f791ec76e8b)

Response:<br>
![image](https://github.com/user-attachments/assets/7c5cb8ed-3dab-4934-b9e6-97a9e42f970b)

### Expense Management
- `POST /expense` - Add a new expense
- `GET /balanceSheet` - Get user's balance sheet
- `GET /balanceSheet-overall` - Get overall expenses
- `GET /balanceSheet/download` - Download balance sheet
<br>

#### Expense
body:
```
{
  "expenseID": "exp1",
  "payer": "jatin@email.com",
  "amount": 1000,
  "participants": [
    {
      "email": "jatin@email.com",
      "name": "Jatin",
      "owed": 70,
      "paid": true
    },
    {
      "email": "vansh@gmail.com",
      "name": "Vansh",
      "owed": 30,
      "paid": false
    }
  ],
  "splitType": "percentage",
  "splitDetails": "McD"
}
```

response:
![image](https://github.com/user-attachments/assets/69a44e07-0fb6-47be-9144-e6f0b41e14d1)
