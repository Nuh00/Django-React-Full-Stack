import React from "react";
import { useState, useEffect } from "react";
import api from "../api";
import Notes from "../components/Notes";
import "../styles/Home.css";
import LoadingIndicator from "../components/LoadingIndicator";

function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNotes();
  }, []);
  const getNotes = async () => {
    api
      .get("api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
    // .catch is a method that is used to handle errors in the promise chain.
  };

  const deleteNote = async (id) => {
    api
      .delete(`api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          setNotes(notes.filter((note) => note.id !== id));
          console.log("Note deleted successfully");
        } else {
          alert("Failed to delete");
        }
      })
      .catch((err) => console.log(err));
  };

  const createNote = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("api/notes/", { title, content });
      if (res.status === 201) {
        setLoading(false);
        console.log("Note created successfully");
        setTitle("");
        setContent("");
        getNotes();
      } else {
        alert("Failed to create note");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="notes-section">
        <h2>Notes</h2>
        {notes.map((note) => (
          <Notes note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
      <div>
        <h2>Create a note</h2>
        <form onSubmit={createNote}>
          <label htmlFor="title">Title: </label>
          <br />
          <input
            type="text"
            id="title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />

          <br />
          <label htmlFor="content">Content: </label>
          <br />
          <textarea
            id="content"
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
          />

          <br />

          {loading && <LoadingIndicator />}

          <input type="submit" value="submit" />
        </form>
      </div>
    </div>
  );
}

export default Home;
