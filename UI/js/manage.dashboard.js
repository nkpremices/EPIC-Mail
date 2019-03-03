let reverse = true;
const manageSlide = () =>{
    
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
};

document.getElementById('slide-button').addEventListener("click",manageSlide);
 

const openSlideMenu = () =>{
    
    document.getElementById('main').style.marginLeft='250px';
};
