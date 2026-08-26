import { useEffect, useState } from 'react'
import axios from "axios"


function App() {
  
  const[notes, setNotes ] = useState([])
  const[noteId, setNoteId] = useState(null) //for update notes
  const[editTitle, setEditTitle] = useState("")
  const[editDescription, setEditDescription] = useState("")

  function fetchNotes(){
    axios.get("https://mycohort-2-0-new.onrender.com/api/notes")
    .then(res=>{
      setNotes(res.data.notes)
    })
  }
  function updateNotes(note){
    setNoteId(note._id)
    setEditTitle(note.title)
    setEditDescription(note.description)
  }

  useEffect(()=>{
    fetchNotes()
  },[])

  function handleSubmit(e){
    e.preventDefault()
    const{title, description} = e.target.elements
    console.log(title.value, description.value)

    axios.post("https://mycohort-2-0-new.onrender.com/api/notes",{
      title:title.value,
      description:description.value
    })
    .then(res=>{
      console.log(res.data);
      fetchNotes()
    })
    
  }

  function handleDeleteNote(noteId){
    axios.delete("https://mycohort-2-0-new.onrender.com/api/notes/"+noteId)
    .then(res=>{
      console.log(res.data);
      fetchNotes()
    })
    
  }

  function handleUpdate(e){
    e.preventDefault()
      axios.patch(`https://mycohort-2-0-new.onrender.com/api/notes/${noteId}`,{
      title: editTitle,
      description: editDescription
    })
    .then(res=>{
      console.log(res.data);
      fetchNotes()
      setNoteId(null);
      setEditTitle("");
      setEditDescription("");
    })
  }
  return (
    <>
    
    <form className='note-create-form' onSubmit={handleSubmit}>
      <input name='title' type="text" placeholder='Enter title' />
      <input name='description' type="text" placeholder='Enter description' />
      <button>Create Note</button> 
    </form>
    
    

    <div className="notes">
      {
        notes.map(note => {
        return <div className="note" key={note._id}>
        <h1>{note.title}</h1>
        <h1>{note.description}</h1>
        <button onClick={()=>{handleDeleteNote(note._id)}}>delete</button>
        <button onClick={()=>{updateNotes(note)}}>update</button>{
          noteId === note._id && (
            <form onSubmit={handleUpdate}>
              <input value={editTitle} onChange={(e)=>setEditTitle(e.target.value)}/>
              <input value={editDescription} onChange={(e)=>setEditDescription(e.target.value)}/>
              <button type='submit'>save</button>
            </form>
          )
        }
      </div>
        })
      }
    </div>
    </>

  )
}

export default App