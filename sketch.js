var trex, trex_correndo, trex_colidiu;
var solo, soloinvisivel, imagemdosolo;
var nuvem, imagemdanuvem;
var obs1,obs2, obs3, obs4, obs5, obs6;
var grupocactos, gruponuvens;
var estadojogo = 0;
var gameoverimage, restartimage;
var gameover, restart;
var pontos;
var somsalto, sommorto, somcheck;
var pontuacao = 0;

function preload(){
  trex_correndo = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_colidiu = loadImage("trex_collided.png");
  
  imagemdosolo = loadImage("ground2.png");
  imagemdanuvem = loadImage("cloud.png");
 
  obs1 = loadImage("obstacle1.png");
  obs2 = loadImage("obstacle2.png");
  obs3 = loadImage("obstacle3.png");
  obs4 = loadImage("obstacle4.png");
  obs5 = loadImage("obstacle5.png");
  obs6 = loadImage("obstacle6.png");
  
  gameoverimage = loadImage("gameOver.png");
  restartimage = loadImage("restart.png");
  
  somsalto = loadSound("jump.mp3");
  sommorto = loadSound("die.mp3");
  somcheck = loadSound("checkPoint.mp3");
}

function setup() {
  
  createCanvas(600,200)
  
  //criar um sprite do trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_correndo);
  trex.scale = 0.5;
  trex.addAnimation("collided",trex_colidiu);
  
  //criar um sprite do solo
  solo = createSprite(200,180,400,20);
  solo.addImage("ground",imagemdosolo);
  solo.x = solo.width /2;
  
  //creating invisible ground
  soloinvisivel = createSprite(200,190,400,10);
  soloinvisivel.visible = false;
 
  grupocactos = createGroup();
  gruponuvens = createGroup();
  
  gameover = createSprite(300,100);
  restart = createSprite(300,50);
  
  gameover.addImage("go",gameoverimage);
  restart.addImage("re",restartimage);
  //trex.debug = true;
  trex.setCollider("circle", 0,0, 40);
  gameover.scale = 0.5;
  restart.scale = 0.5;
}

function draw() {
  //definir cor de fundo
  background(255);
  
  trex.velocityY = trex.velocityY + 0.8
  
  text(pontuacao,525,50);
  
  if(estadojogo == 0){  
    
  pontuacao = pontuacao + Math.round(frameCount/60);
  
  if(pontuacao % 100 == 0 && pontuacao > 0){
    somcheck.play();
  }
    
  // pular quando a tecla espaço é acionada
  if(keyDown("space")&& trex.y >= 160) {
    trex.velocityY = -10;
    somsalto.play();
  }
  gameover.visible = false;
  restart.visible = false;
  solo.velocityX = -4;
  gerarNuvens(); 
  gerarObs();
    
  if(grupocactos.isTouching(trex)){
    sommorto.play();
    estadojogo = 1
  }
  }
  else if(estadojogo == 1){
    solo.velocityX = 0;
    trex.changeAnimation("collided",trex_colidiu);
    grupocactos.setVelocityXEach(0);
    gruponuvens.setVelocityXEach(0);
    gruponuvens.setLifetimeEach(-1);
    grupocactos.setLifetimeEach(-1);
    gameover.visible = true;
    restart.visible = true;
    if(mousePressedOver(restart)){
      pontuacao = 0;
      grupocactos.destroyEach();
      gruponuvens.destroyEach();
      trex.changeAnimation("running",trex_correndo);
      estadojogo = 0;
    }
      
  }
  
  if (solo.x < 0){
    solo.x = solo.width/2;
  }
  
  //impedir o trex de cair 
  trex.collide(soloinvisivel);
  

  drawSprites();
}

function gerarNuvens(){
  
  if(frameCount % 60 === 0){
  
  nuvem = createSprite(600, Math.round(random(1,120)));
  nuvem.addImage(imagemdanuvem);
  nuvem.lifetime = 200;
  nuvem.velocityX = -8;
  nuvem.depth = trex.depth
    trex.depth = trex.depth + 1
  gruponuvens.add(nuvem);
  }
}
function gerarObs(){
  
  if(frameCount % 60 === 0){
    cacto = createSprite(600,160,20,20);
    cacto.velocityX = -8;
    cacto.lifetime = 200;
    var A = round(random(1,6));
    cacto.scale = 0.5;
    switch(A){
      case 1: cacto.addImage(obs1);
      break;
      case 2: cacto.addImage(obs2);
      break;
      case 3: cacto.addImage(obs3);
      break;
      case 4: cacto.addImage(obs4);
      break;
      case 5: cacto.addImage(obs5);
      break;
      case 6: cacto.addImage(obs6);
      break;
      default: break;
    }
    grupocactos.add(cacto);
  }
  
}


