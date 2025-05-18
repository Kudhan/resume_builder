const mongoose= require("mongoose")

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL,{});
        console.log("Mongoose Connected");
    }catch(err){
        console.error("Error in Connecting to MongoDB",err);
        process.exit(1);
    }
};

module.exports=connectDB;