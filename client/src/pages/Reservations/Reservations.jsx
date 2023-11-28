import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Reservations.css"

function Reservations() {
    const [listings, setListings] = useState([]);

    const [review, setReview] = useState({
    rate: 0,
    review: "",
  });
    const currUser = JSON.parse(localStorage.getItem("user"));
    
    const fetchListings = async () => {
        // console.log(currUser.id)
        try {
          const response = await axios.get("http://localhost:3008/api/reservations/getUserReservations",
            {
              params: {
                renterID: currUser.id
              }
            });
            // console.log(response.data.length);
            const listings = [];
            // const result = [];
            for (let item=0; item<response.data.length; item++){
              listings.push(response.data[item].listing_id);
            }

       
            try{
              const response1 = await axios.get("http://localhost:3008/api/listings/get",
              {
                params: {
                  listingID: listings
                }
              });
              // result.push(response1.data);
              setListings(response1.data);
            }
            catch(err){
              console.log(err);
            }
            // console.log("Not this", listings)
            // console.log("RESULT : ", response1.data);
          // I get listing ids and then query for setListings
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
    setReview((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


    useEffect(() => {
        fetchListings();
    }, [currUser.id]);
    
    //Review
    const reviewListing = async (listID, userID) => {

      try{
        console.log(currUser.id);
        console.log(listID);
        // const rev = "Very nice!";
        const res = await axios.post("http://localhost:3008/api/reviews/createReview",
        {
          params: {
            reviewer_id: currUser.id,
            listing_id: listID,
            rating: review.rate,
            review: review.review
          }
        });
        console.log(res.data)
      }
      catch(err){
        console.log(err);
      }
    }

    // Update listing
    // const updateListing = async (id, updatedData) => {
    //     try {
    //         await axios.put(`http://localhost:3008/api/listings/update/${id}`, updatedData, {
    //             headers: {
    //                 'authorization': JSON.parse(localStorage.getItem('accessToken')),
    //                 'Accept' : 'application/json',
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         // Re-fetch listings after update
    //         fetchListings();
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    const allowances =  [" Wifi"," TV"," Air Conditioning", " Hair Dryer" , " Parking" ," Washing Machine"]

    return (
        <div className="MyListings">
            <h2 className="page-title">My Reservations</h2>
            <div className="listingsContainer">
      
              {  Array.isArray(listings) && listings.map(listing => (
                    <div key={listing.id} className="listingCard">
                        <h2 className="Title">{listing.title}</h2>
                        <img src={"./house-1477041_640.jpg"} alt={listing.title} className="listingImage"/>
                        <p className="desc">{listing.desc}</p>
                        <p className="price">Price: {listing.price}$ per night</p>
                        <hr></hr>
                        <div className="area">
                            <div>
                                <p>Country: {listing.country} </p>
                                <p>Location: {listing.city} </p>
                            </div>
                        </div>
                        <div className="spaces">
                            <p> rooms: {listing.rooms} </p>
                            <p> baths: {3}</p>
                            <p> beds: {4}</p>
                        </div>
                        <hr></hr>
                        <div className="accommodations">Accommodations</div>
                        <div className="allowances">
                            {allowances.map(item => (
                                <div key={item}><div className="circle"></div>{ item}</div>
                            ))}
                        </div>
                        
                        
                        {/* Add other listing details you want to display */}
                        <form>
                          <label>Rating</label>
                          <input name="rate" type="number" min="1" max="5" onChange={handleChange}/>
                          <label>Review</label>
                          <input name="review" type="text" onChange={handleChange}/>
                          <button onClick={() => reviewListing(listing.id, )}>Review</button>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Reservations