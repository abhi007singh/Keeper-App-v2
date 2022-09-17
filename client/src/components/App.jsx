import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  function addItem(note) {
    setNotes((prevValue) => {
      return [...prevValue, note];
    });
  }

  function deleteItem(id) {
    setNotes((prevNote) => {
      return prevNote.filter((items, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea addNote={addItem} />
      {notes.map((slip, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={slip.title}
            content={slip.content}
            onDelete={deleteItem}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
