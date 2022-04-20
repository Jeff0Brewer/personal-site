import * as React from "react"
import useWindowDimensions from "./hooks/window-dim";

//basic gl helper class
var GlUtil = function(){
	this.programs = [];
	this.framebuffers = [[null, null]];
}

//load shader from string
GlUtil.prototype.loadShader = function(type, source){
	let s = this.gl.createShader(type);
	this.gl.shaderSource(s, source);
	this.gl.compileShader(s);
	return s;
}

//create gl program from strings
GlUtil.prototype.createProgram = function(vs, fs){
	let p = this.gl.createProgram();
	let v = this.loadShader(this.gl.VERTEX_SHADER, vs);
	let f = this.loadShader(this.gl.FRAGMENT_SHADER, fs);
	this.gl.attachShader(p, v);
	this.gl.attachShader(p, f);
	this.gl.linkProgram(p);
	return p;
}

//switch to another shader program
GlUtil.prototype.switchShader = function(i){
	this.gl.useProgram(this.programs[i]);
	this.gl.program = this.programs[i];
}

//switch to another framebuffer
GlUtil.prototype.switchFramebuffer = function(i){
	this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffers[i][0]);
	if(i !== 0) this.gl.bindTexture(this.gl.TEXTURE_2D, this.framebuffers[i][1]);
}

//initialize gl context
GlUtil.prototype.setupGl = function(canvas, shaders){
	this.gl = canvas.getContext('webgl', {preserveDrawingBuffer: false});
	this.gl.disable(this.gl.BLEND);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.clearColor(0, 0, 0, 0);
	for(let i = 0; i < shaders.length; i += 2){
		this.programs.push(this.createProgram(shaders[i], shaders[i + 1]));
	}
	return this.gl;
}

//make a texture framebuffer and add to framebuffer list, return index of fb in list
GlUtil.prototype.makeTextureFramebuffer = function(w, h){
	let tex = this.gl.createTexture();
	this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
	this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, w, h, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
	this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
	this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
	this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);

	let fb = this.gl.createFramebuffer();
	this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fb);
	this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, tex, 0);

	const depthBuffer = this.gl.createRenderbuffer();
	this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, depthBuffer);
	this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, w, h);
	this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, depthBuffer);

	this.framebuffers.push([fb, tex]);
	return this.framebuffers.length - 1;
}

//remove a framebuffer by index
GlUtil.prototype.removeFramebuffer = function(i){
	this.framebuffers.splice(i);
}

//4x4 matrix object constructor
var Mat4 = function(){
	this.e = new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
}

//create persepctive matrix
Mat4.prototype.setPerspective = function(fovy, aspect, near, far){
	fovy = Math.PI*fovy/180/2;
	let rd = 1/(far-near);
	let ct = Math.cos(fovy)/Math.sin(fovy);

	this.e[0] = ct/aspect;
	this.e[1] = 0;
	this.e[2] = 0;
	this.e[3] = 0;
	this.e[4] = 0;
	this.e[5] = ct;
	this.e[6] = 0;
	this.e[7] = 0;
	this.e[8] = 0;
	this.e[9] = 0;
	this.e[10]= -(far+near)*rd;
	this.e[11]= -1;
	this.e[12]= 0;
	this.e[13]= 0;
	this.e[14]= -2*near*far*rd;
	this.e[15]= 0;
}

//create view matrix
Mat4.prototype.setCamera = function(camera, focus, up){
	let f = norm(sub(focus, camera));
	let s = norm(cross3(f, up));
	let u = cross3(s, f);

	this.e[0] = s[0];
	this.e[1] = u[0];
	this.e[2] = -f[0];
	this.e[3] = 0;
	this.e[4] = s[1];
	this.e[5] = u[1];
	this.e[6] = -f[1];
	this.e[7] = 0;
	this.e[8] = s[2];
	this.e[9] = u[2];
	this.e[10]= -f[2];
	this.e[11]= 0;
	this.e[12]= 0;
	this.e[13]= 0;
	this.e[14]= 0;
	this.e[15]= 1;

	this.translate(-camera[0], -camera[1], -camera[2]);
}

//scale transformation matrix in x, y, z
Mat4.prototype.scale = function(x, y, z){
	this.e[0] *= x;
	this.e[1] *= x;
	this.e[2] *= x;
	this.e[3] *= x;
	this.e[4] *= y;
	this.e[5] *= y;
	this.e[6] *= y;
	this.e[7] *= y;
	this.e[8] *= z;
	this.e[9] *= z;
	this.e[10] *= z;
	this.e[11] *= z;
}

//translate transformation matrix by x, y, z
Mat4.prototype.translate = function(x, y, z){
	this.e[12] += this.e[0]*x + this.e[4]*y + this.e[8]*z;
	this.e[13] += this.e[1]*x + this.e[5]*y + this.e[9]*z;
	this.e[14] += this.e[2]*x + this.e[6]*y + this.e[10]*z;
	this.e[15] += this.e[3]*x + this.e[7]*y + this.e[11]*z;
}

