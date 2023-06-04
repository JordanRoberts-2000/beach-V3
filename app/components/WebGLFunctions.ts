import { mat4 } from "gl-matrix"


export const createTriangle = (gl: WebGLRenderingContext, vertexData: number[], colorData: number[]) => {
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW) // DYNAMIC DRAW - graphic card ready to rewrite
    // shader is like a mini-program and runs on the gpu, the string is the langauge, then need to compile it
    // vertex shader is shape/points

    // const colorBuffer = gl.createBuffer()
    // gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW) // DYNAMIC DRAW - graphic card ready to rewrite

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader!, `
    precision mediump float;
    
    attribute vec3 position;
    attribute vec3 color;
    varying vec3 vColor;

    uniform mat4 matrix;
    
    void main() {
        vColor = color;
        gl_Position = matrix * vec4(position, 1);
    }
    `)
    gl.compileShader(vertexShader!)
    // fragment shader is the color
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader!, `
    precision mediump float;
    varying vec3 vColor;
    void main(){
        gl_FragColor = vec4(1, 0, 0, 1);
    }
    `)
    gl.compileShader(fragmentShader!)
    // combine the shaders
    const program = gl.createProgram();
    gl.attachShader(program!, vertexShader!);
    gl.attachShader(program!, fragmentShader!);
    
    gl.linkProgram(program!);
    
    const positionLocation = gl.getAttribLocation(program!, `position`);
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
    
    // const colorLocation = gl.getAttribLocation(program!, `color`);
    // gl.enableVertexAttribArray(colorLocation);
    // gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    // gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);
    gl.useProgram(program);
    const uniformLocations = {
        matrix: gl.getUniformLocation(program!, 'matrix')
    }

    const matrix = mat4.create()
    
    mat4.translate(matrix, matrix, [.2, .5, 0])
    gl.uniformMatrix4fv(uniformLocations.matrix, false, matrix)
    
    gl.useProgram(program);
   
} 

export const createRect = (gl: WebGLRenderingContext, vertexData: number[], colorData: number[]) => {
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW) // DYNAMIC DRAW - graphic card ready to rewrite
    // shader is like a mini-program and runs on the gpu, the string is the langauge, then need to compile it
    // vertex shader is shape/points

    // const colorBuffer = gl.createBuffer()
    // gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW) // DYNAMIC DRAW - graphic card ready to rewrite

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader!, `
    precision mediump float;
    
    attribute vec3 position;
    attribute vec3 color;
    varying vec3 vColor;

    uniform mat4 matrix;
    
    void main() {
        vColor = color;
        gl_Position = matrix * vec4(position, 1);
    }
    `)
    gl.compileShader(vertexShader!)
    // fragment shader is the color
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader!, `
    precision mediump float;
    varying vec3 vColor;
    void main(){
        gl_FragColor = vec4(1, 0, 0, 1);
    }
    `)
    gl.compileShader(fragmentShader!)
    // combine the shaders
    const program = gl.createProgram();
    gl.attachShader(program!, vertexShader!);
    gl.attachShader(program!, fragmentShader!);
    
    gl.linkProgram(program!);
    
    const positionLocation = gl.getAttribLocation(program!, `position`);
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
    
    // const colorLocation = gl.getAttribLocation(program!, `color`);
    // gl.enableVertexAttribArray(colorLocation);
    // gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    // gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);
    gl.useProgram(program);
    const uniformLocations = {
        matrix: gl.getUniformLocation(program!, 'matrix')
    }

    const matrix = mat4.create()
    
    mat4.translate(matrix, matrix, [.2, .5, 0])
    gl.uniformMatrix4fv(uniformLocations.matrix, false, matrix)
    
    gl.useProgram(program);
   
} 