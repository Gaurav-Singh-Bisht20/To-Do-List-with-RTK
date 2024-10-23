import { useDispatch, useSelector } from "react-redux";
import {
  setToDo,
  addToDo,
  removeToDo,
  editToDo,
  makrDone,
} from "./store/toDoSlice";

function App() {
  const toDoList = useSelector((state) => state.toDoSlice.toDoList);
  const toDo = useSelector((state) => state.toDoSlice.toDo);
  const Dispatch = useDispatch();

  const handleInputChange = (e) => {
    Dispatch(setToDo(e.target.value));
  };

  const handleAddToDO = (e) => {
    e.preventDefault();
    Dispatch(addToDo());
  };

  const handleDelete = (id) => {
    Dispatch(removeToDo(id));
  };

  const handleEdit = (id) => {
    Dispatch(editToDo(id));
  };

  const handleDone = (id) => {
    Dispatch(makrDone(id));
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
            value={toDo.text}
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
