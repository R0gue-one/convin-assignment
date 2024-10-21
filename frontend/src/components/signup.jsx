import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from '../contexts/UserContext';


const Register = () => {
  const {user ,setUser}=useContext(UserContext)  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const nav = useNavigate();

  const submit = async () => {
    const response = await fetch('http://localhost:3000/signup', {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
        mobile: mobile
      }),
    })

    const json = await response.json();
    if(response.status == 200){
      console.log("signup success");
      localStorage.setItem('user', JSON.stringify(json.email));
      localStorage.setItem('token', JSON.stringify(json.token));
      nav('/');
      console.log(json);
      setUser(json)
      console.log(user)
    }
  }

  return(
    <div className="flex items-center justify-center h-screen ">
    <div className="bg-white p-8 border-4 border-violet-900 rounded-lg w-96 space-y-6">
      <h1 className="text-center text-2xl font-bold">Register</h1>
      <label className="block">
        <span className="block text-gray-700">Email</span>
        <input
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-violet-900"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label className="block">
        <span className="block text-gray-700">Name</span>
        <input
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-violet-900"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </label>


      <label className="block">
        <span className="block text-gray-700">Mobile Number</span>
        <input
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-violet-900"
          type="tel"
          onChange={(e) => setMobile(e.target.value)}
        />
      </label>


      <label className="block">
        <span className="block text-gray-700">Password</span>
        <input
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-violet-900"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      
      <div className="text-center">
        <button
          className="mt-4 px-4 py-2 bg-violet-900 text-white rounded-md hover:bg-violet-700"
          type="submit"
          onClick={submit}
        >
          Submit
        </button>
      </div>
    </div>
  </div>
);
}

export default Register;
