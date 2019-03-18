// Going to sign in page from the nav

const callSignin = () => { // eslint-disable-line 
    window.location = 'html/signupIn.html?hide=true';
};

// Going to sign up page from the nav
const callSignup  = () => { // eslint-disable-line 
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
