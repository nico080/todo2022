import TaskItem from './TaskItem'
import taskStyles from '../styles/Task.module.css'
import { useContext } from 'react'
import { DataContext } from '../utilities/DataContext'

const TaskList = () => {

  const [taskList] = useContext(DataContext);
  return (
    <div className={taskStyles.grid}>
      {taskList.map(taskItem => (
        <TaskItem key={taskItem._id} id={taskItem._id} taskItem={taskItem} />
      ))}
    </div>
  )
}

export default TaskList
