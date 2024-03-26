import { useState } from "react";
import "./Tasks.css";

export default function Tasks() {
  const [tasks, setTasks] = useState(getTasks());

  function getTasks() {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
      return JSON.parse(tasks);
    } else {
      return [];
    }
  }

  function addTask() {
    const input = document.getElementById("task-input");
    console.log(input.value);
    const newTask = {
      task: input.value,
      status: "pending",
    };

    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
    setTasks([...tasks, newTask]);

    // Hacky way to remove new line after adding a task
    setTimeout(() => {
      input.value = "";
    }, 100);
  }

  function updateTaskStatus(index) {
    const newTasks = tasks;
    newTasks[index].status =
      newTasks[index].status === "pending" ? "done" : "pending";
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks([...newTasks]);
  }

  function removeTask(index) {
    const newTasks = tasks;
    newTasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks([...newTasks]);
  }

  function renderTasks() {
    return tasks.map((task, i) => {
      return (
        <div key={i} className="task">
          <div className="task-top task-spacing">
            <span className="task-status">
              <input
                title={
                  task.status === "done" ? "Mark as pending" : "Mark as done"
                }
                type="checkbox"
                // className={}
                checked={task.status === "done" ? true : false}
                onClick={() => updateTaskStatus(i)}
              />
            </span>
            <p
              className="task-desc"
              style={
                task.status === "done"
                  ? {
                      textDecoration: "line-through",
                      textDecorationThickness: "0.2rem",
                    }
                  : { textDecoration: "none" }
              }
            >
              {task.task}
            </p>
            <span
              className="task-remove"
              onClick={() => removeTask(i)}
              title="Remove task"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M37.6 4.2C28-2.3 15.2-1.1 7 7s-9.4 21-2.8 30.5l112 163.3L16.6 233.2C6.7 236.4 0 245.6 0 256s6.7 19.6 16.6 22.8l103.1 33.4L66.8 412.8c-4.9 9.3-3.2 20.7 4.3 28.1s18.8 9.2 28.1 4.3l100.6-52.9 33.4 103.1c3.2 9.9 12.4 16.6 22.8 16.6s19.6-6.7 22.8-16.6l33.4-103.1 100.6 52.9c9.3 4.9 20.7 3.2 28.1-4.3s9.2-18.8 4.3-28.1L392.3 312.2l103.1-33.4c9.9-3.2 16.6-12.4 16.6-22.8s-6.7-19.6-16.6-22.8L388.9 198.7l25.7-70.4c3.2-8.8 1-18.6-5.6-25.2s-16.4-8.8-25.2-5.6l-70.4 25.7L278.8 16.6C275.6 6.7 266.4 0 256 0s-19.6 6.7-22.8 16.6l-32.3 99.6L37.6 4.2z" />
              </svg>
            </span>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="task-section">
      <h1 className="tasks-header">
        Tasks{" "}
        <span style={{ color: "red" }}>
          ({tasks.filter((task) => task.status == "pending").length})
        </span>
      </h1>
      <div id="tasks-container" className="tasks-container">
        {renderTasks()}
      </div>
      <div style={{ marginTop: "auto" }}>
        <form className="task">
          <div className="task-top">
            <textarea
              id="task-input"
              type="text"
              className="task-input"
              placeholder="Add a task"
              onKeyDown={(e) => {
                e.key === "Enter" && addTask();
              }}
            />
            <p className="task-input-add-button" onClick={addTask}>
              +
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
