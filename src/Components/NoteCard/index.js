import { useState } from "react";

export default function NoteCard({note,setCurrNotes}){
    const [openModal,setOpenModal]=useState(false)
    const [description,setDescription]=useState(note?.description||"")
    const [title,setTitle]=useState(note?.title)
    function onDelete(){
        let localNotes=JSON.parse(localStorage.getItem("notes"));
        localNotes=localNotes.filter(item=>item.id!==note.id)
        localStorage.setItem("notes",JSON.stringify([...localNotes]))
        setCurrNotes([...localNotes])
    }
    function onEdit(){
        setOpenModal(true)
    }
    function onNoteEdit(){
        const currNotes=JSON.parse(localStorage.getItem("notes"));
        const i=currNotes.findIndex((n)=>n.id===note.id)
        currNotes[i]={...currNotes[i],title:title,description:description}
        setCurrNotes(currNotes)
        localStorage.setItem("notes",JSON.stringify([...currNotes]))
    }
    return (
        <div className="flex flex-col justify-between border-slate-500 rounded-md shadow-md border-2 text-sm h-32 p-2">
            <dialog open={openModal}>
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    onNoteEdit()
                    setOpenModal(false)
                }} className="w-screen h-screen flex items-center justify-center fixed top-0 left-0 bg-transparent backdrop-blur-sm">
                    <div className="w-[600px]  bg-white backdrop-blur-md border border-transparent rounded-md shadow-lg flex flex-col p-4"> 
                        <div className="font-semibold text-slate-700 mb-4 w-full flex justify-between items-center">
                            <div>Edit Note</div>
                            <button type="button" onClick={()=>{setOpenModal(false)}} className="text-lg font-semibold">X</button>
                        </div>
                        <label>Title</label>
                        <input value={title} placeholder="Title" className="border my-2 border-slate-500 p-2 border-rounded-md " onChange={(e)=>setTitle(e.target.value)}/>
                        <label>Description</label>
                        <textarea rows="2" value={description} placeholder="Description" className="border my-2 border-slate-500 p-2 border-rounded-md " onChange={(e)=>setDescription(e.target.value)}/>
                        <button type="submit"  className="border border-transparent bg-slate-800 text-white p-2 rounded-md ">Submit</button>
                    </div>
                </form>
            </dialog>
            <div className="font-bold mb-2">
                {note.title}
            </div>
            <div className="mb-2 text-sm">{note.description}</div>
            <div className="flex gap-2 justify-start">
                <button type="button" onClick={()=>onEdit()} className="border border-transparent rounded-md bg-slate-700 text-white p-1 w-[30%]">Edit</button>
                <button type="button" onClick={()=>onDelete()} className="border border-slate-700 rounded-md text-slate-700 p-1 bg-white w-[30%]">Delete</button>
            </div>
            
        </div>
    )
}