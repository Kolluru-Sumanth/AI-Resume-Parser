const express=require('express');
const multer=require('multer');
const pdf_parse=require('pdf-parse');
const gemini = require('./gemini model');
const { fetchJobsFromAPI } = require('./adzuna');
const cors=require('cors')
const User = require('./db');
const app=express();
const port=3000;
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        return cb(null,'./uploads');
    },
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`);
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'application/pdf') {
        cb(null, true); 
    } else {
        cb(new Error('Only PDF files are allowed!'), false);
    }
};
const upload=multer({storage,fileFilter});

app.use(cors());

app.post('/api/v1/resumeupload',upload.single("resume"),async(req,res)=>{
    try{
        const parsed_data=await pdf_parse(req.file.path);
        const skills=await gemini(parsed_data.text);
        console.log(skills);
        const dbResponse = await User.create(skills);
        res.json({message:"resume uploaded successfully",name:dbResponse.name});
        // const jobs=await fetchJobsFromAPI(skills.skills);
        // res.json(jobs);
}catch(error){
    res.status(400).json({message:"please upload a pdf file"});
    console.log(error);
}
})

app.get('/api/v1/jobs', async (req, res) => {
    try {
        const skills = await User.find({ name: req.params.name });
        const jobs = await fetchJobsFromAPI(skills);
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log(error);
    }
})


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});