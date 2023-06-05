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