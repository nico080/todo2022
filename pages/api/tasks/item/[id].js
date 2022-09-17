import task from "../../../../models/task";
import dbConnect from "../../../../utilities/dbConnect";

export default async function handler(req, res) {

  // Connect to database
	await dbConnect();
  if (req.method === "GET") {
    try {
      const result = await task.findById(
          req.query.id
      );
      res
          .status(200)
          .json({ data: result });
  } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
  } 
}
   else if (req.method === "PATCH") {
      try {
        const result = await task.findByIdAndUpdate(
            req.query.id,
            { $set: req.body },
            { new: true }
        );
        res
            .status(200)
            .json({ data: result });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(error);
    } 

    } else if (req.method === "DELETE") {
    
      try {
        await task.findByIdAndDelete(req.query.id);
        res.status(200).json({
          message: "Successfully Deleted"
        })
      } catch (e) {
        console.log(e)
        res.status(500).json({
          ok: false,
          message: 'Failed to Delete'
        })
      }
  }
}
