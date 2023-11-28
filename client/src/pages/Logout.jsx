import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/context.js";

const Logout = () => {

  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate("/");
    } catch (err) {
      setError(err);
      console.log(err)
    }
  };
  
  return (
    <div className="auth">
        <button style={{backgroundColor:"black" ,fontWeight:"bold" ,color:"white", border:"none"}} onClick={handleSubmit}>Logout</button>
        {err && <p>{err}</p>}
    </div>
  );
};

export default Logout;