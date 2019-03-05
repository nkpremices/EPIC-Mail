let reverse = true;
//side menu display or hide

document.getElementById('slide-button').addEventListener("click", () => {

    if (reverse) {
        document.querySelector(".main").style.width = '95%';
        document.querySelector(".main").style.marginLeft = '10%';
        document.getElementById('side-menu').className = 'hide';
        reverse = false;
    }
    else {
        document.querySelector(".main").style.width = '80%';
        document.getElementById('side-menu').className = 'side-nav to-left';
        reverse = true;

    }
});

//displaying the message of a requested box

const MessagesDisplay = (box) => {
    //box is the   clicked box menu(inbox,sent items, etc)
    //changing the display of the side menu
     
    for (el of document.querySelector('.a').getElementsByTagName('*')) el.className="#"; 
    document.getElementById(box.id).className = "side-active";
 
    
        //changing the classname for either features then emptying the display
        if  (document.querySelector(".mails-display-inside-inbox")) document.querySelector(".mails-display-inside-inbox").className = 'mails-display';
        document.querySelector(".mails-display").innerHTML = '';
    
        //displaying the mails in a table by creating objects with the dom
        let mailTable = document.createElement("TABLE");
        mailTable.setAttribute("id", "mail-table");
        document.querySelector(".mails-display").appendChild(mailTable);
    
    //choosing which method will be loaded to read every email when it's clecked (Read? or write?)
    if((box.id==="inbox")||(box.id==="sent")) createTableForBox("read-mode");
    else openThread("write-mode");

    
         
};

//creating a table to display emails of a given box

const createTableForBox = (mode) =>{
    console.log(mode);
    for (let index = 0; index < 5; index++) {
        let mail = document.createElement("TR");
        mail.setAttribute("id", index);
        mail.setAttribute("class", "mail");


        let profile = document.createElement("TD");
        profile.setAttribute("class", "check-box");
        profile.setAttribute("id", "chb");

        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("name", "select-one");
        checkbox.setAttribute("class", "check-box-input");


        profile.appendChild(checkbox);
        mail.appendChild(profile);

        let contacts = document.createElement("TD");
        contacts.setAttribute("class", "contacts-in-thread");
        contacts.setAttribute("id", mode);
        contacts.setAttribute("onclick", "openThread(this)");
        let t = document.createTextNode("Contacts");

        contacts.appendChild(t);
        mail.appendChild(contacts);

        let content = document.createElement("TD");
        content.setAttribute("class", "content-truncated");
        content.setAttribute("id", mode);
        content.setAttribute("onclick", "openThread(this)");
        let u = document.createTextNode("Content truncated");

        content.appendChild(u);
        mail.appendChild(content);

        let date = document.createElement("TD");
        date.setAttribute("class", "last-activity-date");
        date.setAttribute("id",mode);
        date .setAttribute("onclick", "openThread(this)");
        let v = document.createTextNode("Date");

        date.appendChild(v);
        mail.appendChild(date);


      
        document.getElementById("mail-table").appendChild(mail);

    }
};

//opening am mail's thread

const openThread = (el)=>{
   //el is the html id of the clicked tr
    //changing the classname for either features then emptying the display

    let objRecieved ;

    if(el==="write-mode") objRecieved = "";
    else { 
        objRecieved=el.id;
        console.log(el.id)
        console.log(el.parentNode.id)
    }

    document.querySelector(".mails-display").className = 'mails-display-inside-inbox';
    document.querySelector(".mails-display-inside-inbox").innerHTML = '';

    //displaying the mails in a table by creating objects with the dom
    //putting the loaded mail on the div
    let mailTable = document.createElement("TABLE");
    mailTable.setAttribute("id", "mail-table");
    document.querySelector(".mails-display-inside-inbox").appendChild(mailTable);

    //using the mode now to read or to write an/on an email
    let callbackFunctionReadWrite = "";
    if(objRecieved==="read-mode") callbackFunctionReadWrite = "openMessageRead(this)";
    else callbackFunctionReadWrite ="openMessageWrite(this)";


    for (let index = 0; index < 20; index++) {

        let mail = document.createElement("TR");
        mail.setAttribute("id", index);
        mail.setAttribute("class", "mail");


        let profile = document.createElement("TD");
        profile.setAttribute("class", "mail-profile");
        profile.setAttribute("id", "image-slide");

        let img = document.createElement("IMG");
        img.setAttribute("src", "../assets/images/profile.jpg");
        img.setAttribute("width", "40");
        img.setAttribute("id", "image-slide");

        profile.appendChild(img);
        mail.appendChild(profile);

        let contacts = document.createElement("TD");
        contacts.setAttribute("class", "contacts-in-thread");
        contacts.setAttribute("id", objRecieved);
        contacts.setAttribute("onclick", callbackFunctionReadWrite);
        let t = document.createTextNode("owner name of the sender");

        contacts.appendChild(t);
        mail.appendChild(contacts);

        let content = document.createElement("TD");
        content.setAttribute("class", "content-truncated");
        content.setAttribute("id", objRecieved);
        content.setAttribute("onclick", callbackFunctionReadWrite);
        let u = document.createTextNode("Content truncated");

        content.appendChild(u);
        mail.appendChild(content);

        let date = document.createElement("TD");
        date.setAttribute("class", "last-activity-date");
        date.setAttribute("id", objRecieved);
        date.setAttribute("onclick", callbackFunctionReadWrite);
        let v = document.createTextNode("Date");

        date.appendChild(v);
        mail.appendChild(date);

        document.getElementById("mail-table").appendChild(mail);

    }

    deletePreviousBox();

    //creating the box to display the message
    createOverlay();
    createDialogBox();


};

