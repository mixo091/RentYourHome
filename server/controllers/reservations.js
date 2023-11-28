import jwt from "jsonwebtoken";
import { db } from "../connect.js";

export const createReservation = (req,res)=>{
  const q = "INSERT INTO reservations(`listing_id`, `renter_id`, `start_date`, `end_date`) VALUES (?)"

  const values = [
    req.body.listing_id,
    req.body.renter_id,
    req.body.start_date,
    req.body.end_date
  ]

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Reservation has been added.");
  });
}


//  ==== Delete reservation with sprecified id  ==== //
export const deleteReservation = (req, res) => { 
  console.log("hitted delete reservation ")
  const id = req.params.id;
  let sql_query = `DELETE FROM reservations WHERE id = ${id}`;
  db.query(sql_query, (err, result) => {
    if (err) throw err;
    console.log(`Reservation with ID ${id} deleted`);
    res.send(`Reservation with ID ${id} deleted`);
  });
}
  
export const getAllReservations = (req,res)=>{
  const q = "SELECT * FROM reservations";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(200).json(data);
  });
}

export const getUserReservations = (req,res)=>{
  const q = "SELECT * FROM reservations WHERE renter_id=?";
  const renter = req.query.renterID;
  // console.log("Req body : ", renter)
  db.query(q, [renter], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(200).json(data);
    if(!data.length) return res.status(200).json("No reservations"); // Remove after testing
  });
}

export const getAvailability = (req,res) => {
  const q = "SELECT * FROM reservations";

  const values = [
    req.body.listing_id,
    req.body.start_date,
    req.body.end_date
  ]

  console.log(req.body)
  const date1 = req.body.start_date;
  const date2 =req.body.end_date;
  console.log(values[0]);
  console.log("dededede",date1);


  db.query(q, [values], (err, data) => {
    const start_date = new Date(date1);
    const end_date = new Date(date2);
    
    const reservation_res = data.filter((reservation)=>{
      const res_start_date = new Date(reservation.start_date);
      const res_end_date = new Date(reservation.end_date);
      console.log("res_start_date : ", res_start_date)
      console.log("res_end_date : ", res_end_date)
      // console.log((start_date < res_start_date && end_date > res_end_date))
      
      return((start_date < res_start_date && end_date > res_end_date) || ((start_date > res_start_date && start_date < res_end_date) || (end_date > res_start_date && end_date < res_end_date)))
    })

    console.log(reservation_res.length)

    if(reservation_res.length){
      console.log("Not available");
      return res.status(200).json("Not available")
    }
    else{
      console.log("Available");
      return res.status(200).json("Available")
    }

    // console.log("all good");

    // if (err) return res.status(500).json(err);
    // if (!reservation_res.length) return res.status(200).json("Not available");
  });
}