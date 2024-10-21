import { useState } from 'react'
import './App.css'
// import Layout from './Layout.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/login.jsx';
import SignupPage from './components/signup.jsx';
import UserContextProvider from './contexts/UserContextProvider';
import HomePage from './components/home.jsx';
import ExpensePage from './components/expense.jsx';

// import ProblemPage from './components/ProblemDetails/ProblemsDetail.jsx'
// import SubmissionPage from './components/Submissions/submissions';


function App() {
  const [count, setCount] = useState(0)

  return (
  <UserContextProvider>
  <Router>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/signup" Component={SignupPage} /> 
        <Route path="/expense" Component={ExpensePage} /> 
        {/* <Route path="/problems" Component={AllProblemsPage} />  */}
        {/* <Route path="/problems/:problemId" element={<ProblemPage/>} /> */}
        {/* <Route path="/submissions" element={<SubmissionPage/>} /> */}
      </Routes>
    </Router>
  </UserContextProvider>
  )
}

export default App
