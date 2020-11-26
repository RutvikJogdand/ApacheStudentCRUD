const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require('cors')
const User = require('./users')
const students = require("./students")

const app = express()

app.use(cors())
app.use(express.json())

dotenv.config()

mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err, db) => {
    if (err) throw err;

    if(User.collection.countDocuments(function (err, count) {
        if (!err && count === 0) {
            // It's empty
            User.insertMany(students).then(()=>{ 
            console.log("Data inserted")  // Success 
        }).catch((error)=>{ 
            console.log(error)      // Failure 
        }); 
        }
    }));
    
})
// 


app.get("/api/students", (req, res) => {
    User.find()
      .then((students) => {
        //   console.log(res)4
          res.json(students)
      })
      .catch((err) => res.status(400).json("Error: " + err));
});
  
app.post("/api/students", (req, res) => {
    const { name, bloodGroup, email, city, imageLink, gender } = req.body;
    const newUser = new User({name, bloodGroup, email, city, imageLink, gender});
  
    newUser
      .save()
      .then(() => res.json("Student Added Successfully"))
      .catch((err) => res.status(400).json("Error: " + err));
});
  
app.delete("/api/student/:id", (req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(() => res.json("Student Deleted Successfully"))
      .catch((err) => res.status(400).json("Error: " + err));
  });


app.put("/api/student/update/:id", (req, res) => {
    console.log(req.params.id)
    User.findById(req.params.id)
      .then((student) => {
        student.name = req.body.name || student.name ;
        student.bloodGroup = req.body.bloodGroup || student.bloodGroup;
        student.email = req.body.email || student.email;
        student.city = req.body.city || student.city;
        student.imageLink = req.body.imageLink || student.imageLink;
        student.gender = req.body.gender || student.gender
  
        console.log(student)
        student
          .save()
          .then(() => res.json("Student updated Successfully"))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  });  


app.listen(8000, () => {
    console.log('Server is running up at port 8000')
})

