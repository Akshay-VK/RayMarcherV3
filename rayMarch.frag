#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 res;
uniform vec2 u_poss;

struct Point3D{
    float dist;
    vec3 col;
};

float sphereSDF(vec3 p, vec3 c, float r){
    return length(p-c)-r;
}
Point3D sceneSDF(vec3 p){
    return Point3D(sphereSDF(p, vec3(0.0), 1.0),vec3(1.0,0.0,0.0));
}
vec3 calc_norm(vec3 p);
vec3 rayMarch(vec3 o, vec3 dir){
    const float MAX_DIST=100.0;
    const int MAX_ITER = 10;
    const float EPSILON=0.001;
    float dist=0.0;
    for(int i = 0; i < MAX_ITER; i++){
        vec3 c_pos = o+dir*dist;
        Point3D d = sceneSDF(c_pos);
        dist += d.dist;
        if(d.dist<=EPSILON){
            //return vec3(1.0);
            vec3 normal = calc_norm(c_pos);
            vec3 light_position = vec3(2.0, -5.0, 3.0);
            vec3 direction_to_light = normalize(c_pos - light_position);

            float diffuse_intensity = max(0.0, dot(normal, direction_to_light));

            return d.col * diffuse_intensity;
        }
        if(dist>=MAX_DIST){
            return vec3(0.0);
        }
    }
    return vec3(0.0);
}
vec3 calc_norm(vec3 p){
    vec3 step = vec3(0.001,0.0,0.0);

    Point3D xa=sceneSDF(p+step.xyy);
    Point3D xb=sceneSDF(p-step.xyy);
    Point3D ya=sceneSDF(p+step.yxy);
    Point3D yb=sceneSDF(p-step.yxy);
    Point3D za=sceneSDF(p+step.yyx);
    Point3D zb=sceneSDF(p-step.yyx);

    float grax = xa.dist-xb.dist;
    float gray = ya.dist-yb.dist;
    float graz = za.dist-zb.dist;
    vec3 norm = vec3(grax,gray,graz);
    return normalize(norm);

}
void main(){
    //vec2 col = normalize(gl_FragCoord.xy-u_poss);
    vec2 ray = vec2((gl_FragCoord.xy/res)*2.0-1.0);
    ray.x *= res.x/res.y;
    vec3 colour = rayMarch(vec3(0.0,0.0,-4.0),vec3(ray,1.0));
    gl_FragColor=vec4(colour,1.0);
}
