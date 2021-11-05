let theShader;
function preload(){    
    theShader = loadShader('./rayMarch.vert','./rayMarch.frag')
}
function setup(){
    createCanvas(600,400,WEBGL);
    noStroke();
}
function draw(){
    theShader.setUniform('res',[width,height]);
    theShader.setUniform('u_poss',[mouseX,-mouseY+height]);
    shader(theShader);
    rect(-width/2,-height/2,width/2,height/2);
}
