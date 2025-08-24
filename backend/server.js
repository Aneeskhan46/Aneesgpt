// import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config(); // load .env file

import express from "express"
import mongoose from "mongoose";
// we need to install cors if we running the frontend and backend in different port  and it is used
//connect the port
import cors from "cors"

import router from "./routes/chat.js"  // importing router from the file

const app = express()
const PORT =8080

app.use(express.json());
///it is 
app.use(cors())

app.use("/api", router )  /// it says when we start route with /api it goes to to that file

app.listen(PORT , ()=>{
     console.log(`server running on ${PORT}`);
     connectDB()
})

const connectDB= async ()=>{
   try{
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("connected succesful anees bhai")
   }
   catch(err){
    console.log(err)
   }
}



// // Load Gemini API key
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// async function run() {
//  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
// // or gemini-1.5-pro


//   const prompt = "define mongodb .";

//   const result = await model.generateContent(prompt);
//   console.log(result.response.text());
// }

// run();



// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.0-flash-lite",
//     contents: "Explain how human works in one sentence",
//     config: {
//       thinkingConfig: {
//         thinkingBudget: 0, // Disables thinking
//       },
//     }
//   });
//   console.log(response.text);
// }

// await main();

// app.post("/test", async (req, res) => {
//     const apiKey = process.env.GEMINI_API_KEY;

//     const options = {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             contents: [
//                 {
//                     role: "user",
//                     parts: [
//                         { text: req.body.message }
//                     ]
//                 }
//             ]
//         })
//     };

//     try {
//         const response = await fetch(
//             `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`,
//             options
//         );

//         if (!response.ok) {
//             const errorText = await response.text();
//             console.error("API error:", errorText);
//             return res.status(response.status).send(errorText);
//         }

//         const data = await response.json();
//         res.send(data.candidates[0].content.parts[0].text);
       
//     } catch (err) {
//         console.error("Fetch error:", err);
//         res.status(500).send("Internal Server Error");
//     }
// });
