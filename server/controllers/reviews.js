import jwt from "jsonwebtoken";
import { db } from "../connect.js";

export const createReview = (req,res)=>{
  const q = "INSERT INTO reviews(`reviewer_id`, `listing_id`, `rating`, `review`) VALUES (?)"

  console.log(req.body.params);

  const values = [
    req.body.params.reviewer_id,
    req.body.params.listing_id,
    req.body.params.rating,
    req.body.params.review
  ]

  console.log(values);

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Reservation has been added.");
  });
}