import React from 'react'
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/SearchItem/SearchItem.jsx"
import "./Houses.css"
import useFetch from '../../hooks/useFetch';
import { useEffect } from 'react';
import axios from 'axios';


function Houses() {

        /* ------------------------- States ------------------------- */

        const [loadingData, setLoadingData] = useState(true);
        const [refreshData, setRefreshData] = useState(false);
        const location = useLocation();
        const [country, setCountry] = useState(location.state?.country || "");
        const [city, setCity] = useState(location.state?.city  ||  "" );
        const [date, setDate] = useState(location.state.date);
        const [baths,setBaths]  = useState("");
        const [rooms ,setRooms] = useState("");
        const [minPrice,setMinPrice]  = useState("");
        const [maxPrice,setMaxPrice]  = useState("");
        const [openDate, setOpenDate] = useState(false);
        const [startDate, setStartDate] = useState(`${format(
          date[0].startDate,
          "yyyy-MM-dd")}`);
        const [endDate, setEndDate] = useState(`${format(
          date[0].startDate,
          "yyyy-MM-dd")}`);
        const [availableListings, setAvailableListings] = useState([]);
        const [options, setOptions] = useState(location.state.options || null);

        

        /* ------------------------- Get Available (Filtered) Listings ------------------------- */

        const fetchAvailableListings = async () => {
          
          try {
              const response = await axios.get('http://localhost:3008/api/listings/filtered', {
                  params: {
                      country,
                      city,
                      startDate,
                      endDate
                  }
              });
              console.log(response.data)
              setAvailableListings(response.data);
          } catch (error) {
              console.error("Error fetching filtered listings:", error);
          }
      };


      useEffect(() => {
          fetchAvailableListings(); 
      }, []);  










        /*const { data, loading, error, reFetch } = useFetch(
          `http://localhost:3008/api/listings?country=${country}&city=${city}&bath=${baths}&rooms=${rooms}` ,refreshData
        );*/




      
       
     


        const handleClick = () => {

          setStartDate(`${format(
            date[0].startDate,
            "yyyy-MM-dd")}`);
          
          setEndDate(`${format(
            date[0].endDate,
            "yyyy-MM-dd")}`);
          fetchAvailableListings()

        };


   
        const [openOptions, setOpenOptions] = useState(false);
        const handleOption = (name, operation) => {
          setOptions((prev) => {
            return {
              ...prev,
              [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
            };
          });
        };
    
  return (
    <div>
      <div className="listContainer">
              <div className="listWrapper">
                <div className="listSearch">
                  <h1 className="lsTitle">Search</h1>
                  <div className="lsItem">
                    <label>Country</label>
                    <input placeholder={country} type="text" onChange={(e) => setCountry(e.target.value)} />
                  </div>
                  <div className="lsItem">
                    <label>City</label>
                    <input placeholder={city} type="text"  onChange={(e) => setCity(e.target.value)}/>
                  </div>
                  <div className="lsItem">
                    <label>Check-in Date</label>
                    <span className='Sdate' onClick={() => setOpenDate(!openDate)}>{`${format(
                      date[0].startDate,
                      "yyyy-MM-dd"
                    )} to ${format(date[0].endDate, "yyyy-MM-dd")}`}</span>
                    {openDate && (
                      <DateRange
                        onChange={(item) => setDate([item.selection])}
                        minDate={new Date()}
                        ranges={date}
                      />
                    )}
                  </div>
    
                  <div className="lsItem">

                    {/* Optional fields */}
                    <label>Options</label>
                    <div className="lsOptions">

                      {/* Rooms */}
                      <div className="lsOptionItem">
                        <span className="lsOptionText">Rooms</span>
                        <input placeholder={rooms} type="number" min={0} className="lsOptionInput" onChange={(e) => setRooms(e.target.value)} />
                      </div>
                      {/* Baths */}
                      <div className="lsOptionItem">
                        <span className="lsOptionText">Baths</span>
                        <input placeholder={baths} type="number" min={0} className="lsOptionInput" onChange={(e) => setBaths(e.target.value)} />
                      </div>
                      {/* Max price */}
                      <div className="lsOptionItem">
                        <span className="lsOptionText">Max Price per night</span>
                        <input type="number" min={0} className="lsOptionInput" />
                      </div>
                      {/* Min price */}
                      <div className="lsOptionItem">
                        <span className="lsOptionText">Min Price per night</span>
                        <input type="number" min={0} className="lsOptionInput" />
                      </div>
                      {/* Adults */}
                      <div className="lsOptionItem">
                        <span className="lsOptionText">Adult</span>
                        <input type="number" min={1} className="lsOptionInput" placeholder={options.adult}/>
                      </div>
                      {/* Children */}
                      <div className="lsOptionItem">
                        <span className="lsOptionText">Children</span>
                        <input type="number" min={0} className="lsOptionInput" placeholder={options.children}/>
                      </div>
                    </div>
                    {/* End of Optional fields */}

                  </div>


                  <button onClick={handleClick}>Search</button>
                </div>
                <div className="listResult">
                 
                
                      {availableListings.map((item) => (
                        <SearchItem item={item} key={item.id} date ={date} />
                      ))}
                    
                  
              
                </div>
              </div>
            </div>



    </div>
  )
}

export default Houses