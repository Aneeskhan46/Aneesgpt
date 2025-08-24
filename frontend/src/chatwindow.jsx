import React from 'react'

import "./chatwindow.css"

import Chat from './chat'
import { useContext , useEffect } from 'react'
import { Mycontext } from './mycontext'

import {ScaleLoader} from 'react-spinners'
import { useState } from 'react'

const Chatwindow = () => {


const {prompt, setprompt, reply , setreply, currthreadId,  prevchats, setprevchats,setnewchat}= useContext(Mycontext);

//loader
const [loader,setloader]=useState(false)
//dropdown
 const [isOpen, setIsOpen] = useState(false);

const getreply = async ()=>{
   setloader(true) 
   setnewchat(false)//it hide the "start a new chat" when the reply comes
   const options = {
      method :"POST",
      headers : {
         "content-type":"application/json"
      },
      body:JSON.stringify({
         message:prompt,
         threadId:currthreadId

      })
   }

     try{
      const response= await fetch("http://localhost:8080/api/chat", options)   
      const res= await response.json()
     console.log(res)
     console.log(res.reply)
     setreply(res.reply)

     }catch(err){
       console.log(err)
     }
   setloader(false)
   
}

///we append the prompt and reply of newchat of current thread in prevchats array
//whenever the reply stored respond "setreply(res)" the useeffect trigger
useEffect(()=>{
   
   if(prompt && reply){
      setprevchats(prevchats=>
         [...prevchats,{
            role:"user",
            content:prompt
         },{
            role:"assistant",
            content:reply
         }]
      )
   }
   //   console.log(prevchats)
   setprompt("")
 

},[reply])


//dropdown
  const handleProfileClick = () => {
        setIsOpen(!isOpen);
    }



  return (
   <div className='chatWindow'>
      <div className='navbar'>
        <span>AneesGPT<i className="fa-solid fa-chevron-down"></i></span>
         <div className='userIconDiv'  onClick={handleProfileClick}>
               <span className="userIcon"><i className="fa-solid fa-user"></i></span>
         </div>

      </div>

{/* ///dropDown */}

            {
                isOpen && 
                <div className="dropDown">
                    <div className="dropDownItem"><i class="fa-solid fa-gear"></i> Settings</div>
                    <div className="dropDownItem"><i class="fa-solid fa-cloud-arrow-up"></i> Upgrade plan</div>
                    <div className="dropDownItem"><i class="fa-solid fa-arrow-right-from-bracket"></i> Log out</div>
                </div>
            }


{/* chatsection redering */}
   <Chat/>
 
  



{/* //loader */}
  <ScaleLoader color='#63C8FF' loading={loader}>

  </ScaleLoader>



  <div className='chatInput'>
     <div className='inputBox'>
        <input placeholder='ask anything'
               value={prompt}    
               onChange={(e)=> setprompt(e.target.value)}  
               onKeyDown={(e)=> e.key ==="Enter" ? getreply():""}  // it will execute when we press enter
        >

        </input>

        <div id='submit' onClick={getreply}><i className="fa-solid fa-paper-plane"></i></div>

     </div>
     <p className='info'>
         AneesGPT can make mistakes. Check important info. See Cookie Preferences.
     </p>

  </div>

   </div>
  )
}

export default Chatwindow