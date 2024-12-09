/**
 * FalGir
 * Kiana Rezaee
 * Instructions:
 * -Fal is a form of divination in Iran
 * -this is traditionally done on Yalda (the longest nighr of the year)
 * -make a question in your mind
 *-click an omen and recieve a reply!
 +-https://www.iranicaonline.org/articles/divination
 *
 * Made with p5
 * https://p5js.org/
 */
// Array of items including a link to the images, a size and a direction for the animation
const items = [
    { name: 'ladybug', image: 'https://duzakh.github.io/cart253/mod-jam/assets/images/LadyBug.png', x: 0, y: 200, size: 100, direction: 1 },
    { name: 'itchyfoot', image: 'https://duzakh.github.io/cart253/mod-jam/assets/images/FootItch.png', x: 0, y: 300, size: 100, direction: 1 },
    { name: 'fish', image: 'https://duzakh.github.io/cart253/mod-jam/assets/images/Fish.png', x: 0, y: 200, size: 120, direction: 1 },
    { name: 'rice', image: 'https://duzakh.github.io/cart253/mod-jam/assets/images/ChopsticksRice.png', x: 0, y: 100, size: 100, direction: 1 },
    { name: 'wheel', image: 'https://duzakh.github.io/cart253/mod-jam/assets/images/FortuneWheel.png', x: 0, y: 50, size: 100, direction: 1 },
    { name: 'owl', image: 'https://duzakh.github.io/cart253/mod-jam/assets/images/Owl.png', x: 0, y: 150, size: 100, direction: 1 },
    { name: 'clover', image: 'https://duzakh.github.io/cart253/mod-jam/assets/images/FourLeaf.png', x: 0, y: 170, size: 100, direction: 1 },
    { name: 'mirror', image: 'https://duzakh.github.io/cart253/mod-jam/assets/images/Mirror.png', x: 0, y: 60, size: 100, direction: 1 },
    { name: 'horseshoeup', image: 'https://duzakh.github.io/cart253/mod-jam/assets/images/HorseShoe.png', x: 0, y: 60, size: 100, direction: 1 },
    { name: 'horseshoedown', image: 'https://duzakh.github.io/cart253/mod-jam/assets/images/HorseShoeDown.png', x: 0, y: 60, size: 100, direction: 1 }
];

const horoscopes = [
    //text and poem excerpts are in this array
//https://physics.ucsc.edu/cosmo/primack_abrams/COSMO.HTM#:~:text=Anthropologists%20tell%20us%20that%20in,universe%20a%20culture%20agrees%20on.
    "There was water above and water beyond the horizon; doubtless there was also water below.",
    "humans can only be content by seeking to be in harmony with the universe",
    "and the universe is not outside us, and we are never outside it",
    //https://www.hafizonlove.com/fal.htm
    "Unfortunate the eyes that can’t shed tears of love",
    "The organ plays a tune, and Venus listens with elation. The exalted harp cries, now where is the doubter",
    //Dominik Parisien, "Un Docteur Anglophone Traduit les Inquiétudes de Son Patient Avec Google/An English Speaking Doctor Translates the Concerns of his Patient with Google" from Side Effects May Include Strangers. Copyright © 2020 by Dominik Parisien.
    "pain is a language where the words are shabby attempt we can only live in the body",
    // John clare
    "Even the dearest that I loved the best Are strange — nay, rather, stranger than the rest.",
    // Shazia Hafiz Ramji, "Poem of Failed Amends (Amor fati). Copyright © 2018 by Shazia Hafiz Ramji. Reprinted by permission of the publisher. 
    "“I’m okay.” I've brushed my teeth, washed my face, and am ready for bed.", 
    //a dialogue of self and soul William Yeats
    "Set all your mind upon the steep ascent, Upon the broken, crumbling battlement",
    //arthur Rimbaud 
    "Little eve of drunkenness, holy! were it only for the mask with which you gratified us. "
];

//pixel font exists 
let pixelFont;
//music exists
let music;
// the clicked item and message
let selectedItem = null;
//messages are a text string
let selectedMessage = "";

//this is to help with preloading the images
let itemImages = {};

//message that displays at the bottom
const permanentMessage = "Make a wish or ask yourself a question, get poetic wisdom";

