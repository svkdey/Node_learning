const mongoose =require('mongoose');
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const bcrypt=require("bcrypt");
//returing of model
const {User} = require("../models/user.js");

const {auth}=require("./middleware/auth")
const url="mongodb://localhost:27017/test";
mongoose.Promise=global.Promise;
mongoose.connect(url);

app.use(bodyParser.json());
app.use(cookieParser());

app.post('/api/user',(req,res)=>{
    //we need a middleware to save password before its save into db
    const user=new User({
        email:req.body.email,
        password:req.body.password
    });
    user.save((err,doc)=>{
        if(err) {res.status(400).send(err)}
        else { res.status(200).send(doc)}
    })

})


app.post('/api/user/login',(req,res)=>{
    User.findOne({email:req.body.email},(err,user)=>{
        if(!user){res.json({message:"failed.not found"})}
        //bcrypt.compare(input,dbPass,callback)
        else{
            user.comparePassword(req.body.password,(err,isMatch)=>{
                if(err) throw err;
                else
                {
                    if(isMatch){
                        user.generateTokens((err,user)=>{
                            if(err) res.status(400).send(err);
                            res.cookie('auth',user.token).send(user);
                        })
                    }
                    else { res.json({ message: "Password incorrect" })}
                }
                
            })
        }
        //method 1 inside else part
        // {bcrypt.compare(req.body.password,user.password,(err,isMatch)=>{
        //     if (err) { res.json({ message: "Password incorrect" })}
        //     else{
        //         if(isMatch){res.status(200).send(user);}
        //         else { res.json({ message: "Password incorrect" })}
        //     }

        // })}
    })
})

//using a get req to verify that jwt works

app.get("/profiles",auth,(req,res)=>{
    res.status(200).send(`token is correct: ${req.token}`)

    // User.findByToken(token,(err,user)=>{
    //     if(err) throw err;
    //     if(!user) return res.status(401).send("no access");


    //     res.status(200).send("token is correct")
    // })
    // res.status(200).send(token);
})







const port=process.env.PORT||2000;
app.listen(port,()=>{
    console.log(`started at ${port}`);
})