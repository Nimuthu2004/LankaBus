const express=require('express');
const app=express();
app.use(express.json());

const buses=[
    {
        qr_code_id:"BUS_NC7288",
        bus_name:"NCG Express",
        license_plate:"NC-7288",
        type:"Super Luxury",
        route:"Jaffna 87 Colombo"
    }
];

app.post('/api/scan-bus', (req, res)=>{
    const{scannedData}=req.body;
    const bus=buses.find(buses.qr_code_id===scannedData);

    if (!bus){
        return res.status(404).json({
            success:false,
            message:"Bus not found. Please scan a valid QR code."
        });
    }

    
})