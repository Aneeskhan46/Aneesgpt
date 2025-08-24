import React from 'react'
import "./sidebar.css";

import { useContext , useEffect } from 'react'
import { Mycontext } from './mycontext'
import {v1 as uuidv1} from "uuid";

const Sidebar = () => {


const {allthreads,setallthreads,currthreadId, setnewchat, setprompt , setreply , setcurrthreadId, setprevchats}= useContext(Mycontext);
  





///getting all threads 
const getallthreads = async ()=>{


  try{
    const response = await  fetch(`${import.meta.env.VITE_BACKEND_URL}/api/thread`);
    const res= await response.json()
    //we are just extracting threadId and thread tittle
   console.log(res)
   //in mongodb it comes , so we are just extracting id and title 
      // _id :
      // title:
    const filterdata = res.map(thread=> ({threadId: thread._id , title : thread.title}))
    console.log(filterdata)
    setallthreads(filterdata)
  }catch(err){
    console.log(err)
  }

}




useEffect(()=>{
  getallthreads();
},[currthreadId])//whenever currthreadId updated this function getallthreads trigger



const createNewChat = () => {
        setnewchat(true);
        setprompt("");
        setreply(null);
        setcurrthreadId(uuidv1());
        setprevchats([]);
    }


///deleting the thread 

const deletethread = async (threadId)=>{
  console.log(threadId)
     

  try{
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/thread/${threadId}`, {method:"DELETE"})
  const res = await response.json()
  console.log(res)

  // we no need referesh the page again and again
   //after deleting updated threads re-render // we filtering the deleted thread by id and displaying others thread in the sidebar
            setallthreads(prev => prev.filter(thread => thread.threadId !== threadId));

            //if we are using currthread and we deleted it should redirect to new chat
            if(threadId === currthreadId) {
                createNewChat();
}
  }
  catch(err){
  console.log(err)
}

}



  return (
    <>
  <section className='sidebar'>

    <button onClick={createNewChat}>
          <img src="\logo2.jpg" className='logo'/>
          <h4>New Chat</h4>
          <span><i className="fa-solid fa-pen-to-square"></i></span>
    </button>

    <ul className='history'>
         {
          allthreads?.map((thread,idx) => (
            <li key={idx}>{thread.title}
                <i className="fa-solid fa-trash"
                    onClick={(e)=> {
                      e.stopPropagation() ;////stop event bubbling, it means if you delete this icon even the whole parent list is also affecting so we stop this , check more on internet
                      deletethread(thread.threadId)
                     } }
                
                ></i>
            </li>
           
          ))
         }

         <div className='sign'>
      <p>By AneesGPT &hearts;</p>
    </div>

    </ul>

     
  

  </section>
 
  </>
  )
}

export default Sidebar