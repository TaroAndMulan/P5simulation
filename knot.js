let n;

var A;
var offset;
var w=800;
var h=800;
var k;
let v;
var l1;

function setup() {
  createCanvas(w, h);
  
  n= createSlider(2,12, 2,2);
  n.position(350, 30);
  n.style('width', '100px');

  
  v= createSlider(100,500, 100,100);
  v.position(350,150);
  v.style('width', '100px');  
  
  A=100;
  offset = h/2;
  l1=2*w/(2+sqrt(3));
  l2=sqrt(3)*w/(2+sqrt(3));
}

function draw() {
  background(220);
  
  strokeWeight(1);
  stroke(0,0,0);
  fill(0,0,0);
  textSize(16);
  
  text("n1 = "+n.value()+"\nn2 = "+3/2*n.value(), 380, 65)
  text("speed x "+v.value()/100, 370, 190)
  
  k = n.value()*PI/l1;
  let millisecond = millis();
  let t = millisecond/1000;
  let curr_x=0;
  let curr_y=offset;
  let next_x;
  let next_y;
  
  strokeWeight(2);

  stroke(255,0,0)

  for(let x=0;x<l1;x++){
    next_y= offset+A*sin(k*(x+1))*cos(v.value()*k*t)
    line(x,curr_y,x+1,next_y);
    curr_y= next_y;
  }
  
  stroke(0,0,255)

  for(let x=l1;x<=l1+l2;x++){
    next_y= offset+(A/sqrt(3))*sin(sqrt(3)*k*(x+1-l1))*cos(v.value()*k*t)
    line(x,curr_y,x+1,next_y);
    curr_y = next_y;
  }
  
  stroke(0,0,0);
  fill(0,0,0);
  circle(l1,offset,10);
  
  textSize(32);
  
  stroke(255,0,0);
  fill(255,0,0)
  text("L1", l1/2, 3*h/4)
  
  stroke(0,0,255)
  fill(0,0,255)
  text("L2", l1+l2/2, 3*h/4)

}
