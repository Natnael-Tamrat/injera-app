const express = require('express');
const fetch=require('node-fetch');
const app= express();
const mongoose=require('mongoose');
const parkings =require('./models/parking-model');
app.use(
    express.urlencoded({
      extended: true
    })
  )
  
  app.use(express.json())
async function calculate(source){
const parkingList=await parkings.find().lean();
// const parkingListArray=parkingList.toArray();

var r = await Promise.all(parkingList.map( async parking => {
 const temp= await getDistance(source,parking.location);
 console.log(temp[0]);
        parking.distance=temp.distance.value
    parking.distanceInKm=temp.distance.text
       parking.duration=temp.duration.value
       parking.durationInMin=temp.duration.text
    
    
    
    
    
    return parking
    })
);

 


return r;
}
async function getDistance(source,destination){
   
  const sourceQuery=source.replace(/ /g,"+");
  const destinationQuery=destination.replace(/ /g,"+");
  console.log("source ",sourceQuery);
console.log("Destination",destinationQuery);
  const res=await fetch(`https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${sourceQuery},warsaw,poland&destinations=${destinationQuery},warsaw,poland&key=UCxQdJR7U4aDkaemJY4CtILAqWXG0`,{
        method:'GET',
        headers: { 'Content-Type': 'application/json' }
    
    })
     const json=await res.json();
    console.log(json.rows[0].elements[0]);
     return json.rows[0].elements[0];
}
async function sortByDistance(parkingList){
    const a=await Promise.all(parkingList.sort((a, b) => (a.distance > b.distance) ? 1 : -1))
    return a
}
async function sortByDuration(parkingList){
   const a= await Promise.all(parkingList.sort((a, b) => (a.duration > b.duration) ? 1 : -1))
    return a
}
app.get('/api/sort/distance',async(req,res) => {
  
 const parkingList=await calculate(req.body.location);
 
   const sortedByDistance=await sortByDistance(parkingList);
   
res.send(sortedByDistance);
 
  
})
app.get('/api/sort/duration',async(req,res) => {
    const parkingList=await calculate(req.body.location);
    const sortedByDuration=await sortByDuration(parkingList);
res.send(sortedByDuration);
})

app.listen(3000,()=>console.log("listening"))