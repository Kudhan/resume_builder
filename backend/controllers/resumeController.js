const fs = require("node:fs");
const path = require("node:path");
const Resume = require("../models/Resume");
const { Certificate } = require("node:crypto");

const createResume = async (req, res) => {
    try {
        const { title } = req.body;
        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: "",
                fullName: "",
                designation: "",
                summary: "",
            },
            contactInfo: {
                email: "",
                phone: "",
                location: "",
                linkedin: "",
                github: "",
                website: "",
            },
            workExperience: [
                {
                    company: "",
                    role: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                }
            ],
            education: [
                {
                    degree: "",
                    institution: "",
                    startDate: "",
                    endDate: ""
                },
            ],
            skills: [
                {
                    name: "",
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: "",
                    description: "",
                    github: "",
                    liveDemo: ""
                },
            ],
            Certifications: [
                {
                    title: "",
                    issuer: "",
                    year: "",
                },
            ],
            languages: [{
                name: "",
                progress: 0,
            }, ],
            interests: [""],
        };

        const newResume = await Resume.create({
            userId: req.user._id,
            title,
            ...defaultResumeData,
        });

        res.status(201).json(newResume);

    } catch (err) { // Change `error` to `err`
        res.status(500).json({ message: "Failed to Create Resume", error: err.message });
    }
};

const getUserResume = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user._id }).sort({
            updatedAt: -1,
        });
        res.json(resumes);

    } catch (err) { // Change `error` to `err`
        res.status(500).json({ message: "Failed to Fetch Resumes", error: err.message });
    }
};

const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        res.json(resume);
    } catch (err) { // Change `error` to `err`
        res.status(500).json({ message: "Failed to Fetch Resume", error: err.message });
    }
};

const updateResume = async (req, res) => {
    try{
        const resume = await Resume.findOne({
            _id:req.params.id,
            userId:req.user._id,
        });

        if(!resume){
            return res.status(404).json({message:"Resume not found"});
        }

        Object.assign(resume,req.body);

        const savedResume= await resume.save();
        res.json(savedResume);
    }catch(error){
        res.status(500).json({message:"Failed to Update Resume",error:error.message});
    }
};

const deleteResume = async (req, res) => {
    try{
        const resume = await Resume.findOne({
            _id:req.params.id,
            userId:req.user._id,
        })

        if(!resume){
            return res.status(404).json({message:"Resume not found"});
        }

        //delete thumbnails and profilePreviewUrl
        const uploadsFolder = path.join(__dirname,'..','uploads');
        const baseUrl = `${req.protocol}://${req.get("host")}`;

        if(resume.thumbnailLink){
            const oldProfile = path.join(uploadsFolder,path.basename(resume.profileinfo.profilePreviewUrl));
            if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
        }

        const deleted = await Resume.findOneAndDelete({
            _id:req.params.id,
            userId:req.user._id,
        });

        if(!deleted){
            return res.status(404).json({message:"Resume not found or unauthorized"});
        }

        res.json({message:"Resume deleted successfully"});
    }catch(error){
        res.status(500).json({message:"Failed to create Resume",error:error.message});
    }
};

module.exports = {
    createResume,
    getUserResume,
    getResumeById,
    updateResume,
    deleteResume,
};
