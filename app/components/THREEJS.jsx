'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

const THREEJS = () => {
    console.log(-Math.PI / 4)
  return (
    <Canvas className='!aspect-square !w-[100vw]'>
        <OrbitControls/>
        <Stars/>
        <ambientLight intensity={0.5}/>
        <spotLight position={[10, 15, 10]} angle={0.3}/>
        <Plane/>
        <Model/>
    </Canvas>
  )
}

export default THREEJS

const Plane = () => {
    return (
        <mesh position={[0,0,0]} rotation={[-Math.PI/2, 0, 0]}>
            <planeGeometry attach={"geometry"} args={[100, 100]}/>
            <meshLambertMaterial attach={"material"} color="blue"/>
        </mesh>
    )
}

export function Model() {
    const [rotation, setRotation] = useState(2)
    let rotationIndex = useRef(0)
  const group = useRef(null);
  const rotations = [0, 0.35, 0.785398, 1.05, 1.5708, 1.8, 2.35619, 2.6, 3.14159, 3.45, 3.92699, 4.3, 4.71239, 5.05, 5.49779, 5.75]
  const { nodes, materials, animations } = useGLTF("/form_cow_animated.glb");
  const { actions } = useAnimations(animations, group);
  const cowSpin = () => {
    rotationIndex.current = (rotationIndex.current + 1)%16
    setRotation(rotations[rotationIndex.current])
    setTimeout(() => {
        cowSpin()
    },50)
  }
  useEffect(() => {
    cowSpin()
  },[])
  return (
    <group ref={group} dispose={null} position={[0,-20,-50]}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, rotation]}>
          <group
            name="4f80e805954e468296a921e70374d8dcfbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={.5}
            position={[0,0,0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="Armature"
                  position={[0, -2, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <group name="Object_5">
                    <primitive object={nodes._rootJoint} />
                    <group
                      name="Object_61"
                      position={[0, -0.58, 0]}
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={100}
                    />
                    <group
                      name="Object_63"
                      position={[0, -0.58, 0]}
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={100}
                    />
                    <skinnedMesh
                      name="Object_62"
                      geometry={nodes.Object_62.geometry}
                      material={materials.material}
                      skeleton={nodes.Object_62.skeleton}
                    />
                    <skinnedMesh
                      name="Object_64"
                      geometry={nodes.Object_64.geometry}
                      material={materials.eyes}
                      skeleton={nodes.Object_64.skeleton}
                    />
                  </group>
                </group>
                <group
                  name="Body"
                  position={[0, -0.58, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                />
                <group
                  name="Eye"
                  position={[0, -0.58, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/form_cow_animated.glb");