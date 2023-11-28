import React from 'react'
import "./Register.css"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react'

function Register() {

  const ROLES = {
    'Admin' : 1,
    'Host' : 2,
    'Renter' : 3,
    'Anonymous' : 4
  }

  const [inputs, setInputs] = useState({
    username: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmpassword: "",
    role: []
  });

  const [hostRegister, setHostRegister] = useState(false);
  const [registryDone, setRegistryDone] = useState(false);
  const [pwMatchError, setpwMatchError] = useState(false);
  const [UserNameEmailError, setUserNameEmailerror] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "role") {
      // Update the roles array based on the checkbox status
      const updatedRoles = checked
        ? [...inputs.role, value]
        : inputs.role.filter((role) => role !== value);

      setInputs((prev) => ({
        ...prev,
        role: updatedRoles,
      }));
    } else {
      setInputs((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
};

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // console.log(inputs);
      // const data = {
      // ...inputs,
      // role: Array.isArray(inputs.role) ? inputs.role : [inputs.role]
      // };
      // console.log("front role inputs : ", inputs.role);
      if (inputs.password === inputs.confirmpassword) {
        // Passwords match
        console.log('Passwords match:', inputs.password);
        const res = await axios.post("http://localhost:3008/api/auth/register", inputs);
        if(res.status === 409){
          console.log("Registration error!");
          setUserNameEmailerror(true);
        }
        setRegistryDone(true);
        if(inputs.role.includes('Host')){
          console.log("Host user");
          setHostRegister(true);
        }
        // Proceed with registration logic
      } else {
        setpwMatchError(true);
      }
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className='register'>

      {hostRegister && (<h2>Your host application is pending</h2>)}
      {registryDone && (<h2>Successfull user registration</h2>)}

      {!registryDone && (
        <form >
          <h1>Sign Up</h1>
            <div className="name-input">
              <div>
                <label>First Name :</label>
                <input type="text"  name='name' placeholder='name' onChange={handleChange}/>
              </div>
              <div>
                <label>Surname :</label>
                <input type="text" name='surname' placeholder='surname'onChange={handleChange}/>
              </div>
            </div>
            <label>Email :</label>
            <input type="text"  name='email' placeholder='email'onChange={handleChange} />
            <label>Username :</label>
            <input type="text"  name='username' placeholder='username' onChange={handleChange}/>
            <label>Password :</label>
            <input type="password" name='password' placeholder='password' onChange={handleChange} />
            <label>Confirm password :</label>
            <input type="password" name='confirmpassword' placeholder='confirm password' onChange={handleChange} />
            {pwMatchError && (<h2>Passwords do not match</h2>)}
            {UserNameEmailError && (<h2>Passwords do not match</h2>)}
            <div className="roles">
              <p>Choose your role: </p>
              <input type="checkbox" id="answer1" name="role" value="Host" onChange={handleChange}/>
              <label htmlFor="answer1">Host</label><br></br>
              <input type="checkbox" id="answer2" name="role" value="Renter" onChange={handleChange}/>
              <label htmlFor="answer2">Renter</label><br></br>
              {/* <input type="checkbox" id="answer0" name="role" value="Admin" onChange={handleChange}/>
              <label htmlFor="answer0">Admin</label><br></br> */}
              <br></br>
            </div>
            <button onClick={handleClick}>Sign Up</button>
        </form>
      )}
    </div>
  )
}

export default Register