const marg = 100 //margin around sides of canvas to not spawn ball
const topMarg = 300 //margin at top, leaves room for bricks

class Paddle{
  constructor(){
    this.position = createVector(width / 2, 30)
    this.xlen = 40
    this.ylen = 10
    this.moveSpeed = 5
  }

  display(){
    rectMode(CENTER)
    noStroke()
    fill(128, 128, 255)
    rect(width / 2, 580, this.xlen, this.ylen)
  }

  move(){

  }
}

class Ball{
  constructor(){
    this.position = createVector(random(marg, height - topMarg), random(marg, width - marg))
    this.defaultSpeed = 5
    this.velocity = createVector(random(5), random(5)).normalize().mult(this.defaultSpeed)
    
    this.radius = 10
  }

  display(){
    noStroke()
    fill(128, 255, 128)
    ellipse(this.position.x, this.position.y, this.radius)
  }

  update(){
    this.position.add(this.velocity)
  }

  bounceEdges(){
    
    if(this.position.y > height - this.radius){
      this.position.y = height - this.radius
      this.velocity.y *= -1
    }else if(this.position.y < 0 + this.radius){
      this.position.y = 0 + this.radius
      this.velocity.y *= -1
    }
    
    if(this.position.x > width - this.radius){
      this.position.x = width - this.radius
      this.velocity.x *= -1
    }else if(this.position.x < 0 + this.radius){
      this.position.x = 0 + this.radius
      this.velocity.x *= -1
    }
  }
}

class Brick{

}

let paddle
let ball

function setup() {
  createCanvas(400, 600);
  paddle = new Paddle()
  ball = new Ball()
}

function draw() {
  background(255, 128, 128);

  ball.bounceEdges()
  ball.update()
  ball.display()
  paddle.display()
}
