var song = "";
var song2 = "";
var scoreLeftWrist = 0;
var scoreRightWrist = 0;
var songStatus2 = "";
var songStatus = "";

var leftWristX = 0;
var leftWristY = 0;

var rightWristX = 0;
var rightWristY = 0;

function preload(){
    song =  loadSound("music.mp3")
    song2 =  loadSound("music2.mp3")
}

function  setup(){
    canvas = createCanvas(600,500);
    canvas.position(400,200);

    video = createCapture(VIDEO)
    video.hide()

    poseNet = ml5.poseNet(video,modelLoaded)
    poseNet.on('pose',gotPoses)
}

function play(){
    song.play()
    song.setVolume(1)
    song.rate(1)
}

function gotPoses(results){
    if(results.length > 0){
        //console.log(results)
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist ="+ scoreLeftWrist);

        rightWrist = results[0].pose.rightWrist.x
        rightWrist = results[0].pose.rightWrist.y
        console.log("rightWristX =" +scoreRightWrist+"rightWristY =" +rightWrist);
        
        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y
        console.log("leftWristX ="+leftWristX+"leftWristY ="+leftWristY);
    }
}

function modelLoaded(){
    console.log("posNet foi inicializado")
}

function draw(){
    image(video,0,0,600,500)

    songStatus = song.isPlaying()
    songStatus2 = song.isPlaying()

    fill("#ff0000")
    stroke("#00EEB5")

    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,40)

        console.log("Stop")
        song2.stop()
    }

    console.log(songStatus)

    if(!songStatus){
      console.log("Play")
      song.play()

      document.getElementById("song").innerHTML = "o nome da musica é: musica 2"
    }

    if(scoreRightWrist > 0.2){
        circle(rightWristX,rightWristY,40)

        console.log("Stop")
        song.stop()
    }
    console.log(songStatus)
    if(!songStatus2){
      console.log("Play")
      song2.play()

      document.getElementById("song").innerHTML = "o nome da musica é: musica 1"
    }
}

