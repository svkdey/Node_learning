const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const salt_I=10;
const jwt = require('jsonwebtoken');
const userSchema=mongoose.Schema({

    email:{type:String,required:true,trim:true,unique:1},

    password: { type: String, required: true,minlength:6},
    token:{type:String}
})
userSchema.pre('save',function(next){
    var user=this;
    if (user.isModified('password')) {
        bcrypt.genSalt(salt_I, (err, salt) => {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);
                else {
                    user.password = hash;
                    next();
                }
            })
        })}
        else{
            next();
        }

})


// method 2 of comparing password function
userSchema.methods.comparePassword=function (candidatePassword,cb){
    bcrypt.compare(candidatePassword, this.password,function (err, isMatch) {
        if (err) {throw err}
        else{cb(null,isMatch);}

    })

}
//method to generate pw
userSchema.methods.generateTokens=function(cb){
    var user=this;
    var token=jwt.sign(user._id.toHexString(),"superSecret");
    user.token=token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })
}
userSchema.statics.findByToken=(token,cb)=>{
    const user=this;
    jwt.verify(token, 'superSecret',function(err,decondedId){
        User.findOne({"_id":decondedId,"token":token},function(err,user){
            if(err) return cb(err);
            cb(null,user);
        })
    })

}
const User=mongoose.model('User',userSchema);

//exporting the user.js
module.exports={User};