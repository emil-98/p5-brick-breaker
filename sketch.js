const marg = 100 //margin around sides of canvas to not spawn ball
const topMarg = 300 //margin at top, leaves room for bricks

class Paddle{
  constructor(){
    this.position = createVector(width / 2, height - 30)
    this.xlen = 60
    this.ylen = 10
    this.moveSpeed = 2
  }

  display(){
    rectMode(CENTER)
    noStroke()
    fill(128, 128, 255)
    rect(this.position.x, this.position.y, this.xlen, this.ylen)
  }

  move(){
    if(keyCode == LEFT_ARROW && keyIsPressed){
      this.position.x -= this.moveSpeed
    }

    if(keyCode == RIGHT_ARROW && keyIsPressed){
      this.position.x += this.moveSpeed
    }
  }

  checkCollision(ball){


    let ballX = ball.position.x
    let ballY = ball.position.y

    let left = (this.position.x - (this.xlen / 2))
    let right = (this.position.x + (this.xlen / 2))

    let top = (this.position.y - (this.ylen / 2))
    let btm = (this.position.y + (this.ylen / 2))

    

    if(ballX > left - ball.radius && ballX < right + ball.radius && ballY > top - ball.radius && ballY < btm + ball.radius){
      
      if(ballX > left - (ball.radius * 2) && ballX < left && ballY > top - (ball.radius * 2) && ballY < top){ //left collision
        ball.velocity.x *= -1
        console.log("hit left")
      }else if(ballX > right && ballX < right + (ball.radius * 2) && ballY > top - (ball.radius * 2) && ballY < top){ //right collision
        ball.velocity.x *= -1
        console.log("hit right")
      }else if(ballX > left && ballX < right && ballY > top - (ball.radius * 2) && ballY < top){ //top collision
        ball.velocity.y *= -1
        console.log("hit top")
      }else if(ballX > left && ballX < right && ballY < btm + (ball.radius * 2) && ballY > btm){ //bottom collision
        ball.velocity.y *= -1
        console.log("hit bottom")
      }
      
    }
    
  }
}

class Ball{
  constructor(){
    this.position = createVector(random(marg, height - topMarg), random(marg, width - marg))
    this.defaultSpeed = 3
    this.velocity = createVector(random(5), random(5)).normalize().mult(this.defaultSpeed)
    
    this.radius = 5
  }

  display(){
    ellipseMode(RADIUS)
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

  paddle.move()

  ball.bounceEdges()
  paddle.checkCollision(ball)
  ball.update()
  ball.display()
  paddle.display()
}
