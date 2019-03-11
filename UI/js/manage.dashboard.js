
let reverse = true;
// side menu display or hide

document.getElementById('slide-button').addEventListener('click', () => {
    if (reverse) {
        document.querySelector('.main').style.width = '95%';
        document.querySelector('.main').style.marginLeft = '10%';
        document.getElementById('side-menu').className = 'hide';
        reverse = false;
    } else {
        document.querySelector('.main').style.width = '80%';
        document.getElementById('side-menu').className = 'side-nav to-left';
        reverse = true;
    }
});

// creating a table to display emails of a given box

const createTableForBox = (mode) => {
    // custom console
    console.log(mode);// eslint-disable-line
    for (let index = 0; index < 5; index += 1) {
        const mail = document.createElement('TR');
        mail.setAttribute('id', index);
        mail.setAttribute('class', 'mail');


        const profile = document.createElement('TD');
        profile.setAttribute('class', 'check-box');
        profile.setAttribute('id', 'chb');

        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('name', 'select-one');
        checkbox.setAttribute('class', 'check-box-input');


        profile.appendChild(checkbox);
        mail.appendChild(profile);

        const contacts = document.createElement('TD');
        contacts.setAttribute('class', 'contacts-in-thread');
        contacts.setAttribute('id', mode);
        contacts.setAttribute('onclick', 'openThread(this)');
        const t = document.createTextNode('Contacts');

        contacts.appendChild(t);
        mail.appendChild(contacts);

        const content = document.createElement('TD');
        content.setAttribute('class', 'content-truncated');
        content.setAttribute('id', mode);
        content.setAttribute('onclick', 'openThread(this)');
        const u = document.createTextNode('Content truncated');

        content.appendChild(u);
        mail.appendChild(content);

        const date = document.createElement('TD');
        date.setAttribute('class', 'last-activity-date');
        date.setAttribute('id', mode);
        date.setAttribute('onclick', 'openThread(this)');
        const v = document.createTextNode('Date');

        date.appendChild(v);
        mail.appendChild(date);
        document.getElementById('mail-table').appendChild(mail);
    }
};

// function to delete previous messages showing Box

const deletePreviousBox = () => {
    // variables to see if there is a
    const ovlPrevious = document.getElementById('dialog-overlay');
    const boxPrevious = document.getElementById('dialog-box');
    if (ovlPrevious) ovlPrevious.parentNode.removeChild(ovlPrevious);
    if (boxPrevious) boxPrevious.parentNode.removeChild(boxPrevious);
};

// function to create an overlay tag

const createOverlay = () => {
    const overlayMessageBox = document.createElement('div');
    overlayMessageBox.setAttribute('id', 'dialog-overlay');
    document.getElementById('page').appendChild(overlayMessageBox);
};

// function to create a dialog box tag

const createDialogBox = () => {
    const readMessageBox = document.createElement('div');
    readMessageBox.setAttribute('id', 'dialog-box');
    document.getElementById('page').appendChild(readMessageBox);

    const readMessageBoxHead = document.createElement('div');
    readMessageBoxHead.setAttribute('id', 'dialog-box-head');
    document.getElementById('dialog-box').appendChild(readMessageBoxHead);

    const readMessageBoxBody = document.createElement('div');
    readMessageBoxBody.setAttribute('id', 'dialog-box-body');
    document.getElementById('dialog-box').appendChild(readMessageBoxBody);

    const readMessageBoxFoot = document.createElement('div');
    readMessageBoxFoot.setAttribute('id', 'dialog-box-foot');
    document.getElementById('dialog-box').appendChild(readMessageBoxFoot);
};


// opening am mail's thread

