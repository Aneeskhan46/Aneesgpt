import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './sidebar'
import Chatwindow from './chatwindow'
import Chat from './chat'
import { Mycontext } from './mycontext'

import {v1 as uuidv1} from 'uuid'

function App() {

  const [prompt, setprompt]= useState("")
  const [reply, setreply]= useState(null)
  const [currthreadId, setcurrthreadId]= useState(uuidv1());
  const [prevchats, setprevchats]=useState([])// it stores all chat of current threads in an array
  const [newchat,setnewchat]=useState(true);//it used in chat.jsx and chatwindow.jsx "it hide and show the "start a new chat""
  const [allthreads,setallthreads]=useState([]);

  const providervalues ={
    prompt,setprompt,
    reply,setreply,
    currthreadId, setcurrthreadId,
    prevchats, setprevchats,
    newchat,setnewchat,
    allthreads,setallthreads
  }
  
  return (
    <div className='app'>

      <Mycontext.Provider value={providervalues}>
              <Sidebar/>
             <Chatwindow/>
      </Mycontext.Provider>
     
    </div>
  )
}

export default App
