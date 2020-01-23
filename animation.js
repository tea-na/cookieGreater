// Farthest box can move right is 511px, and 0px right
let speed = getSpeed();
let color = getColor();
let dir = "right";
let updateInterval = null;
let movingInterval = null;


function updateSettings() {
    let speed = getSpeed();

    let update = function () {
        let currSpeed = getSpeed();
        let currColor = getColor();

        if (speed !== currSpeed) {
            speed = currSpeed;
            updateSpeed(speed);
        }
        if (color !== currColor) {
            color = currColor;
            updateColor(color);
        }
        setCookie(speed, color);
    };
    updateInterval = setInterval(update, 1000);
};

function movingBox() {

    let move = function () {
        let textBox = document.getElementById("textBox");
        let pos = getPos();
        let speed = getSpeed();

        // If speed is 0, don't do anything
        if (speed === 0) {
            return;
        } 
        else {
            // If textBox is at the left end, move right
            if (pos === 8) {
                dir = "right";
                textBox.style.left = (pos + 1) + "px";
            } 
            // If textbox is at the right end, move left
            else if (pos === 682) {
                dir = "left";
                textBox.style.left = (pos - 1) + "px";
            } 
        }
        // If direction is left, move right
        if (dir === "left") {
            textBox.style.left = (pos - 1) + "px";
        }
        else if (dir === "right") {
            textBox.style.left = (pos + 1) + "px";
        }
    };
    movingInterval = setInterval(move, (1/(speed*1000)));
}