const openThread = (el) => {
    // el is the html id of the clicked tr
    // changing the classname for either features then emptying the display

    let objRecieved;

    if (el === 'write-mode') objRecieved = '';// to see if the call comes from sent (in future it will be the id of the sent box)
    else {
        objRecieved = el.id;
        console.log(el.id);
        console.log(el.parentNode.id);
    }

    document.querySelector('.mails-display').className = 'mails-display-inside-inbox';
    document.querySelector('.mails-display-inside-inbox').innerHTML = '';

    // displaying the mails in a table by creating objects with the dom
    // putting the loaded mail on the div
    const mailTable = document.createElement('TABLE');
    mailTable.setAttribute('id', 'mail-table');
    document.querySelector('.mails-display-inside-inbox').appendChild(mailTable);

    // using the mode now to read or to write an/on an email
    let callbackFunctionReadWrite = '';
    if (objRecieved === 'read-mode') callbackFunctionReadWrite = 'openMessageRead(this)';
    else callbackFunctionReadWrite = 'openMessageWrite(this)';


    for (let index = 0; index < 20; index += 1) {
        const mail = document.createElement('TR');
        mail.setAttribute('id', index);
        mail.setAttribute('class', 'mail');

        const profile = document.createElement('TD');
        profile.setAttribute('class', 'mail-profile');
        profile.setAttribute('id', 'image-slide');

        const img = document.createElement('IMG');
        img.setAttribute('src', '../assets/images/profile.jpg');
        img.setAttribute('width', '40');
        img.setAttribute('id', 'image-slide');

        profile.appendChild(img);
        mail.appendChild(profile);

        const contacts = document.createElement('TD');
        contacts.setAttribute('class', 'contacts-in-thread');
        contacts.setAttribute('id', objRecieved);
        contacts.setAttribute('onclick', callbackFunctionReadWrite);
        const t = document.createTextNode('owner name of the sender');

        contacts.appendChild(t);
        mail.appendChild(contacts);

        const content = document.createElement('TD');
        content.setAttribute('class', 'content-truncated');
        content.setAttribute('id', objRecieved);
        content.setAttribute('onclick', callbackFunctionReadWrite);
        const u = document.createTextNode('Content truncated');

        content.appendChild(u);
        mail.appendChild(content);

        const date = document.createElement('TD');
        date.setAttribute('class', 'last-activity-date');
        date.setAttribute('id', objRecieved);
        date.setAttribute('onclick', callbackFunctionReadWrite);
        const v = document.createTextNode('Date');

        date.appendChild(v);
        mail.appendChild(date);

        document.getElementById('mail-table').appendChild(mail);
    }

    deletePreviousBox();

    // creating the box to display the message
    createOverlay();
    createDialogBox();
};

// displaying the message of a requested box

const MessagesDisplay = (box) => {
    // box is the   clicked box menu(inbox,sent items, etc)
    // changing the display of the side menu
    for (el of document.querySelector('.a').getElementsByTagName('*')){el.className = '#'};// eslint-disable-line
    document.getElementById(box.id).className = 'side-active';
    if (parseInt(box.id, 10)) document.getElementById('groups').className = 'side-active'; // to maintain the groups button active on the navigation

    // changing the classname for either features then emptying the display
    if (document.querySelector('.mails-display-inside-inbox')) document.querySelector('.mails-display-inside-inbox').className = 'mails-display';
    document.querySelector('.mails-display').innerHTML = '';

    // displaying the mails in a table by creating objects with the dom
    const mailTable = document.createElement('TABLE');
    mailTable.setAttribute('id', 'mail-table');
    document.querySelector('.mails-display').appendChild(mailTable);

    // choosing which method will be loaded to read every email when it's clecked (Read? or write?)
    // See if the box
    if ((box.id === 'inbox') || (box.id === 'sent') || (box.id === 'bin')) createTableForBox('read-mode');// for inbox and sent items
    else if (box.id === 'drafts') openThread('write-mode');// we will create an object to catch statement of boxes(write or read mode could change in id of boxes erlier)
    else { // Here catching initialization
        document.querySelector('.groups').style.display = ('none');
        reverse = true;
        createTableForBox('read-mode');
    }
};

