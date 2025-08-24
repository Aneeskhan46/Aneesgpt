import express from "express"

import Thread from "../models/thread.js";

import openAiAPIResponse from "../utils/openai.js"

const router = express.Router();




///test route
router.post("/test", async (req,res)=>{
    try{
        const thread = new Thread({
            threadId:"xyk",
             title:"testing kursheed thread"
        })

      const response = await thread.save();
      res.send(response)
    } catch(err){
        console.log(err)
    }
})

///get all threads
router.get("/thread", async (req,res)=>{
   try{
      const thread = await Thread.find({}).sort({ updateAt:-1}) 
       ///updateAt:-1  it indicates that we
      //need descending order thread that means we need recent thread upadted thread to show in top
      res.json(thread)
   }catch(err){
    console.log(err)
   }
})

// get thread by id
router.get("/thread/:threadId", async (req,res)=>{
    try{
    constthreadId = req.params.threadId
    const thread = await Thread.findById(threadId)
    res.json(thread)
    //  res.json(thread.messages)
    }
    catch(err){
        res.send(err)
    }
})

// delete the thread
router.delete("/thread/:threadId", async (req,res)=>{
    try{
        const threadId = req.params.threadId
        const thread = await Thread.findByIdAndDelete(threadId)
         res.status(200).json({
  message: "deleted",
  deletedThread: thread
});

    }catch(err){
        console.log(err)
    }
})


// router.post("/chat", async (req,res)=>{
//     const {threadId, message}= req.body

//     if(!threadId || !message){
//         res.status(400).json({error:"missing required files"})
//     }

//     try{
//         //if thread id is threre in the database then display the thread
//         const thread = await Thread.findOne({threadId})  /// it comes in json format

// //// if the thread is not there in the database then create new thread
//         if(!thread){
//              thread= new Thread({
//                threadId,///threadId=threadId
//                 title : message,
//                 messages:[{role:"user", content : message}]

//             })
//         }
//         //else push to the message in the existing database thread
//         else{
//             thread.messages.push({role:"user", content : message})
//         }

//           const assistantReply = await openAiAPIResponse(message)  // the message of the user send to
//           // gemini Ai for Ai reply to that "../utils/openai.js"

//           thread.messages.push({role:"assistant", content : assistantReply})
//           thread.updateAt = new Date()

//         await thread.save()
//           //sending the ai message to the frontend
//           res.json({reply:assistantReply})

//     }catch(err){
//       console.log(err)
//       res.send(500).json({error:"something went wrong"})
//     }


// })




// Chat route
router.post("/chat", async (req, res) => {
    const {threadId, message } = req.body;

    //validating threadId and message
    // CHANGE: Added return to stop function after error response
    if (!threadId || !message) {
        return res.status(400).json({ error: "missing required fields" });
    }

    try {
          //if thread id is threre in the database then display the thread
        // CHANGE: Changed const → let so we can reassign thread later
        let thread = await Thread.findOne({threadId}); /// it comes in json format

       
         //// if the thread is not there in the database then create new thread
        if (!thread) {
            thread = new Thread({
               threadId,  ///threadId=threadId
                title: message,
                messages: [{ role: "user", content: message }]
            });
        }   //else push to the message in the existing database thread
        else {
            thread.messages.push({ role: "user", content: message });
        }

        // CHANGE: Call openAiAPIResponse with only message (no req, res)
        const assistantReply = await openAiAPIResponse(message); // the message of the user send to
//           // gemini Ai for Ai reply to that "../utils/openai.js"

        // Save AI reply in DB
        thread.messages.push({ role: "assistant", content: assistantReply });
        thread.updateAt = new Date();

        // CHANGE: Added await to ensure save completes before sending response
        await thread.save();
        //sending the ai message to the frontend
        // CHANGE: This is now the ONLY place sending a response for /chat
        res.json({ reply: assistantReply });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "something went wrong" });
    }
});





export default router;