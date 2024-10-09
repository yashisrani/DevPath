const Tag = require('../Models/Tag')



// create tags
exports.createTags = async(req,res)=>{
   try{
      // fetch data from req body
      const {name,description} = req.body;

      // validation
      if(!name || !description){
        return res.status(404).json({
            message: "All fields are required",
            success: false
        })
      }

      // create entry in db
      const tagDetails = await Tag.create({name:name,description:description});

      // response
      res.status(200).json({
          message: "Tag created successfully",
          success: true,
          data: tagDetails
      })
   }
   catch(err){
        res.status(500).json({
            message: "Error creating tag",
            success: false
        })
   }
}

// get all tags
exports.getAllTags = async(req,res)=>{
    try{
        // fetch all tags from db
        const allTags = await Tag.find({}, {name:true, description:true})

        // response 200 with all tags data
        res.status(200).json({
            message: "All tags fetched successfully",
            success: true,
            data: allTags
        })
    }
    catch(err){
        res.status(400).json({
            message: "Error fetching tags",
            success: false
        })
    }
}