function preload() {
    //preloads the music
      music = loadSound("https://duzakh.github.io/cart253/mod-jam/assets/sounds/music.mp3");
    //loads font
    pixelFont = loadFont("https://duzakh.github.io/cart253/mod-jam/assets/Jacquard_24/Jacquard24-Regular.ttf");
    //item images stores the item names and thus seperates the items 
    //then loadimage loads the respective photo
    items.forEach(item => {
        itemImages[item.name] = loadImage(item.image);
    });
}

function setup() {
    createCanvas(640, 480);
    textSize(16);
    textFont(pixelFont);
    textAlign(CENTER);

    // spacing is a constant which distributes the items evenly across the canvas, 
    const spacing = width / (items.length + 1);
    items.forEach((item, index) => {
        item.x = spacing * (index + 1) - item.size / 2;
    });
}

function draw() {
    background(210, 205, 157);
     displayMessage();
    // Checks if there is a selected message to display
    if (selectedMessage) {
        fill(0);
        textSize(20);
        // Centers text horizontally and align it to the top vertically
        textAlign(CENTER, TOP); 
        const margin = 20;
        // Maximum width for text
        const maxWidth = width - 2 * margin; 

        //kind of copied some of the stuff here because i was having a hard time with this https://stackoverflow.com/questions/5026961/html5-canvas-ctx-filltext-wont-do-line-breaks
        let words = split(selectedMessage, ' ');
        let lines = [];
        let currentLine = '';

        // Split the message into lines that fit within the maxWidth
        for (let i = 0; i < words.length; i++) {
            let testLine = currentLine + words[i] + ' ';
            let testWidth = textWidth(testLine);

            // If the line exceeds the width, starts a new line
            if (testWidth > maxWidth) {
                lines.push(currentLine);
                currentLine = words[i] + ' ';
            } else {
                currentLine = testLine;
            }
        }
        //final line is pushed to avoid crash
        lines.push(currentLine); 
        // Starting position for the first line
        let yOffset = 30;
        for (let line of lines) {
            text(line, width / 2, yOffset);
            //next line
            yOffset += textAscent() + textDescent();
        }
    }

    // Draw and animate all items
    items.forEach(item => {
        if (item !== selectedItem) {
            // Animates unselected items
            animateItem(item); 
            // Draws unselected items
            drawItem(item);    
        } else {
            // Animates the selected item 
            animateSelectedItem();
        }
    });
}

function displayMessage() {
    fill(0);
    textSize(16);
    textAlign(CENTER, BOTTOM); // Center the text horizontally and align it to the bottom vertically
    text(permanentMessage, width / 2, height - 10); // Position the message with a small margin from the bottom
}

function animateItem(item) {
    //ranges
    const lowerBounce = 180; 
    const upperBounce = 220; 
    //if the direction is the starting one go up two
    if (item.direction === 1) {
        item.y += 2;
        //if it reaches the upper range it goes back down by one
        if (item.y > upperBounce) {
            item.direction = -1;
        }
    //if in the middle go down two
    } else {
        item.y -= 2;
        //once lower range is reached come back up by one
        if (item.y < lowerBounce) {
            item.direction = 1;
        }
    }
}

//draws the item
function drawItem(item) {
    image(itemImages[item.name], item.x, item.y, item.size, item.size);
}

//animates the selected item, not funcitoning 
function animateSelectedItem() {
    // Animate selected item at the center, follows same logic as other items
    if (selectedItem.direction === 1) {
        selectedItem.y += 3;
        if (selectedItem.y > height / 2 + 50) {
            selectedItem.direction = -1;
        }
    } else {
        selectedItem.y -= 3;
        if (selectedItem.y < height / 2 - 50) {
            selectedItem.direction = 1;
        }
    }
    //clarifies what image to draw
    image(itemImages[selectedItem.name], width / 2 - selectedItem.size / 2, selectedItem.y, selectedItem.size, selectedItem.size);
}

function mousePressed() {
    // Plays music if it's not already playing and loops it
    if (music && !music.isPlaying()) {
        music.loop();
    }
    items.forEach(item => {
        //if the mouse is pressed the 
        if (
            mouseX > item.x && mouseX < item.x + item.size &&
            mouseY > item.y && mouseY < item.y + item.size
        ) {
            // Clones the item?
            selectedItem = { ...item }; 
            //start the selected item in the center
            //selectedItem.y = height / 2; 
            //selected item in the center
            //selectedItem.direction = 1;
            animateSelectedItem();
            selectedMessage = random(horoscopes);
        }
    });
}