//function to create an overlay tag

const createOverlay = ()=>{
    let overlayMessageBox = document.createElement('div');
    overlayMessageBox.setAttribute("id","dialog-overlay");
    document.getElementById("page").appendChild(overlayMessageBox);
    
}

//function to create a dialog box tag

const createDialogBox =()=>{


    let readMessageBox = document.createElement('div');
    readMessageBox.setAttribute("id","dialog-box")
    document.getElementById("page").appendChild(readMessageBox);

    let readMessageBoxHead = document.createElement('div');
    readMessageBoxHead.setAttribute("id","dialog-box-head")
    document.getElementById("dialog-box").appendChild(readMessageBoxHead);

    let readMessageBoxBody = document.createElement('div');
    readMessageBoxBody.setAttribute("id","dialog-box-body")
    document.getElementById("dialog-box").appendChild(readMessageBoxBody);

    let readMessageBoxFoot = document.createElement('div');
    readMessageBoxFoot.setAttribute("id","dialog-box-foot")
    document.getElementById("dialog-box").appendChild(readMessageBoxFoot);

    
};

//function to Read a email

const openMessageRead = (el)=>{
    //el is the clicked tag
    console.log(el.id);
    console.log(el.parentNode.id);
    renderDialog(150,25,25,"Read message");

    document.getElementById("dialog-box-body").innerText='This is the text of the mail untroncated'

    document.getElementById("dialog-box-foot").innerHTML="";
    let button = document.createElement("button");
    button.innerHTML="return";
    button.setAttribute("onclick","destroyDialog()")
    document.getElementById("dialog-box-foot").appendChild(button);
    

};

//function to write a email

const openMessageWrite = (el)=>{
    //el is the clicked tag
    console.log(el.id);
    console.log(el.parentNode.id);

    let button = document.createElement("button");
    let placeToWrite = document.createElement("textarea");
     
    placeToWrite.setAttribute("id","email-text")

    
    renderDialog(80,10,10,"Write message");

    document.getElementById("dialog-box-body").innerHTML="";
    document.getElementById("dialog-box-body").appendChild(placeToWrite);

    document.getElementById("dialog-box-foot").innerHTML="";
    
    button.innerHTML="Send";
    button.setAttribute("onclick","destroyDialog()")
    document.getElementById("dialog-box-foot").appendChild(button);
    

};
 
 //functiion for creating box dialogs
   const renderDialog = (top,right,left,title)=>{
        let winW = window.innerWidth;
        let winH = window.innerHeight;
       
        let dialogbox = document.getElementById('dialog-box');
        
         
        dialogbox.style.left =  left+"%";
        dialogbox.style.right =  right+"%";
        dialogbox.style.top = top+"px";
        document.getElementById('dialog-overlay').style.display = "block";
        
        dialogbox.style.display = "block";
        dialogbox.style.position="fixed";
        
        document.getElementById('dialog-box-head').innerHTML = title;
        
    }

//function to destroy box dialogs

const destroyDialog = ()=>{
    document.getElementById('dialog-overlay').style.display = "none";
    document.getElementById('dialog-box').style.display = "none";
}

//function to delete previous messages showing Box 

const deletePreviousBox =()=>{
     //variables to see if there is a 
    let ovlPrevious = document.getElementById("dialog-overlay");
    let boxPrevious = document.getElementById("dialog-box");
    if(ovlPrevious) ovlPrevious.parentNode.removeChild(ovlPrevious);
    if(boxPrevious) boxPrevious.parentNode.removeChild(boxPrevious);
};

//fuction to create a message

const newMessage = (el)=>{
    //deleting previous messages box
    deletePreviousBox();

    //creating the box to display the message
    createOverlay();
    createDialogBox();

    openMessageWrite(el);

};