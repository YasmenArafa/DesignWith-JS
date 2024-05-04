// Check If There's Local Storage Color Option
let mainColors = localStorage.getItem("color_option");



// console.log(mainColors); //null

if (mainColors !== null) {
    // console.log("Local Storage is not Empty");

    document.documentElement.style.setProperty('--main-color', mainColors);

       //remove active class from all colors List Item
        document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");

        // Add Active Class on Element With Data-Colors === Local Storage Item
        if (element.dataset.color === mainColors) {
            element.classList.add("active");
        }
    });
}

// Random Background Option
let backgroundOption = true;

// variable To Control the background Interval
let backgroundInterval; 

// check if there is locl staorage random background Item
let backgroundLocalItem = localStorage.getItem("background_option");

// Check if random background local storage is not empty
if ( backgroundLocalItem !== null) {

    // console.log(typeof(backgroundLocalItem)); // string

     // Remove all active class from all spans
     document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    });


    if (backgroundLocalItem === 'true') {
        backgroundOption = true;

        document.querySelector(".random-backgrounds .yes").classList.add("active");

    } else {

        backgroundOption = false;

        document.querySelector(".random-backgrounds .no").classList.add("active");
    }

    // // Remove all active class from all spans
    // document.querySelectorAll(".random-backgrounds span").forEach(element => {
    //     element.classList.remove("active");
    // });

    // if (backgroundLocalItem === 'true') {

    //     document.querySelector(".random-backgrounds .yes").classList.add("active");
    // } else {
    //     document.querySelector(".random-backgrounds .no").classList.add("active");
    // }
}



// Toggle Spin Class On Icon
let settingBox = document.querySelector(".settings-box")
let toggleButton = document.querySelector(".settings-box .toggle-settings .fa-gear");
toggleButton.onclick = function () {
this.classList.toggle("fa-spin");

settingBox.classList.toggle("open");
};


//Switch Color
const colorsLi = document.querySelectorAll(".colors-list li");
// console.log(colorsLi);
colorsLi.forEach(li => {

    // console.log(li);
    li.addEventListener("click", (e) => {
        console.log(e.target.dataset.color);
        //set color on root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        //Set Color On local Storage 
        localStorage.setItem("color_option", e.target.dataset.color);

        // //remove active class from all children
        // e.target.parentElement.querySelectorAll(".active").forEach(element => {
        //     element.classList.remove("active");
        // });
        // //Add Active class On Self
        // e.target.classList.add("active");

        handleActive(e);

    });
});

//Switch random Background Option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

// Loop on All Spans
randomBackEl.forEach(span => {

    // console.log(li);
    span.addEventListener("click", (e) => {

        handleActive(e);

        // //remove active class from all Spans
        // e.target.parentElement.querySelectorAll(".active").forEach(element => {
        //     element.classList.remove("active");
        // });

        // //Add Active class On Self
        // e.target.classList.add("active");


        if (e.target.dataset.background === "yes") {
            
            backgroundOption = true;
            randomizeImgs();

            localStorage.setItem("background_option", true);
            
        } else {
        
            backgroundOption = false;
            clearInterval(backgroundInterval);
            
            localStorage.setItem("background_option", false);
        }
    });
});



// select Landong page Element
let landingPage = document.querySelector(".landing-page");

// Get Array of Imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];


// Function to Randomize imgs
function randomizeImgs () {

    if (backgroundOption === true) {

        backgroundInterval = setInterval(() => {

            // Get Random Number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            
            // Change background Image url
            landingPage.style.backgroundImage = 'url("images/' + imgsArray[randomNumber] + '")';
        }, 10000);
    }
}

randomizeImgs();  


// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

     // Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop; 
    
    // Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;

    //window Height
    let windowHeight = this.innerHeight;
    
    // Window ScrollTop
    let windowScrollTop = this.scrollY;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
    
        allSkills.forEach(skill => {
    
            skill.style.width = skill.dataset.progress;
    
        });
    
    }
};

