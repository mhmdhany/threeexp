import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Three from './components/three'

import './App.css'


function App() {

  return (
   <Canvas id="three-canvas-container" shadows>
    <Suspense fallback={<></>}>
      <Three />
    </Suspense>
   </Canvas>
  )
}

export default App
