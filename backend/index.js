require("dotenv").config()
const express=require("express");
const cors=require("cors")
const path=require("path");
const connectDB = require("./config/db");
const authRoutes=require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRouter')

const app = express();


//middle ware to handle cors
app.use(cors());


//connect Database
connectDB()

//MiddleWare
app.use(express.json());


//Routes
app.use("/api/auth",authRoutes);
app.use("/api/resume",resumeRoutes);
app.use("/uploads",express.static(path.join(__dirname,"uploads"),{
    setHeaders:(res,path)=>{
        res.set("Access-Control-Allow-Origin","http://localhost:5173");
    },
})
);

const PORT =process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));