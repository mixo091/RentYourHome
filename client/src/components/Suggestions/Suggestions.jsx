import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import "./Suggestions.css"
import { Link } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import { format } from "date-fns";

function Suggestions() {

    const  currentDate = new Date();
    const navigate = useNavigate()

    const [PropertyList, setPropertyList] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem("user"));


    useEffect(() => {
        axios.get("http://localhost:3008/api/listings/nine", {
          params: {
            userId : currentUser?.id
          }
        })
        .then (function (response) {
          console.log("current user id : ", currentUser?.id)
          console.log(response.data);
          setPropertyList(response.data); // update the state
        })
        .catch(error => {
          console.log(error);                        
        })
      }, [])

  return (
    <div  className='featured'>
        <div className="fp">       
            {PropertyList.map((property,i)=>(
          
                <div key={i} className="fpItem"   >
                <img
                  src={`http://localhost:3008/shared/${property.pic}`}
                  alt=""
                  className="fpImg"
                />
                <div className="info">
                  <div className="fpLocation">{property.city},{property.country}</div>
                  <div className="fpRating">
                      <button >9.3</button>
                  </div>
                </div>
                <div className="fpDesc">{property.desc}</div>
                <span className="fpPrice">${property.price} <span className='perNight'>/per night</span></span>
                <button className="siCheckButton" onClick={()=>{
                navigate(`/listings/${property.id}` , { state: format(currentDate,"yyyy-MM-dd")})
                }}>See More</button>
                </div>            
            ))}

        </div>
    </div>
  );
}

export default Suggestions


