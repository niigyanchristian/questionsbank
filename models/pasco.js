const mongoose = require("mongoose");

const pascoSchema = new mongoose.Schema({
    name: String,
    code: String,
    examiner: String,
    year: String,
    semester: String,
    pdf: String,
    date: {
        type: String,
        default:new Date().toLocaleDateString()
    },
});

const Pasco = mongoose.models.Pasco || new mongoose.model("Pasco", pascoSchema);

module.exports = Pasco;