/** Calls this function when window has loaded, checks to see
    if user's first time and searches if user is important  */
$(function () {
    let user = getCookie("username");
    let isNew = false;

    // If user is not found, ask for their name
    if (!user) {
        isNew = true;
        user = prompt("What is your name?");
    }

    // Callback function calls another function to check if user is in the list
    getFileContent(function (data) {
        checkUser(isNew, user, data.split("\n"));
    });
});

/**      AJAX CALL 
         FUNCTION     */

// Function to make an AJAX call to get content of "important.txt"
function getFileContent(callback) {
    $.ajax({
        url: "important.txt",
        dataType: "text",
        success: function (data) {
            callback(data);
        }
    });
}

// Callback function to check if user is important
function checkUser(isNew, user, peopleArr) {
    let isImportant = false;

    // Loop through important people as array to see if user is important
    for (let i = 0; i < peopleArr.length; i++) {
        if (peopleArr[i] === user) {
            // If found, set isImportant to true
            isImportant = true;
            break;
        }
    }

    if (isImportant === false) {
        createNullGreeting();
    } 
    else {
        createRadios();
        setMessage(isNew, user);
    }
}


// Function to create greeting message for important user
function setMessage(isNew, user) {

    // Create outer container 
    let outer = document.createElement("div");
    outer.setAttribute("id", "outer");

    // Create inner container to hold the greeting message
    let inner = document.createElement("div");
    inner.setAttribute("id", "textBox");

    // Create a new paragraph element for message
    let message = document.createElement("p");
    let impText = document.createTextNode("Welcome " + user);
    message.appendChild(impText);

    // Append the new elements to document
    document.getElementsByTagName("main")[0].appendChild(outer);
    document.getElementById("outer").appendChild(inner);
    document.getElementById("textBox").appendChild(message);

    if (isNew) {
        document.getElementById("speed-0").checked = true;
        document.getElementById("red").checked = true;

        updateSpeed("0");
        updateColor("red");
    }
    else {
        let userSpeed = getCookie("speed");
        let userColor = getCookie("color");

        updateSpeed(userSpeed);
        updateColor(userColor);
    }

    // Adjust CSS styling
    initialCSS();
}

/**  RADIO BOX GET/UPDATE
         FUNCTIONS       */

// Function to get current speed setting
function getSpeed() {
    let speeds = document.getElementsByName("speeds");

    for (let i = 0; i < speeds.length; i++) {
        if (speeds[i].checked) {
            return Number(speeds[i].value);
        }
    }
}

// Function to get current color setting
function getColor() {
    let colors = document.getElementsByName("colors");

    for (let i = 0; i < colors.length; i++) {
        if (colors[i].checked) {
            return colors[i].value;
        }
    }
}

// Function to update speed selection
function updateSpeed(speed) {
    const speeds = document.getElementsByName("speeds");

    for (let i = 0; i < speeds.length; i++) {
        if (speeds[i].value === speed) {
            speeds[i].setAttribute("checked", true);
            break;
        }
    }
}

// Function update color selection
function updateColor(color) {
    const colors = document.getElementsByName("colors");

    for (let i = 0; i < colors.length; i++) {
        if (colors[i].value === color) {
            colors[i].setAttribute("checked", true);
            break;
        }
    }
    document.getElementById("textBox").style.backgroundColor = color;
}

// Function to get left pos of textbox
function getPos() {
    let textBox = document.getElementById("textBox");
    let pos = textBox.style.left;

    return Number(pos.substr(0, pos.length-2));
}


/**      GREETING
     FUNCTIONS     */

// Function to create message that does not greet user
function createNullGreeting() {
    // Create a new paragraph element for message
    let message = document.createElement("p");
    let text = document.createTextNode("No greeting for you!");

    // Append text node to the paragraph element
    message.appendChild(text);

    // Append paragraph to div container
    document.getElementsByTagName("main")[0].appendChild(message);
}

function setMessage(isNew, user) {

    // If user is new, select default speed = 0 and color = red
    if (isNew === true) {
        document.getElementById("speed-0").checked = true;
        document.getElementById("red").checked = true;

        updateSpeed("0");
        updateColor("red");
    } else {
        let userSpeed = getCookie("speed");
        let userColor = getCookie("color");

        updateSpeed(userSpeed);
        updateColor(userColor);
    }
    createGreeting(user);
}


// Function to create animation buttons for important user 
function createRadios() {

    // Create speed radio button fieldset
    let speedFieldset = document.createElement("fieldset");
    speedFieldset.setAttribute("id", "speedBoxes");
    document.getElementsByTagName("main")[0].appendChild(speedFieldset);

    // Create color radio button fieldset
    let colorFieldset = document.createElement("fieldset");
    colorFieldset.setAttribute("id", "colorBoxes");
    document.getElementsByTagName("main")[0].appendChild(colorFieldset);

    // Create radio boxes
    createSpeedBoxes();
    createColorBoxes();
}

/**       CREATING RADIO BOX 
               FUNCTIONS          */


