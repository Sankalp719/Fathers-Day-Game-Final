var ship, pirateship;
var ground, invisibleground;
var obstaclesGroup,missilesGroup,cloudsGroup;

var score = 0;



function preload(){
  shipImage = loadImage("ship.jpg");
 obstacleImage1 = loadImage("obstacle1.png");
 obstacleImage2 = loadImage("obstacle4.png");
 obstacleImage4 = loadImage("obstacle4.png");
 missileImage = loadImage("missile.png");
 groundImage = loadImage("ocean.png");
 cloud_Image = loadImage("cloud.png");
  
}

function setup() {
  createCanvas(800,370);
  

  ground = createSprite(200,390,600,5);
  ground.addImage("ocean.png",groundImage);
  ground.x = ground.width /4;
  ground.velocityX =( random(-2,-7));

  invisibleGround = createSprite(120,350,400,10);
  invisibleGround.visible = false;
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  missilesGroup = new Group();

  ship = createSprite(120,340,20,70);
  ship.addImage("ship.jpg",shipImage);
  ship.scale = 0.3;
 // console.log("ship");
}


function draw() {
  background(255,255,255);  
 
  fill("black");
  //noStroke();
  textSize(15)
  text("Score: " + score, 30, 20);
  console.log(score);
 
     ship.collide(invisibleGround);

   if(keyWentUp("space")) {
    missile = createSprite(ship.x,ship.y,20,20);
    missile.addAnimation("missile.png",missileImage);
    missile.scale = 0.1/2;
    missile.velocityX = 6;
    missilesGroup.add(missile);
  }
  
    if (obstaclesGroup.isTouching(missilesGroup)) {
        obstaclesGroup.destroyEach();
        missilesGroup.destroyEach();
        score  = score + 10;
  } 

 

  ship.velocityY = ship.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }


  
 if(missilesGroup.isTouching(obstaclesGroup)){
   score++;
 }
 
  
  spawnClouds();
  spawnObstacles();

  if(ship.isTouching(obstaclesGroup)){
 score--;
}


  

 
  
  
  drawSprites();
}

//score.display();

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 40 === 0) {
    var cloud = createSprite(700,(random(10,190)),40,10);
    //.y = Math.round (random( 80,120));
    cloud.addImage("cloud", cloud_Image);
    cloud.scale = 0.2;
    cloud.velocityX = (random(-4,-7));
     //assign lifetime to the variable
     
    cloud.lifetime = 300;
    cloudsGroup.add(cloud);
    console.log(cloud);
  }
}
  



function spawnObstacles() {
  if(frameCount % 80 === 0) {
    var obstacle = createSprite(750,(random(270,329)),10,40);
    obstacle.velocityX =(random(-4,-15));
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand){
      case 1:
      obstacle.addImage("obstacle",obstacleImage1);
        break;
        
         case 2:
      obstacle.addImage("obstacle",obstacleImage2);
        break;

        case 3:
      obstacle.addImage("obstacle",obstacleImage4);
      break;    
        
       
       default:break;
        
         }           
    
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}

