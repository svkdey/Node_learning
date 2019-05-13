

//use npm mongodb version 2.2.33


const {MongoClient}=require('mongodb');
//url of mongodb

const url="mongodb://localhost:27017/test";

//connecting to mongo
// MongoClient.connect(url,(err,db)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log("connected");
//         //when connect then close connection
//         db.close();
//     }
// })


//inserting one data

// MongoClient.connect(url,(err,db)=>{
//     //inserting one element at a time  then it gives a call back with error
//     db.collection('Users').insertOne({
//         name:'souvik',age:25
//     },(err,res)=>{
//         if(err){
//             return console.log(err);
//         }else{
//             return console.log(res.ops[0]._id);
//         }

//     })
//     db.close();
// })


// MongoClient.connect(url, (err, db) => {
//     const cars=[
//         {model: "tata",year: '2018'},
//         { model: "ford", year: '2018' },
//     ]
//     //inserting one element multiple data at time  then it gives a call back with error
//    //we can use insert(takes array of multiple data and also insert a single object) and insertMany(takes array of multiple data)
//     db.collection('Cars').insert(cars, (err, res) => {
//         if (err) {
//             return console.log(err);
//         } else {
//             return console.log(res.ops);
//         }

//     })
//     db.close();
// })

//MongoClient.connect(url,(err,db)=>{
    //find returns cursors
    //toArray is a method that return promise
    //skip(n).limit(m)=>form n number to m number of data will return  
//sort({"_id":-1}) //reverse  string in return

//to find a query like cars in  2018 then .find({year:'2018'})
//     db.collection('Cars').find({ model: 'honda' }).toArray().then(data=>{console.log(data)});
//     db.close();
// })

//to delete we use deleteMany(query,ifMiddleware,function(){}),deleteOne(query,ifMiddleware,function(){}),or findOneAndDelete(query,ifMiddleware,function(){}) delete

// MongoClient.connect(url,(err,db)=>{
//     db.collection('Cars').deleteMany({year:'2018'},(err,doc)=>{
//         console.log(doc);
//     })
//     db.close();
// })
//for update we use findOneAndUpdate(query,setting value,return what u wanna see pastvlaue/new value,function(){})
MongoClient.connect(url,(err,db)=>{
     db.collection('Users').findOneAndUpdate({
             name:'souvik'
         }, {
             $set: {
                 age: 22
             }
         }, {
             returnOrginal: false
         },
         (err, doc) => {
             console.log(doc);
         }
     )
      db.close();
})
   