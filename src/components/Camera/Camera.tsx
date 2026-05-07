export const Camera = () => {
    
    return (
        <perspectiveCamera 
            fov={75}
            near={0.1}
            far={1000}
            position={[0, 5, 0]} 
        />
    )
}