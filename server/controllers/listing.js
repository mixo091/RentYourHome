import jwt from "jsonwebtoken";
import { db } from "../connect.js";
import multer from 'multer'
import { spawn } from 'child_process';
import path from "path";

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { receiveMessageOnPort } from "worker_threads";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'../../SharedAssets/uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

export { upload };



//  ==== Add Listing with sprecified info  ==== //
export const addListing = (req, res) => {
    const token = req.headers['authorization'];

    console.log(token);
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "mistiko", (err, userInfo) => {
      if (err) return res.status(403).json(err);
      else{
        console.log(userInfo);
      }
      console.log(req.file);
      if(!req.file){
        req.file = "null";
      }
      console.log(req.body.acommodations);
      const q =
        "INSERT INTO listings(`title`, `desc`, `pic`, `price`, `rooms`,`country`,`city`,`host_id`, `acommodations`) VALUES (?)";
      
      const values = [
        req.body.title,
        req.body.desc,
        path.basename(req.file.path),
        req.body.price,
        req.body.rooms,
        req.body.country,
        req.body.city,
        userInfo.id,
        JSON.stringify(req.body.acommodations)
      ]

      console.log(values)

      upload.single('image');
      
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Listing has been added.");
      });  
    });
  };
  

//  ==== Delete Listing with sprecified id  ==== //
export const deleteListing = (req, res) => { 
  console.log("hitted delete listing ")
  const id = req.params.id;
  let sql_query = `DELETE FROM listings WHERE id = ${id}`;
  db.query(sql_query, (err, result) => {
    if (err) throw err;
    console.log(`Listing with ID ${id} deleted`);
    res.send(`Listing with ID ${id} deleted`);
  });
}


// ==== Update Listing ======= //

export const updateListing = (req, res) => {
  const listingId = req.params.id;

  let updateColumns = [];
  let updateValues = [];

  if (req.body.title) {
    updateColumns.push('title = ?');
    updateValues.push(req.body.title);
  }

  if (req.body.desc) {
    updateColumns.push('`desc` = ?');
    updateValues.push(req.body.desc);
  }

  if (req.body.price) {
    updateColumns.push('price = ?');
    updateValues.push(req.body.price);
  }

  if (req.body.rooms) {
    updateColumns.push('rooms = ?');
    updateValues.push(req.body.rooms);
  }

  if (req.body.country) {
    updateColumns.push('country = ?');
    updateValues.push(req.body.country);
  }

  if (req.body.city) {
    updateColumns.push('city = ?');
    updateValues.push(req.body.city);
  }

  if (req.body.acommodations) {
    updateColumns.push('acommodations = ?');
    updateValues.push(JSON.stringify(req.body.acommodations));
  }

  // Checking if any fields were provided for updating
  if (!updateColumns.length) {
    return res.status(400).json({ error: 'No fields provided for update' });
  }

  // Appending the listingId for the WHERE clause
  updateValues.push(listingId);

  const q = `
    UPDATE listings
    SET ${updateColumns.join(', ')}
    WHERE id = ?
  `;

  db.query(q, updateValues, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Listing has been updated.");
  });
};

  export const getListingsById = (req, res) => {
    const q = "SELECT * FROM listings WHERE id IN (?)";
    const listingID = req.query.listingID;
    console.log("Req body : ", listingID);
    db.query(q, [listingID], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(200).json(data);
      if(!data.length) return res.status(200).json("No listings"); // Remove after testing
    });
  };

  export const getOwned = (req, res) => {
    const userId = req.params.userId;
  
    // Assuming you are using mysql
    const q = "SELECT * FROM listings WHERE host_id = ?";
  
    db.query(q, userId, (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json(results);
    });
  };

  

// export const getNine = (req,res)=>{
//     // const q = "SELECT * FROM (SELECT * FROM listings ORDER BY id DESC LIMIT 12 ) sub ORDER BY id ASC";
//     // db.query(q, (err, data) => {
//     //     if (err) return res.status(500).json(err);
//     //     if (data.length) return res.status(200).json(data);
//     // });
//     const userId = req.params.user_id;

//     // Call your Python function using a child process
//     const pythonProcess = spawn('python', ['path/to/your/python_script.py', userId]);

//     pythonProcess.stdout.on('data', (data) => {
//       const recommendedListings = data.toString().trim().split('\n');
//       res.json({ recommendedListings });
//     });

//     const q = "SELECT * FROM listings WHERE id IN (?)";
//     const listingID = recommendedListings;
//     console.log("Req body : ", listingID);
//     db.query(q, [listingID], (err, data) => {
//       if (err) return res.status(500).json(err);
//       if (data.length) return res.status(200).json(data);
//       if(!data.length) return res.status(200).json("No listings"); // Remove after testing
//     });
// }

export const getNine = (req, res) => {
  const userId = req.query.userId;
  console.log("User id: ", userId);
  // Call your Python function using a child process
  const pythonProcess = spawn('python', ['./recommendationSys/RecSys.py', userId]);


  pythonProcess.stdout.on('data', (data) => {
    if (data){
    console.log("We got in");
    
    const recommendedListingsString = data.toString().trim().split('\n');
    console.log(recommendedListingsString);
    const correctedString = recommendedListingsString[0].replace(/'/g, '"');
    const recommendedListings = JSON.parse(correctedString);
    console.log("Recommendations : ", recommendedListingsString);
    // console.log(typeof recommendedListings)

    // Ensure you only proceed if you have recommendations
    if (recommendedListings.length === 0) {
      console.log("No recommendations");
      return res.status(404).json({ error: 'No recommendations found for the user.' });
    }
    else{
      console.log("Problem");
    }

    // Fetch listing data for the recommended listings
    const q = "SELECT * FROM listings WHERE id IN (?)";
    db.query(q, [recommendedListings], (err, data) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (data.length) {
        // console.log(data)
        return res.status(200).json(data);
      }
      return res.status(404).json({ error: 'No listings found for the recommendations.' });
    });

  }
  });

  pythonProcess.on('error', (err) => {
    console.error('Python script error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error("Python stderr:", data.toString());
    // Handle standard error output here
  });

  pythonProcess.on('exit', (code) => {
    if (code === 0) {
      // The Python script executed successfully (exit code 0)
      console.log('Python script executed successfully');
    } else {
      // The Python script encountered an error (non-zero exit code)
      console.error(`Python script exited with error code: ${code}`);
    }
  })
};

  //Get listings with specified Destination (city , country)

  export const getListingsIn = (req,res)=>{
    const city = req.body.city;
    const country = req.body.country;
    const minPrice = req.body.minPrice;
    const maxPrice = req.body.maxPrice;
    const q = "SELECT * FROM listings WHERE city=? AND country=? AND price>? And price<?";
    db.query(q, [city,country,minPrice ,maxPrice], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(200).json(data);
    });
  }

  export const getListings = (req,res)=>{
    const q = "SELECT * FROM listings WHERE country=?";
    console.log(req.query.country);

    db.query(q,[req.query.country],(err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(200).json(data);
    });
  }


  export const getHotel =  (req, res) => {
    console.log(req.query.id);
    const q = "SELECT * FROM listings WHERE id=?";
    db.query(q,[req.query.id],(err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(200).json(data);
    });
  };



  export const getListingsCountryCity = (req,res)=>{
    const q = "SELECT * FROM listings WHERE country=? AND city=?";
    console.log("hitted");
    console.log(req.query.country);
    console.log(req.query.city)
    const country = req.query.country;
    const city = req.query.city;
    db.query(q,[country,city],(err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(200).json(data);
    });
  }