import express from "express";
import { addListing, getListings, getListingsIn } from "../controllers/listing.js";
import { getNine } from "../controllers/listing.js";
import { getHotel } from "../controllers/listing.js";
import { getOwned } from "../controllers/listing.js";
import { deleteListing } from "../controllers/listing.js";
import { getListingsCountryCity } from "../controllers/listing.js";
import { getListingsById } from "../controllers/listing.js";
import { upload } from '../controllers/listing.js'
import { updateListing } from "../controllers/listing.js";
import { db } from "../connect.js";


const router = express.Router();

router.get('/test1',(req,res)=>{
    console.log(req.cookies['name']);
    res.send("It works!!");
})






router.get("/owned/:userId", getOwned);
router.get("/", getListingsCountryCity)
router.get("/get", getListingsById)

router.post("/add",upload.single('pic'), addListing);
router.put("/update/:id", updateListing);
router.get("/nine" ,getNine);
router.get("/in",getListingsIn)
router.get("/find", getHotel);
router.delete("/delete/:id" , deleteListing);

router.get("/filtered",   (req, res) => {
    console.log("okok")  
    const { country, city, startDate, endDate,  rooms, minPrice, maxPrice } = req.query;

    console.log(country, city, startDate, endDate);

    // Dynamic query parts based on provided filters
    const conditions = [];
    const params = [];


    const dateConditions = [];
    if (startDate && endDate) {
        dateConditions.push("(r.start_date < ? AND r.end_date > ?)");
        dateConditions.push("(r.start_date < ? AND r.end_date > ?)");
        dateConditions.push("(r.start_date < ? AND r.end_date > ?)");
        params.push(startDate, endDate, startDate, startDate, endDate, endDate);
    }


    
    if (country) {
        conditions.push("l.country = ?");
        params.push(country);
    }

    if (city) {
        conditions.push("l.city = ?");
        params.push(city);
    }

    if (rooms) {
        conditions.push("l.rooms = ?");
        params.push(rooms);
    }

    if (minPrice) {
        conditions.push("l.price >= ?");
        params.push(minPrice);
    }

    if (maxPrice) {
        conditions.push("l.price <= ?");
        params.push(maxPrice);
    }

    let query = "SELECT DISTINCT l.* FROM listings l";

    if (dateConditions.length) {
        query += " LEFT JOIN reservations r ON l.id = r.listing_id AND (" + dateConditions.join(" OR ") + ")";
    }

    if (conditions.length || dateConditions.length) {
        query += " WHERE ";
        if (conditions.length) query += conditions.join(" AND ");
        if (conditions.length && dateConditions.length) query += " AND ";
        if (dateConditions.length) query += "r.listing_id IS NULL";
    }

    console.log(query);
    console.log(params);
        db.query(query, params,(err, data) => {
            if (err) return res.status(500).json(err);
            if (data.length) return res.status(200).json(data);
          });
       

    
});


export default router