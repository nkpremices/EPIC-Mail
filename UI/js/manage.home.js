//Going to sign in page from the nav
var callSignin = function ()  {

    //changing the display of the navigation 
     document.getElementById('home-nav').className="li nav-inactive";
     document.getElementById('signin-nav').className="li nav-active";
     document.getElementById('signup-nav').className="li nav-inactive";

};

//Going to sign up page from the nav
var callSignup = function ()  {
    //changing the display of the navigation 
    document.getElementById('home-nav').className="li nav-inactive";
    document.getElementById('signin-nav').className="li nav-inactive";
    document.getElementById('signup-nav').className="li nav-active";
};

//Going to Home page from the nav
var callHome = function ()  {
    //changing the display of the navigation 
    document.getElementById('home-nav').className="li nav-active";
    document.getElementById('signin-nav').className="li nav-inactive";
    document.getElementById('signup-nav').className="li nav-inactive";
};

