require('dotenv').config();
const bcrypt=require('bcryptjs');
const express = require ('express');
const cors=require('cors');
const { default: mongoose } = require('mongoose');
const { config } = require('dotenv');
const User =require('./models/User.js');
const cookieParser=require('cookie-parser');
const app=express();
const jwt=require('jsonwebtoken');
const bcryptSalt=bcrypt.genSaltSync(10);
const JWT_TOKEN_SECRET='jwtsachinsecrettoken';
const imageDownloader=require('image-downloader');


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin:'http://127.0.0.1:5173',
}));
//console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);
app.get('/test', (req,res)=>{
res.json('Test Ok!!!');
});
app.post('/register',async (req,res)=>{
const{name,email,password}=req.body;
try{
    const userDoc= await User.create({
        name,
        email,
        password:bcrypt.hashSync(password,bcryptSalt)
        });
        res.json(userDoc);
}
catch(e){
    res.status(422).json(e);
}
});



app.post('/login',async (req,res)=>{
const{email,password}=req.body;
const userDoc=await User.findOne({email});
if(userDoc){
    const passwordOk=bcrypt.compareSync(password,userDoc.password);
    if(passwordOk){
jwt.sign({email:userDoc.email,
               id:userDoc._id,
                 },
                  JWT_TOKEN_SECRET,{},(err,token)=>{
    if(err)throw err;
    res.cookie('token',token).json(userDoc);
});
        
}
    else{
        res.status(422).json("Wrong Password");
    }
}else{
    res.json('User not found');
}
});
app.get('/profile',(req,res)=>{
    const{token}=req.cookies;
    if(token){
jwt.verify(token,JWT_TOKEN_SECRET,{},async (err,userData)=>{
    if(err) throw err;
const {name,email,_id} = await User.findById(userData.id);
    res.json({name,email,_id});
})
    }
    else{
        res.json(null);
    }
    
})
app.post('/logout',(req,res)=>{
res.cookie('token','').json(true);
});

console.log({__dirname});
app.post('/upload-by-link',async (req,rer)=>{
    const{link}=req.body;
    const newName=Date.now()+'.jpg';
    await imageDownloader.image({
        url:link,
        dest:__dirname+'/uploads/'+newName,

    });
res.json(__dirname+'/uploads/'+newName);

})
app.listen(4000);