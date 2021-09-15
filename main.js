LeftWristx=0;
LeftWristy=0;
RightWristx=0;
RightWristy=0;
song="";
scorel=-0;
scorer=-0;

function preload()
{
    song=loadSound("des.mp3")
}

function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();


    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', GotPoses);


}
 
function draw()
{
    image(video,0,0,600,500);
    fill("#0430f7");
    stroke("#0430f7"); 
    if(scorer > 0.2)
    {
    circle(RightWristx, RightWristy, 20);


    if(RightWristy > 0 && RightWristy <=100)
    {
        document.getElementById("speed").innerHTML="speed=0.5x";
        song.rate(0.5);

    }
    else if(RightWristy > 100 && RightWristy <=200)
    {
        document.getElementById("speed").innerHTML="speed=1x";
        song.rate(1);

    }
    else if(RightWristy > 200 && RightWristy <=300)
    {
        document.getElementById("speed").innerHTML="speed=1.5x";
        song.rate(1.5);

    }
    else if(RightWristy > 300 && RightWristy <=400)
    {
        document.getElementById("speed").innerHTML="speed=2x";
        song.rate(2);

    }
    else if(RightWristy > 400 && RightWristy <=500)
    {
        document.getElementById("speed").innerHTML="speed=2.5x";
        song.rate(2.5);

    }
    }
    if(scorel > 0.2)
    {
        circle(LeftWristx, LeftWristy, 20);
        number=Number(LeftWristy);
        remove=floor(number);
        volume=remove/500;
        document.getElementById("volume").innerHTML="volume="+ volume;
        song.setVolume(volume);
        
    }
   
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
    

}
function modelLoaded()
{
    console.log("PoseNet Is Initialized");
}

function GotPoses(results)
{
   if(results.length > 0)
   {
       console.log(results);
       scorel=results[0].pose.keypoints[9].score;
       scorer=results[0].pose.keypoints[10].score;
       console.log("scoreLeftWrist=" + scorel + "scoreRightWrist=" + scorer) ;



       LeftWristx=results[0].pose.leftWrist.x;
       LeftWristy=results[0].pose.leftWrist.y;
       console.log("LeftWristx=" + LeftWristx + "LeftWristy=" + LeftWristy );

       RightWristx=results[0].pose.rightWrist.x;
       RightWristy=results[0].pose.rightWrist.y;
       console.log("RightWristx=" + RightWristx + "RightWristy=" + RightWristy );
   }
}