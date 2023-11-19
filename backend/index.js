const express=require('express')
const mongoose = require('mongoose')
const cors=require('cors')
const UserModel = require('./modules/fullstack')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/frontend")

app.get('/', (req,res) =>{
     UserModel.find({})
     .then(users => res.json(users))
     .catch(err => res.json(err))

})

app.get('/getUser/:id', (req, res) =>{
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users=>res.json(users))
    .catch(err => res.json(err))
})


app.put('/Modify/:id', (req,res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id: id}, {EmpId: req.body.EmpId, FullName: req.body.FullName, Age: req.body.Age, DOB: req.body.DOB, Salary: req.body.Salary,
         Department: req.body. Department})
         .then(users=>res.json(users))
    .catch(err => res.json(err))
         
})

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})
app.post("/New",(req, res)=>{
    UserModel.create(req.body)
    .then(users=>res.json(users))
    .catch(err => res.json(err))
})
app.get('/averageSalary', (req, res) => {
    UserModel.aggregate([
      {
        $group: {
          _id: null,
          averageSalaryAll: { $avg: '$Salary' }
        }
      }
    ])
    .then(result => {
      if (result.length > 0) {
        res.json({ averageSalaryAll: result[0].averageSalaryAll });
      } else {
        res.json({ averageSalaryAll: 0 });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/averageSalaryByDepartment', (req, res) => {
    UserModel.aggregate([
      {
        $group: {
          _id: '$Department',
          averageSalary: { $avg: '$Salary' }
        }
      }
    ])
    .then(result => {
      const averageSalariesByDepartment = {};
      result.forEach(entry => {
        averageSalariesByDepartment[entry._id] = entry.averageSalary;
      });
      res.json({ averageSalariesByDepartment });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});
  
app.listen(3001, ()=>{
    console.log("Server Running")
})