import { db } from "../connect.js";

export const getUser = (req,res)=>{
    const name = req.body.name;
    console.log(name)
    const q = "SELECT * FROM users WHERE name = ?";
    db.query(q, [name], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json(data);
    });
}

export const getUsers = (req,res)=>{
    const q = "SELECT * FROM users";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(200).json(data);
    });
}

export const removeUser = (req,res)=>{
    const q = "DELETE FROM users WHERE name = ?";
    db.query(q, [req.body.name], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) {
          return res.status(409).json(data);
        }
        else return res.status(200).json("User deleted successfully!");
    });
}