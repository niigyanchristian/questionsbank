let blur = document.querySelector('#blur'),
 popup1 = document.querySelector('#popup1'),
 popup2 = document.querySelector('#popup2'),
 make_admin = document.querySelector('.make_admin'),
 admin_text = document.querySelector('.admin_text'),
 unmake_admin = document.querySelector('.unmake_admin'),
 userDetails;


const cancel_admin = () => {
    blur.classList.toggle('admin_active');
    
    popup1.classList.toggle('admin_active');
    console.log('blurred');

}
const cancel_delete = () => {
    blur.classList.toggle('delete_active');
    popup2.classList.toggle('delete_active');


}

const admin_popup = (e,user,id) => {
    userDetails = user;
    let username1;
    let username2;
    console.log(id)
    if(user._id == id){
        username1='Yourself';
        username2= 'You'
        console.log(true)
    }else{
        username1 =user.username;
        username2 =user.username;
        console.log(false)
    }
    

    if(e.text === "Make Admin"){
        admin_text.innerHTML = 'Are you sure you want to make<span> '+username1+'</span> an admin?<span class="block font-bold text-gray-700 text-center"><span>'+username2+' will now have admin privileges</span>';
    } else{
        admin_text.innerHTML = 'Are you sure you want to remove<span> '+username1+'</span> from being an admin?<span class="block font-bold text-gray-700 text-center"><span>'+username2+' wouldn\'t have admin privileges</span>'
    }

    blur.classList.toggle('admin_active');
    popup1.classList.toggle('admin_active'); 

}

const delete_popup = () => {
    blur.classList.toggle('delete_active');
    popup2.classList.toggle('delete_active');
    console.log('blurred');   

}


const handelChange = () => {
    cancel_admin()

      const url = '/admin/members';
      const data = { username: userDetails.username,admin:userDetails.admin,id:userDetails._id};
    
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data).toString()
      };
    
      fetch(url, options)
        .then(response => response.text())
        .then(data => {
            console.log(data)
            window.location.href = '/admin/members';
        })
        .catch(error => console.error(error));
    
}