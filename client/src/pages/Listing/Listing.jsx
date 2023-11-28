import React from 'react'
import "./Listing.css"
import { useState } from 'react';
import { AuthContext } from '../../context/context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import format from 'date-fns/format';

function Listing() {
  const [confirmBookingModal, setConfirmBookingModal] = useState(false);
  const [Listing, setListing] = useState([]);
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [date, setDate] = useState(location.state.date || null);
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    axios.get(`http://localhost:3008/api/listings/find?id=${id}`).then(response => {
      setListing(response.data);
    });
  }, []);

  const openConfirmModal = () => {
    setConfirmBookingModal(true);
  };

  const closeConfirmModal = () => {
    setConfirmBookingModal(false);
  };

  const handleClick = () => {
    openConfirmModal();
  };
 

  const handleBooking = async () => {


    console.log(Listing);
    console.log(isLoading);
    //console.log(user);
    
    if (currentUser) {
      // Make Reservation.
      const dateObject = new Date(date[0].startDate);
      const startDate = dateObject.toISOString().split('T')[0];
      const dateObject1 = new Date(date[0].endDate);
      const endDate = dateObject1.toISOString().split('T')[0];
      const values = [
          id,
          currentUser.id,
          startDate,
          endDate,
      ];

      const endpointUrl = 'http://localhost:3008/api/reservations/createReservation';

      try {
          await axios.post(endpointUrl, {
              listing_id: values[0],
              renter_id: values[1],
              start_date: values[2],
              end_date: values[3]
          });
          
          console.log('Data sent successfully!');
      } catch (error) {
          console.error('Error sending data:', error);
      }
    } else {
      navigate("/login");
    }

    

    closeConfirmModal();
  };

  return (
    <div className="hotelContainer">
      <div className="hotelWrapper">
        <button className="bookNow" onClick={handleClick}>Reserve or Book Now!</button>
        <h1 className="hotelTitle">{Listing[0]?.title}</h1>
        <div className="hotelAddress">
          <span>Elton St 125 New york</span>
        </div>
        <span className="hotelDistance">
          Excellent location – 500m from center
        </span>
        <span className="hotelPriceHighlight">
          Book a stay over {Listing[0]?.price}$ at this property and get a free airport taxi
        </span>
        <div className="hotelImages">
          <div className="hotelImgWrapper">
            <img
              alt=''
              src={`http://localhost:3008/shared/${Listing[0]?.pic}`}
              className="hotelImg"
            />
          </div>
        </div>
        <div className="hotelDetails">
          <div className="hotelDetailsTexts">
            <h1 className="hotelTitle">Stay in the heart of City</h1>
            <p className="hotelDesc">
              {Listing[0]?.desc}
            </p>
          </div>
          <div className="hotelDetailsPrice">
            <h1>Perfect for a 9-night stay!</h1>
            <span>
              Located in the real heart of Krakow, this property has an
              excellent location score of 9.8!
            </span>
            <h2>
              <b>$945</b> (9 nights)
            </h2>
            <button onClick={handleClick}>Reserve or Book Now!</button>
          </div>
        </div>
        {confirmBookingModal && (
          <div className="modalBackground">
            <div className="modalContainer">
              <h2>Confirm Booking</h2>
              <p>Are you sure you want to book this listing?</p>
              <button onClick={handleBooking}>Yes, Book</button>
              <button onClick={closeConfirmModal}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Listing;
