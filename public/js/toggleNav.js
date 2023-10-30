
  const body = document.querySelector('body'),
  sidebar = body.querySelector('nav'),
  toggle_1 = body.querySelector(".toggle_1"),
  toggle_2 = body.querySelector(".toggle_2");
    console.log(toggle_1,toggle_2)

  toggle_1.addEventListener("click" , () =>{
    console.log(1111)
    
    console.log(2222,sidebar.classList.toggle("close"));
  });

  toggle_2.addEventListener("click" , () =>{
      sidebar.classList.toggle("close");
  });
