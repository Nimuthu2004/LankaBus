const {createClient}=require('@supabase/supabase-js');
const express=require('express');

const app=express();
const superbase=createClient();

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
    }
});