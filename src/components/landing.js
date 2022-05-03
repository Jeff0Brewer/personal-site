import React, { useEffect, useRef } from 'react'
import { FaArrowDown } from 'react-icons/fa'
import { motion } from 'framer-motion'
import useWindowDimensions from '../hooks/window-dim'
import { GlUtil, Mat4 } from '../gl-util'
import '../style/landing.css'

class PointStream {
  constructor (shaderInd, gl, glu) {
    this.sh = shaderInd
    this.elapsed = 0
    const w = 8; const d = 20
    const perStream = 44; const numStream = 11
    const c0 = [0.86, 0, 0.64]; const c1 = [0.97, 1, 0.2]
    this.num = numStream * perStream

    const vertices = []
    const mid = (numStream - 1) / 2
    for (let s = 0; s < numStream; s++) {
      const x = s / (numStream - 1) * w - w / 2
      const grad = Math.abs(s - mid) / mid
      const color = c0.map((c, i) => c * grad + c1[i] * (1 - grad))
      for (let p = 0; p < perStream; p++) {
        vertices.push(x, 0, (p + 0.5 * (s % 2)) / perStream * d - d / 2, ...color)
      }
    }
    this.buffer = new Float32Array(vertices)
    this.fsize = this.buffer.BYTES_PER_ELEMENT

    glu.switchShader(this.sh)
    this.glBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, this.buffer, gl.STATIC_DRAW)

    this.a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    gl.vertexAttribPointer(this.a_Position, 3, gl.FLOAT, false, this.fsize * 6, 0)
    gl.enableVertexAttribArray(this.a_Position)

    this.a_Color = gl.getAttribLocation(gl.program, 'a_Color')
    gl.vertexAttribPointer(this.a_Color, 3, gl.FLOAT, false, this.fsize * 6, this.fsize * 3)
    gl.enableVertexAttribArray(this.a_Color)

    gl.uniform1f(gl.getUniformLocation(gl.program, 'u_Depth'), d)
    this.u_Elapsed = gl.getUniformLocation(gl.program, 'u_Elapsed')
  }

  draw (gl, glu) {
    glu.switchShader(this.sh)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuffer)
    gl.vertexAttribPointer(this.a_Position, 3, gl.FLOAT, false, this.fsize * 6, 0)
    gl.vertexAttribPointer(this.a_Color, 3, gl.FLOAT, false, this.fsize * 6, this.fsize * 3)
    gl.uniform1f(this.u_Elapsed, this.elapsed)
    gl.drawArrays(gl.POINTS, 0, this.num)
  }

  update (elapsed) {
    this.elapsed += elapsed / 1000
  }
}

class TexFill {
  constructor (shaderInd, gl, glu) {
    this.sh = shaderInd
    this.buffer = new Float32Array([-1, -1, 0, 0, 1, -1, 1, 0, -1, 1, 0, 1, 1, 1, 1, 1])
    this.fsize = this.buffer.BYTES_PER_ELEMENT

    glu.switchShader(this.sh)
    this.glBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, this.buffer, gl.STATIC_DRAW)

    this.a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    gl.vertexAttribPointer(this.a_Position, 2, gl.FLOAT, false, this.fsize * 4, 0)
    gl.enableVertexAttribArray(this.a_Position)

    this.a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord')
    gl.vertexAttribPointer(this.a_TexCoord, 2, gl.FLOAT, false, this.fsize * 4, this.fsize * 2)
    gl.enableVertexAttribArray(this.a_TexCoord)
  }

  draw (gl, glu) {
    glu.switchShader(this.sh)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuffer)
    gl.vertexAttribPointer(this.a_Position, 2, gl.FLOAT, false, this.fsize * 4, 0)
    gl.vertexAttribPointer(this.a_TexCoord, 2, gl.FLOAT, false, this.fsize * 4, this.fsize * 2)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.buffer.length / 4)
  }
}

