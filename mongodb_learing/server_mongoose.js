

const mongoose=require('mongoose');
const url="mongodb://127.0.0.1:27017/test";

//connected to mongoDB;
mongoose.connect(url);


//mongoose does not support promise so we set global promise object
mongoose.Promise=global.Promise;

//creating schema
const carSchema=mongoose.Schema({
    brand:String,model:String,year:Number,avail:Boolean
});
//creating a db in mongoose of Car as db,carSchema as schema
const Car=mongoose.model('Car',carSchema);

const addCar=new Car(
    {
        brand:'ford', model:'figo', year:2017, avail: true
    }
)
// addCar.save((err,doc)=>{
//     if(err){return console.log(err);}
//     else {console.log(doc);}
// })

// GET methods
//find(queryObject,ifmiddleware,callBack())

//findOne(queryObject,ifmiddleware,callBack())
//findById(id,ifmiddleware,callBack())
// Car.find({brand:'nissan'},(err,doc)=>{
//     if(err) return console.log(err);
//     console.log(doc);
// }) 



// DElete methods
//findOneAndRemove(queryObject,ifmiddleware,callBack())

//remove(queryObject,ifmiddleware,callBack())
//findByIdAndRemove(id,ifmiddleware,callBack())
// Car.findOneAndRemove({ brand: 'ford' }, (err, doc) => {
//     if (err) return console.log(err);
//     console.log(doc);
// }) 


// Update methods
//findOneAndRemove(queryObject,setting object.{new:true},callBack())

//update(queryObject,setting object,ifmiddleware,callBack())
//findByIdAndUpdate(id,setting object.{new:true},callBack())
Car.update({ _id: "5cd30943d72dbc45e4407e1e"},
{$set:{brand:"nissan"}},
(err, doc) => {
    if (err) return console.log(err);
    console.log(doc);
}) 
//another way to do same

// findById(id,(err,car)=>{
//    if(err){return console.log(err)}
//    else{
//        car.set({brand:"honda"});
//        car.save((err,doc)=>{
//            if (err) return console.log(err);
//            console.log(doc);
//        })
//    } 
// })
