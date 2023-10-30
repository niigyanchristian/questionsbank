const { getLocalStorage } = require('../hooks/useLocalStorage');
const Course = require('../models/course');

exports.getPrograms = async (req,res)=>{
    const programName = req.params.pname;
    const userDetails = getLocalStorage(req);
    let department;
    

    try {
     
            const query = { [programName]: 'on' };
            const course = await Course.find(query);

            const level100 = course.filter((item)=>item.level === 'l100')
            const level200 = course.filter((item)=>item.level === 'l200')
            const level300 = course.filter((item)=>item.level === 'l300')
            const level400 = course.filter((item)=>item.level === 'l400')
           if(programName==='cpen'){
             department= 'Computer Engineering';
            }else if(programName==='biomed'){
               department= 'Biomedical Engineering';
            }else if(programName==='agric'){
               department= 'Agricultural Engineering';       
            }else if(programName==='Food_Process'){
               department= 'Food Process Eng.';
            }else if(programName==='materials'){
               department= 'Materials science & ENG.';
            }
    
        
        if(userDetails.admin){
            res.render('admin/selected_program',{level100,level200,level300,level400,course,department});
        }else{
            res.render('selected_program',{level100,level200,level300,level400,course,department});
        }
    } catch (error) {
        console.log('error @ getPrograms->',error);
    }
}

