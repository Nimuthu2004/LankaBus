const {createClient}=require('@supabase/supabase-js');
const express=require('express');

const app=express();

const URL='https://mrcncoyacorhwefxvjyz.supabase.co'.trim();
const KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yY25jb3lhY29yaHdlZnh2anl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNDg4NDcsImV4cCI6MjA4NTYyNDg0N30.fKTHccieKDMwDsj-qU-dA7grZGsYrGd8g0scb0TUkjA'.trim();

const superbase=createClient(URL, KEY);

app.use(express.json());

app.post('get-ticket-fare', async(requestAnimationFrame, res)=>{
    const {startLocation, endLocation}=requestAnimationFrame.body;

    try{
        const{ data:stations, error:sError}=await supabase
        .from('stations')
        .select('id,Name')
        .in('Name',[startLocation, endLocation]);

    if (sError|| !stations|| stations.length<2){
        return res.status(404).json({error:"one or both stations not found."});
    }

    const startId=stations.find(s=>s.name===startLocation).id;
    const endId=stations.find(s=>s.name===endLocation).id

    const{data:fareData, error:fError}=await supabase
    .from('Fares')
    .select('amount')
    .eq('start_station_id', startId)
    .eq('end_station_id', endId)
    .single();

    if(fError||!fareData){
        return res.status(404).json({error:"No fare defined for this route"});
    }

    res.json({
        route:'${startLocation} to ${endLocation}',
        fare:fareData.amount
    });

    }catch(err){
        res.status(500).json({error:"Server error occurred"});
    }
});