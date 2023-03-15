const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
const secretkey = 'secretkey';

app.get('/', (req,res) => {
    res.send({ message: "ramram"});
})


app.post('/login', (req, res)=> {
    const user = {
        id: 1,
        name: 'Amit',
        email: 'amit@pandey.com'
    }

    jwt.sign({user}, secretkey, {expiresIn: '300s'},(error, token)=>{
        res.json({token})
    })
    
})

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
  
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        req.token = token;
        next();
    }else{
        res.send("Invalid Token");
    }
}

app.post('/profile', verifyToken,(req, res)=> {
    jwt.verify(req.token, secretkey, (err, authData)=>{
        if(err){
            res.send("Invalid token");
        }else(
            res.json({
                message: 'validated',
                authData
            })
        )
    })
    
})





app.listen(port, ()=> {
    console.log(`running server at ${port}`);
});