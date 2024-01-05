import  mongoose  from "mongoose";

const Mongoose = async()=>{
    try {
        await mongoose.connect("mongodb+srv://sidharthtp096:sidharthtp096@cluster0.ejppkeh.mongodb.net/")
        console.log("Database connected");
    } catch (error) {
        console.log("Database connection error",error);
    }

}

export default Mongoose
