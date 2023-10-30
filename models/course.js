const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    name: String,
    code: {
        type:String,
        
    },
    level:String,
    cpen: String,
    biomed: String,
    agric: String,
    materials: String,
    Food_Process: String,
    date: {
        type: String,
        default:new Date().toLocaleDateString()
    },
});

const Course = mongoose.models.Course || new mongoose.model("Course", courseSchema);

module.exports = Course;