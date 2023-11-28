import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyListings/MyListings.css"

function Admin() {
    const [users, setUsers] = useState([]);
    const currUser = JSON.parse(localStorage.getItem("user"));
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3008/api/users/getAllUsers');
            console.log(response.data);
            setUsers(response.data);
            console.log(users)
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        fetchUsers();
    }, [] );


    // const handleDelete = async (id) => {
    //     // Ask the user to confirm the deletion
    //     const userConfirmed = window.confirm("Are you sure you want to delete this listing?");
    
    //     if (userConfirmed) {
    //         try {
    //             const response = await axios.delete(`http://localhost:3008/api/listings/delete/${id}`);
    //             console.log(response.data); // Log the response from the server
    
    //             // Re-fetch listings after deletion
    //             fetchListings();
    
    //         } catch (error) {
    //             console.error("Error deleting listing:", error);
    //         }
    //     } else {
    //         console.log("User canceled the deletion");
    //     }
    // }
    
    

    // // Update listing
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

    // const allowances =  [" Wifi"," TV"," Air Conditioning", " Hair Dryer" , " Parking" ," Washing Machine"]

    return (
        <div className="MyListings">
            <h2 className="page-title">My Listings</h2>
            <div className="listingsContainer">
                {users.map(user => (
                    <div key={user.id} className="listingCard">
                        <h2 className="Title">{user.name}</h2>
                        {/* <img src={`http://localhost:3008/shared/${listing.pic}`} alt={listing.pic} className="listingImage"/> */}
                        {/* <p className="desc">{us}</p> */}
                        {/* <p className="price">Price: {listing.price}$ per night</p> */}
                        <hr></hr>
                        <div className="area">
                            <div>
                                {/* <p>Country: {listing.country} </p> */}
                                {/* <p>Location: {listing.city} </p> */}
                            </div>
                        </div>
                        <div className="spaces">
                            {/* <p> rooms: {listing.rooms} </p> */}
                            <p> baths: {3}</p>
                            <p> beds: {4}</p>
                        </div>
                        <hr></hr>
                        <div className="accommodations">Accommodations</div>
                        {/* <div className="allowances">
                            {allowances.map(item => (
                                <div key={item}><div className="circle"></div>{ item}</div>
                            ))}
                        </div>
                         */}
                        
                        {/* Add other listing details you want to display */}
                        {/* <button onClick={() => updateListing(listing.id, updatedData)}>Update</button>
                        <button onClick={() => handleDelete(listing.id)}>Delete</button> */}
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Admin;