// functiion for creating box dialogs
const renderDialog = (top, right, left, title) => {
    const dialogbox = document.getElementById('dialog-box');

    dialogbox.style.left = `${left}%`;
    dialogbox.style.right = `${right}%`;
    dialogbox.style.top = `${top}px`;
    document.getElementById('dialog-overlay').style.display = 'block';

    dialogbox.style.display = 'block';
    dialogbox.style.position = 'fixed';

    document.getElementById('dialog-box-head').innerHTML = title;
};

// function to Read a email

const openMessageRead = (el) => {// eslint-disable-line 
    // el is the clicked tag
    // custom console
    console.log(el.id);
    console.log(el.parentNode.id);
    renderDialog(150, 25, 25, 'Read message');

    document.getElementById('dialog-box-body').innerText = 'This is the text of the mail untroncated';

    document.getElementById('dialog-box-foot').innerHTML = '';
    const button = document.createElement('button');
    button.innerHTML = 'return';
    button.setAttribute('onclick', 'destroyDialog()');
    document.getElementById('dialog-box-foot').appendChild(button);
};

// function to write a email

const openMessageWrite = (el) => {
    // el is the clicked tag
    // custom console
    console.log(el.id);// eslint-disable-line
    console.log(el.parentNode.id);// eslint-disable-line

    const button = document.createElement('button');
    const placeToWrite = document.createElement('textarea');

    placeToWrite.setAttribute('id', 'email-text');


    renderDialog(80, 10, 10, 'Write message');

    document.getElementById('dialog-box-body').innerHTML = '';
    document.getElementById('dialog-box-body').appendChild(placeToWrite);

    document.getElementById('dialog-box-foot').innerHTML = '';

    button.innerHTML = 'Send';
    button.setAttribute('onclick', 'destroyDialog()');
    document.getElementById('dialog-box-foot').appendChild(button);
};


// function to destroy box dialogs

const destroyDialog = () => { // eslint-disable-line
    document.getElementById('dialog-overlay').style.display = 'none';
    document.getElementById('dialog-box').style.display = 'none';
};

// fuction to create a message

const newMessage = (el) => { // eslint-disable-line
    // deleting previous messages boxl
    deletePreviousBox();

    // creating the box to display the message
    createOverlay();
    createDialogBox();

    openMessageWrite(el);
};

// function to show the profile
const profile = (el) => { // eslint-disable-line
    if (reverse) {
        document.querySelector('.profile-box').style.display = ('inline');
        reverse = false;
    } else {
        document.querySelector('.profile-box').style.display = ('none');
        reverse = true;
    }
};

// funtion to change password

const changePassword = (el) => { // eslint-disable-line
    reverse = true;
    document.querySelector('.profile-box').style.display = ('none');
    document.querySelector('.reset-password').style.display = ('inline');
};

// function to submit the reset password
const submit = (el) => { // eslint-disable-line
    if (el.id === 'reset-password') document.querySelector('.form').style.display = ('none');
    else document.querySelector('.new-group').style.display = ('none');
};

// function to logout
const logout = () => { // eslint-disable-line
    window.location = ('../index.html');
};

// function to open the groups
const groups = (el) => { // eslint-disable-line
    const previousBox = document.querySelector('.side-active');
    if (reverse) {
        for (el of document.querySelector('.a').getElementsByTagName('*')) el.className = '#';// eslint-disable-line
        document.getElementById(el.id).className = 'side-active';
        document.querySelector('.groups').style.display = ('inline');
        reverse = false;
    } else {
        previousBox.className = 'side-active';
        document.querySelector('.groups').style.display = ('none');
        reverse = true;
    }
};

// changing page of groups for those who will have so many groups

const nextPageOfGroups = (el) => { // eslint-disable-line

};

// function to create a new group

const newGroup = (el) => { // eslint-disable-line
    if (el.id === 'new') {
        document.querySelector('.new-group').style.display = ('inline');
        document.querySelector('.groups').style.display = ('none');
        reverse = true;
    } else {
        document.querySelector('.new-group').style.display = ('inline');
        document.querySelector('.groups').style.display = ('none');
        reverse = true;
    }
};

// creating an object for initialization
const initialization = {
    id: 'inbox',
};

// initializing
MessagesDisplay(initialization);
