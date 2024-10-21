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

## Demo Video


https://github.com/user-attachments/assets/4f03d66a-7a4a-4eb7-8d3c-8a1f44574fe6


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


Response:<br>
![image](https://github.com/user-attachments/assets/7c5cb8ed-3dab-4934-b9e6-97a9e42f970b)

### Expense Management
- `POST /expense` - Add a new expense
- `GET /balanceSheet/:email` - Get user's balance sheet
- `GET /balanceSheet-overall` - Get overall expenses
- `GET /balanceSheet/download/:email` - Download balance sheet
<br>

### Authorization
Auth:
![image](https://github.com/user-attachments/assets/e457526c-fd39-43d0-8782-1f791ec76e8b)

![image](https://github.com/user-attachments/assets/40c677ea-3038-4ed8-8dd6-6c34678d2603)

![image](https://github.com/user-attachments/assets/ecbe1ca0-692b-45f7-ab75-783ffc64cb0c)


### Expense
Body:
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

Response:
![image](https://github.com/user-attachments/assets/69a44e07-0fb6-47be-9144-e6f0b41e14d1)

Error handling:
1. percent given: 70, 20
   ![image](https://github.com/user-attachments/assets/06fd9501-a5cd-483a-aeec-29a35647a08d)
2. amount given: 700, 100, Total: 1000
   ![image](https://github.com/user-attachments/assets/c38e343f-6376-40f9-97c1-b87f9515516e)
3. Validating all input fields

#### Balance Sheet
1. Indivisual Balance Sheet
   GET Request: `http://localhost:3000/balanceSheet/jack@gmail.com` 
   ![image](https://github.com/user-attachments/assets/db922713-f137-402d-8bf7-37b734d082d5)
   <br><br>
2. Overall expense of all users
   GET Request: `http://localhost:3000/balanceSheet-overall`
   ![image](https://github.com/user-attachments/assets/3088ac7d-f1aa-44b5-98e1-d6ba17ca287e)

   <br><br>
3. Download balance sheet
   GET Request: `http://localhost:3000/balanceSheet/download/jack@gmail.com`
   ![CSV Format of Balance Sheet](https://github.com/user-attachments/assets/c793df64-0e88-4026-83ee-af771cacf3ef)
#### Note this is the visualised data from JSON
