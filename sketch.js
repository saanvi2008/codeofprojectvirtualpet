var dog,sadDog,happyDog;

var foodObj;

var feed, add;

var database;

var foodStock;

var foodpos;

var lastFed, fedTime;

var readStock;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
  milkImg=loadImage("Images/Milk.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton(" Feed  Dog:)");
  feed.position(600,95);
  feed.mousePressed(feedDog);

  add = createButton(" Add Food To Dog:)");
  add.position(740,95);
  add.mousePressed(addFood);

 foodObj = new Food();
 foodObj.getFoodStock();
 foodObj.deductFood();
 foodStock = database.ref('Food');
 //foodStock.on("value",readStock);

}

function draw() {
  background(46,139,87);

  foodObj.display();
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
            lastFed = data.val();
  })

  fill("yellow");
  textSize(15);
  if(lastFed >= 12){
    text(" LastFeed : " + lastFed % 12 + " pm ", 100,30);
  }
  else if(lastFed == 0){
    text(" Last Feed : 12 am ", 100,30 );
  }
  else{
    text("Last Feed : " + lastFed + " am " , 100, 30);
  }

  drawSprites();
}


function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);

  database.ref('/').update({
    Food : foodObj.getFoodStock()
    //FedTime : hour()
  })
}

function addFood(){

  foodS++
  database.ref('/').update({
      Food :foodS
      // : hour()
  })

}




