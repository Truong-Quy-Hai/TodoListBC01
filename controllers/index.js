import { Task } from "../models/task.js";
import { TaskService } from "../services/TaskService.js";

const taskService = new TaskService();
let tasks = [];

const getAllTask = async () => {
  // const promise = taskService.getAllTask();
  // promise.then(res => console.log(res.data));
  try {
    const { data: tasks } = await taskService.getAllTask();

    const taskTodo = tasks.filter((task) => !task.status);
    document.getElementById("todo").innerHTML = renderTodo(taskTodo);

    const taskCompleted = tasks.filter((task) => task.status);
    document.getElementById("completed").innerHTML = renderCompleted(
      taskCompleted
    );
  } catch (err) {
    console.log(err);
  }
};

const renderTodo = (taskTodo) => {
  return taskTodo.reduce((acc, task) => {
    const { taskName } = task;
    return (
      acc +
      `<li>${taskName}
          <div className="buttons">
            <a style="cursor: pointer;" class="remove" onclick="delTask('${task.taskName}')"><i class="fa fa-trash"></i></a>
            <a style="cursor: pointer;" class="complete" onclick="completeTask('${task.taskName}')"><i class="fa fa-check"></i></a>
          </div>
        </li>`
    );
  }, "");
};

window.delTask = async (name) => {
  await taskService.delTask(name);
  getAllTask();
};

window.completeTask = async (name) => {
  await taskService.doneTask(name);
  getAllTask();
};

window.undoTask = async (name) => {
  await taskService.rejectTask(name);
  getAllTask();
};

const renderCompleted = (taskCompleted) => {
  return taskCompleted.reduce((acc, task) => {
    return (
      acc +
      `<li>${task.taskName}
          <div className="buttons">
            <a style="cursor: pointer;" class="remove" onclick="delTask('${task.taskName}')"><i class="fa fa-trash"></i></a>
            <a style="cursor: pointer;" class="undo" onclick="undoTask('${task.taskName}')"><i class="fa fa-redo"></i></a>
          </div>
        </li>`
    );
  }, "");
};

document.getElementById("addItem").onclick = async () => {
  try {
    const taskName = document.getElementById("newTask").value;
    await taskService.postTask(taskName);
    getAllTask();
  } catch (err) {
    console.log(err);
  }
};

getAllTask();
