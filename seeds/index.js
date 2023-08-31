const express=require('express');
const app=express();
const path=require('path');
const cities=require('./cities');
const {places,descriptors}=require('./seedHelpers')
const mongoose=require('mongoose');
const Campground=require('../models/campground');
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{
    console.log("Database connected");
});


const sample=(array)=>array[Math.floor(Math.random()*array.length)];

const seedDB=async ()=>{
    await Campground.deleteMany({});
    for(let i=0;i<300;i++)
    {
        const random1000=Math.floor(Math.random()*1000);
        const price=Math.floor(Math.random()*20)+10;
        const camp=new Campground({
            author:'64c89c1de7eeaac10981bebb',
            location:`${cities[random1000].city}, ${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            //image:'https://source.unsplash.com/collection/483251',
            description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate exercitationem eius nesciunt fuga sint illum porro, officia corporis ea voluptatibus explicabo sunt cumque aliquid inventore suscipit alias asperiores pariatur magnam?',
            price:price,
            geometry:{ 
              type: 'Point', 
              coordinates: [ 
                    cities[random1000].longitude,
                    cities[random1000].latitude 
              ] 
            },
            images:[
                {
                  url: 'https://res.cloudinary.com/daiimt2yi/image/upload/v1690905482/YelpCamp/fajj1t5nuezpuykpsytb.png',
                filename: 'YelpCamp/fajj1t5nuezpuykpsytb',
                  
                },
                {
                  url: 'https://res.cloudinary.com/daiimt2yi/image/upload/v1690905482/YelpCamp/iydqfnrmffour0onrdok.png',
            
                  filename: 'YelpCamp/iydqfnrmffour0onrdok',
                 
                },
                {
                  url: 'https://res.cloudinary.com/daiimt2yi/image/upload/v1690905482/YelpCamp/d2exz0pvvve0kbm3kjsu.png',
                        
                  filename: 'YelpCamp/d2exz0pvvve0kbm3kjsu',
                 
                },
                {
                  url: 'https://res.cloudinary.com/daiimt2yi/image/upload/v1690905483/YelpCamp/mbnefcufyjsh1jpx43hr.jpg',
            
                  filename: 'YelpCamp/mbnefcufyjsh1jpx43hr',
             
                }
              ]
        })
        await camp.save();
    }
}
seedDB().then(()=>{
    mongoose.connection.close();
});
