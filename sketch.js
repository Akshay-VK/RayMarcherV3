let theShader;
let power;
let updatee;
function preload(){    
    theShader = loadShader('./rayMarch.vert','./rayMarch.frag')
}
function setup(){
    createCanvas(600,400,WEBGL);
    noStroke();
    power = 0.025;
    updatee=true;
}
function draw(){
    theShader.setUniform('res',[width,height]);
    theShader.setUniform('power',[power]);
    if(updatee){
        power += 0.025;
        if(power == 10){power=0.025;}
    }
    
    shader(theShader);
    rect(-width/2,-height/2,width/2,height/2);
}
