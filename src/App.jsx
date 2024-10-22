import { useState } from "react";

function App() {
  const [toDoList, setToDoList] = useState(() => {
    const savedToDoList = localStorage.getItem("toDoList");
    return savedToDoList ? JSON.parse(savedToDoList) : [];
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [toDo, setToDo] = useState({
    id: 1,
    text: "",
    done: false,
  });

  const handleInputChange = (e) => {
    setToDo({ ...toDo, text: e.target.value });
  };

  const handleAddToDO = (e) => {
    e.preventDefault();
    if (toDo.text.trim() === "") return;

    if (isEditing) {
      setToDoList((prevList) =>
        prevList.map((item) =>
          item.id === editId ? { ...item, text: toDo.text } : item
        )
      );

      setEditId(null);
      setIsEditing(false);
    } else {
      setToDoList((prevList) => [...prevList, { ...toDo, id: toDo.id }]);
      localStorage.setItem("toDoList", toDoList);
      setToDo((prev) => ({ id: prev.id + 1, text: "" })); // Reset the input
    }
  };

  const handleDelete = (id) => {
    setToDoList((prevList) => prevList.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    console.log("edit clicked", id);
    let editToDo = toDoList.find((item) => item.id === id);
    setToDo({ ...editToDo });
    setIsEditing(true);
    setEditId(id);
  };

  const handleDone = (id) => {
    setToDoList((prevList) =>
      prevList.map((item) => (item.id === id ? { ...item, done: true } : item))
    );
  };

  return (
    <div className="w-[80vw] max-w-[1200px] mx-auto">
      <h1 className="text-4xl font-bold text-center">To-Do List</h1>
      <div className="mt-12">
        <form action="#" className="flex justify-between">
          <input
            onChange={handleInputChange}
            type="text"
            placeholder="Add new To-Do"
            value={toDo.text} // Controlled input
            className="outline flex-1 px-4"
          />
          <button
            onClick={handleAddToDO}
            className="ml-12 border-2 border-black px-4 py-1"
          >
            Add
          </button>
        </form>
        <div className="flex flex-col gap-4 mt-12 w-full min-h-96 bg-slate-300 p-4">
          {toDoList.length > 0 &&
            toDoList.map((item) => (
              <div key={item.id} className="flex justify-between gap-4">
                <p
                  className={`text-lg font-bold bg-white px-2 flex-1 ${
                    item.done === true ? `line-through` : ""
                  }`}
                >
                  {item.text}
                </p>
                <button
                  onClick={() => handleEdit(item.id)}
                  className="p-2 border-2 border-black"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDone(item.id)}
                  className="p-2 border-2 border-black"
                >
                  Done
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 border-2 border-black"
                >
                  Delete
                </button>
                {/* <input type="checkbox" className="p-4" checked > </input> */}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
