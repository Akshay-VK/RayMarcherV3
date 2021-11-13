let theShader;
let power;
let updatee;
let rate;
let iter;
let bail;
function preload(){    
    theShader = loadShader('./rayMarch.vert','./rayMarch.frag')
}
function setup(){
    createCanvas(600,400,WEBGL);
    noStroke();
    power = 0.025;
    updatee=true;
    rate=0.025;
    iter=50;
    bail=5;
}
function draw(){
    theShader.setUniform('res',[width,height]);
    theShader.setUniform('power',[power]);
    theShader.setUniform('u_iter',[iter]);
    theShader.setUniform('u_bail',[bail]);
    
    if(updatee){
        power += rate;
        if(power > 10){power=0.025;}
    }
    
    shader(theShader);
    rect(-width/2,-height/2,width/2,height/2);
}
