import { BaseService } from "./BaseService.js";

export class TaskService extends BaseService {
  constructor() {
    super();
  }

  getAllTask = () => {
    const promise = this.get("http://svcy.myclass.vn/api/ToDoList/GetAllTask");
    return promise;
  };
  postTask = (name) => {
    const promise = this.post(`http://svcy.myclass.vn/api/ToDoList/addTask`, {
      taskName: name,
      status: false,
    });

    return promise;
  };
  delTask = (name) => {
    const promise = this.del(
      `http://svcy.myclass.vn/api/ToDoList/deleteTask${
        name ? "?taskName=" + name : ""
      }`
    );
    return promise;
  };
  doneTask = (name) => {
    const promise = this.put(`http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${name}`, null);
    return promise;
  };
  rejectTask = (name) => {
    const promise = this.put(`http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${name}`, null);
    return promise;
  };
}
