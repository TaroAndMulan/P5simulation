let L;
let width;
let height;
let P;
let theta;
let r;
let B;
let Q;
let V;
let W;
let I;
let hL;
let m;
let P1;
let P2;
let cm = [];
let p1 = [];
let p2 = [];
let prevTheta;
const MAX_POS = 1500;
function setup() {
  width = 1000;
  height = 800;
  L = 50.0;
  B = -1.0;
  Q = 1.0;
  W=1.99059;
  m = 1.0;
  I = m*L*L/2;
  hL = L/2;
  theta = PI/2;
  prevTheta = theta;
  createCanvas(width, height);
  P = createVector(-width/3,0);
  V = createVector(0,0);
  P1= createVector(P.x+hL*cos(theta),P.y+hL*sin(theta));
  P2 = createVector(P.x-hL*cos(theta),P.y-hL*sin(theta),L*0.2);
}

function draw() {
  translate(width/2, height/2); 
  scale(1, -1);
  background(230);
  simulate();
  bar(P,theta);
  show_path();
}

function simulate(){
  let dt = deltaTime/1000.0;
  // calculate Force and Torque
  let v1 = createVector(V.x-W*hL*sin(theta),V.y+W*hL*cos(theta));
  let v2 = createVector(V.x+W*hL*sin(theta),V.y-W*hL*cos(theta))
  let f1 = createVector(Q*v1.y*B,-Q*v1.x*B);
  let f2 = createVector(-Q*v2.y*B,+Q*v2.x*B);
  let r1 = createVector(hL*cos(theta),hL*sin(theta));
  let r2 = createVector(-hL*cos(theta),-hL*sin(theta));
  let torque1 = r1.x*f1.y-r1.y*f1.x;
  let torque2 = r2.x*f2.y-r2.y*f2.x;
  let F = p5.Vector.add(f1,f2);
  let Torque = torque1+torque2;
  
  // update position and angle
  V.add(F.mult(dt/(2*m)));
  P.add(p5.Vector.mult(V,dt));
  P1.set(P.x+hL*cos(theta),P.y+hL*sin(theta))
  P2.set(P.x-hL*cos(theta),P.y-hL*sin(theta),L*0.2)
  W += Torque*dt/I;
  if(abs(W)<0.005)
    W=0;
  theta += W*dt;

}

function bar() {
  stroke(126);                             
  line(P1.x,P1.y,P2.x,P2.y); 
    fill(255,0,0);

  circle(P1.x,P1.y,L*0.2);
      fill(0,0,255);

  circle(P2.x,P2.y,L*0.2);
}
  
function show_path(){
  cm.push({x:P.x,y:P.y});
  p1.push({x:P1.x,y:P1.y});
 p2.push({x:P2.x,y:P2.y});
  
  if (cm.length > MAX_POS) 
  	 cm.shift();
  if (p1.length > MAX_POS)
     p1.shift();
  if (p2.length > MAX_POS)
     p2.shift();
  
  for (let i = 0; i < cm.length; i+=3) {
    fill('black');
  	ellipse(cm[i].x, cm[i].y, L*0.04, L*0.04);
    fill('red');
   ellipse(p1[i].x, p1[i].y, L*0.04, L*0.04);
    fill('blue');
    ellipse(p2[i].x, p2[i].y, L*0.04 ,L*0.04);
  }
}



