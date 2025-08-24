// import React from 'react'
// import { useContext } from 'react'
// import { Mycontext } from './mycontext'

// import "./chat.css"


// //importing packages for the gpt messages styling and formatting 
// import  ReactMarkdown from 'react-markdown';
// import  rehypeHighLight from 'rehype-highlight';
// //import for styling the code from github//////
// import "highlight.js/styles/github-dark.css"


// const Chat = () => {

//   const {newchat,prevchats} = useContext(Mycontext);

//   return (
//     <>

//        {newchat && <h1>Strat a new chart</h1>}

//        <div className='chats'>

//         {
//           prevchats?.map((chat,idx)=>
//                <div className={chat.role === "user" ? "userDiv": "gptDiv "} key={idx}>
//                     {
//                       chat.role === "user" ?
//                       <p className='userMessage'>{chat.content}</p>:
//                       // <p className='gptMessage'>{chat.content}</p>
//                       <ReactMarkdown rehypePlugins={[rehypeHighLight]}>{chat.content}</ReactMarkdown>
//                     }
//                </div>
//           )
//         }

//        </div>

//     </>
//   )
// }

// export default Chat



//for typing effect we are using this , in this code typing effect only included

import "./Chat.css";


import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { useContext ,useState, useEffect } from 'react'
import { Mycontext } from './mycontext'

function Chat() {
    const {newchat, prevchats, reply} = useContext(Mycontext);
    const [latestReply, setLatestReply] = useState(null);

    useEffect(() => {
        if(reply === null) {
            setLatestReply(null); //prevchat load
            return;
        }

        if(!prevchats?.length) return;

        const content = reply.split(" "); //individual words

        let idx = 0;
        const interval = setInterval(() => {
            setLatestReply(content.slice(0, idx+1).join(" "));

            idx++;
            if(idx >= content.length) clearInterval(interval);
        }, 40);

        return () => clearInterval(interval);

    }, [prevchats, reply])

    return (
        <>
            {newchat && <h4>WELCOME TO ANEESGPT <br></br> <br></br>Start a New Chat!</h4>}
            <div className="chats">
                {
                    prevchats?.slice(0, -1).map((chat, idx) => 
                        <div className={chat.role === "user"? "userDiv" : "gptDiv"} key={idx}>
                            {
                                chat.role === "user"? 
                                <p className="userMessage">{chat.content}</p> : 
                                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkdown>
                            }
                        </div>
                    )
                }

                {
                    prevchats.length > 0  && (
                        <>
                            {
                                latestReply === null ? (
                                    <div className="gptDiv" key={"non-typing"} >
                                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{prevchats[prevchats.length-1].content}</ReactMarkdown>
                                </div>
                                ) : (
                                    <div className="gptDiv" key={"typing"} >
                                     <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>
                                </div>
                                )

                            }
                        </>
                    )
                }

            </div>
        </>
    )
}

export default Chat;