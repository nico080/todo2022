import { server } from "../config";
import TaskList from "../components/TaskList";
import taskStyles from "../styles/Task.module.css";
import { useState } from "react";
import { DataContext } from "../utilities/DataContext";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import { useRouter } from "next/router";

export default function Home({ taskItems }) {
  const router = useRouter();
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState(taskItems.tasks);
  const [taskListPages, setTaskListPages] = useState(taskItems.totalPages);
  const [taskListLimits, setTaskListLimits] = useState(router.query.limit == null ? 5 :router.query.limit);
  const [taskListFilter, setTaskListFilter] = useState(null);


  const handleSubmit = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {

        let newTask = { task, done: false };

        axios.post(`${server}/api/tasks`, newTask)
        .then((response) => {
          return response.data.task;
        })
        .then((data) => {
          taskList.pop();
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


   const getAllTask = (filter,skips) => {
    console.log(`${server}/api/tasks?${filter == null ? '' : `done=${filter}` }&limit=${taskListLimits}&skips=${skips == null? 0 : skips}`)
    axios.get(`${server}/api/tasks?${filter == null ? '' : `done=${filter}` }&limit=${taskListLimits}&skips=${skips == null? 0 : skips}`)
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      setTaskList(data.tasks) 
      setTaskListPages(data.totalPages)
      setTaskListFilter(filter == null? null :filter)
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


   const handleChangePage = (e,v) => {
    getAllTask(taskListFilter == null? null: taskListFilter,v == 1? 0 : (+v - 1) *  taskListLimits )
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
<button onClick = {()=>{
    
  getAllTask(true,0)
  
  }} className={` ${ taskStyles.button1}`}>Done</button>
<button onClick = {()=>{
    
    getAllTask(false,0)
    
    }} className={`${ taskStyles.button5}`}>In Progress</button>
<button onClick = {()=>{removeComp()}} className={` ${ taskStyles.button3}`}>Remove completed</button>
</div>

      <div className={taskStyles.grid}>
        <DataContext.Provider value={[taskList,handleUpdateStatus,handleDeleteTask]}>
        { taskList.length > 0 ? <TaskList /> : <div className={` ${ taskStyles.noTask}`}>no task found</div>}
           
        </DataContext.Provider>
      </div>

      <Pagination onChange={handleChangePage} count={taskListPages} size="large" />
    </>
  );
}

export const getServerSideProps = async (context) => {
  const res = await axios.get(`${server}/api/tasks?limit=${context.query.limit == null? 5:context.query.limit}`);
  const taskItems = res.data;

  return {
    props: {
      taskItems,
    },
  };
};
