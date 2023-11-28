import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RemoveUser = () => {

  const [inputs, setInputs] = useState({
    name: "",
  });

  const navigate = useNavigate();

  const handleChange = async (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      console.log("Server is getting inputs : ", inputs);
      const res = await axios.post("https://localhost:3008/api/users/removeUser", inputs);
      console.log("Res from server : ", res.data);
      navigate("/");
    } catch (err) {
      console.log("Oops removeUser " + err)
    }
  }

  return(
    <div className="remove-user">
      <h2>Remove User</h2>
      <input required type="text" name="name" placeholder="username" onChange={handleChange}></input>
      <button onClick={handleSubmit}>Remove</button>
    </div>
  )
}

export default RemoveUser;