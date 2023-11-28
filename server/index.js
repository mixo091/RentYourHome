import express from "express";
import usersRoutes from './routes/users.js';
import listingsRoutes from './routes/listings.js';
import authRoutes from './routes/auth.js';
import reservationsRoutes from './routes/reservations.js';
import reviewsRoots from './routes/reviews.js';
import bodyParser from "body-parser";
import cors from 'cors';
import cookies from "cookie-parser";
import https from "https"
import fs from "fs";


const app = express();

const SHARED_PATH = 'C:\\Users\\mmichopo\\Desktop\\Tedi\\SharedAssets\\uploads';

// Serve files from the shared directory under the '/shared' route
app.use('/shared', express.static(SHARED_PATH));

//middlewares
app.use(express.json());
app.use(cors({
  credentials:true,
}));
app.use(cookies());
app.use(bodyParser.json());  // for parsing application/json
// app.use(bodyParser.urlencoded({ extented : true } ));

// const options = {
//   key: fs.readFileSync('./certificates/privatekey.pem'), // Path to your private key
//   cert: fs.readFileSync('./certificates/certificate.pem'), // Path to your certificate
// };

// const server = https.createServer(options, app);

// server.listen(3008 , ()=>{
//   console.log("Api working..")
// })

app.listen(3008 , ()=>{
  console.log("Api working..")
})


app.use("/api/users" ,usersRoutes);
app.use("/api/auth" ,authRoutes);
app.use("/api/listings" ,listingsRoutes);
app.use("/api/reservations", reservationsRoutes);
app.use("/api/reviews", reviewsRoots);