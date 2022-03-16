var points = 0
var objects = ["apple", "clock", "plane", "cat", "dog", "ant", "boat", "angel", "door", "carrot", "castle", "skull", "sheep", "shark", "whale", "pizza", "circle", "wheel", "ambulence", "car"];
var randomnumber = Math.floor((Math.random*objects.length)+1);
document.getElementById("todraw").innerHTML = randomnumber;

function setup() {
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function preload() {


    classifier = ml5.imageClassifier('DoodleNet');
}

for (let i = 0; i >= 0; i++)
{
    document.getElementById("score").innerHTML=i;
}

function clearCanvas() {
    background("white");
}

function draw() {

    // Set stroke weight to 13
    strokeWeight(13);
    // Set stroke color to black
    stroke(0);
    // If mouse is pressed, draw line between previous and current mouse positions
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("label").innerHTML = 'Label: ' + results[0].label;
        
        document.getElementById("confidence").innerHTML = 'Condifence: ' + Math.round(results[0].confidence * 100) + '%';

        utterThis = new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterThis);
    }
}

if (results[0].label == randomnumber) {
    points = points + 1;
}