const express = require("express");
const app = express();
const ExpressError = require("./ExtressError");

// app.use((req, res, next) =>{
//     console.log("hi, I am first middleware")
//   next();
// });

// app.use((req, res, next) =>{
//     console.log("hi, I am second middleware")
//   next();
// });


//logger- morgen
// app.use((req, res, next) =>{
//     req.time = Date.now();
//     console.log(req.method, req.hostname, req.path, req.time);
//     next();
// })


const checkToken = (req, res, next) =>{
    let {token} = req.query;
    if(token === "giveaccess"){
        next();
    }
    throw new ExpressError(401, "ACCESS DENIED! ");
};

// app.get("/wrong", (req,res) =>{
//     abcd = abcd;
// });

app.get("/api",checkToken, (req, res) =>{
    res.send("data");
})

app.get("/", (req, res) =>{
    res.send("hi , I am root");
});

app.get("/random", (req, res) =>{
    res.send("this is a random page")
});

app.get("/err", (req, res) =>{
    abcd = abcd;
});

app.get("/admin", (req, res) =>{
    throw new ExpressError(403, "Acess to admin is forbidden");
});

app.use((err, req, res, next) =>{
let { status = 500, message = "some error occured"} = err;
   res.status(status).send(message);
});

//404

// app.use((req, res) =>{
//     res.status(404).send("page not found");
// });

app.listen(8080, () =>{
    console.log("server listing to port 8080");
});