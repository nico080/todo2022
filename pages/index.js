import { server } from "../config";
import TaskList from "../components/TaskList";
import taskStyles from "../styles/Task.module.css";
import { useState } from "react";
import { DataContext } from "../utilities/DataContext";
import axios from "axios";

export default function Home({ taskItems }) {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState(taskItems);

  const handleSubmit = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {

        let newTask = { task, done: false };

        axios.post(`${server}/api/tasks`, newTask)
        .then((response) => {
          return response.data.task;
        })
        .then((data) => {
          setTaskList((taskList) => [
            data,
            ...taskList,
          ]);
          setTask("");
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
     
    }
  };

  const handleUpdateStatus = (id,status) => {

   axios.patch(`${server}/api/tasks/item/${id}`, {done: !status})
   .then((response) => {
     return response.data;
   })
   .then((data) => {   
    taskList.find(obj=> obj._id === data.data._id).done = data.data.done
    setTaskList(taskList) 
  })
   .catch((error) => {
     console.log(error.response.data.error);
   });

  };

  const handleDeleteTask = (id) => {

    axios.delete(`${server}/api/tasks/item/${id}`)
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      setTaskList(taskList=> taskList.filter(task=>task._id !== id)) 
    })
    .catch((error) => {
      console.log(error.response.data.error);
    });
 
   };


   const getAllTask = (filter) => {
    axios.get(`${server}/api/tasks${filter == null ?  ''  : filter ? '?done=true' : '?done=false'  }`)
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      setTaskList(data.tasks) 
    })
    .catch((error) => {
      console.log(error.response.data.error);
    });
   
   };

   const removeComp = () => {
    
    axios.delete(`${server}/api/tasks`)
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      setTaskList(data.tasks) 

    })
    .catch((error) => {
      console.log(error.response.data.error);
    });
 
   
   };

  return (
    <>
    
      <input
        className={taskStyles.inputTXT}
        onKeyPress={handleSubmit}
        onChange={(e) => setTask(e.target.value)}
        type="text"
        placeholder="Add Task"
        title="Press Enter to Add"
        value={task}
      />

    <div className={taskStyles.btnGroup}>
<button onClick = {()=>{getAllTask()}} className={` ${ taskStyles.button0}`}>All</button>
<button onClick = {()=>{getAllTask(true)}} className={` ${ taskStyles.button1}`}>Done</button>
<button onClick = {()=>{getAllTask(false)}} className={`${ taskStyles.button5}`}>In Progress</button>
<button onClick = {()=>{removeComp()}} className={` ${ taskStyles.button3}`}>Remove completed</button>
</div>

      <div className={taskStyles.grid}>
        <DataContext.Provider value={[taskList, setTaskList,handleUpdateStatus,handleDeleteTask]}>
          <TaskList />
        </DataContext.Provider>
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get(`${server}/api/tasks`);
  const taskItems = res.data.tasks;

  return {
    props: {
      taskItems,
    },
  };
};
