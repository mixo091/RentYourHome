import React from 'react'
import Suggestions from '../../components/Suggestions/Suggestions.jsx';
import "./Home.css"
import { DateRange } from 'react-date-range';
import { useState } from 'react'
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const handleSearch = () => {
    navigate("/listings", { state: { country, city , date, options } });
  };


  /* States */
  const [city, setCity] = useState("");
  const [country , setCountry] = useState("")
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  

  return (
    <div className="home-container">

      <div className="rent-form">
        <h1>Your Dream Accommodation Awaits</h1>
        
        <div className='search-container'>
          <div className="search-item">
            <label >search city</label>
            <input  onChange={(e) => setCity(e.target.value)} type="text" name="city" placeholder='city' className='search-input'/>
          </div>
          <div className="search-item">
            <label >search country</label>
            <input  onChange={(e) => setCountry(e.target.value)} type="text" name="country" placeholder='country' className='search-input'/>
          </div>
          <div className="search-item">
          <span onClick={() => setOpenDate(!openDate)} className="search-text">
            {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
              date[0].endDate,"MM/dd/yyyy"
            )}`}</span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="date"
                minDate={new Date()}
                />
            )}
          </div>
          <div className="search-item">
          <span
                    onClick={() => setOpenOptions(!openOptions)}
                    className="headerSearchText"
                  >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                  {openOptions && (
                    <div className="options">
                      <div className="optionItem">
                        <span className="optionText">Adult</span>
                        <div className="optionCounter">
                          <button
                            disabled={options.adult <= 1}
                            className="optionCounterButton"
                            onClick={() => handleOption("adult", "d")}
                          >
                            -
                          </button>
                          <span className="optionCounterNumber">
                            {options.adult}
                          </span>
                          <button
                            className="optionCounterButton"
                            onClick={() => handleOption("adult", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="optionItem">
                        <span className="optionText">Children</span>
                        <div className="optionCounter">
                          <button
                            disabled={options.children <= 0}
                            className="optionCounterButton"
                            onClick={() => handleOption("children", "d")}
                          >
                            -
                          </button>
                          <span className="optionCounterNumber">
                            {options.children}
                          </span>
                          <button
                            className="optionCounterButton"
                            onClick={() => handleOption("children", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="optionItem">
                        <span className="optionText">Room</span>
                        <div className="optionCounter">
                          <button
                            disabled={options.room <= 1}
                            className="optionCounterButton"
                            onClick={() => handleOption("room", "d")}
                          >
                            -
                          </button>
                          <span className="optionCounterNumber">
                            {options.room}
                          </span>
                          <button
                            className="optionCounterButton"
                            onClick={() => handleOption("room", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
          </div>
          <div className="search-item">
            <button className="search-btn" onClick={handleSearch}><FontAwesomeIcon icon={faSearch} /></button>
          </div>
        </div>
    </div>

    {currentUser && <Suggestions></Suggestions>}

  
    </div>
  )
}

export default Home