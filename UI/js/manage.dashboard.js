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

const MessagesDisplay = (box) => {

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
    
        for (let index = 0; index < 11; index++) {
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
            contacts.setAttribute("onclick", "openThread()");
            let t = document.createTextNode("Contacts");
    
            contacts.appendChild(t);
            mail.appendChild(contacts);
    
            let content = document.createElement("TD");
            content.setAttribute("class", "content-truncated");
            content.setAttribute("onclick", "openThread()");
            let u = document.createTextNode("Content truncated");
    
            content.appendChild(u);
            mail.appendChild(content);
    
            let date = document.createElement("TD");
            date.setAttribute("class", "last-activity-date");
            date.setAttribute("onclick", "openThread()");
            let v = document.createTextNode("Date");
    
            date.appendChild(v);
            mail.appendChild(date);
    
    
            console.log(index)
            document.getElementById("mail-table").appendChild(mail);
    
        }
    
        //putting the loaded mail on the div
};

const openThread = ()=>{
    //changing the classname for either features then emptying the display
    document.querySelector(".mails-display").className = 'mails-display-inside-inbox';
    document.querySelector(".mails-display-inside-inbox").innerHTML = '';

    //displaying the mails in a table by creating objects with the dom
    //putting the loaded mail on the div
    let mailTable = document.createElement("TABLE");
    mailTable.setAttribute("id", "mail-table");
    document.querySelector(".mails-display-inside-inbox").appendChild(mailTable);
    for (let index = 0; index < 5; index++) {





        let mail = document.createElement("TR");
        mail.setAttribute("id", "1");
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
        let t = document.createTextNode("owner name of the sender");

        contacts.appendChild(t);
        mail.appendChild(contacts);

        let content = document.createElement("TD");
        content.setAttribute("class", "content-truncated");
        let u = document.createTextNode("Content truncated");

        content.appendChild(u);
        mail.appendChild(content);

        let date = document.createElement("TD");
        date.setAttribute("class", "last-activity-date");
        let v = document.createTextNode("Date");

        date.appendChild(v);
        mail.appendChild(date);

        document.getElementById("mail-table").appendChild(mail);

    }

};
 
 