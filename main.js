status1 = "";
objects = [];
function preload(){
    video = createVideo('video.mp4');
}
function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide();
}
function start(){
    x = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById('status').innerHTML = "Status: Detecting Objects"
}
function modelloaded(){
    console.log('"CoCo" single shot multi box detection has loaded!!!');
    status1 = true;
    video.loop();
    video.volume(0);
}
function draw(){
    image(video, 0, 0, 480, 380);
    if(status1 != ""){
        x.detect(video, gotresult)
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("objects").innerHTML = "Number of objects detected: "+objects.length;
            fill('red');
            percent = floor(objects[i].confidence*100);
            console.log(percent+"%");
            noFill();
            text(objects[i].label+" "+percent+"%", objects[i].x + 12, objects[i].y+15)
            stroke('red');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects.length != 0){
                synth = window.speechSynthesis;
                b = objects[i].label+" is found!"
                a = new SpeechSynthesisUtterance(b);
                synth.speak(a);
            }
        }
    }
}
function gotresult(error, result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        objects = result;
    }
}