import { useEffect, useState } from "react";
import Createtask from "./Createtask";
import Card from './Card';
import './App.css'

function App() {
     const [tasklist, setTasklist] = useState([]);
     const [taskName, setTaskName] = useState('');
     const [description, setDescription] = useState('');
     const [edit, setEdit] = useState(undefined);
     const [status, setStatus] = useState('Not-Completed');

     useEffect(() => {
      let arr = localStorage.getItem('tasklist');
      if(arr) {
        let obj = JSON.parse(arr);
        setTasklist(obj);
      }
     }, []);
     
     // function To Delete Tasks

     const deleteTask = (index) => {
      let templist = structuredClone(tasklist);
      templist.splice(index, 1);
      localStorage.setItem('tasklist', JSON.stringify(templist));
      setTasklist(templist);
     };
    
    // function to save task and Edit Tasks
    const saveTask = (taskobj) => {
      if (edit != undefined) {
        let templist = structuredClone(tasklist);
        templist[edit] = taskobj;
        localStorage.setItem("tasklist", JSON.stringify(templist));
        setTasklist(templist);
        setEdit(undefined);
      } else {
        let templist = structuredClone(tasklist);
        templist.push(taskobj);
        localStorage.setItem("tasklist", JSON.stringify(templist));
        setTasklist(templist);
      }
      setDescription("");
      setTaskName("");
    };
     return (
      <>
       <div className="body">
        <div className="container border">
          <h1 className="display-6 text-success">My-to-do</h1> 
          <div className="row">
            <div className="col mt-5">
              {/* {calling Create Task} */}
              <Createtask
                  status={status}
                  setStatus={setStatus}
                  setEdit={setEdit}
                  taskName={taskName}
                  setTaskName={setTaskName}
                  description={description}
                  setDescription={setDescription}
                  save={saveTask}
                  />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col d-flex">
              <div className="px-3 col">Mytodo</div>
                <label>Status Filter</label>
                <select
                 onChange={(e) => {
                  console.log(e.target.value);
                  let a = JSON.parse(localStorage.getItem('tasklist'));
                  console.log(a);
                  if(e.target.value === 'all'){
                    setTasklist(a);
                  return;
                  }
                  let b = a.filter((value) => {
                    if(value.status == e.target.value){
                      return value;
                    }
                  });
                  setTasklist(b);
                 }}
                 name= 'status'
                 id='status'
                 >
                   <option value='all'>All</option>
                   <option className="bg-sucess" value="Completed">
                    Completed
                   </option>
                   <option className="bg-danger" value="Not-Completed">
                    Not-Completed
                   </option>
                 </select>
            </div>
          </div>

        {/* Calling Card Component */}
        <div className="task-container mt-3 px-4 row">
          {tasklist &&
            tasklist.map((obj, index) => (
              <Card
                edit={edit}
                setEdit={setEdit}
                taskName={taskName}
                setTaskName={setTaskName}
                description={description}
                setDescription={setDescription}
                save={saveTask}
                taskobj={obj}
                deleteTask={deleteTask}
                index={index}
                key={index}
                staus={status}
                setStatus={setStatus}
              />
            ))}
        </div>
      </div>
    </div>
      </>
     )
}
export default App