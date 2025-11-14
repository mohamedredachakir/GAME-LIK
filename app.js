let themeMode = localStorage.getItem("mode") || "";

if(themeMode){
    if(themeMode === "light"){
      document.body.classList.add('bg-[#fffbfb]');
      document.body.classList.remove('bg-black');
    }else{
      document.body.classList.remove('bg-[#fffbfb]');
      document.body.classList.add('bg-black');
    }
}

function changemode(){
    if(document.body.classList.contains('bg-black')){
      document.body.classList.add('bg-[#fffbfb]');
      document.body.classList.remove('bg-black');
      localStorage.setItem("mode", "light")
    }else{
      document.body.classList.remove('bg-[#fffbfb]');
      document.body.classList.add('bg-black');
      localStorage.setItem("mode", "dark")
    }
};






