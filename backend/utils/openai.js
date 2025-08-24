// import dotenv from "dotenv";
// dotenv.config(); // load .env file

// const openAiAPIResponse = async (message,req,res)=>{

// const apiKey = process.env.GEMINI_API_KEY;

//     const options = {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             contents: [
//                 {
//                     role: "user",
//                     parts: [
//                         // { text: req.body.message }
//                         { text: message }
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

// }

// export default openAiAPIResponse;


///chatgpt said


import dotenv from "dotenv";
dotenv.config(); // load .env file

// CHANGE: Removed req and res from parameters (now only takes message)
const openAiAPIResponse = async (message) => {
    const apiKey = process.env.GEMINI_API_KEY;

    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [
                {
                    role: "user",
                    parts: [{ text: message }]
                }
            ]
        })
    };

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`,
            options
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("API error:", errorText);
            // CHANGE: Throw error instead of using res.status().send(...)
            throw new Error(errorText);
        }

        const data = await response.json();
        // CHANGE: Return the text instead of sending via res.send(...)
        return data.candidates[0].content.parts[0].text;

    } catch (err) {
        console.error("Fetch error:", err);
        // CHANGE: Throw error instead of res.status(500).send(...)
        throw err;
    }
};

export default openAiAPIResponse;
