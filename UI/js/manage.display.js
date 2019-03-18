// fetching a variable comming from the home page
const params = location.search.substring(1).split("&");// eslint-disable-line
const temp = params[0].split('=');
const hide = temp[1];

// A variable to fetch actions on the registration page
let registration;
const signIn = () => {
    document.getElementById('home-nav').className = 'li nav-inactive';
    document.getElementById('signin-nav').className = 'li nav-active';
    document.getElementById('signup-nav').className = 'li nav-inactive';
    document.querySelector('.signup-form').className = 'hide';
    document.querySelector('.signin-form').className = 'buff';
    registration = true;
};

const signUp = () => {
    document.querySelector('.form .hide').className = 'signup-form';
    document.querySelector('.form .buff').className = 'signin-form';
    // changing the display of the navigation
    document.getElementById('home-nav').className = 'li nav-inactive';
    document.getElementById('signin-nav').className = 'li nav-inactive';
    document.getElementById('signup-nav').className = 'li nav-active';
    registration = true;
};

// Going to sign in from the form
document.getElementById('signin-ref').addEventListener('click', signIn);

// Going to sign up from the form
document.getElementById('signup-ref').addEventListener('click', signUp);
// returning back on the home page
const backToHome = () => { // eslint-disable-line 
    const x = window.location = '../index.html';// eslint-disable-line
    return x;
};

// Trynig to see which form will be hide
if (!registration) {
    if (hide) signIn();
}
