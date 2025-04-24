"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text3D, MeshTransmissionMaterial, Html } from "@react-three/drei"
import type { Mesh, Group } from "three"
import { Code, Terminal, Database, Server } from "lucide-react"

export default function Scene() {
  const groupRef = useRef<Group>(null)
  const bracketLeftRef = useRef<Mesh>(null)
  const bracketRightRef = useRef<Mesh>(null)
  const terminalRef = useRef<Mesh>(null)
  const codeBlockRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15
    }

    if (bracketLeftRef.current) {
      bracketLeftRef.current.rotation.y += delta * 0.2
    }

    if (bracketRightRef.current) {
      bracketRightRef.current.rotation.y += delta * 0.2
    }

    if (terminalRef.current) {
      terminalRef.current.rotation.x += delta * 0.3
    }

    if (codeBlockRef.current) {
      codeBlockRef.current.rotation.z += delta * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Code Brackets */}
      <mesh ref={bracketLeftRef} position={[-2, 0, 0]}>
        <Text3D font="/fonts/Inter_Bold.json" size={1.5} height={0.2} curveSegments={12}>
          {"{"}
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.5}
            roughness={0.05}
            clearcoat={0.1}
            clearcoatRoughness={0.1}
            transmission={1}
            ior={1.5}
            chromaticAberration={0.06}
            anisotropy={0.1}
            distortion={0.0}
            distortionScale={0.3}
            temporalDistortion={0.0}
            color="#a78bfa"
          />
        </Text3D>
      </mesh>

      <mesh ref={bracketRightRef} position={[2, 0, 0]}>
        <Text3D font="/fonts/Inter_Bold.json" size={1.5} height={0.2} curveSegments={12}>
          {"}"}
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.5}
            roughness={0.05}
            clearcoat={0.1}
            clearcoatRoughness={0.1}
            transmission={1}
            ior={1.5}
            chromaticAberration={0.06}
            anisotropy={0.1}
            distortion={0.0}
            distortionScale={0.3}
            temporalDistortion={0.0}
            color="#a78bfa"
          />
        </Text3D>
      </mesh>

      {/* Terminal */}
      <mesh ref={terminalRef} position={[0, 1.5, 0]}>
        <boxGeometry args={[3, 1.8, 0.1]} />
        <meshStandardMaterial color="#1e1e3f" metalness={0.8} roughness={0.2} />
        <Html transform position={[0, 0, 0.06]} scale={0.15} rotation={[0, 0, 0]} zIndexRange={[100, 0]}>
          <div className="w-[300px] h-[150px] bg-[#1e1e3f] rounded-md p-4 font-mono text-xs text-green-400 overflow-hidden">
            <div className="flex items-center gap-1 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 text-gray-400">terminal</span>
            </div>
            <div className="animate-pulse">
              <span className="text-purple-400">$ </span>
              npm run dev
              <div className="mt-1">
                <span className="text-blue-400">{">"}</span> Starting development server...
              </div>
              <div className="mt-1">
                <span className="text-blue-400">{">"}</span> Ready on http://localhost:3000
              </div>
              <div className="mt-2 flex items-center">
                <span className="text-purple-400">$ </span>
                <span className="animate-pulse">|</span>
              </div>
            </div>
          </div>
        </Html>
      </mesh>

      {/* Code Block */}
      <mesh ref={codeBlockRef} position={[0, -1.5, 0]}>
        <boxGeometry args={[3, 1.8, 0.1]} />
        <meshStandardMaterial color="#1e1e3f" metalness={0.8} roughness={0.2} />
        <Html transform position={[0, 0, 0.06]} scale={0.15} rotation={[0, 0, 0]} zIndexRange={[100, 0]}>
          <div className="w-[300px] h-[150px] bg-[#1e1e3f] rounded-md p-4 font-mono text-xs overflow-hidden">
            <div className="flex items-center gap-1 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 text-gray-400">App.jsx</span>
            </div>
            <div>
              <span className="text-purple-400">import </span>
              <span className="text-yellow-300">React </span>
              <span className="text-purple-400">from </span>
              <span className="text-green-400">'react'</span>
              <span className="text-white">;</span>
            </div>
            <div className="mt-1">
              <span className="text-purple-400">function </span>
              <span className="text-blue-400">App</span>
              <span className="text-white">() {`{`}</span>
            </div>
            <div className="mt-1 ml-4">
              <span className="text-purple-400">return </span>
              <span className="text-white">(</span>
            </div>
            <div className="mt-1 ml-8">
              <span className="text-orange-400">{`<div>`}</span>
            </div>
            <div className="mt-1 ml-12">
              <span className="text-orange-400">{`<h1>`}</span>
              <span className="text-white">Hello World</span>
              <span className="text-orange-400">{`</h1>`}</span>
            </div>
            <div className="mt-1 ml-8">
              <span className="text-orange-400">{`</div>`}</span>
            </div>
            <div className="mt-1 ml-4">
              <span className="text-white">);</span>
            </div>
            <div className="mt-1">
              <span className="text-white">{`}`}</span>
            </div>
          </div>
        </Html>
      </mesh>

      {/* Floating Icons */}
      <group position={[-2.5, 0, -1]}>
        <Html transform scale={0.4}>
          <div className="p-4 bg-purple-600 rounded-full">
            <Code size={32} className="text-white" />
          </div>
        </Html>
      </group>

      <group position={[2.5, 0, -1]}>
        <Html transform scale={0.4}>
          <div className="p-4 bg-blue-600 rounded-full">
            <Terminal size={32} className="text-white" />
          </div>
        </Html>
      </group>

      <group position={[-1.5, -2, -1]}>
        <Html transform scale={0.4}>
          <div className="p-4 bg-indigo-600 rounded-full">
            <Database size={32} className="text-white" />
          </div>
        </Html>
      </group>

      <group position={[1.5, 2, -1]}>
        <Html transform scale={0.4}>
          <div className="p-4 bg-violet-600 rounded-full">
            <Server size={32} className="text-white" />
          </div>
        </Html>
      </group>
    </group>
  )
}
