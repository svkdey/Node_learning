const bcrypt=require('bcrypt');
//calling crypto-js
const {MD5}=require('crypto-js');
const jwt=require('jsonwebtoken');
//random hashing
// bcrypt.genSalt(11,(err,salt)=>{
//     if(err) return next(err);

//     bcrypt.hash('wakawaka',salt,(err,hash)=>{
//         if(err) return next(err);
//         console.log(hash);
//     })

// });


// const user={
//     id:1,
//     token:MD5('hellojs').toString()
// }
const id=1;
const secret="superSecret";

const rToken ="eyJhbGciOiJIUzI1NiJ9.MQ.mXaRzJ9w--l_Qw44UdgoA9WS5y8zAK-CDeNz_U58mhs"
const token = jwt.sign(id, secret);
console.log(token);//
const decodeToken = jwt.verify(rToken, secret);
console.log(decodeToken);