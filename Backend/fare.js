const {createClient}=reqiure('@superbase/superbase-js');
const express=require=require('express');

const app=express();
const superbase=createClient();

app.use(express.json());

app.post('get-ticket-fare', async(requestAnimationFrame, res)=>{
    const {startLocation, endLocation}=requestAnimationFrame.body;

    try{
        const{ data:stations, error:sError}=await superbase
        .from('stations')
        .select('id,Name')
        .in('Name',[startLocation, endLocation]);

    if (sError|| !stations|| stations.length<2){
        return res.status(404).json({error:"one or both stations not found."});
    }
    
    }
});