var trex, trex_running, edges;
var groundImage;
var score= 0
var obsGrp,cloudsGrp
var PLAY= 1
var END= 0
var gamestate= PLAY

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  cloudImg = loadImage("cloud.png")
  obs1 = loadImage("obstacle1.png")
  obs2 = loadImage("obstacle2.png")
  obs3 = loadImage("obstacle3.png")
  obs4 = loadImage("obstacle4.png")
  obs5 = loadImage("obstacle5.png")
  obs6 = loadImage("obstacle6.png")
  trex_collided= loadAnimation("trex_collided.png")
  over= loadImage("gameOver.png")
  start= loadImage("restart.png")
  js= loadSound("jump.mp3")
  cp= loadSound("checkpoint.mp3")
  die= loadSound("die.mp3")
}

function setup(){
      createCanvas(windowWidth, windowHeight);
      
      // creating trex
      trex = createSprite(50,height-45,20,50);
      trex.addAnimation("running", trex_running);
      trex.addAnimation("collided", trex_collided)
      edges = createEdgeSprites();
      //adding scale and position to trex
      trex.scale = 0.5;
      trex.x = 50
      //  trex.setCollider("rectangle",0,0,400,trex.height)
      ground = createSprite(width/2, height-20, width, 20)
      
      ground.addImage(groundImage)

      invisible_ground = createSprite(width/2, height-6, width, 20)
      invisible_ground.visible = false;
      // console.log("hello"+ trex.y) 
      cloudsGrp=new Group()
      obsGrp=new Group()
      gameOver= createSprite(width/2,height/2,20,20)
      restart= createSprite(width/2, gameOver.y+40, 20, 20)
      // restart.visible= false
     
      gameOver.visible= false
      
}


function draw(){
  //set background color 
  background(180);
    if(gamestate===PLAY){
      restart.visible=false
    score= score+ Math.round(getFrameRate()/60)
    ground.velocityX= -5
    //jump when space key is pressed
  if(keyDown("space")||touches.length>0 && trex.y>=120){
    trex.velocityY = -10;
    js.play()
  }
  if (ground.x < 2){
    ground.x = 300;
  }
  trex.velocityY = trex.velocityY + 0.5;
   //calling a user defined function
      
   spawnCloud()
   spawnObstacles() 
   if (score %100==0 && score>0){
  cp.play()
  }
 
  if (trex.isTouching(obsGrp)){
    // trex.velocityY=-5
    js.play()
     gamestate= END
    die.play()
  }
} else if(gamestate===END){
    ground.velocityX= 0
    obsGrp.setVelocityXEach(0)
    cloudsGrp.setVelocityXEach(0)
    trex.changeAnimation("collided", trex_collided)
    obsGrp.setLifetimeEach(-1)
    cloudsGrp.setLifetimeEach(-1)
    trex.velocityY=0
    gameOver.visible=true
    gameOver. addImage(over)
    gameOver.scale=0.5
    restart.visible=true
    restart. addImage(start)
    restart.scale= 0.5
    }
  text ("score: "+ score, width/2, 50) 
  
  
  //stop trex from falling down
  trex.collide(invisible_ground)
  if (mousePressedOver(restart)){
    reset()
  }
  drawSprites();
}
function spawnCloud(){
  if (frameCount%20===0){
   cloud = createSprite(width, height-height/2, 10, 10)
   cloud.addImage (cloudImg)
   cloud.scale= 0.7
   cloud.velocityX= -5  
   cloud.y= Math.round(random(20,height/2))
   trex.depth=cloud.depth
   trex.depth=trex.depth+1 
  //  console.log("trex"+trex.depth)
  //  console.log("cloud"+cloud.depth)
   cloud.lifetime= width/5
   cloudsGrp.add(cloud)
  }            
}
function reset(){
  gamestate= PLAY
  obsGrp.destroyEach()
  cloudsGrp.destroyEach()
  restart.visible=false
  gameOver.visible=false
  trex.changeAnimation("running",trex_running)
  score=0
}
function spawnObstacles(){
  if (frameCount%60===0){
    obstacle = createSprite (width,height-36 , 20, 20)
    obstacle.velocityX = -(5+3*score/100)
    rand= Math.round(random(1,6))
    switch (rand) {
      case 1: obstacle.addImage(obs1)
     break;
        case 2: obstacle.addImage(obs2)
     break; 
        case 3: obstacle.addImage(obs3)
     break;
        case 4: obstacle.addImage(obs4)
     break;
        case 5: obstacle.addImage(obs5)
     break;
        case 6: obstacle.addImage(obs6)
        break;
      default:
        break;
    }
    obstacle.scale= 0.5
   obstacle.lifetime= width/5
   obsGrp.add(obstacle)
  }
}
