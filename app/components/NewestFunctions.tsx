
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
    console.log(normalisedCoord, 'normalized')
    return normalisedCoord
}

export const createVertexShader = (gl: WebGLRenderingContext) => {
    let vertexShader = gl.createShader(gl.VERTEX_SHADER)
    //   gl_PointSize = 10.0;
    gl.shaderSource(vertexShader!, `
        attribute vec3 coordinates;
        attribute vec3 color;
        varying vec3 vColor;
        void main(void){
            gl_Position = vec4(coordinates, 1.0);
            vColor = color;
            
        }
    
    `)
    gl.compileShader(vertexShader!)
    return vertexShader
}


export const createFragShader = (gl: WebGLRenderingContext) => {
    let fragShader = gl.createShader(gl.FRAGMENT_SHADER)
    // vColor passed from vertex shader, vertex --> frag
    gl.shaderSource(fragShader!, `
        precision mediump float;
        varying vec3 vColor;
        void main(void){
            gl_FragColor = vec4(vColor, 1.0);
        }
    `)
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

export const bindAttribute = (gl: WebGLRenderingContext, program: any, buffer: any, variable: string) => {
     gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
     let attr = gl.getAttribLocation(program!, variable) // connects to c-like code attribute
     gl.vertexAttribPointer( attr, 3, gl.FLOAT, false, 0, 0)
     gl.enableVertexAttribArray(attr)
}

export const webglSetup = (gl: WebGLRenderingContext, vertices: number[], colors: number[]) => {
    // buffers
    let verticesBuffer = createAndAddToArrayBuffer(gl, vertices)
    let colorBuffer = createAndAddToArrayBuffer(gl, colors)
    // vertex shader
    let vertexShader = createVertexShader(gl)
    // fragment shader
    let fragShader = createFragShader(gl)
    // program
    let program = setUpProgram(gl, vertexShader, fragShader)
    bindAttribute(gl, program, verticesBuffer, "coordinates")
    bindAttribute(gl, program, colorBuffer, "color")
}