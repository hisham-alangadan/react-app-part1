import axios from "axios";
import Note from './components/Note'
import noteService from './services/notes'
import { useEffect, useState } from "react";
import './index.css'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('New note...')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  // const addNote = (event) => {
  //   event.preventDefault()
  //   const noteObj = {
  //     content: newNote,
  //     important: Math.random() < 0.5
  //   }

  //   axios
  //     .post('http://localhost:3001/notes', noteObj)
  //     .then(response => {
  //       setNotes(notes.concat(noteObj))
  //       setNewNote('')
  //     })
  // }

  const addNote = (event) => {
    event.preventDefault()
    const newObj = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService
      .create(newObj)
      .then(response => setNotes(notes.concat(newObj)))
    setNewNote('')
  }

  const Notifcication = ({ message }) => {
    if (message === null)
      return null;

    return (
      <div className="errMess">
        {message}
      </div>
    )
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  // const toggleImportanceOf = (id) => {
  //   console.log(`the importance of ${id} must be changed`)
  //   const url = `http://localhost:3001/notes/${id}`
  //   const note = notes.find(n => n.id === id)
  //   const changedNote = { ...note, important: !note.important }
  //   axios
  //     .put(url, changedNote)
  //     .then(response => setNotes(notes.map(n => n.id !== id ? n : response.data)))
  // }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(response => setNotes(notes.map(n => n.id !== id ? n : response.data)))
      .catch(error => {
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
        setErrorMessage(`The note ${note.content} cannot be found on the server.`)
        // alert(`The note ${note.content} cannot be found on the server.`)
        // setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <>
      <h2>Notes</h2>
      <Notifcication message={errorMessage} />
      <ul>
        {notes.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul >
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">Add</button>
      </form>
    </>
  )
}

export default App
































// import { useEffect, useState } from "react";
// import axios, { Axios } from "axios";
// import Note from "./components/Note";

// const App = () => {
//   const [notes, setNotes] = useState([])
//   const [newNote, setNewNote] = useState('A new note...')

//   const hook = () => {
//     axios
//       .get('http://localhost:3001/notes')
//       .then(response => {
//         console.log('promise fulfilled')
//         setNotes(response.data)
//       })
//   }

//   useEffect(hook, [])
//   console.log('rendered', notes.length, 'notes')

//   const addNote = (event) => {
//     event.preventDefault()
//     const newObj = {
//       content: newNote,
//       important: Math.random() < 0.5,
//       // id: notes.length + 1
//       // it's better if the server generates the id
//     }
//     // setNotes(notes.concat(newObj))
//     // setNewNote('')
//     axios
//       .post('http://localhost:3001/notes', newObj)
//       .then(response => {
//         console.log(response)
//         setNotes(notes.concat(response.data))
//         setNewNote('')
//       })
//   }

//   const handleNoteChange = (event) => {
//     console.log(event.target.value)
//     setNewNote(event.target.value)
//   }

//   const toggleImportanceOf = (id) => {
//     console.log(`importance of ${id} needs to be toggled`)
//     const url = `http://localhost:3001/notes/${id}`
//     const note = notes.find(n => n.id === id)
//     const changedNote = { ...note, important: !note.important }

//     axios
//       .put(url, changedNote)
//       .then(response => {
//         setNotes(notes.map(n => n.id !== id ? n : response.data))
//       })
//   }

//   return (
//     <>
//       <h1>Notes</h1>
//       <ul>
//         {notes.map(note =>
//           <Note
//             key={note.id}
//             note={note}
//             toggleImportance={() => toggleImportanceOf(note.id)}
//           />
//         )}
//       </ul>
//       <ul>
//         <form onSubmit={addNote}>
//           <input
//             value={newNote}
//             onChange={handleNoteChange}
//           />
//           <button type="submit">Submit</button>
//         </form>
//       </ul>
//     </>
//   )
// }

// export default App