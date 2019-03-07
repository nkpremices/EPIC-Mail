//Going to sign in page from the nav
// eslint-disable-next-line 
var callSignin = function ()  { // eslint-disable-line no-use-before-define

    //changing the display of the navigation 
    document.getElementById('home-nav').className='li nav-inactive';
    document.getElementById('signin-nav').className='li nav-active';
    document.getElementById('signup-nav').className='li nav-inactive';
    window.location='html/signupIn.html';
    // eslint-disable-next-line 
     signIn();

};

//Going to sign up page from the nav
// eslint-disable-next-line 
var callSignup = function ()  { // eslint-disable-line no-use-before-define
    //changing the display of the navigation 
    document.getElementById('home-nav').className='li nav-inactive';
    document.getElementById('signin-nav').className='li nav-inactive';
    document.getElementById('signup-nav').className='li nav-active';
    window.location='html/signupIn.html';
    // eslint-disable-next-line 
    signUp();
};

//Going to Home page from the nav
// eslint-disable-next-line 
var callHome = function ()  { // eslint-disable-line no-use-before-define
    //changing the display of the navigation 
    document.getElementById('home-nav').className='li nav-active';
    document.getElementById('signin-nav').className='li nav-inactive';
    document.getElementById('signup-nav').className='li nav-inactive';
};

