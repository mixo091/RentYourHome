import bcrypt from "bcryptjs";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";

const ROLES = {
  'Admin' : 1,
  'Host' : 2,
  'Renter' : 3,
  'Anonymous' : 4
}

export const register = (req,res)=>{
    const q = "SELECT * FROM users WHERE username = ? OR email = ?";
    db.query(q, [req.body.username, req.body.email], (err, data) => {
      if (err) return res.status(500).json(err);
      console.log(data)
      if (data.length) return res.status(409).json("Username or email already exists!");
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      const roleIds = req.body.role.map((roleName) => ROLES[roleName]); //converts string to int for db storage

      const q = "INSERT INTO users (`username`,`name`,`surname`,`email`,`password`,`role`) VALUES ?";
      const values = [
        [
          req.body.username,
          req.body.name,
          req.body.surname,
          req.body.email,
          hashedPassword,
          JSON.stringify(roleIds)
          // req.body.role
        ]
      ];
      
      db.query(q , [values], (err,data)=>{
          if ( err ) return res.json(err);
          return res.json("Succesfully added a user");
      })
})}

export const login = (req,res)=>{

    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [req.body.username], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("User not found!");

      const checkPassword = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );

      if(!checkPassword){
        return res.status(400).json("Wrong password or username!");
      }

      const token = jwt.sign({ id: data[0].id }, "mistiko");
      const { password, ...others } = data[0];
      res.status(200).json({info:others,"accessToken":token,"verified":true});
    });
};



export const logout = (req, res) => {
  res.status(200).json("User has been logged out.")
};