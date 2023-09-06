song1="";
song2="";


leftWristX=0;
leftWristY=0;

rightWristX=0;
rightWristY=0;

status1="";
status2="";

scoreleftWrist=0;
scorerightWrist=0;

function preload()
{
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function setup()
{
    canvas=createCanvas(600,530);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);

}

function draw()
{
    image(video,0,0,600,530);
    
    fill("#ffff05");
    stroke("#ff0505");

    
    status1=song1.isPlaying();
    console.log("Peter pan song");

    status2=song2.isPlaying();
    console.log("Harry potter theme song");

    if(scoreleftWrist>0.2)
    {

     circle(leftWristX,leftWristY,20);
     song2.stop();
     if(status1==false)
     {
        song1.play();
        document.getElementById("song_id").innerHTML="Song Name: Peter Pan Song"

     }     

    }

    if(scorerightWrist>0.2)
    {

     circle(rightWristX,rightWristY,20);
     song1.stop();
     if(status2==false)
     {
        song2.play();
        document.getElementById("song_id").innerHTML="Song Name: Harry potter theme song"

     }     

    }

}


function modelLoaded()
{
    console.log("Model is Loaded");
}


function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreleftWrist=results[0].pose.keypoints[9].score;
        console.log("scoreleftWrist"+scoreleftWrist);

        scorerightWrist=results[0].pose.keypoints[10].score;
        console.log("scorerightWrist"+scorerightWrist);
        
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX="+leftWristX+" leftWristY="+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX="+rightWristX+" rightWristY="+rightWristY);
    }
}
