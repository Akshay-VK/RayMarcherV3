#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_poss;

float sphereSDF(vec3 p, vec3 c, float r){
    return length(p-c)-r;
}
float sceneSDF(vec3 p){
    return sphereSDF(p, vec3(0.0), 1.0);
}
vec3 rayMarch(vec3 o, vec3 dir){
    float MAX_DIST=0.0;
    int MAX_ITER = 10;
    float EPSILON=0.001;
    float dist=0.0;
    for(int i = 0; i < MAX_ITER; i++){
        float d = sceneSDF(o+dir*dist);
        dist += d;
        if(d<=EPSILON){
            return vec3(1.0);
        }
        if(dist>=MAX_DIST){
            return vec3(0.0);
        }
    }
    return vec3(0.0);
}

void main(){
    //vec2 col = normalize(gl_FragCoord.xy-u_poss);
    vec3 colour = rayMarch(vec3())
    gl_FragColor=vec4(col,0.0,1.0);
}
