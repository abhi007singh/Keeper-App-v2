import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setNotes(data);
      });
  }, [notes]);

  function addItem(note) {
    // console.log(note);
    fetch("http://localhost:5000", {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Used in previous version
  // function addItem(note) {
  //   setNotes((prevValue) => {
  //     return [...prevValue, note];
  //   });
  // }

  function deleteItem(id) {

    // -- previos version code --
    // setNotes((prevNote) => {
    //   return prevNote.filter((items, index) => {
    //     return index !== id;
    //   });
    // });

    // console.log(id);

    fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    }).then((res) => console.log(res));
  }

  return (
    <div>
      <Header />
      <CreateArea addNote={addItem} />
      {notes.map((slip, index) => {
        return (
          <Note
            key={index}
            id={slip._id}
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
