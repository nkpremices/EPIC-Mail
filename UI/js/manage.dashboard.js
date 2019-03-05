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
    //box is the name of the clicked box menu(inbox,sent items, etc)
    //changing the display of the side menu
    
    for (el of document.querySelector('.a').getElementsByTagName('*')) el.className="#"; 
    document.getElementById(box).className = "side-active";
 
    
        //changing the classname for either features then emptying the display
        if  (document.querySelector(".mails-display-inside-inbox")) document.querySelector(".mails-display-inside-inbox").className = 'mails-display';
        document.querySelector(".mails-display").innerHTML = '';
    
        //displaying the mails in a table by creating objects with the dom
        let mailTable = document.createElement("TABLE");
        mailTable.setAttribute("id", "mail-table");
        document.querySelector(".mails-display").appendChild(mailTable);
    
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
            contacts.setAttribute("onclick", "openThread(this)");
            let t = document.createTextNode("Contacts");
    
            contacts.appendChild(t);
            mail.appendChild(contacts);
    
            let content = document.createElement("TD");
            content.setAttribute("class", "content-truncated");
            content.setAttribute("onclick", "openThread(this)");
            let u = document.createTextNode("Content truncated");
    
            content.appendChild(u);
            mail.appendChild(content);
    
            let date = document.createElement("TD");
            date.setAttribute("class", "last-activity-date");
            date .setAttribute("onclick", "openThread(this)");
            let v = document.createTextNode("Date");
    
            date.appendChild(v);
            mail.appendChild(date);
    
    
          
            document.getElementById("mail-table").appendChild(mail);
    
        }
    
        //putting the loaded mail on the div
};

//opening am mail's thread

const openThread = (el)=>{
    console.log(el.parentNode.id)//el is the html id of the clicked tr
    //changing the classname for either features then emptying the display
    document.querySelector(".mails-display").className = 'mails-display-inside-inbox';
    document.querySelector(".mails-display-inside-inbox").innerHTML = '';

    //displaying the mails in a table by creating objects with the dom
    //putting the loaded mail on the div
    let mailTable = document.createElement("TABLE");
    mailTable.setAttribute("id", "mail-table");
    document.querySelector(".mails-display-inside-inbox").appendChild(mailTable);
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
        contacts.setAttribute("onclick", "openMessageRead(this)");
        let t = document.createTextNode("owner name of the sender");

        contacts.appendChild(t);
        mail.appendChild(contacts);

        let content = document.createElement("TD");
        content.setAttribute("class", "content-truncated");
        content.setAttribute("onclick", "openMessageRead(this)");
        let u = document.createTextNode("Content truncated");

        content.appendChild(u);
        mail.appendChild(content);

        let date = document.createElement("TD");
        date.setAttribute("class", "last-activity-date");
        date.setAttribute("onclick", "openMessageRead(this)");
        let v = document.createTextNode("Date");

        date.appendChild(v);
        mail.appendChild(date);

        document.getElementById("mail-table").appendChild(mail);

    }

    //creating the box to display the message
    createOverlay("mail-table");
    createDialogBox("mail-table");


};

//function to create an overlay tag

const createOverlay = (placeId)=>{
    let overlayMessageBox = document.createElement('div');
    overlayMessageBox.setAttribute("id","dialog-overlay");
    document.getElementById(placeId).appendChild(overlayMessageBox);
    
}

//function to create a dialog box tag

const createDialogBox =(placeId)=>{


    let readMessageBox = document.createElement('div');
    readMessageBox.setAttribute("id","dialog-box")
    document.getElementById(placeId).appendChild(readMessageBox);

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
    console.log(el.parentNode.id);
    renderDialog(150,25,25,"Read message");

    document.getElementById("dialog-box-body").innerText='This is the text of the mail untroncated'

    document.getElementById("dialog-box-foot").innerHTML="";
    let button = document.createElement("button");
    button.innerHTML="return";
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
        
        document.getElementById('dialog-box-head').innerHTML = title;
        
    }

//function to destroy box dialogs

const destroyDialog = ()=>{
    document.getElementById('dialog-overlay').style.display = "none";
    document.getElementById('dialog-box').style.display = "none";
}