// Dynamically create speed radio boxes
function createSpeedBoxes() {
    // Retrieve fieldset for speed radio boxes
    const speedFieldset = document.getElementById("speedBoxes");

    // Create Speed 0 label
    let newLabel = document.createElement("label");
    let labelText = document.createTextNode("Speed 0 ");
    newLabel.appendChild(labelText);

    // Create Speed 0 radio box
    let newRadio = document.createElement("input");
    newRadio.setAttribute("type", "radio");
    newRadio.setAttribute("id", "speed-0");
    newRadio.setAttribute("name", "speeds");
    newRadio.setAttribute("value", "0");

    // Set label for the radio box
    newLabel.appendChild(newRadio);

    // Append label to fieldset
    speedFieldset.appendChild(newLabel);

    // Add new line after Speed 0 radio box
    speedFieldset.appendChild(document.createElement("br"));

    for (let i = 1; i < 51; i++) {
        let label = document.createElement("label");
        let textLabel = document.createTextNode(" Speed " + i + " ");
        label.appendChild(textLabel);

        let radio = document.createElement("input");
        radio.setAttribute("type", "radio");
        radio.setAttribute("id", "speed-" + i);
        radio.setAttribute("name", "speeds");
        radio.setAttribute("value", "" + i);

        // Set label for the radio box
        label.appendChild(radio);

        // Append label to fieldset
        speedFieldset.appendChild(label);
    }
}

// Dynamically create color radio boxes
function createColorBoxes() {
    // Retrieve fieldset for color radio boxes
    const colorFieldset = document.getElementById("colorBoxes");

    // Create color labels
    let redLabel = document.createElement("label");
    let redLabelText = document.createTextNode("red ");
    redLabel.appendChild(redLabelText);

    let yellowLabel = document.createElement("label");
    let yellowLabelText = document.createTextNode(" yellow ");
    yellowLabel.appendChild(yellowLabelText);

    let blueLabel = document.createElement("label");
    let blueLabelText = document.createTextNode(" blue ");
    blueLabel.appendChild(blueLabelText);

    // Create color radio boxes
    let redRadio = document.createElement("input");
    redRadio.setAttribute("type", "radio");
    redRadio.setAttribute("id", "red");
    redRadio.setAttribute("name", "colors");
    redRadio.setAttribute("value", "red");

    let yellowRadio = document.createElement("input");
    yellowRadio.setAttribute("type", "radio");
    yellowRadio.setAttribute("id", "yellow");
    yellowRadio.setAttribute("name", "colors");
    yellowRadio.setAttribute("value", "yellow");

    let blueRadio = document.createElement("input");
    blueRadio.setAttribute("type", "radio");
    blueRadio.setAttribute("id", "blue");
    blueRadio.setAttribute("name", "colors");
    blueRadio.setAttribute("value", "blue");

    // Set label for the radio boxes
    redLabel.appendChild(redRadio);
    yellowLabel.appendChild(yellowRadio);
    blueLabel.appendChild(blueRadio);

    // Append labels to fieldset
    colorFieldset.appendChild(redLabel);
    colorFieldset.appendChild(yellowLabel);
    colorFieldset.appendChild(blueLabel);
}

// Function to set styling of greeting box/gray background
function initialCSS() {
    // Adjust background
    let outer = document.getElementById("outer");
    outer.style.position = "relative";
    outer.style.backgroundColor = "gray";
    outer.style.height = "235px";

    // Adjust textbox
    let textBox = document.getElementById("textBox");
    textBox.style.position = "absolute";
    textBox.style.height = "110px";
    textBox.style.width = "270px";
    textBox.style.top = "65px";
    textBox.style.left = "0px";

    // Adjust text
    let text = document.getElementsByTagName("p")[0];
    text.style.textAlign = "center";
    text.style.margin = "0 auto";
}

/**       COOKIE 
         FUNCTIONS     */

// Function to get cookie value by key
function getCookie(cname) {
    // Create variable name, with the text to search for
    let name = cname + "=";
    // Decode the cookie string, to handle special characters
    let decodedCookie = decodeURIComponent(document.cookie);
    // Split document.cookie on semicolons into an array 
    let cookieArray = decodedCookie.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substr(1);
        }
        // If the cookie is found, return the value of the cookie
        if (cookie.indexOf(cname) === 0) {
            return cookie.substr(cname.length, cookie.length);
        }
    }
    // If the cookie is not found, return empty string
    return "";
}

// Function to make cookie 
function setCookie(speed, color) {
    let cookieName = "username=" + user + ";";
    let cookieSpeed = "speed=" + speed + ";";
    let cookieColor = "color=" + color + ";";

    let now = new Date(),
        expires = now;
    expires.setSeconds(expires.getSeconds() + 10);
    let cookieExpires = "expires=" + expires + ";";
    let cookiePath = "path=/;";

    document.cookie = cookieName + cookieSpeed + cookieColor + cookieExpires + cookiePath;
}