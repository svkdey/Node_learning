const http=require("http");
const fs=require("fs");

let HTML=fs.readFileSync('./index.html');

const server=http.createServer((req,res)=>{
//routing
if(req.url==="/"){
    res.writeHead(200, { 'content-type': 'text/html' });
    let HTML = fs.readFileSync('./index.html');
    res.end(HTML);

} else if (req.url === "/api/user"){

    res.writeHead(200, { 'content-type': 'application/json' });
    var json = JSON.stringify({
        name: 'souvik',
        company: 'TCS'
    })
    res.end(json);
}
else{
    res.writeHead(404);
    res.end();
}


   
})

server.listen(8181,'127.0.0.1');
console.log("server started")