import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
app.use(express.json())
app.use(cors());

const url = "mongodb+srv://project:nodejs@cluster0.9gqqmkx.mongodb.net/?retryWrites=true&w=majority";

app.get('/',(req,res)=>{
    res.send('Hello World');
});
app.post('/username',async(req,res)=>{
    console.log(req.body);
    const username=req.body.username;
    const client = new MongoClient(url);
    try{
        const database = client.db('companyProfile');
        const userProfile = database.collection('userProfile');
        const query={username}
        const result=await userProfile.find(query);
        var array=[];
        await result.forEach((data)=>{
            array.push(data);
        });
        res.send((array.length>0)?'user exists':"no user");
    }
    finally{
        client.close();
    }
    // res.json({message:'done'});

});
app.post("/userdata",async (req,res)=>{
  
    // console.log(req.body);
    const client = new MongoClient(url);
    const database = client.db('companyProfile');
    const userProfile = database.collection('userProfile');
    // const new_user = {
    //     username:'lokesh',
    //     professionSkills:['flutter','java','python'],
    //     workSkills:['java'],
    //     experience:2,
    //     roles:"backend",
    //     foodHabbits:["veg"],
    //     shirtSize:'40m',
    //     sports:['fooseball','tabletennis'],
    //     talents:['dancing','skills'],
    //     worktype:'hybrid'
    // }
    // console.log(req.body.TechSkills);
    const new_user = {
        username:'abc',
        professionSkills:req.body.TechSkills,
        workSkills:req.body.WorkedSkills,
        experience:req.body.Experience,
        roles:req.body.Role,
        foodHabbits:req.body.foodtype,
        shirtSize:req.body.shirtsize,
        sports:req.body.sports,
        talents:req.body.talents,
        worktype:req.body.worklocation
    }
    console.log(new_user);
    try{
        await userProfile.insertOne(new_user);
    }
    finally{
        client.close();
    }
    res.json({message:'done'});
    
})


app.post("/getusers",async (req,res)=>{
    const client = new MongoClient(url);
    const db = client.db('companyProfile');
    const users = db.collection('userProfile');
    var query= {};

    if(req.body.username!==undefined){
        query.username = req.body.username;
        //console.log(query);
    }
    if(req.body.professionalSkills!==undefined){
        query.professionalSkills = {$all:req.body.professionalSkills};
    }
    if(req.body.workSkills!==undefined){
        query.workSkills = {$all:req.body.workSkills};
    }
    if(req.body.experience!==undefined){
        query.experience = {$gte:req.body.experience}
    }
    if(req.body.roles!==undefined){
        query.roles = req.body.roles
    }
    if(req.body.foodHabbits!==undefined){
        query.foodHabbits = {$all:req.body.foodHabbits}
    }
    if(req.body.shirtSize!==undefined){
        query.shirtSize = req.body.shirtSize
    }
    if(req.body.sports!==undefined){
        query.sports = {$all:req.body.sports}
    }
    if(req.body.talents!==undefined){
        query.talents = {$all:req.body.talents}
    }
    if(req.body.worktype!==undefined){
        query.worktype = req.body.worktype
    }
    console.log(query);
   // const query = {professionalSkills:{$all:['react']}}
    //console.log(query);
    const result = await users.find(query);
    var array = []
    await result.forEach((data)=>{
        array.push(data);
    })
    res.json(array);
})

app.listen(5000,()=>{
    console.log('Server is running on port 5000');
});
