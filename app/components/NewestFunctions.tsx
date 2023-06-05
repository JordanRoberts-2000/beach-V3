import { mat4 } from "gl-matrix"

export const createAndAddToArrayBuffer = (gl: WebGLRenderingContext, addTo: number[]) => {
    let buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(addTo), gl.STATIC_DRAW)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    return buffer
}

export const createAndAddToElementBuffer = (gl: WebGLRenderingContext, indices: number[]) => {
    let indiciesBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indiciesBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
    return indiciesBuffer
}

export const DeviceToNormalised = (coord: number, axisSize: number) => {
    let halfAxisSize = axisSize / 2
    let normalisedCoord = (coord / halfAxisSize) - 1
    return normalisedCoord
}

export const createVertexShader = (gl: WebGLRenderingContext, source: string) => {
    let vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader!, source)
    gl.compileShader(vertexShader!)
    return vertexShader
}


export const createFragShader = (gl: WebGLRenderingContext, source: string) => {
    let fragShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragShader!, source)
    gl.compileShader(fragShader!)
    return fragShader
}

export const setUpProgram = (gl: WebGLRenderingContext, vertexShader: any, fragShader: any) => {
    let program = gl.createProgram()
    gl.attachShader(program!, vertexShader!)
    gl.attachShader(program!, fragShader!)
    gl.linkProgram(program!)
    gl.useProgram(program!)
    return program
}

export const bindAttribute = (gl: WebGLRenderingContext, program: any, buffer: any, variable: string, size: number) => {
     gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
     let attr = gl.getAttribLocation(program!, variable) // connects to c-like code attribute
     gl.vertexAttribPointer( attr, size, gl.FLOAT, false, 0, 0)
     gl.enableVertexAttribArray(attr)
}

export const bindMatrix = (gl: WebGLRenderingContext, program: any, variable: string, matrix: mat4) => {
    const uniformLocations = {
        matrix: gl.getUniformLocation(program, variable)
    }
    gl.uniformMatrix4fv(uniformLocations.matrix, false, matrix)
}

export const webGL_2DTriangle90Deg = (position: number[], size: number[], canvas: HTMLCanvasElement, gl:WebGLRenderingContext) => {
    let vertices = [
        DeviceToNormalised(position[0], canvas.width), DeviceToNormalised(position[1], canvas.height), 0,
        DeviceToNormalised(position[0], canvas.width), DeviceToNormalised(position[1] + size[1], canvas.height), 0,
        DeviceToNormalised(position[0] + size[0], canvas.width), DeviceToNormalised(position[1], canvas.height), 0,
    ]
    return vertices
}

export const webGL_2DRect = (canvas: HTMLCanvasElement, gl:WebGLRenderingContext, position: number[], size: number[], colorOf: number[], matrix: any) => {
    let vertices = [
        DeviceToNormalised(position[0], canvas.width), DeviceToNormalised(position[1], canvas.height), 0,
        DeviceToNormalised(position[0], canvas.width), DeviceToNormalised(position[1] + size[1], canvas.height), 0,
        DeviceToNormalised(position[0] + size[0], canvas.width), DeviceToNormalised(position[1], canvas.height), 0,
        DeviceToNormalised(position[0], canvas.width), DeviceToNormalised(position[1] + size[1], canvas.height), 0,
        DeviceToNormalised(position[0] + size[0], canvas.width), DeviceToNormalised(position[1] + size[1], canvas.height), 0,
        DeviceToNormalised(position[0] + size[0], canvas.width), DeviceToNormalised(position[1], canvas.height), 0,
    ]
    let color = [
        colorOf[0] ? colorOf[0]/255 : 0, colorOf[1] ? colorOf[1]/255 : 0, colorOf[2] ? colorOf[2]/255 : 0,
        colorOf[0] ? colorOf[0]/255 : 0, colorOf[1] ? colorOf[1]/255 : 0, colorOf[2] ? colorOf[2]/255 : 0,
        colorOf[0] ? colorOf[0]/255 : 0, colorOf[1] ? colorOf[1]/255 : 0, colorOf[2] ? colorOf[2]/255 : 0,
        colorOf[0] ? colorOf[0]/255 : 0, colorOf[1] ? colorOf[1]/255 : 0, colorOf[2] ? colorOf[2]/255 : 0,
        colorOf[0] ? colorOf[0]/255 : 0, colorOf[1] ? colorOf[1]/255 : 0, colorOf[2] ? colorOf[2]/255 : 0,
        colorOf[0] ? colorOf[0]/255 : 0, colorOf[1] ? colorOf[1]/255 : 0, colorOf[2] ? colorOf[2]/255 : 0,
    ]
    let verticesBuffer = createAndAddToArrayBuffer(gl, vertices)
    let vertexSource = `
        attribute vec3 coordinates;
        attribute vec3 color;
        varying vec3 vColor;
        uniform mat4 matrix;

        void main(void){
            gl_Position = matrix * vec4(coordinates, 1.0);
            vColor = color;
        }`
    let vertexShader = createVertexShader(gl, vertexSource)
    let colorBuffer = createAndAddToArrayBuffer(gl, color)
    let fragSource = `
        precision mediump float;
        varying vec3 vColor;

        void main(void){
            gl_FragColor = vec4(vColor, 1.0);
        }`
    let fragShader = createFragShader(gl, fragSource)
    let program = setUpProgram(gl, vertexShader, fragShader)
    bindAttribute(gl, program, verticesBuffer, "coordinates", 3)
    bindAttribute(gl, program, colorBuffer, "color", 3)
    const uniformLocations = {
        matrix: gl.getUniformLocation(program!, 'matrix')
    }
    gl.uniformMatrix4fv(uniformLocations.matrix, false, matrix)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
}

export const webGL_2DLine = (canvas: HTMLCanvasElement, gl:WebGLRenderingContext, position: number[], size: number, colorOf: number[]) => {
    var vertices = [
        0.0, 0.0,
        0.5, -0.5
    ];
    let verticesBuffer = createAndAddToArrayBuffer(gl, vertices)
    let vertSource = `
        attribute vec2 coordinates;
        void main(void){
            gl_Position = vec4(coordinates,0.0, 1.0);
            gl_PointSize = 10.0;
        }
    `
    let vertexShader = createVertexShader(gl, vertSource)
    let colorBuffer = createAndAddToArrayBuffer(gl, colorOf)
    let fragSource = `
        void main(void){
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
    `
    let fragShader = createFragShader(gl, fragSource)
    let program = setUpProgram(gl, vertexShader, fragShader)
    bindAttribute(gl, program, verticesBuffer, "coordinates", 2)
    bindAttribute(gl, program, colorBuffer, "color", 3)
    gl.drawArrays(gl.LINES, 0, 2)
}