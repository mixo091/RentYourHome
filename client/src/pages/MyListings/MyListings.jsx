import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from 'react-modal';
import "./MyListings.css"

function MyListings() {
    const [listings, setListings] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentListing, setCurrentListing] = useState({});
    const openModal = (listing) => {
        setCurrentListing(listing);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleModalUpdate = () => {
        const updatedData = {
            title: currentListing.title,
            desc: currentListing.desc,
            country: currentListing.country,
            city: currentListing.city,
            rooms: currentListing.rooms,
            price: currentListing.price
        };
        updateListing(currentListing.id, updatedData);
        closeModal();
    };

    const currUser = JSON.parse(localStorage.getItem("user"));
    const fetchListings = async () => {
        try {
            const response = await axios.get(`http://localhost:3008/api/listings/owned/${currUser.id}`, {
                headers: {
                    'authorization': JSON.parse(localStorage.getItem('accessToken')),
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
            setListings(response.data);
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        fetchListings();
    }, [currUser.id]);


    const handleDelete = async (id) => {
        // Ask the user to confirm the deletion
        const userConfirmed = window.confirm("Are you sure you want to delete this listing?");
    
        if (userConfirmed) {
            try {
                const response = await axios.delete(`http://localhost:3008/api/listings/delete/${id}`);
                console.log(response.data); // Log the response from the server
    
                // Re-fetch listings after deletion
                fetchListings();
    
            } catch (error) {
                console.error("Error deleting listing:", error);
            }
        } else {
            console.log("User canceled the deletion");
        }
    }
    

    // const handleUpdate = (id, currentTitle) => {
    //     const newTitle = window.prompt("Update your listing title:", currentTitle);
    //     if (newTitle && newTitle !== currentTitle) {
    //         updateListing(id, { title: newTitle });
    //     }
    // }

    const updateListing = async (id, updatedData) => {
        try {
            await axios.put(`http://localhost:3008/api/listings/update/${id}`, updatedData, {
                headers: {
                    'authorization': JSON.parse(localStorage.getItem('accessToken')),
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            fetchListings(); // Refresh listings
        } catch (err) {
            console.log(err);
        }
    }
    

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

  

    const allowances =  [" Wifi"," TV"," Air Conditioning", " Hair Dryer" , " Parking" ," Washing Machine"]

    return (
        <div className="MyListings">
            <h2 className="page-title">My Listings</h2>
            <div className="listingsContainer">
                {listings.map(listing => (
                    <div key={listing.id} className="listingCard">
                        <h2 className="Title">{listing.title}</h2>
                        <img src={`http://localhost:3008/shared/${listing.pic}`} alt={listing.pic} className="listingImage"/>
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
                        
            <Modal className="Modal"
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Update Listing"
            >
                <span>Update Listing</span>
                
                <label>
                    Title:
                    <input
                        value={currentListing.title || ''}
                        onChange={(e) => setCurrentListing(prev => ({ ...prev, title: e.target.value }))}
                    />
                </label>
                
                <label>
                    Description:
                    <textarea
                        value={currentListing.desc || ''}
                        onChange={(e) => setCurrentListing(prev => ({ ...prev, desc: e.target.value }))}
                    />
                </label>

                <label>
                    Country:
                    <input
                        value={currentListing.country || ''}
                        onChange={(e) => setCurrentListing(prev => ({ ...prev, country: e.target.value }))}
                    />
                </label>

                <label>
                    City:
                    <input
                        value={currentListing.city || ''}
                        onChange={(e) => setCurrentListing(prev => ({ ...prev, city: e.target.value }))}
                    />
                </label>

                <label>
                    Rooms:
                    <input
                        type="number"
                        value={currentListing.rooms || ''}
                        onChange={(e) => setCurrentListing(prev => ({ ...prev, rooms: e.target.value }))}
                    />
                </label>

                <label>
                    Price:
                    <input
                        type="number"
                        value={currentListing.price || ''}
                        onChange={(e) => setCurrentListing(prev => ({ ...prev, price: e.target.value }))}
                    />
                </label>

                <button onClick={handleModalUpdate}>Save Changes</button>
                <button onClick={closeModal}>Cancel</button>
            </Modal>

                        <button onClick={() => openModal(listing)}>Update</button>
                        <button onClick={() => handleDelete(listing.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyListings