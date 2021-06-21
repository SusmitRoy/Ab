var runner, runnerImage;
var bg, bg2;
var invGround;

var obstacle, obstacleGroup, obstacle1,obstacle2, obstacle3;

var checkpoint, chImage;

var PLAY = 2;
var END = 1;
var gameState = PLAY;

var score = 0;

var space;

function preload(){
  runnerImage = loadImage("person_running.gif");
  bg = loadImage("moving_city.gif");
  
  obstacle1 = loadImage("realg.png");
  obstacle2 = loadImage("zombie.gif");
  obstacle3 = loadImage("dragon.gif");
  
  chImage = loadImage("checkpoint.gif");
  
  bg2 = loadImage("died.gif");
  
  space = loadImage("space.png");
}

function setup() {
  createCanvas(600,400);
  
  runner = createSprite(100,320,20,20);
  runner.addImage(runnerImage);
  runner.scale = 0.25;
  runner.setCollider("rectangle",0,0,100,450);
  runner.debug = true;
  
  invGround = createSprite(100,390,150,20);
  invGround.visible = false;
  
  checkpoint = createSprite(300,200);
  checkpoint.addImage(chImage);
  checkpoint.visible = false;
  checkpoint.scale = 0.4;
  
  obstacleGroup = new Group();
  
  spacex = createSprite(300,350);
  spacex.addImage(space);
  spacex.scale = 0.5;
}

function draw() {
  background(bg);
  
  runner.collide(invGround);
  
  console.log(frameCount);
  
  textAlign(CENTER);
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);
  
  score = score + Math.round(random(getFrameRate()/30));
  
  if(gameState === PLAY){
    spacex.visible = false;
    runner.visible = true;
    
    if(keyDown("SPACE") && runner.y >= 315){
    runner.velocityY = -14;
  }

  runner.velocityY = runner.velocityY + 0.8;
  
  spawnObstacle();
  
  if((frameCount>450 && frameCount<550) || (frameCount>1450 && frameCount<1550)){
    checkpoint.visible = true;
  }else{
    checkpoint.visible = false;
  }
  
    obstacleGroup.setLifetimeEach(200);
    
  if(obstacleGroup.isTouching(runner)){
    gameState = END;
  }
  }
  
  if(gameState === END){  
    spacex.visible = true;
    
    obstacleGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    
    obstacleGroup.destroyEach();
    
    runner.visible = false;
    
    score = 0;
    
    if(keyDown("space")){
      gameState = PLAY;
    }
    
    background(bg2);
  }
  
  drawSprites();
}

function spawnObstacle(){
  if(frameCount<500){
    if(frameCount%100 === 0){
      obstacle = createSprite(620,330,20,20);      
      obstacle.velocityX = -7;
      obstacle.addImage(obstacle1);
      obstacle.scale = 0.3;
      obstacle.mirrorX(obstacle.mirrorX() * -1);
      obstacleGroup.add(obstacle);
    }
  }
  
  if(frameCount<1500 && frameCount>500){
    if(frameCount%100 === 0){
      obstacle = createSprite(620,330,20,20);      
      obstacle.velocityX = -7;
      
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              obstacle.scale = (0.3);
              break;
      case 2: obstacle.addImage(obstacle2);
              obstacle.scale = (0.5);
              break;
      default: break;
    }    
      
      obstacle.mirrorX(obstacle.mirrorX() * -1);
      
      obstacleGroup.add(obstacle);
    }
  }
    
     if(frameCount>1500){
    if(frameCount%100 === 0){
      obstacle = createSprite(620,330,20,20);      
      obstacle.velocityX = -7;
      
    var rando = Math.round(random(1,3));
    switch(rando) {
      case 1: obstacle.addImage(obstacle1);
              obstacle.scale = (0.3);
              break;
      case 2: obstacle.addImage(obstacle2);
              obstacle.scale = (0.5);
              break;
      case 3: obstacle.addImage(obstacle3);
              obstacle.scale = (0.3);
              break;        
      default: break;
    }    
      
      obstacle.mirrorX(obstacle.mirrorX() * -1);
      
      obstacleGroup.add(obstacle);
    }
    
    }
}