const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,  
        required : true
    }
})

module.exports = mongoose.model('User' , userSchema)

// When you import the User model in other files of your application, you can use the User variable to interact with the MongoDB
//  collection associated with the userSchema. For example, you can use User.find() to retrieve documents from the 'users' collection,
//  User.create() to insert new documents into the collection, User.updateOne() to update existing documents, and so on.
// when you import the User model in another file, you'll be able to perform CRUD (Create, Read, Update, Delete) operations
//  on the 'users' collection in your MongoDB database using methods provided by Mongoose.