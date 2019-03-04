let reverse = true;
 

document.getElementById('slide-button').addEventListener("click", () =>{
    
    if(reverse)
    {
        document.querySelector(".main").style.width='95%';
        document.querySelector(".main").style.marginLeft='10%';
        document.getElementById('side-menu').className='hide';
        reverse = false;
    }
    else
    {
        document.querySelector(".main").style.width='80%';
        document.getElementById('side-menu').className='side-nav to-left';
        reverse = true;

    }
});


//Going to sent messages  
document.getElementById('sent').addEventListener("click", ()=> {

    //changing the display of the side menu
     document.getElementById('sent').className="side-active";
     document.getElementById('inbox').className="#";
     document.getElementById('drafts').className="#";
     document.getElementById('admin').className="#";

});

//Going inbox
document.getElementById('inbox').addEventListener("click", ()=> {

    //changing the display of the navigation 
     document.getElementById('sent').className="#";
     document.getElementById('inbox').className="side-active";
     document.getElementById('drafts').className="#";
     document.getElementById('admin').className="#";

});