//multiply vector by scalar
function mult_scalar(vec, s){ 
	return vec.map(el => el*s);
}

//find difference of two vectors
function sub(a, b){
	return a.map((el, i) => el - b[i]);
}

//find magnitude of vector
function mag(vec){ 
	let s = 0;
	vec.forEach(el => { s += el*el; });
	return Math.sqrt(s);
}

//find normal of vector
function norm(vec){ 
	return mult_scalar(vec, 1/mag(vec));
}

//find cross product of 3d vectors
function cross3(a, b){
	return [a[1]*b[2] - a[2]*b[1],
			a[2]*b[0] - a[0]*b[2],
			a[0]*b[1] - a[1]*b[0]];
}

class PointFlow{
	constructor(shaderInd, gl, glu){
		this.sh = shaderInd;
		this.elapsed = 0;
		const w = 8, d = 20;
		const perStream = 44, numStream = 11;
		const c0 = [.86, 0, .64], c1 = [.97, 1, .2];
		this.num = numStream*perStream;

		let vertices = [];
		const mid = (numStream - 1)/2;
		for(let s = 0; s < numStream; s++){
			const x = s/(numStream - 1) * w - w/2;
			const grad = Math.abs(s - mid)/mid;
			const color = c0.map((c, i) => c*grad + c1[i]*(1 - grad));
			for(let p = 0; p < perStream; p++){
				vertices.push(x, 0, (p + .5*(s%2))/perStream*d - d/2, ...color);
			}
		}
		this.buffer = new Float32Array(vertices);
		this.fsize = this.buffer.BYTES_PER_ELEMENT;

		glu.switchShader(this.sh);
		this.glBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, this.buffer, gl.STATIC_DRAW);

		this.a_Position = gl.getAttribLocation(gl.program, 'a_Position');
		gl.vertexAttribPointer(this.a_Position, 3, gl.FLOAT, false, this.fsize*6, 0);
		gl.enableVertexAttribArray(this.a_Position);

		this.a_Color = gl.getAttribLocation(gl.program, 'a_Color');
		gl.vertexAttribPointer(this.a_Color, 3, gl.FLOAT, false, this.fsize*6, this.fsize*3);
		gl.enableVertexAttribArray(this.a_Color);

		gl.uniform1f(gl.getUniformLocation(gl.program, 'u_Depth'), d);
		this.u_Elapsed = gl.getUniformLocation(gl.program, 'u_Elapsed');
	}

	draw(gl, glu){
		glu.switchShader(this.sh);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuffer);
		gl.vertexAttribPointer(this.a_Position, 3, gl.FLOAT, false, this.fsize*6, 0);
		gl.vertexAttribPointer(this.a_Color, 3, gl.FLOAT, false, this.fsize*6, this.fsize*3);
		gl.uniform1f(this.u_Elapsed, this.elapsed);
		gl.drawArrays(gl.POINTS, 0, this.num);
	}

	update(elapsed){
		this.elapsed += elapsed/1000;
	}
}

class TexFill{
	constructor(shader_ind, gl, glu){
		this.sh = shader_ind;
		this.buffer = new Float32Array([-1, -1, 0, 0, 1, -1, 1, 0, -1, 1, 0, 1, 1, 1, 1, 1]);
		this.fsize = this.buffer.BYTES_PER_ELEMENT;

		glu.switchShader(this.sh);
		this.glBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, this.buffer, gl.STATIC_DRAW);

		this.a_Position = gl.getAttribLocation(gl.program, 'a_Position');
		gl.vertexAttribPointer(this.a_Position, 2, gl.FLOAT, false, this.fsize*4, 0);
		gl.enableVertexAttribArray(this.a_Position);

		this.a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
		gl.vertexAttribPointer(this.a_TexCoord, 2, gl.FLOAT, false, this.fsize*4, this.fsize*2);
		gl.enableVertexAttribArray(this.a_TexCoord);
	}

	draw(gl, glu){
		glu.switchShader(this.sh);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuffer);
		gl.vertexAttribPointer(this.a_Position, 2, gl.FLOAT, false, this.fsize*4, 0);
		gl.vertexAttribPointer(this.a_TexCoord, 2, gl.FLOAT, false, this.fsize*4, this.fsize*2);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.buffer.length/4);
	}
}

