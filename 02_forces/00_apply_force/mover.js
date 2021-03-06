function Mover(){
  //has a
  // movers originate from center screen if ever mouse is off screen (ie at startup)
  if (mouseX == 0){
    this.location     = createVector(width/2, height/2);
  } else {
    this.location     = createVector(mouseX+random(-150,150), mouseY+random(-150,150));
  }
  this.velocity     = createVector();
  this.acceleration = createVector();
  //this.topSpeed     = random(3,6);
  this.topSpeed     = 5;
  this.mass         = random(1,6);
  this.diameter     = this.mass*5;
  //this.thrust       = 4/this.diameter;

  this.perlinForce  = createVector(random(width), random(height));
  //this.perlinIncrement = createVector(random(-.01, .01), random(-.01, .01));
  this.perlinIncrement = createVector(random(.03), random(.03));

  this.fillVector   = createVector(random(255),random(255),random(255));

  //does a
////////////////////////////////////////////////
////// ACCUMULATE FORCES
  this.applyForce = function(force){
    //account for each object's mass
    var f = p5.Vector.div(force,this.mass);
    //accumulate f in acceleration
    this.acceleration.add(f);
  };
/////////////////////////////////////////////////

  
  this.update = function(){
    
    /*/////STEPS TO TRACK THE TARGET
    //0. track mouse location
    this.mouse = createVector(mouseX, mouseY);
    //1. COMPUTE DIRECTION
    this.dir = p5.Vector.sub(this.mouse,this.location);
    //2. NORMALIZE
    this.dir.normalize();
    //3. SCALE
    this.dir.setMag(this.thrust);
    //console.log("dir vector = " + this.dir);
    //4. SET ACCELERATION 
    this.acceleration = this.dir;
    */
    

    /*////////ADD PERLIN FORCE
    this.acceleration.add(map(noise(this.perlinForce.x),0,1,-.2,.2), map(noise(this.perlinForce.y),0,1,-.2,.2));
    //this.acceleration.x = map(noise(this.perlinForce.x),0,1,-1,1);
    //this.acceleration.y = map(noise(this.perlinForce.y),0,1,-1,1);
    this.perlinForce.add(this.perlinIncrement);
    */

    /////MOTION 101
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed);
    this.location.add(this.velocity);
    //clear the ACCELERATION
    this.acceleration.mult(0);
    
    
    
    //console.log(this.velocity);
    //console.log(this.topSpeed);
  };

  this.display = function(){
    fill(this.fillVector.x,this.fillVector.y,this.fillVector.z);
    ellipse(this.location.x, this.location.y, this.diameter,this.diameter );
    //fill(0,20);
    //ellipse(this.location.x, this.location.y, this.diameter*.8, this.diameter*.8);
  };

  this.checkBoundary = function(){
    if (this.location.x > width + (this.diameter/2)){
      this.location.x = 0;
    } 
    else if (this.location.x < 0 - (this.diameter/2)){
      this.location.x = width;
    }
    
    if (this.location.y > height + (this.diameter/2)){
      this.location.y = 0;
    }
    else if (this.location.y < 0 - (this.diameter/2)){
      this.location.y = height;
    }
  };
}