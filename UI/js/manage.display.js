
//Going to sign in from the form
document.getElementById('sigin-ref').addEventListener('click',function(){
  
    document.querySelector('.form .sigup-form').className="hide";
    document.querySelector('.form .sigin-form').className="buff"; 
    document.getElementById('sign-text').innerHTML="Login to EPIC";   
});

//Going to sign up from the form
document.getElementById('signup-ref').addEventListener('click',function(){
   
    document.querySelector('.form .hide').className="sigup-form";
    document.querySelector('.form .buff').className="sigin-form";  
    document.getElementById('sign-text').innerHTML="Register to EPIC";  
});