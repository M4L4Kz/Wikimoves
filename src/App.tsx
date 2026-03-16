import { Suspense } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { 
  OrbitControls, 
  Stars, 
  Environment 
} from '@react-three/drei'
import { 
  EffectComposer, 
  Bloom, 
  Noise 
} from '@react-three/postprocessing'

// Imports de componentes locais
import { Graffiti_alley_v3 } from './components/Graffiti_alley_v3'
import { NpcSit } from './components/NpcSit'

/**
 * ADICIONADO: A função que estava faltando!
 * Sem ela, o arquivo quebra e o export default some.
 */
function CameraDebugger() {
  const { camera } = useThree()
  return (
    <OrbitControls 
      makeDefault 
      onEnd={() => {
        const { x, y, z } = camera.position
        console.log(`📍 Coordenadas: [${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)}]`)
      }} 
    />
  )
}

function Scene() {
  return (
    <>
      {/* 1. Fundo e Atmosfera */}
      <color attach="background" args={['#050505']} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <Suspense fallback={null}>
        {/* 2. Cenário e Personagem */}
        <Graffiti_alley_v3 />
        
        {/* O NPC na posição que você extraiu */}
        <NpcSit position={[0.25, -23.90, -29.01]} />
        
        {/* 3. Iluminação */}
        <ambientLight intensity={0.05} />
        <pointLight position={[5, 2, 5]} intensity={15} color="hotpink" castShadow />
        <pointLight position={[-3, 4, -2]} intensity={10} color="#00ffff" castShadow />
        
        <Environment preset="city" />
      </Suspense>

      {/* 4. Controles e Efeitos */}
      <CameraDebugger />
      
      <EffectComposer>
        <Bloom luminanceThreshold={1} luminanceSmoothing={0.9} height={300} />
        <Noise opacity={0.02} />
      </EffectComposer>
    </>
  )
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Canvas shadows camera={{ position: [10, 5, 10], fov: 45 }}>
        <Scene />
      </Canvas>
    </div>
  )
}