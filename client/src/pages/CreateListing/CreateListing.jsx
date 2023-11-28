import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import './CreateListing.css'

const CreateListing = () => {
  // states
  const [acommodations, setAcommodations] = useState([]);
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [pic, setPic] = useState("");
  const [city, setCity] = useState("");
  const [country,setCountry] = useState("");
  const [desc,setDesc] = useState("");
  const [rooms,setRooms] = useState("");

  const accommodationOptions = ["Wifi", "TV", "Air Conditioning", "Hair Dryer", "Parking", "Washing Machine"];

  const navigate = useNavigate()

  // This is a function to save a a picture on the uploads folder.
  const savePicture = () => {


  }
  
  const handleClick = async (e) => {
    e.preventDefault();

    console.log(acommodations);

    //Get Form Data.

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("rooms", rooms);
      formData.append("desc", desc);
      formData.append("country", country);
      formData.append("city", city);
      formData.append("pic", pic);
      formData.append("acommodations", acommodations);
  
      await axios.post("http://localhost:3008/api/listings/add", formData, {
        headers: {
          'authorization': JSON.parse(localStorage.getItem('accessToken')),
          'Content-Type': 'multipart/form-data', // Important for file upload
          "user": localStorage.getItem("user")
        }
      });
      navigate("/mylistings");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create-container">
        <div className="create-items">
        <h3>Create Listing</h3>

        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Desc"
          onChange={(e) => setDesc(e.target.value)}
        />

        <input
          type="number"
          min="0" 
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="number"
          min="0" 
          placeholder="Rooms"
          onChange={(e) => setRooms(e.target.value)}
        />

        <input
          type="text"
          placeholder="Country"
          onChange={(e) => setCountry(e.target.value)}
        />

        <input
          type="text"
          placeholder="City"
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="file"
          placeholder="Pic"
          onChange={(e) => setPic(e.target.files[0])}
        />

        <div className="accommodations">
            <h4>Accommodations</h4>
            {accommodationOptions.map(option => (
                <div key={option} className="accommodation-option">
                    <input 
                        type="checkbox" 
                        value={option}
                        onChange={(e) => {
                            if (e.target.checked) {
                                setAcommodations([...acommodations, e.target.value]);
                            } else {
                                setAcommodations(acommodations.filter(accommodation => accommodation !== e.target.value));
                            }
                        }}
                    />
                    <label>{option}</label>
                </div>
            ))}
        </div>

        <button onClick={handleClick}>Add Listing</button>   

        </div>
    </div>
  );
};

export default CreateListing;