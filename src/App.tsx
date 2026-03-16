import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing'
import { Graffiti_alley_v3 } from './components/Graffiti_alley_v3'

function Scene() {
  return (
    <>
      {/* 1. Fundo e Atmosfera */}
      <color attach="background" args={['#050505']} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <Suspense fallback={null}>
        {/* 2. O Cenário Importado */}
        <Graffiti_alley_v3 />
        
        {/* 3. Iluminação Noturna Estruturada */}
        <ambientLight intensity={0.05} />
        
        {/* Luz Neon Rosa/Hotpink */}
        <pointLight position={[5, 2, 5]} intensity={15} color="hotpink" castShadow />
        
        {/* Luz de Poste/Ciano */}
        <pointLight position={[-3, 4, -2]} intensity={10} color="#00ffff" castShadow />
        
        {/* Spot de preenchimento vindo de cima */}
        <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={2} castShadow />

        {/* Reflexos metálicos (importante para o visual noturno) */}
        <Environment preset="city" />
      </Suspense>

      <OrbitControls makeDefault />

      {/* 4. Pós-processamento para o brilho neon */}
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