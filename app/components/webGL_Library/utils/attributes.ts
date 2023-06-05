export const bindAttribute = (gl: WebGLRenderingContext, program: any, buffer: any, variable: string, size: number) => {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    let attr = gl.getAttribLocation(program!, variable) // connects to c-like code attribute
    gl.vertexAttribPointer( attr, size, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(attr)
}