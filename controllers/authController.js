//Jab bh humlog database k saath kuch functions perform karnege then we always use
// [async - await]  -> jha bhi await lagega , uske parent function mein async lagata hai
// and [try- catch] for error handling

const bcrypt = require('bcrypt')

const User = require('../models/User')

async function signup(req,res){  // user jo bhi data form mein fill karke submit karta hai woh ---[req]--- me aata hai
    try{
        const hashedPassword = await bcrypt.hash(req.body.password , 10) // user se password leke[req.body.password] usko bcrypt k .hash() function me daal rhe hai taki password ka encryption kar sake
        const newUser = new User({
            username : req.body.username,
            password : hashedPassword
        });

        await newUser.save(); //.save() function  is a promise based so to make it work with async-await we use await before .save()
        res.status(201).send('User created Successfully');
    }
    catch(error){
        console.log(error);
        res.status(500).send("Error in creating user: ");
    }
}

async function login(req,res){
    try{
        const user = await User.findOne({username : req.body.username}); // humlog --req.body.username-- se username leke ek field me daal rhe hai jiska naam username hai
        //findOne function User collection mein username ko match karega aur agar milega tab uss user ki saari info -- const user -- mein chala jayega

        if(!user){  // agar user exist nhi karta tab usko issi line se return kar do
            return res.status(404).send('User not found');
        }

        //bcrypt package  provides a compare function which is used to comapre the password coming from login page and the saved password of the user.
        const validPassword = await bcrypt.compare(req.body.password , user.password);
        if(!validPassword){
            return res.status(401).send('Invalid Password'); //if password is worong tab yeh line execute hoga
        }

        res.status(200).send('Login , Successful');
    }
    catch(error){
        console.error(error);
        res.status(500).send('Login failed')
    }
}

module.exports = {signup , login}