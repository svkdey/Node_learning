const os=require('os');
const fs=require('fs');


let user = os.userInfo().username;
let date=new Date();
msg=`${user} has run this file at ${date}`;
fs.appendFile("running.txt",msg,(err)=>{
    if(err){
        console.log(err);
    }
    
})