const app=require('express')
const mongoose=require('mongoose')
const dotenv =require('dotenv');
dotenv.config({path:'./config.env'})
const Db=process.env.DATABASE
function getModel(){
mongoose.connect(Db.toString()).then(()=>console.log("DB connected succesfully"));
const parkingSchema =new mongoose.Schema({
    "location":String,
    "free-spaces":Number,
     "max-space":Number,
    "cost":Number,
    "availability":Boolean

});
const parking= mongoose.model('parking',parkingSchema);

return parking;
}
const parkings=getModel();

module.exports =parkings;