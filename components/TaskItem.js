import taskStyles from '../styles/Task.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faCheck, faTrash, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { useState,useContext,useEffect } from 'react'
import {DataContext} from '../utilities/DataContext'


const TaskItem = ({ taskItem }) => {

  const [taskList,setTaskList,handleUpdateStatus,handleDeleteTask]= useContext(DataContext);
  const [isHovering, setIsHovering] = useState(false);
  let isUpdated = false;
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  useEffect(()=>{
    isUpdated =!isUpdated
  },[taskList])

  return (
      <>
      <a onMouseOut={handleMouseOut} onMouseOver={handleMouseOver} className={`${taskStyles.card} ${ taskItem.done ? taskStyles.cardDone : ''}`}  >
        <h3>{taskItem.task}</h3>
          <span title={ !taskItem.done ? 'Mark as Done' : 'Undo Status' } >
            <FontAwesomeIcon
           id={taskItem._id}
            onClick = {()=>{ handleUpdateStatus(taskItem._id,taskItem.done) 
               setIsHovering(false);
              }}
            
            className={`${taskStyles.faIcons} ${  !taskItem.done ? taskStyles.check :''}`}
            onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}
            icon = { 
              !taskItem.done && isHovering && !isUpdated ? faCheck :
              !taskItem.done && !isHovering  && !isUpdated ? faCircleNotch :
              taskItem.done  && isHovering  && isUpdated ?  faCircleNotch:
              taskItem.done  && isHovering  && !isUpdated ?  faCircleNotch:

              faCheckCircle } /> 
          </span>
          <span title="Remove Task" >
            <FontAwesomeIcon 
            className={`${taskStyles.faIcons} ${taskStyles.trash}`}
            icon={faTrash}
            onClick = {()=>{handleDeleteTask(taskItem._id)}}
             /> 
          </span>
      </a>
      </>
  )
}

export default TaskItem