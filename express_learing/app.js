const express=require('express');
const app=express();
//to read these request car?model=2018&company=ford    ???

const querystring=require('querystring');

const bodyParser=require('body-parser');
const urlencodedParse=bodyParser.urlencoded({extended:false});
const fs=require("fs");
app.get("/",(req,res)=>{
    res.send(`<html><body>
        hi i am at body
    </body></html>`)
})

app.get("/api/user", (req, res)=>{
    res.send(
        {
            name: 'souvik',
            company: 'TCS'
        }
    )
})


app.get("/user",(req,res)=>{
    let HTML=fs.readFileSync(`${__dirname}/index.html`);
    res.send(`${HTML}`);

})
app.post("/enteruser", urlencodedParse,(req,res)=>{
    let firstname = req.body.firstname, lastname = req.body.lastname;
    console.log(firstname, lastname);
    res.send("ok")
})

app.get("/api/:user/:id", (req, res) => {
    //catching  input from url
    let id=req.params.id;
    let userName=req.params.user;
    res.send(
        `<html><body>
        hi i am at /api/${userName}/${id}
    </body></html>`
        
    )
})

app.get("/api/car",(req,res)=>{
    let brand=req.query.brand;
    let year=req.query.year;
    res.send({brand,year})
})

const port=process.env.PORT||8000;
app.listen(port);