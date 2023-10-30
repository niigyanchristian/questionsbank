const mongoose= require('mongoose');

const MongoDB = async()=> await mongoose.connect(process.env.URL,{useNewUrlParser: true});

module.exports = MongoDB;