// create popup with the Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
    img.addEventListener('click', (e) => {

        // create overlay Element
        let overlay = document.createElement("div");

        // Add Class To Overlay
        overlay.className = 'popup-overlay';

        // append overlay to the body
        document.body.appendChild(overlay);

        // create the popup box
        let popupBox = document.createElement("div");

        // Add Class To popup box
        popupBox.className = 'popup-box';

        
        if (img.alt !== null) {

            //create Heading 
            let imgHeading = document.createElement("h3");

            // create Text For Heading
            let imgText = document.createTextNode(img.alt);

            //Append the text To the Heading
            imgHeading.appendChild(imgText);

            //Append The Heading to the popup box
            popupBox.appendChild(imgHeading);
        }

        //create the image
        let popupImage = document.createElement("img");

        // console.log(img.src);

        // Set Image Source 
        popupImage.src = img.src;
        
        // Add Image To popup Box
        popupBox.appendChild(popupImage);

        // Add popup box to the body
        document.body.appendChild(popupBox);


        // create the Close Span
        let closeButton = document.createElement("span");

        //Add Class To close Button
        closeButton.className = 'close-button';

        // Create the close Button Text
        let closeButtonText = document.createTextNode("X");

        // Append text to close button
        closeButton.appendChild(closeButtonText);

        // Add close Button To The Popup box
        popupBox.appendChild(closeButton);
    });
});

//close popup
document.addEventListener('click', function (e) {
    if (e.target.className == 'close-button') {

        //Remove the current popup
        e.target.parentNode.remove();

        // remove Overlay
        document.querySelector(".popup-overlay").remove();
    }
});

//  Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// allBullets.forEach(bullet => {

//     bullet.addEventListener("click", (e) => {

//         document.querySelector(e.target.dataset.section).scrollIntoView({
//             behavior: 'smooth'
//         });

//     }); 
// });


//landing page Links
let links = document.querySelectorAll(".links-container .links a");

// links.forEach( li => {
//     li.addEventListener("click" , (e) => {

//         e.preventDefault();

//         document.querySelector(e.target.dataset.section).scrollIntoView({
//             behavior: 'smooth'
//         });
//     });
// });
function scrollToSomewhere(elements) {
    elements.forEach(ele => {
        ele.addEventListener("click" , (e) => {
    
            e.preventDefault();
    
            document.querySelector(e.target.dataset.section).scrollIntoView({

                behavior: 'smooth'

            });
        });
    });
}

scrollToSomewhere(allBullets);
scrollToSomewhere(links);


// Handle Active State
function handleActive(ev) {

    //Remove Active Class From All Childrens

    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });

    // Add Active Class on Self
    ev.target.classList.add("active");
}

let  bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {

    //remove active class from all spans
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });

    if (bulletLocalItem === 'block') {

        bulletsContainer.style.display = 'block';

        document.querySelector(".bullets-option .yes").classList.add("active");

    } else {

        bulletsContainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");
    }



}

bulletsSpan.forEach(span => {

    span.addEventListener("click", (e) => {

        if (span.dataset.display === 'show') {

            bulletsContainer.style.display = 'block';

            localStorage.setItem("bullets_option", 'block');
        } else {

            bulletsContainer.style.display = 'none';

            localStorage.setItem("bullets_option", 'none');
        }

        handleActive(e);
    });

});

//Reset Button 
document.querySelector(".reset-options").onclick = function () {

    // localStorage.clear();
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets_option");

    // Reload window
    window.location.reload();
};

// //toggle menu 
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {

    //stop propagation
    e.stopPropagation();
    
//     //toggle class "menu-active" on button
    this.classList.toggle("menu-active");

//     // toggle class "open" on Links
    tLinks.classList.toggle("open");
}

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {

    if(e.target !== toggleBtn && e.target !== tLinks) {
        
        // Check If Menu Is Open
        if (tLinks.classList.contains("open")) {

            // Toggle Class "menu-active" On Button
            toggleBtn.classList.toggle("menu-active");

            // Toggle Class "open" On Links
            tLinks.classList.toggle("open");
        }
    }
});

// Stop Propagation On Menu 
tLinks.onclick = function (e) {
    e.stopPropagation();
}