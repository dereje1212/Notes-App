import React, { useEffect, useState } from 'react';
import CreateNote from '../CreateNote';
import './styles.scss';
import { v4 as uuid } from 'uuid';
import Note from '../Note';

const Notes = () => {
  const [inputText, setInputText] = useState("");
  const [notes, setNotes] = useState([]);
  const [editToggle, setEditToggle] = useState(null);

  // Edit a note
  const editHandler = (id, text) => {
    setEditToggle(id);
    setInputText(text);
  };

  // Save a new or edited note
  const saveHandler = () => {
    if (inputText.trim() === "") {
      alert("Please fill in the textarea before saving.");
      return;
    }

    let updatedNotes = [];

    if (editToggle) {
      updatedNotes = notes.map((note) => (
        note.id === editToggle
          ? { ...note, text: inputText }
          : note
      ));
    } else {
      updatedNotes = [
        ...notes,
        {
          id: uuid(),
          text: inputText
        }
      ];
    }

    setNotes(updatedNotes); // Update the state with new/edited notes
    localStorage.setItem("Notes", JSON.stringify(updatedNotes)); // Save the updated notes to localStorage
    setInputText("");
    setEditToggle(null);
  };

  // Delete a note
  const deleteHandler = (id) => {
    const newNotes = notes.filter(n => n.id !== id);
    setNotes(newNotes); // Update the state after deleting
    localStorage.setItem("Notes", JSON.stringify(newNotes)); // Update localStorage after deleting
  };

  // Retrieve notes from localStorage on component mount
  useEffect(() => {
    const data = localStorage.getItem("Notes");
    console.log("Retrieved notes from localStorage:", data); // Debugging statement
    if (data && data !== "undefined") {
      try {
        const parsedData = JSON.parse(data);
        if (Array.isArray(parsedData)) {
          setNotes(parsedData);
        } else {
          console.log("Invalid notes format in localStorage.");
        }
      } catch (e) {
        console.error("Failed to parse notes from localStorage:", e);
      }
    } else {
      console.log("No notes found in localStorage.");
    }
  }, []); // Empty dependency array to run only once on mount

  // Save notes to localStorage whenever `notes` state changes
  useEffect(() => {
    if (notes.length > 0) {
      console.log("Saving notes to localStorage:", notes); // Debugging statement
      localStorage.setItem("Notes", JSON.stringify(notes));
    }
  }, [notes]); // This effect runs whenever `notes` state changes

  return (
    <div className='notes'>
      {notes.map((note) => (
        editToggle === note.id
          ? <CreateNote
              key={note.id}
              inputText={inputText}
              setInputText={setInputText}
              saveHandler={saveHandler}
            />
          : <Note
              key={note.id}
              id={note.id}
              text={note.text}
              editHandler={editHandler}
              deleteHandler={deleteHandler}
            />
      ))}
      {editToggle === null &&
        <CreateNote
          inputText={inputText}
          setInputText={setInputText}
          saveHandler={saveHandler}
        />
      }
    </div>
  );
};

export default Notes;
