// Going to sign in page from the nav

const callSignin = () => { // eslint-disable-line 

    // changing the display of the navigation
    document.getElementById('home-nav').className = 'li nav-inactive';
    document.getElementById('signin-nav').className = 'li nav-active';
    document.getElementById('signup-nav').className = 'li nav-inactive';
    window.location = 'html/signupIn.html';
    signIn();// eslint-disable-line 
};

// Going to sign up page from the nav
const callSignup  = () => { // eslint-disable-line 
    // changing the display of the navigation
    document.getElementById('home-nav').className = 'li nav-inactive';
    document.getElementById('signin-nav').className = 'li nav-inactive';
    document.getElementById('signup-nav').className = 'li nav-active';
    window.location = 'html/signupIn.html';
    signUp();// eslint-disable-line 
};

// Going to Home page from the nav
const callHome = () => {// eslint-disable-line 
    // changing the display of the navigation
    document.getElementById('home-nav').className = 'li nav-active';
    document.getElementById('signin-nav').className = 'li nav-inactive';
    document.getElementById('signup-nav').className = 'li nav-inactive';
};
