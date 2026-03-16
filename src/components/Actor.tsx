import { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

export function Actor({ position }: { position: [number, number, number] }) {
  const group = useRef<THREE.Group>(null!)
  
  // Substitua pelos nomes reais dos seus arquivos na pasta public/models/
  const { scene } = useGLTF('/models/seu_personagem_rpm.glb')
  const { animations: idleAnims } = useGLTF('/models/anim_idle.glb')
  
  const { actions } = useAnimations(idleAnims, group)

  useEffect(() => {
    // Ativa a animação de Idle automaticamente
    if (actions) {
      const actionName = Object.keys(actions)[0]
      actions[actionName]?.fadeIn(0.5).play()
    }
  }, [actions])

  return (
    <group ref={group} position={position} dispose={null}>
      <primitive object={scene} />
    </group>
  )
}