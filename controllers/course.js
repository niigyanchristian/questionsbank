const { getLocalStorage } = require('../hooks/useLocalStorage');
const Course = require('../models/course');
const Pasco = require('../models/pasco');


exports.getCourses = async (req,res)=>{
    const courseId = req.params.id;
    if(req.isAuthenticated()){
        const userDetails = getLocalStorage(req);
    try {    
        const result =await Course.findById(courseId);
        const pascos =await Pasco.find({code:result.code})
        
        
            if(userDetails.admin){
                res.render('admin/selected_course',{pascos,courseName:result.name,courseCode:result.code,courseId})
            }else{
                res.render('selected_course',{pascos,courseName:result.name,courseCode:result.code})
                
            }
            
        
    } catch (error) {
        console.log("error @ admin_selected_course->",error);
    }
    }else{
        res.redirect("/login");
    }
}

exports.getEditCourse = async(req,res)=>{
    const courseId =req.params.id;
    console.log()
    try {
        const course = await Course.findById(courseId)
        res.render('admin/editCourse',{course})
        
    } catch (error) {
     console.log(error.message)   
    }
}

exports.getDeleteCourse = async(req,res)=>{
    const courseId =req.params.id;
    console.log()
    try {
        await Course.findByIdAndDelete(courseId);
        res.redirect('/admin');
        
    } catch (error) {
     console.log(error.message);   
    }
}
exports.postEditCourse = async(req,res)=>{
    const courseId =req.params.id;
    const {name,code,level,cpen,biomed,agric,materials,Food_Process,} = req.body;
    
    try {
        const course = await Course.findByIdAndUpdate(courseId,{name,code,level,
            cpen:cpen?'on':'',
            biomed:biomed?'on':'',
            agric:agric?'on':'',
            materials:materials?'on':'',
            Food_Process:Food_Process?'on':''})
        course ? res.redirect('/admin'): res.send('Error in Editing Course');
        
    } catch (error) {
        console.log(error.message)
    }
}

