import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { dKeeper_backend } from "../../../declarations/dKeeper_backend";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {

    setNotes(prevNotes => {
      dKeeper_backend.createNote(newNote.title, newNote.content);
      return [newNote, ...prevNotes];
    });
  }

  useEffect(() => {
    console.log("userEffect is triggered.")
    fetchData();
  }, []);

  async function fetchData() {
    const notesArray = await dKeeper_backend.readNotes();
    setNotes(notesArray);
  };

  function deleteNote(id) {
    dKeeper_backend.removeNote(id);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
