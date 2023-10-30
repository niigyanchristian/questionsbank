const body = document.querySelector('body'),
      sidebar = body.querySelector('nav'),
      toggle_1 = body.querySelector(".toggle_1"),
      toggle_1a = body.querySelector(".toggle_1a"),
      toggle_2 = body.querySelector(".toggle_2");


toggle_1.addEventListener("click" , () =>{
    sidebar.classList.toggle("close");
});
toggle_1a.addEventListener("click" , () =>{
    sidebar.classList.toggle("close");
});

toggle_2.addEventListener("click" , () =>{
    sidebar.classList.toggle("close");
});


