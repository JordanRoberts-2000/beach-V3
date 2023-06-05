export const setUpProgram = (gl: WebGLRenderingContext, vertexShader: any, fragShader: any) => {
    let program = gl.createProgram()
    gl.attachShader(program!, vertexShader!)
    gl.attachShader(program!, fragShader!)
    gl.linkProgram(program!)
    gl.useProgram(program!)
    return program
}