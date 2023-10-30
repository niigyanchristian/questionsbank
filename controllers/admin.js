const _ = require('lodash');
const Pasco = require('../models/pasco');
const Course = require('../models/course');
const User = require('../models/user');
const { uploadPDF, deletePDF } = require('../hooks/useUploadPDF');
const { addLocalStorage, getLocalStorage } = require('../hooks/useLocalStorage');

exports.getAdminPage = async(req,res) =>{
    const userDetails = getLocalStorage(req);
    Course.find().
    then(courses=>{ 
        if(userDetails.admin){
            // res.render('admin/admin',{courses:_.sampleSize(courses,6)});
            res.render('index',{courses:_.sampleSize(courses,6)});
        }else{
            res.redirect('/');
        }
    }).
    catch(e=>{
        console.log('error @ index->',e)
    })
}

exports.getAddCourse = async (req,res)=>{
    if(req.isAuthenticated()){
        const userDetails = getLocalStorage(req);
        
        if(userDetails.admin){
            res.render('admin/addCourse');
        }else{
            res.redirect('/');
        }
    }else{
        res.redirect("/login");
    }
}

exports.postAddCourse = async (req,res)=>{
    const {cpen,biomed,agric,materials,Food_Process} = req.body;
    if(req.isAuthenticated()){
        try {
            if(!req.body.level){
                res.send("The upload process has encountered a failure due to the absence of a selected course level!!!");
            }else{

                if(!cpen&&!biomed&&!agric&&!materials&&!Food_Process){
                    res.send("The upload process has encountered a failure. It appears that no department has been assigned to the course.");
                }else{

                    const course = await Course.find({code:req.body.code});
                    
                    if(course.length>0){
                        res.send('Course with code: '+req.body.code +' already exist!!!')
                    }else{
                        Course.create(req.body).
                        then(data=>{
                            res.redirect('/admin/addcourse');
                        }).
                        catch(e=>{
                            console.log("error @ adminAddCourse whiles creating course->",e)
                        })
                    }
                }
            }
           
        } catch (error) {
            console.log("error @ adminAddCourse->",error)
        }
   
    }else{
        res.redirect("/login");
    }
}

exports.getAddPasco = async (req,res)=>{
    if(req.isAuthenticated()){
        try {
            
            const userDetails = getLocalStorage(req);
            const courses= await Course.find({},'code');
            userDetails.admin ? res.render('admin/uploadQuestion',{courses}) : res.redirect('/');
        
        } catch (error) {
            console.log('error @ getaddpasco->',error);
        }
   
    }else{
        res.redirect("/login");
    }
}

exports.postAddPasco = async (req,res)=>{
    if(req.isAuthenticated()){
        const {name,code,examiner,year,semester} = req.body;
        const fileType=req.file.mimetype;
        try {
            if(code){
                const downloadURL = await uploadPDF(req.file);
        
                if(fileType ==="application/pdf" && downloadURL){
                    const pasco = Pasco({ name,code,examiner,year,semester,pdf: downloadURL});
            
                    const result = await pasco.save();
                            res.redirect('/admin/addpasco');
                };
            }else{
                res.send("The Course you assigned the Question to do not exist!!!")
            }
    
        } catch (error) {
            console.log("error in posting pasco->",error);
        };


    }else{
        res.redirect("/login");
        } 
};



exports.postDeletePDF  = async(req,res)=>{
    const {pascoId,courseId} = req.body
    if(req.isAuthenticated()){
        try{
            const userDetails = getLocalStorage(req);
            if(userDetails.admin){
                const pasco =await Pasco.findById(pascoId);
                const del_res = deletePDF(pasco.pdf);
                if(del_res){
                    const result= await  Pasco.findByIdAndDelete(pascoId)
                    if(result){
                        res.send("deleted");
                    }
                }
            }else{
                res.redirect('/');
            }
        }catch(error){
            console.log("Error in deleting file->",error.message);
            res.send("deleted");
        } 
    }else{
        res.redirect("/login");
        } 
}

exports.getEditPasco = async(req,res)=>{
    if(req.isAuthenticated()){
        try {
            
            const pascoId=req.params.id;
            const courses= await Course.find({},'code');
            const pasco = await Pasco.findById(pascoId);
            const userDetails = getLocalStorage(req);
           
            userDetails.admin ? res.render('admin/editQuestion',{courses,pasco}) : res.redirect('/');
        } catch (error) {
            console.log('error @ editpasco->',error);
        }
    }else{
    res.redirect("/login");
    } 
}

exports.postEditPasco = async(req,res)=>{
    if(req.isAuthenticated()){
        const {name,code,examiner,year,semester,oldFileUrl,oldFileId,change} = req.body;
        
        try {
            if(change){
                const fileType=req.file.mimetype;
                const del_res = deletePDF(oldFileUrl);
                if(del_res){
                    const downloadURL = await uploadPDF(req.file);
                    if(fileType ==="application/pdf" && downloadURL){
                        const pasco =await Pasco.findByIdAndUpdate(oldFileId,{name,code,examiner,year,semester,pdf:downloadURL})
                        pasco ? res.redirect('/admin'): res.send('Error in Editing Past Question');
                    }
                }

            }else{
                const pasco =await Pasco.findByIdAndUpdate(oldFileId,{name,code,examiner,year,semester});
                pasco ? res.redirect('/admin'): res.send('Error in Editing Past Question');
            }
        } catch (error) {
            console.log('error @ editpasco->',error);
        }
    
}else{
    res.redirect("/login");
    } 
}
exports.getMembers = async(req,res)=>{
    if(req.isAuthenticated()){
        try {
            const userDetails = getLocalStorage(req)
            const users = await User.find();
            const students = await User.find({ admin: false });
            const you = await User.findById(userDetails.pin);
            addLocalStorage(req,you._id,you.admin,you.username);
            console.log(you._id.toString())
            you.admin ? res.render('admin/allMembers',{users,profile:you._id.toString(),studentsNumber:students.length}) : res.redirect('/');
            
        } catch (error) {
            console.log('error @ getmember->',error);
        }
    }else{
        res.redirect("/login");
        } 
}
exports.postMembers = async(req,res)=>{
    if(req.isAuthenticated()){
        const  {username,admin,id}  = req.body;
        try {
            const userDetails = getLocalStorage(req);
            if(userDetails.admin){
                const toggle = () =>admin==='true' ? false : true;
                await User.findByIdAndUpdate(id,{admin:toggle()});
                res.status(201).send('Done!')
            }else{
                res.redirect('/')
            }
        } catch (error) {
            console.log('error @ changingadmin->',error);
        }
    }else{
        res.redirect("/login");
    } 
}