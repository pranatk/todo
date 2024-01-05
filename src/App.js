import { useEffect, useState } from 'react';
import './App.css';
import NoteCard from './Components/NoteCard';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [note,setNote]=useState({title:"",description:""})
  useEffect(()=>{
    if(!localStorage.getItem("notes"))
      localStorage.setItem("notes",JSON.stringify([]))
  },[])
  const [currNotes,setCurrNotes]=useState(JSON.parse(localStorage.getItem("notes"))||[])
  
  
  return (
    <div className=" w-screen flex justify-center p-8 flex-col items-center max-h-screen ">
        <form onSubmit={(e)=>{
          e.preventDefault();
          const localNotes=JSON.parse(localStorage.getItem("notes"));
          const id=uuidv4()
          if(currNotes.length==0){
            localStorage.setItem("notes",JSON.stringify([{...note,id:id}]))
          }else{
            localStorage.setItem("notes",JSON.stringify([...localNotes,{...note,id:id}]))
            
          }
          setCurrNotes(prev=>[...prev,{...note,id:id}])
          setNote({title:"",description:""})
        }}
          className='flex gap-2 items-center justify-between w-[60%] p-4 border-2 border-slate-500 shadow-lg rounded-md'
        > <div className="flex  gap-2 justify-center">
            <input value={note.title} placeholder='Note Title' className="border border-slate-400 p-2 rounded-md" onChange={(e)=>{setNote(prev=>({...prev,title:e.target.value}))}} />
            <input value={note.description} placeholder='Note Description' className="border border-slate-400 p-2 rounded-md" onChange={(e)=>{setNote(prev=>({...prev,description:e.target.value}))}} />

          </div>
          <button type="submit" className="bg-slate-800 text-white text-sm p-2 rounded">Add Note</button>
        </form>
        {currNotes?.length>0&&<div className="w-[60%] p-4 border-slate-500 border-2 shadow-lg rounded-md mt-16 grid grid-cols-3 gap-4">
          {
            currNotes?.length>0 ? currNotes?.map((note)=>{
              return <NoteCard note={note} key={note.id} setCurrNotes={setCurrNotes}/>
            }):<></>
          }
        </div>}
    </div>
  );
}

export default App;
