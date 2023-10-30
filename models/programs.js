const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
    name: String,
    level:String,
    description: String,
    date: {
        type: String,
        default:new Date().toLocaleDateString()
    },
    thumbnail: String,
});

const Program = mongoose.models.Program || new mongoose.model("Program", programSchema);

module.exports = Program;