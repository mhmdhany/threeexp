import { Environment, OrbitControls, PerspectiveCamera, Text, useGLTF } from '@react-three/drei'
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { angleToRadians } from "../../utils/angle";
import * as THREE from "three";
import gsap from "gsap";

const Three = () => {
 
  const car = useGLTF('/models/car2/scene.glb')

  // Code to move the camera around
  const orbitControlsRef = useRef(null);
  useFrame((state) => {
      if (!!orbitControlsRef.current) {
          const { x, y } = state.mouse;
          orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(45));
          orbitControlsRef.current.setPolarAngle((y + 1) * angleToRadians(90 - 30));
          orbitControlsRef.current.update();
      }
  })

  // Animation
  const ballRef = useRef(null);
  useEffect(() => {
      if (!!ballRef.current) {

          // Timeline
          const timeline = gsap.timeline({ paused: true });

          // x-axis motion
          timeline.to(ballRef.current.position, {
              x: 1,
              duration: 2,
              ease: "power2.out"
          });

          // y-axis motion
          timeline.to(ballRef.current.position, {
              y: 0.5,
              duration: 1,
              ease: "bounce.out"
          }, "<");

          // Play
          timeline.play();
      }
  }, [ballRef.current])

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0,1,5]} />
      <OrbitControls ref={orbitControlsRef} minPolarAngle={angleToRadians(60)} maxPolarAngle={angleToRadians(80)}/>

      {/* Ball */}
      <mesh position={[-2, 1.5, 0]} castShadow ref={ballRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color='#ffffff' metalness={0.5} roughness={0.2} />
      </mesh>

      {/* Car */}
      <primitive object={car.scene} scale={10} position={[0, 0, -3]} rotation={[0, angleToRadians(140), 0]} />

      {/* TEXT */}
      {/* <Text
          fontSize={0.6}
          position={[2.8,0.75,0.75]}
          maxWidth={2}
          color={'#b59feb'}
       >
        Hello To Three js
       </Text> */}

      {/* Floor */}
      <mesh rotation={[-(angleToRadians(90)), 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1ea3d8" />
      </mesh>


      {/* Ambient light */}
      <ambientLight args={["#ffffff", 0.25]} />

      {/* Spotlight light */}
      <spotLight args={["#ffffff", 1.5, 7, angleToRadians(45), 0.4]} position={[-3, 1, 0]} castShadow />

      {/* Environmnet */}
      <Environment background>
      <mesh>
        <sphereGeometry args={[50, 100, 100]} />
        <meshBasicMaterial color="#2266cc" side={THREE.BackSide} />
      </mesh>
      </Environment>
    </>
  )
}

export default Three