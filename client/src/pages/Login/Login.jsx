import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/context.js";
import "./Login.css"

const Login = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const ROLES = {
    'Admin' : 1,
    'Host' : 2,
    'Renter' : 3,
    'Anonymous' : 4
  }

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);


  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isEmpty = Object.values(inputs).every(x => x === null || x === '');
      if(!isEmpty){
        await login(inputs)
        const currUser = JSON.parse(localStorage.getItem("user"));
        // console.log("Login user role : ", currUser?.role);
        if(currUser?.role.includes(1)){
          navigate("/admin-dashboard")
        }
        else if(currUser?.role.includes(2)){
          navigate("/create") //Host's listings page
        }
        else if(currUser?.role.includes(3)){
          navigate("/") //Search listings page
        }
        else{
          navigate("/register") //Search listings page
        }
        // switch (currUser?.role) {
        //   case 1:
        //     navigate("/admin-dashboard");
        //     break;
        //   case 2:
        //     navigate("/create");
        //     break;
        //   case 3:
        //     navigate("/");
        //     break;
        //   default:
        //     navigate("/unauthorized");
        //     break;
        //   }
      }
      // console.log("login cu : ");
    } catch (err) {
      setError(err)
      console.log("Login error : ", err)
    }
  };

  return (
    <div className="auth">
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
        {!currentUser && (<div className="link su"><Link to="./register">Sign Up</Link></div>)}
        {err && <p>Invalid or incorrect user credentials, Try again!</p>}
      </form>
    </div>
  );
};

export default Login;