class FlowAnimation {
  constructor (canvas, framerate) {
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
      }`, `
      precision highp float;
      varying vec3 v_Color;
      varying float v_Fade;
      void main(){
        vec2 cxy = 2.0 * gl_PointCoord - 1.0;
        if(dot(cxy, cxy) > 1.0){
          discard;
        }
        gl_FragColor = vec4(v_Color*(1.0 - gl_PointCoord.y)*(1.0 - v_Fade) + v_Fade, 1.0);
      }`, `
      attribute vec2 a_Position;
      attribute vec2 a_TexCoord;
      varying vec2 v_TexCoord;
      void main(){
        gl_Position = vec4(a_Position.xy, 0.0, 1.0);
        v_TexCoord = a_TexCoord;
      }`, `
      precision highp float;
      uniform sampler2D u_Sampler;
      varying vec2 v_TexCoord;
      vec2 coord_mirror(vec2 t_coord){
        vec2 mid = floor(t_coord*2.0);
        return (1.0 - mid)*t_coord + mid*(1.0 - t_coord);
      }
      void main(){
        gl_FragColor = texture2D(u_Sampler, coord_mirror(v_TexCoord) + vec2(.33, .08));
      }`]
    this.c = canvas
    this.glu = new GlUtil()
    this.gl = this.glu.setupGl(this.c, shaders)
    const glu = this.glu; const gl = this.gl
    glu.makeTextureFramebuffer(this.c.width, this.c.height)
    this.sh = {
      point: 0,
      tex: 1
    }

    this.FOV = 100
    const viewMatrix = new Mat4()
    this.projMatrix = new Mat4()
    viewMatrix.setCamera([0, 3.5, -11.5], [0, 0, 0], [0, 1, 0])
    this.projMatrix.setPerspective(this.FOV, this.c.width / this.c.height, 0.01, 100)

    glu.switchShader(this.sh.point)
    gl.uniformMatrix4fv(gl.getUniformLocation(gl.program, 'u_ViewMatrix'), false, viewMatrix.e)
    gl.uniformMatrix4fv(gl.getUniformLocation(gl.program, 'u_ProjMatrix'), false, this.projMatrix.e)
    gl.uniform1f(gl.getUniformLocation(gl.program, 'u_Pheight'), this.c.height)
    gl.viewport(0, 0, this.c.width, this.c.height)

    this.flow = new PointStream(this.sh.point, gl, glu)
    this.fill = new TexFill(this.sh.tex, gl, glu)

    this.ftime = 1000 / framerate
    this.tLast = Date.now()
  }

  draw () {
    const tThis = Date.now()
    const tElapsed = tThis - this.tLast
    if (tElapsed >= this.ftime) {
      this.tLast = tThis
      this.glu.switchFramebuffer(1)
      this.gl.clear(this.gl.DEPTH_BUFFER_BIT | this.gl.COLOR_BUFFER_BIT)
      this.flow.update(tElapsed)
      this.flow.draw(this.gl, this.glu)
      this.glu.switchFramebuffer(0)
      this.gl.clear(this.gl.DEPTH_BUFFER_BIT | this.gl.COLOR_BUFFER_BIT)
      this.fill.draw(this.gl, this.glu)
    }
  }

  resize () {
    const glu = this.glu; const gl = this.gl
    this.projMatrix.setPerspective(this.FOV, this.c.width / this.c.height, 0.01, 100)
    glu.switchShader(this.sh.point)
    gl.uniformMatrix4fv(gl.getUniformLocation(gl.program, 'u_ProjMatrix'), false, this.projMatrix.e)
    gl.uniform1f(gl.getUniformLocation(gl.program, 'u_Pheight'), this.c.height)
    glu.removeFramebuffer(1)
    glu.makeTextureFramebuffer(this.c.width, this.c.height)
    gl.viewport(0, 0, this.c.width, this.c.height)
  }
}

const Animation = () => {
  const canvasRef = useRef(null)
  const homeAnimRef = useRef(null)
  const requestIdRef = useRef(null)
  const { height, width } = useWindowDimensions()
  const dpr = window.devicePixelRatio

  useEffect(() => {
    const tick = () => {
      if (!canvasRef.current || !homeAnimRef.current) return
      homeAnimRef.current.draw()
      requestIdRef.current = window.requestAnimationFrame(tick)
    }
    window.addEventListener('resize', () => {
      homeAnimRef.current.resize()
    })
    homeAnimRef.current = new FlowAnimation(canvasRef.current, 40)
    requestIdRef.current = window.requestAnimationFrame(tick)
    return () => {
      window.cancelAnimationFrame(requestIdRef.current)
    }
  }, [])

  return (
    <div className='gl-wrapper'>
      <motion.canvas animate={{ opacity: [0, 1] }} transition={{ duration: 1 }} width={width * dpr} height={height * dpr} ref={canvasRef} id='webgl' />
    </div>
  )
}

const Landing = () => {
  return (
    <motion.div id='landing' animate={{ opacity: [0, 1] }} transition={{ duration: 0.4, delay: 1.5 }}>
      <header className='namecard'>
        <motion.h1 animate={{ y: ['20px', '0px'] }} transition={{ duration: 0.4, delay: 1.5 }}>Jeff Brewer</motion.h1>
        <motion.p animate={{ opacity: [0, 1], y: ['20px', '0px'] }} transition={{ duration: 0.4, delay: 2 }}>software developer</motion.p>
        <motion.div animate={{ y: ['-7px', '7px', '-7px'] }} transition={{ duration: 2, delay: 3, repeat: Infinity }} onMouseUp={() => document.querySelector('.navbar').scrollIntoView({ behavior: 'smooth' })}>
          <motion.div className='arrow' animate={{ opacity: [0, 1] }} transition={{ duration: 0.4, delay: 3 }}><FaArrowDown /></motion.div>
        </motion.div>
      </header>
    </motion.div>
  )
}

export {
  Animation,
  Landing
}
