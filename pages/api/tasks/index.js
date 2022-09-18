import task from "../../../models/task";
import dbConnect from "../../../utilities/dbConnect";

export default async function handler(req, res) {

  // Connect to database
	await dbConnect();

    if (req.method === "GET") {
     try {
        let getTaskListCnt = await task.find(req.query.done != null? {done:req.query.done} :{}).count();
        let getTaskList = await task.find(req.query.done != null? {done:req.query.done} :{}).sort({'_id': -1}).limit(req.query.limit).skip(req.query.skips != null? req.query.skips :0);
        return  res.status(200).json({
          totalNum: getTaskListCnt,
          totalPages:Math.ceil(getTaskListCnt / req.query.limit),
          tasks: getTaskList
        })
      } catch (e) {
        console.log(e)
        return   res.status(500).json({
          ok: false,
          message: 'Failed to retrieve task'
        })
      }    

    } else if (req.method === "POST") {
    
      try {
        let taskCreate = await task.create(req.body)
        taskCreate = taskCreate.toObject();
        return  res.status(200).json({
          task: taskCreate
        })
      } catch (e) {
        console.log(e)
        return    res.status(500).json({
          ok: false,
          message: 'Failed to create Task'
        })
      } 

  } else if (req.method === "DELETE") {
    
    try {
      task.deleteMany({ done: true },
        (async()=>{
          const tasks = await task.find({}).sort({'_id': -1}).limit(5)
          return  res.status(200).json({
            tasks,
          message: 'Successfully deleted task'
        })
        }));
    } catch (e) {
      console.log(e)
      return   res.status(500).json({
        ok: false,
        message: 'Failed to delete task'
      })
    } 
}
}