class FlowAnimation{
	constructor(canvas, framerate){
		const shaders = [`
			attribute vec4 a_Position;
			attribute vec3 a_Color;
			uniform mat4 u_ViewMatrix;
			uniform mat4 u_ProjMatrix;
			uniform float u_Depth;
			uniform float u_Elapsed;
			uniform float u_Pheight;
			varying vec3 v_Color;
			varying float v_Fade;
			float curve(float x){
				return -sin(x) + 1.5*cos(x*0.5);
			}
			void main(){
				vec4 pos = a_Position;
				pos.z = mod(pos.z - u_Elapsed*0.3 + u_Depth/2.0, u_Depth) - u_Depth/2.0;
				pos.x = pos.x + 1.5*curve((pos.z - 0.5)*.7);
				gl_Position = u_ProjMatrix * u_ViewMatrix * pos;
				gl_PointSize = u_Pheight/(2.7*gl_Position.w);
				v_Fade = pow((pos.z + u_Depth/2.0)/u_Depth, 1.5);
				v_Color = a_Color;
			}`,`
			precision highp float;
			varying vec3 v_Color;
			varying float v_Fade;
			void main(){
				vec2 cxy = 2.0 * gl_PointCoord - 1.0;
				if(dot(cxy, cxy) > 1.0){
					discard;
				}
				gl_FragColor = vec4(v_Color*(1.0 - gl_PointCoord.y)*(1.0 - v_Fade) + v_Fade, 1.0);
			}`,`
			attribute vec2 a_Position;
			attribute vec2 a_TexCoord;
			varying vec2 v_TexCoord;
			void main(){
				gl_Position = vec4(a_Position.xy, 0.0, 1.0);
				v_TexCoord = a_TexCoord;
			}`,`
			precision highp float;
			uniform sampler2D u_Sampler;
			varying vec2 v_TexCoord;
			vec2 coord_mirror(vec2 t_coord){
				vec2 mid = floor(t_coord/0.5);
				return (1.0 - mid)*mod(t_coord, 0.5) + mid*(1.0 - t_coord);
			}
			void main(){
				gl_FragColor = texture2D(u_Sampler, coord_mirror(v_TexCoord) + vec2(.33, .07));
			}`];
		this.c = canvas;
		this.glu = new GlUtil();
		this.gl = this.glu.setupGl(this.c, shaders);
		let glu = this.glu, gl = this.gl;
		glu.makeTextureFramebuffer(this.c.width, this.c.height);
		this.sh = {
			point: 0,
			tex: 1
		};

		this.FOV = 100;
		let viewMatrix = new Mat4();
		this.projMatrix = new Mat4();
		viewMatrix.setCamera([0, 4, -11.5], [0, 0, 0], [0, 1, 0]);
		this.projMatrix.setPerspective(this.FOV, this.c.width/this.c.height, .01, 100);

		glu.switchShader(this.sh.point);
		gl.uniformMatrix4fv(gl.getUniformLocation(gl.program, 'u_ViewMatrix'), false, viewMatrix.e);
		gl.uniformMatrix4fv(gl.getUniformLocation(gl.program, 'u_ProjMatrix'), false, this.projMatrix.e);
		gl.uniform1f(gl.getUniformLocation(gl.program, 'u_Pheight'), this.c.height);
		gl.viewport(0, 0, this.c.width, this.c.height);

		this.flow = new PointFlow(this.sh.point, gl, glu);
		this.fill = new TexFill(this.sh.tex, gl, glu);

		this.ftime = 1000/framerate;
		this.tLast = Date.now();
	}

	draw(){
		const tThis = Date.now();
		const tElapsed = tThis - this.tLast;
		if(tElapsed >= this.ftime){
			this.tLast = tThis;
			this.glu.switchFramebuffer(1);
			this.gl.clear(this.gl.DEPTH_BUFFER_BIT | this.gl.COLOR_BUFFER_BIT);
			this.flow.update(tElapsed);
			this.flow.draw(this.gl, this.glu);
			this.glu.switchFramebuffer(0);
			this.gl.clear(this.gl.DEPTH_BUFFER_BIT | this.gl.COLOR_BUFFER_BIT);
			this.fill.draw(this.gl, this.glu);
		}
	}

	resize(){
		let glu = this.glu, gl = this.gl;
		this.projMatrix.setPerspective(this.FOV, this.c.width/this.c.height, .01, 100);
		glu.switchShader(this.sh.point);
		gl.uniformMatrix4fv(gl.getUniformLocation(gl.program, 'u_ProjMatrix'), false, this.projMatrix.e);
		gl.uniform1f(gl.getUniformLocation(gl.program, 'u_Pheight'), this.c.height);
		glu.removeFramebuffer(1);
		glu.makeTextureFramebuffer(this.c.width, this.c.height);
		gl.viewport(0, 0, this.c.width, this.c.height);
	}
}

const Animation = () => {
	const canvasRef = React.useRef(null);
	const homeAnim = React.useRef(null);
	const requestIdRef = React.useRef(null);
	const {height, width} = useWindowDimensions();
	const dpr = window.devicePixelRatio;

	React.useEffect(() => {
		const tick = () => {
			if(!canvasRef.current || !homeAnim) return;
			homeAnim.current.draw();
			requestIdRef.current = requestAnimationFrame(tick);
		};
		const resize = () => {
			homeAnim.current.resize();
		};
		window.addEventListener('resize', resize);
		homeAnim.current = new FlowAnimation(canvasRef.current, 40);
		requestIdRef.current = requestAnimationFrame(tick);
		return () => {
			cancelAnimationFrame(requestIdRef.current);
		};
	}, []);

    return (
        <canvas className="fade-in" width={width*dpr} height={height*dpr} ref={canvasRef} id="webgl"></canvas>
    )
}

export default Animation