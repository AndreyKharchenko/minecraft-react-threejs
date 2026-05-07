import { useThree } from '@react-three/fiber';
import React, { useEffect, useMemo } from 'react'
import { PointerLockControls as PointerLockControlsImpl } from "three/examples/jsm/controls/PointerLockControls"; 

export const PointerLockControls = () => {
  const { camera, gl } = useThree();
  const controls = useMemo(() => new PointerLockControlsImpl(camera, gl.domElement), [camera, gl])
  
  useEffect(() => {
    const onClick = () => controls?.lock()
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, []);

  return (
    <primitive object={controls} />
  )
}
