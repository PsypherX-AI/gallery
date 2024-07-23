// FOR UPDATING WEBSITE GALLERY CHANGE THE FOLLOWING ARRAYS TO MATCH THE IMAGE NAMES IN EACH FOLDER
const DELUXE = [ "GoldRiverGreece", "GoldRiver",  "DJShephard1", "DJShephard2", "SamuraiTree", "Hourglass", "ShipBlue", "Astronaught", "JapanNight", "Apples", "Apples2", "Apples3", "Apples4", "Apples5"]
const FANTASY = ["Samurai", "SamuraiPink", "SamuraiGod", "SamuraiOverlookin", "SamuraiEnemy", "GoddessForest", "GoddessLandscape", "HourglassFire", "FutureSetup", "CrystalDragon", "Planets", "Diablo", "FutureCPU", "SquirelArcher", "SquirelArcher2", "TrollWarrior", "Warrior", "DragonSword1", "DragonSword2"];
const LANDSCAPES = ["RedJapan", "RedJapan2", "JapanSketch", "JapanMoon", "JapanRedMoon", "Bloodriver", "Bloodriver2", "Bloodriver3", "GoldGreyRiver", "Forest", "Coral", "ElegantGirl", "GirlRain", "MountainVillage", "BlossomTree", "JapanCity"];
const PSYCHEDELIC = ["Hoffman", "DMTForest", "JoburgCBD", "Forest", "WizardCathedral", "Hyperbeast", "Fractal1", "Fractal2", "DragonsSamurai", "DragonSamurai", "DragonSamurai2", "SamuraiSkeleton", "Fractal3", "Fractal4"];
const REALISTIC = ["Face", "Face2", "VW", "VW2", "Eyes1", "Eyes2", "Eyes3", "Eyes4", "GoldRose", "Katana", "HippieVW", "HippieVW2", "Dakar1", "Dakar2", "Dakar3", "Dakar4", "CharPortrait", "Oldman1", "Oldman2", "Oldman3"];
const ANIMALS = ["Kitten", "KittenKickflip", "Panda", "SadPanda", "DJShephard3", "DJShephard4", "RaveShephard", "DJShephard", "Shephard", "Shephard2"];
const COSMIC = ["HourglassCosmic", "CosmicMountain", "Cosmic", "CosmicEyes", "CosmicEyes2", "CosmicEye1", "CosmicEye2", "CosmicEye3", "CosmicEye4", "Wizard"];

// PRICES STARTING FROM A2
const DELUXE_PRICES = [];
const DEFAULT_PRICES = [];

window.onscroll = function () {
    scrollFunction();
}

window.onload = function () {
    changeGallery('deluxe', 0);
}

function scrollFunction () {
    // Scroll To Top Button
    if (document.documentElement.scrollTop > 700) {
        document.getElementById("scrolltotop_parent").style.opacity = 1;
        document.getElementById("scrolltotop_parent").style.transition = "opacity 0.3s";
        document.getElementById("scrolltotop_parent").style.cursor = "pointer";
    }
    else {
        document.getElementById("scrolltotop_parent").style.opacity = 0;
        document.getElementById("scrolltotop_parent").style.transition = "opacity 0.3s";
        document.getElementById("scrolltotop_parent").style.cursor = "default";
    }
}

function scrollToTop () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function navbarHover (flag) {
    if (flag) {
        document.getElementById("navbar").style.opacity = 1;
        document.getElementById("navbar").style.transition = "opacity 0.3s";
    }
    else {
        scrollFunction();
    }
}

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function mobileNavBar() {
    var x = document.getElementById("myTopnav");
    var y = document.getElementById("navbar");

    if (x.className === "nav-items") {
      x.className += " responsive";
    } else {
      x.className = "nav-items";
    }

    if (y.className === "") {
        y.className += " responsive";
      } else {
        y.className = "";
      }
  } 

/* --- GALLERY CHANGING --- */
/* PRIVATE ARRAY */
let currentImages = [];

/**
 * Changes the folder directory
 */
function changeGallery(folder, butId) {
    updateCategoryButtons(butId);
    // updateCategoryPrices(butId);

    switch (folder) {
        case "deluxe":
            setImages('Deluxe', DELUXE); 
            break;
        case "landscape":
            setImages('Landscapes', LANDSCAPES); 
            break;
        case "psychedelic":
            setImages('Psychedelic', PSYCHEDELIC);
            break;
        case "realistic":
            setImages('Realistic', REALISTIC); 
            break;
        case "uv":
            setImages("UVNeon", UV);
            break;
        case "cosmic":
            setImages("Cosmic", COSMIC);
            break; 
        case "animals":
            setImages("Animals", ANIMALS);
            break;   
        default:
            setImages('Fantasy', FANTASY);
            break;    
    }
}

/**
 * This function updates each image individually
 * @param {*} folder 
 * @param {*} imgList 
 */
function setImages(folder, imgList) {
    let outputContainer = document.getElementById("output");

    // first remove all images
    for (let i = 0; i < currentImages.length; i++) {
        outputContainer.removeChild(currentImages[i]);
    }

    // reset currentImages
    currentImages = [];

    for (let i = 0; i < imgList.length; i++) {
        let imgId = "img" + i;
        let imgUrl = "assets/ai_images/" + folder + "/" + imgList[i] + ".png";

        let newImg = document.createElement("img");
        newImg.id = imgId;
        newImg.src = imgUrl;
        newImg.style.cursor = "pointer";
        
        newImg.setAttribute('alt', imgList[i]);
        newImg.setAttribute('onclick', 'enlargeImage(this.alt)');

        outputContainer.appendChild(newImg);

        currentImages.push(newImg);
    }

    fadeImagesIn(imgList);
}

function enlargeImage(imgAlt) {
    // Get the modal
    var modal = document.getElementById('myModal');
    var img;

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    currentImages.forEach(element => {
        if (element.alt === imgAlt) {
            img = document.getElementById(element.id);
        }
    });
    
    var modalImg = document.getElementById("imgModal");
    var captionText = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = img.alt;

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() { 
        modal.style.display = "none";
    }

    // when the user clicks anywhere on the screen, close the modal
    modal.onclick = function() {
        modal.style.display = "none";
    }
}

/**
 * This animates a fade in for the gallery container
 */
function fadeImagesIn() {
    let container = document.getElementById("gallery-container");
    container.style.opacity = 0;

    var j = 0;
        var k = window.setInterval(function() {
            if (j > 20) {
              clearInterval(k);
            } else {
                container.style.opacity = j / 20;
              j++;
            }
          }, 20);
}

/**
 * This toggles buttons when selected
 * @param {*} id 
 */
function updateCategoryButtons (id) {
    for (let i = 0; i < 7; i++) {
        let button = document.getElementById("btnCat" + i);

        if (i === id) {
            button.classList.remove("unselected");
            button.classList.add("selected");
        }
        else {
            button.classList.remove("selected");
            button.classList.add("unselected");
        }
    }
}

/**
 * Updates the text for the poster prices
 * @param {*} id 
 */
function updateCategoryPrices (id) {
    let PRICES = DELUXE_PRICES;
    let color = "gold";

    if (id !== 0) {
        PRICES = DEFAULT_PRICES;
        color = "#00ffa6";
    } 
    
    for (let i = 2; i < 5; i++) {
        let item = document.getElementById("a" + i + "price");
        // let itemHeading = document.getElementById("a" + i + "heading");

        // update the price text
        item.innerText = "R" + PRICES[i - 2];

        // update the colour of the text
        item.style.color = color;
        // itemHeading.style.color = color;
    }
}
