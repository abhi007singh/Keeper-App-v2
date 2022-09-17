import { useState } from "react";
import Add from "@mui/icons-material/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  const [expandNote, setExpandNote] = useState(false);

  function handleExpand() {
    setExpandNote(!expandNote);
  }

  return (
    <div>
      <form className="create-note">
        {expandNote && (
          <input
            onChange={handleChange}
            value={note.title}
            name="title"
            placeholder="Title"
          />
        )}
        <textarea
          onChange={handleChange}
          onFocus={handleExpand}
          value={note.content}
          name="content"
          placeholder="Take a note..."
          rows={expandNote ? "3" : "1"}
        />
        {expandNote && (
          <Zoom in={expandNote}>
            <Fab
              onClick={(event) => {
                props.addNote(note);
                setNote({
                  title: "",
                  content: "",
                });
                event.preventDefault();
              }}
            >
              <Add />
            </Fab>
          </Zoom>
        )}
      </form>
    </div>
  );
}

export default CreateArea;
