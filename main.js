am="";
tnbh="";
leftWrist_x = 0;
leftWrist_y = 0;
rightWrist_x = 0;
rightWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist =0;
am1 = "";
tnbh1 ="";


function setup(){
    
    canvas = createCanvas(600,530);

    canvas.center();
    video = createCapture(VIDEO);

    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);

    
}

function preload(){
 am  = loadSound("505.mp3");
 tnbh = loadSound("Softcore.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    am1 = am.isPlaying();
    console.log(am1);

    tnbh1 = tnbh.isPlaying();
    console.log(tnbh1);

  
    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        tnbh.stop();
        if(am1 == false){
         am.play();
        }
        else{
            console.log("Song Name: 505");
            document.getElementById("song_id").innerHTML = "Song Name: 505";
        }
    }
    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        am.stop();
        if(tnbh1 == false){
         tnbh.play();
        }
        else{
            console.log("Song Name: Softcore");
            document.getElementById("song_id").innerHTML = "Song Name: Softcore";
        }
    }

}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);
        
        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

 

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);
        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);


    }
}
function stop(){
    am.stop();
    tnbh.stop();
}
