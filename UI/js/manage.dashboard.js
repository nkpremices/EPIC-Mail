let reverse = true;


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


//Going to sent messages  
document.getElementById('sent').addEventListener("click", () => {

    //changing the display of the side menu
    document.getElementById('sent').className = "side-active";
    document.getElementById('inbox').className = "#";
    document.getElementById('drafts').className = "#";
    document.getElementById('admin').className = "#";

});

//Going inbox
document.getElementById('inbox').addEventListener("click", () => {

    //changing the display of the navigation 
    document.getElementById('sent').className = "#";
    document.getElementById('inbox').className = "side-active";
    document.getElementById('drafts').className = "#";
    document.getElementById('admin').className = "#";

    //changing the classname for either features then emptying the display
    document.querySelector(".mails-display-inside-inbox").className = 'mails-display';
    document.querySelector(".mails-display").innerHTML = '';

    //displaying the mails in a table by creating objects with the dom
    let mailTable = document.createElement("TABLE");
    mailTable.setAttribute("id", "mail-table");
    document.querySelector(".mails-display").appendChild(mailTable);
    
    for (let index = 0; index < 11; index++) {   
    let mail = document.createElement("TR");
    mail.setAttribute("id", "1");
    mail.setAttribute("class", "mail");


    let profile = document.createElement("TD");
    profile.setAttribute("class", "mail-profile");
    profile.setAttribute("id", "image-slide");

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", "select-one");
    checkbox.setAttribute("class", "check-box-input");
    

    profile.appendChild(checkbox);
    mail.appendChild(profile);

    let contacts = document.createElement("TD");
    contacts.setAttribute("class", "contacts-in-thread");
    let t = document.createTextNode("Contacts");

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

    
        console.log(index)
        document.getElementById("mail-table").appendChild(mail);
        
    }
    
     


    //putting the loaded mail on the div
     
         
       
    
    

});

 
//Displaying a thread of the inbox
document.querySelectorAll('.mails-display table td')
//getting all the displayed mails in the inbox
    .forEach(e => e.addEventListener("click", () => {
        // Escaping the checkbox
        if (e.className === "check-box") console.log("clicked on the checkbox div of tr " + e.parentNode.id);
        else {
            console.log("clicked clicked on email " + e.parentNode.id)//testing the clicked email on the list

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
           
            
            

        }
    }));

