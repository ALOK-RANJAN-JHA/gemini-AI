const { GoogleGenerativeAI }=require("@google/generative-ai");
require('dotenv').config();
const express=require('express');
const bodyParser=require('body-parser');
const app=express();
app.use(express.json());
app.use(bodyParser.json());


const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.get('/',(req,res)=>{
    res.send('Welcome to Gemini World !');
});


// const prompt = "what is the value of pi.";
const generate=async(prompt)=>{
    try{
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        return result.response.text();
    }
    catch(err){
        console.log(err);
    }
}

app.get('/api/content',async(req,res)=>{
   try{
    const data=req.body.question;
    const result=await generate(data);
    res.status(200).json({
        "result" : result
    })
   }
   catch(err){
    console.log("error:" +err);
   }
});

app.listen(4000,()=>{
    console.log('server is runing on 4000');
})