import { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faTrash } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [addBtn, setAddBtn] = useState(true);
  const [show, setShow] = useState(false);
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  const addTask = (e) => {
    e.preventDefault();
    if (task) {
      setList([...list, { text: task, checked: false }]);
      setTask("");
      setShow(false);
      setAddBtn(true);
    }
  };

  const deleteTask = (index) => {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
  };

  const toggleCheckbox = (index) => {
    const updatedList = list.map((item, i) => 
      i === index ? { ...item, checked: !item.checked } : item
    );
    setList(updatedList);
  };

  return (
    <>
      <div className={show ? "container bg-blur" : "container"}>
        <h1>Turn Your To-Dos into Dones</h1>
        <div className="list-box">
          {list.map((taskItem, index) => (
            <div key={index} className="list">
              <label>
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={taskItem.checked}
                  onChange={() => toggleCheckbox(index)}
                />
                <span className={taskItem.checked ? "task checked" : "task"}>
                  {taskItem.text}
                </span>
              </label>
              <div className="option">
                <FontAwesomeIcon
                  className="dlt"
                  icon={faTrash}
                  onClick={() => deleteTask(index)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="addbtn">
          {addBtn && (
            <button
              className="add"
              onClick={() => {
                setAddBtn(false);
                setShow(true);
              }}
            >
              New Task
            </button>
          )}
        </div>
      </div>
      <p className="author">Designed by <a href="">Veeramani</a></p>
      {/* Popup */}
      {show && (
        <div className="feed">
          <button
            className="close"
            onClick={() => {
              setShow(false);
              setAddBtn(true);
            }}
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
          <form onSubmit={addTask}>
            <input
              className="input"
              placeholder="Enter your task here"
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button className="addList" type="submit">
              ADD
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default App;
