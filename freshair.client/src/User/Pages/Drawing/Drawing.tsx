import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Section from "./Section";
import { UseDesignState } from "../../../Components/States/DesignState";

const Drawing = () => {
  const { designState, setDesignState } = UseDesignState();

  return (
    <Canvas
      onContextMenu={(e) => {
        e.preventDefault();
      }}
      onPointerDown={(e) => {
        if (e.button === 2) {
          document.body.style.cursor = "grabbing";
        }
      }}
      onPointerUp={() => {
        document.body.style.cursor = "auto";
      }}
      camera={{
        fov: 15,
        near: 0.1,
        far: 100,
        position: [-5, 5, 8],
      }}
    >
      <OrbitControls maxDistance={20} minDistance={1} rotateSpeed={0.25} />

      {/* //! LIGHTS */}
      <directionalLight position={[0, 0, 1]} intensity={1.5} />
      <directionalLight position={[1, 0, 1]} intensity={1} />
      <directionalLight position={[0, 1, 0]} intensity={1} />
      <ambientLight intensity={2} />

      {/*//! CUBES */}
      <group position={[0, 0, 0]}>
        {designState.sections.map((section, index) => {
          const positionX =
            designState.sections
              .slice(0, index)
              .reduce((acc, curr) => acc + curr.width, 0) +
            section.width / 2;

          return (
            <Section
              key={index}
              color="#987D9A"
              name={section.name}
              width={section.width}
              positionX={positionX}
              isFirstSection={index === 0}
              isLastSection={
                index === designState.sections.length - 1 ||
                designState.sections[index + 1].name === "Fresh Air Intake"
              }
              isSelected={designState.selectedSectionIndex === index}
              onClick={() =>
                setDesignState((prev) => ({
                  ...prev,
                  selectedSectionIndex: index,
                }))
              }
            />
          );
        })}
      </group>
    </Canvas>
  );
};

export default Drawing;
