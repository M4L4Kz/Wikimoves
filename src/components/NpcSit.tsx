import { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

export function NpcSit({ position }: { position: [number, number, number] }) {
  const group = useRef<THREE.Group>(null!)
  
  // Carrega o novo arquivo que você finalizou
  const { scene, animations } = useGLTF('/models/Npcsitlol.glb')
  
  // Extrai as ações de animação
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    // Dá play na animação assim que carregar
    if (actions) {
      // Pega a primeira animação disponível (o seu Idle/Sit)
      const actionName = Object.keys(actions)[0]
      if (actions[actionName]) {
        actions[actionName].fadeIn(0.5).play()
      }
    }
  }, [actions])

  return (
    <group ref={group} position={position} dispose={null}>
      <primitive object={scene} />
    </group>
  )
}