import {
  Line,
  Text,
  Edges,
  //  useGLTF,
} from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { UseDesignState } from "../../../Components/States/DesignState";

type Section = {
  color: string;
  name: string;
  width: number;
  positionX: number;
  isFirstSection: boolean;
  isLastSection: boolean;
  isSelected: boolean;
  onClick: () => void;
};

const Section = (section: Section) => {
  const { designState } = UseDesignState();
  const [isHovered, setIsHovered] = useState(false);
  const [sidesBasesColor] = useState("#a85650");
  const [frontAndBackBasesColor] = useState("#345678");
  const [screwsColor] = useState("#987D9A");
  const ref = useRef<THREE.Mesh>(null);

  if (section.name === "Fresh Air Intake")
    return (
      <FreshAirIntake
        label={section.name}
        positionX={section.positionX}
        sizeX={section.width}
        sizeY={designState.height}
        sizeZ={designState.depth}
      />
    );
  else
    return (
      <mesh
        position={[section.positionX, 0, 0]}
        ref={ref}
        onPointerEnter={(e) => {
          e.stopPropagation();
          setIsHovered(true);
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();
          setIsHovered(false);
        }}
        onClick={(e) => {
          e.stopPropagation();
          section.onClick();
        }}
      >
        <boxGeometry
          args={[section.width, designState.height, designState.depth]}
        />
        <meshStandardMaterial
          color={
            section.isSelected
              ? "#0075ff"
              : isHovered
              ? "#dc3545"
              : section.color
          }
          transparent={true}
          opacity={0.6}
        />

        <Edges scale={1} lineWidth={3.5} color={"black"} />

        <SectionLabel
          label={section.name}
          sizeX={section.width}
          sizeZ={designState.depth}
        />

        <LeftBase
          sizeX={section.width}
          sizeY={designState.height}
          sizeZ={designState.depth}
          color={sidesBasesColor}
          color2={screwsColor}
        />

        <RightBase
          sizeX={section.width}
          sizeY={designState.height}
          sizeZ={designState.depth}
          color={sidesBasesColor}
          color2={screwsColor}
        />

        <FrontBase
          sizeX={section.width}
          sizeY={designState.height}
          sizeZ={designState.depth}
          color={frontAndBackBasesColor}
        />

        <BackBase
          sizeX={section.width}
          sizeY={designState.height}
          sizeZ={designState.depth}
          color={frontAndBackBasesColor}
        />

        <WidthSize
          sizeX={section.width}
          sizeY={designState.height}
          sizeZ={designState.depth}
        />

        {section.isFirstSection && (
          <>
            <HeightSize
              sizeX={section.width}
              sizeY={designState.height}
              sizeZ={designState.depth}
            />

            <DepthSize
              sizeX={section.width}
              sizeY={designState.height}
              sizeZ={designState.depth}
            />
            <TotalWidthSize selectedSections={designState.sections} />

            <FramesForFirstSection
              sizeX={section.width}
              sizeY={designState.height}
              sizeZ={designState.depth}
            />
          </>
        )}

        {section.isLastSection && (
          <FramesForLastSection
            sizeX={section.width}
            sizeY={designState.height}
            sizeZ={designState.depth}
          />
        )}

        {!section.isFirstSection && !section.isLastSection && (
          <FramesForMiddleSections
            sizeX={section.width}
            sizeY={designState.height}
            sizeZ={designState.depth}
          />
        )}

        {/* {section.name === "Fan" && <FanModel color="#00a2ff" scale={1.2} />} */}
        {/* {section.name === "Filter" && <FilterModel color="#523699" />} */}
      </mesh>
    );
};

export default Section;

// const FanModel = ({ color, scale }: { color: string; scale: number }) => {
//   const group = useRef<THREE.Group>(null);
//   const { nodes } = useGLTF("../../../fan.glb") as unknown as {
//     nodes: {
//       Part1: THREE.Mesh;
//     };
//   };

//   const material = new THREE.MeshStandardMaterial({ color: color });

//   return (
//     <group ref={group} scale={scale} dispose={null}>
//       <mesh
//         geometry={nodes.Part1.geometry}
//         material={material}
//         // rotation={[-Math.PI / 2, 0, direction == "left" ? 0 : Math.PI]}
//       />
//     </group>
//   );
// };

// const FilterModel = ({ color }: { color: string }) => {
//   const group = useRef<THREE.Group>(null);
//   const { nodes } = useGLTF("../../../filter.glb") as unknown as {
//     nodes: {
//       Hepa_Filter: THREE.Mesh;
//     };
//   };

//   const material = new THREE.MeshStandardMaterial({ color: color });

//   return (
//     <group ref={group} scale={0.005} dispose={null}>
//       <mesh
//         position={[15, 60, 80]}
//         rotation={[-Math.PI / 2, 0, Math.PI / 2]}
//         geometry={nodes.Hepa_Filter.geometry}
//         material={material}
//       />
//     </group>
//   );
// };

const LeftBase = (props: {
  sizeX: number;
  sizeY: number;
  sizeZ: number;
  color: string;
  color2: string;
}) => {
  return (
    <group>
      <mesh position={[-props.sizeX / 2 + 0.04, -props.sizeY / 2 - 0.1 / 2, 0]}>
        <boxGeometry args={[0.005, 0.1, props.sizeZ]} />
        <meshStandardMaterial color={props.color} opacity={0.2} />
        <Edges scale={1} lineWidth={1} color={"black"} />
      </mesh>

      <mesh position={[-props.sizeX / 2 + 0.02, -props.sizeY / 2, 0]}>
        <boxGeometry args={[0.04, 0.001, props.sizeZ]} />
        <meshStandardMaterial color={props.color} opacity={0.2} />
        <Edges scale={1} lineWidth={1} color={"black"} />
      </mesh>

      <mesh
        position={[
          -props.sizeX / 2 + 0.063,
          -props.sizeY / 2 - 0.1 / 2,
          -props.sizeZ / 2 + 0.003,
        ]}
      >
        <boxGeometry args={[0.04, 0.1, 0.005]} />
        <meshStandardMaterial color={props.color} opacity={0.2} />
        <Edges scale={1} lineWidth={1} color={"black"} />
      </mesh>

      <mesh
        position={[
          -props.sizeX / 2 + 0.063,
          -props.sizeY / 2 - 0.1 / 2,
          props.sizeZ / 2 - 0.003,
        ]}
      >
        <boxGeometry args={[0.04, 0.1, 0.005]} />
        <meshStandardMaterial color={props.color} opacity={0.2} />
        <Edges scale={1} lineWidth={1} color={"black"} />
      </mesh>

      <mesh
        position={[
          -props.sizeX / 2 + 0.062,
          -props.sizeY / 2 - 0.02,
          props.sizeZ / 2 - 0.0025,
        ]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.006, 0.006, 0.01, 32]} />{" "}
        <meshStandardMaterial color={props.color2} />
      </mesh>

      <mesh
        position={[
          -props.sizeX / 2 + 0.062,
          -props.sizeY / 2 - 0.08,
          props.sizeZ / 2 - 0.0025,
        ]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.006, 0.006, 0.01, 32]} />{" "}
        <meshStandardMaterial color={props.color2} />
      </mesh>

      <mesh
        position={[
          -props.sizeX / 2 + 0.062,
          -props.sizeY / 2 - 0.02,
          -props.sizeZ / 2 + 0.0025,
        ]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.006, 0.006, 0.01, 32]} />{" "}
        <meshStandardMaterial color={props.color2} />
      </mesh>

      <mesh
        position={[
          -props.sizeX / 2 + 0.062,
          -props.sizeY / 2 - 0.08,
          -props.sizeZ / 2 + 0.0025,
        ]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.006, 0.006, 0.01, 32]} />{" "}
        <meshStandardMaterial color={props.color2} />
      </mesh>
    </group>
  );
};

const RightBase = (props: {
  sizeX: number;
  sizeY: number;
  sizeZ: number;
  color: string;
  color2: string;
}) => {
  return (
    <group>
      <mesh position={[props.sizeX / 2 - 0.04, -props.sizeY / 2 - 0.1 / 2, 0]}>
        <boxGeometry args={[0.005, 0.1, props.sizeZ]} />
        <meshStandardMaterial color={props.color} opacity={0.2} />
        <Edges scale={1} lineWidth={1} color={"black"} />
      </mesh>
      <mesh position={[props.sizeX / 2 - 0.02, -props.sizeY / 2, 0]}>
        <boxGeometry args={[0.04, 0.001, props.sizeZ]} />
        <meshStandardMaterial color={props.color} opacity={0.2} />

        <Edges scale={1} lineWidth={1} color={"black"} />
      </mesh>
      <mesh
        position={[
          props.sizeX / 2 - 0.063,
          -props.sizeY / 2 - 0.1 / 2,
          -props.sizeZ / 2 + 0.003,
        ]}
      >
        <boxGeometry args={[0.04, 0.1, 0.005]} />
        <meshStandardMaterial color={props.color} opacity={0.2} />
        <Edges scale={1} lineWidth={1} color={"black"} />
      </mesh>
      <mesh
        position={[
          props.sizeX / 2 - 0.063,
          -props.sizeY / 2 - 0.1 / 2,
          props.sizeZ / 2 - 0.003,
        ]}
      >
        <boxGeometry args={[0.04, 0.1, 0.005]} />
        <meshStandardMaterial color={props.color} opacity={0.2} />
        <Edges scale={1} lineWidth={1} color={"black"} />
      </mesh>
      <mesh
        position={[
          props.sizeX / 2 - 0.062,
          -props.sizeY / 2 - 0.02,
          props.sizeZ / 2 - 0.0025,
        ]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.006, 0.006, 0.01, 32]} />{" "}
        <meshStandardMaterial color={props.color2} />
      </mesh>
      <mesh
        position={[
          props.sizeX / 2 - 0.062,
          -props.sizeY / 2 - 0.08,
          props.sizeZ / 2 - 0.0025,
        ]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.006, 0.006, 0.01, 32]} />{" "}
        <meshStandardMaterial color={props.color2} />
      </mesh>

      <mesh
        position={[
          props.sizeX / 2 - 0.062,
          -props.sizeY / 2 - 0.02,
          -props.sizeZ / 2 + 0.0025,
        ]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.006, 0.006, 0.01, 32]} />{" "}
        <meshStandardMaterial color={props.color2} />
      </mesh>
      <mesh
        position={[
          props.sizeX / 2 - 0.062,
          -props.sizeY / 2 - 0.08,
          -props.sizeZ / 2 + 0.0025,
        ]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.006, 0.006, 0.01, 32]} />{" "}
        <meshStandardMaterial color={props.color2} />
      </mesh>
    </group>
  );
};

const FrontBase = (props: {
  sizeX: number;
  sizeY: number;
  sizeZ: number;
  color: string;
}) => {
  return (
    <mesh position={[0, -props.sizeY / 2 - 0.1 / 2, props.sizeZ / 2]}>
      <boxGeometry args={[props.sizeX, 0.1, 0.001]} />
      <meshStandardMaterial color={props.color} />
      <Edges scale={1} lineWidth={3} color={"black"} />

      <Line
        points={[
          [props.sizeX / 2, -0.05, 0.001],
          [props.sizeX / 2, 0.05, 0.001],
        ]}
        color="black"
        lineWidth={1.5}
      />
    </mesh>
  );
};

const BackBase = (props: {
  sizeX: number;
  sizeY: number;
  sizeZ: number;
  color: string;
}) => {
  return (
    <mesh position={[0, -props.sizeY / 2 - 0.1 / 2, -props.sizeZ / 2]}>
      <boxGeometry args={[props.sizeX, 0.1, 0.001]} />
      <meshStandardMaterial color={props.color} opacity={0.7} />
      <Edges scale={1} lineWidth={3} color={"black"} />

      <Line
        points={[
          [props.sizeX / 2, -0.05, 0.001],
          [props.sizeX / 2, 0.05, 0.001],
        ]}
        color="black"
        lineWidth={1.5}
      />
    </mesh>
  );
};

const SectionLabel = (props: {
  sizeX: number;
  sizeZ: number;
  label: string;
}) => {
  return (
    <Text
      position={[0, 0.5, props.sizeZ / 2 + 0.001]}
      fontSize={(props.sizeX * 1.5) / props.label.length}
      color="black"
      fontStyle="italic"
      fontWeight={"bold"}
    >
      {props.label}
    </Text>
  );
};

const WidthSize = (props: { sizeX: number; sizeY: number; sizeZ: number }) => {
  return (
    <group>
      <Text
        position={[0, -props.sizeY * 0.5 - 0.1, props.sizeZ * 0.5 + 0.15]}
        rotation={[-1.57, 0, 0]}
        fontSize={props.sizeX * 0.2}
        color="black"
        fontWeight={"bold"}
      >
        {(props.sizeX * 100).toFixed(0)}
      </Text>
      <Line
        points={[
          [
            -props.sizeX * 0.5,
            -props.sizeY * 0.5 - 0.1,
            props.sizeZ * 0.5 + 0.15,
          ],
          [
            -props.sizeX * 0.2,
            -props.sizeY * 0.5 - 0.1,
            props.sizeZ * 0.5 + 0.15,
          ],
        ]}
        color="black"
        lineWidth={1.5}
      />
      <Line
        points={[
          [
            props.sizeX * 0.2,
            -props.sizeY * 0.5 - 0.1,
            props.sizeZ * 0.5 + 0.15,
          ],
          [
            props.sizeX * 0.5,
            -props.sizeY * 0.5 - 0.1,
            props.sizeZ * 0.5 + 0.15,
          ],
        ]}
        color="black"
        lineWidth={1.5}
      />
      <Line
        points={[
          [
            -props.sizeX * 0.5,
            -props.sizeY * 0.5 - 0.1,
            props.sizeZ * 0.5 + 0.15,
          ],
          [-props.sizeX * 0.5, -props.sizeY * 0.5 - 0.1, props.sizeZ / 2],
        ]}
        color="black"
        lineWidth={1.5}
      />
      <Line
        points={[
          [
            props.sizeX * 0.5,
            -props.sizeY * 0.5 - 0.1,
            props.sizeZ * 0.5 + 0.15,
          ],
          [props.sizeX * 0.5, -props.sizeY * 0.5 - 0.1, props.sizeZ / 2],
        ]}
        color="black"
        lineWidth={1.5}
      />
    </group>
  );
};

const HeightSize = (props: { sizeX: number; sizeY: number; sizeZ: number }) => {
  return (
    <group>
      //! Y Dimension
      <Text
        position={[-props.sizeX * 0.49 - 0.2, 0, 0]}
        rotation={[0, 0, -Math.PI / 2]}
        fontSize={props.sizeY * 0.2}
        color="black"
        fontStyle="italic"
        anchorX="center"
        anchorY="middle"
        fontWeight={"bold"}
      >
        {(props.sizeY * 100).toFixed(0)}
      </Text>
      //! Y-axis Lines
      <Line
        points={[
          [
            -props.sizeX * 0.49 - 0.2,
            props.sizeY * 0.5 - (props.sizeY * 0.5) / 2,
            0,
          ],
          [-props.sizeX * 0.49 - 0.2, props.sizeY * 0.5, 0],
        ]}
        color="black"
        lineWidth={1.5}
      />
      <Line
        points={[
          [
            -props.sizeX * 0.49 - 0.2,
            -props.sizeY * 0.5 + (props.sizeY * 0.5) / 2,
            0,
          ],
          [-props.sizeX * 0.49 - 0.2, -props.sizeY * 0.5, 0],
        ]}
        color="black"
        lineWidth={1.5}
      />
      <Line
        points={[
          [-props.sizeX * 0.49 - 0.2, props.sizeY * 0.5, props.sizeZ / 2],
          [-props.sizeX * 0.49 - 0.2, props.sizeY * 0.5, -props.sizeZ / 2],
        ]}
        color="black"
        lineWidth={1.5}
      />
      <Line
        points={[
          [-props.sizeX * 0.49 - 0.2, -props.sizeY * 0.5, props.sizeZ / 2],
          [-props.sizeX * 0.49 - 0.2, -props.sizeY * 0.5, -props.sizeZ / 2],
        ]}
        color="black"
        lineWidth={1.5}
      />
    </group>
  );
};

const DepthSize = (props: { sizeX: number; sizeY: number; sizeZ: number }) => {
  return (
    <group>
      <Text
        position={[
          -props.sizeX * 0.49 - 0.4,
          -props.sizeY * 0.5 - 0.1,
          props.sizeZ / 2 - props.sizeZ * 0.5,
        ]}
        rotation={[-1.57, 0, -1.57]}
        fontSize={props.sizeZ * 0.2}
        color="black"
        fontStyle="italic"
        anchorX="center"
        anchorY="middle"
        fontWeight={"bold"}
      >
        {(props.sizeZ * 100).toFixed(0)}
      </Text>
      <Line
        points={[
          [
            -props.sizeX * 0.49 - 0.4,
            -props.sizeY * 0.5 - 0.1,
            -props.sizeZ * 0.5,
          ],
          [
            -props.sizeX * 0.49 - 0.4,
            -props.sizeY * 0.5 - 0.1,
            (-props.sizeZ * 0.5) / 2,
          ],
        ]}
        color="black"
        lineWidth={1.5}
      />
      <Line
        points={[
          [
            -props.sizeX * 0.49 - 0.4,
            -props.sizeY * 0.5 - 0.1,
            (props.sizeZ * 0.5) / 2,
          ],
          [
            -props.sizeX * 0.49 - 0.4,
            -props.sizeY * 0.5 - 0.1,
            props.sizeZ * 0.5,
          ],
        ]}
        color="black"
        lineWidth={1.5}
      />
      <Line
        points={[
          [
            -props.sizeX * 0.49 - 0.3,
            -props.sizeY * 0.5 - 0.1,
            props.sizeZ * 0.5,
          ],
          [
            -props.sizeX * 0.49 - 0.5,
            -props.sizeY * 0.5 - 0.1,
            props.sizeZ * 0.5,
          ],
        ]}
        color="black"
        lineWidth={1.5}
      />
      <Line
        points={[
          [
            -props.sizeX * 0.49 - 0.3,
            -props.sizeY * 0.5 - 0.1,
            -props.sizeZ * 0.5,
          ],
          [
            -props.sizeX * 0.49 - 0.5,
            -props.sizeY * 0.5 - 0.1,
            -props.sizeZ * 0.5,
          ],
        ]}
        color="black"
        lineWidth={1.5}
      />
    </group>
  );
};

const TotalWidthSize = (props: {
  selectedSections: { width: number; name: string }[];
}) => {
  const { designState } = UseDesignState();

  if (props.selectedSections.length <= 2) return <></>;
  const totalWidth = props.selectedSections
    .map((section) => parseInt((section.width * 100).toFixed(0)))
    .reduce((a: number, b: number) => a + b, 0);

  const sizeX = props.selectedSections[0].width;
  const sizeY = designState.height;
  const sizeZ = designState.depth;

  return (
    <group>
      <Text
        position={[
          totalWidth / 100 / 2 - 0.45,
          -sizeY * 0.5 - 0.1,
          sizeZ * 0.5 + 0.7,
        ]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.2}
        fontWeight={"bold"}
        color="black"
      >
        {totalWidth.toFixed(0)}
      </Text>
      <Line
        points={[
          [totalWidth / 200 - 0.8, -sizeY * 0.5 - 0.1, sizeZ * 0.5 + 0.7],
          [-sizeX + sizeX / 2, -sizeY * 0.5 - 0.1, sizeZ * 0.5 + 0.7],
        ]}
        color="black"
        lineWidth={1.5}
      />
      <Line
        points={[
          [totalWidth / 100 / 2 - 0.15, -sizeY * 0.5 - 0.1, sizeZ * 0.5 + 0.7],
          [totalWidth / 100 - sizeX / 2, -sizeY * 0.5 - 0.1, sizeZ * 0.5 + 0.7],
        ]}
        color="black"
        lineWidth={1.5}
      />
      <Line
        points={[
          [-sizeX / 2, -sizeY * 0.5 - 0.1, sizeZ * 0.5 + 0.7],
          [-sizeX / 2, -sizeY * 0.5 - 0.1, sizeZ / 2],
        ]}
        color="black"
        lineWidth={1.5}
      />
      <Line
        points={[
          [totalWidth / 100 - sizeX / 2, -sizeY * 0.5 - 0.1, sizeZ * 0.5 + 0.7],
          [totalWidth / 100 - sizeX / 2, -sizeY * 0.5 - 0.1, sizeZ / 2],
        ]}
        color="black"
        lineWidth={1.5}
      />
    </group>
  );
};

const FramesForFirstSection = (props: {
  sizeX: number;
  sizeY: number;
  sizeZ: number;
}) => {
  return (
    <group>
      //! Top Front Left Frame
      <group>
        <mesh
          position={[
            -props.sizeX / 2,
            props.sizeY / 2,
            props.sizeZ / 2 - 0.05 / 2,
          ]}
        >
          <boxGeometry args={[0.02, 0.02, 0.05]} />
          <meshStandardMaterial color={"red"} />
        </mesh>

        <mesh
          position={[
            -props.sizeX / 2 + 0.05 / 2,
            props.sizeY / 2,
            props.sizeZ / 2,
          ]}
        >
          <boxGeometry args={[0.05, 0.02, 0.02]} />
          <meshStandardMaterial color={"red"} />
        </mesh>

        <mesh
          position={[
            -props.sizeX / 2,
            props.sizeY / 2 - 0.05 / 2 + 0.01,
            props.sizeZ / 2,
          ]}
        >
          <boxGeometry args={[0.02, 0.05, 0.02]} />
          <meshStandardMaterial color={"red"} />
        </mesh>
      </group>
      //! Top Back Left Frame
      <group>
        <mesh
          position={[
            -props.sizeX / 2,
            props.sizeY / 2,
            -props.sizeZ / 2 + 0.05 / 2,
          ]}
        >
          <boxGeometry args={[0.02, 0.02, 0.05]} />

          <meshStandardMaterial color={"#ff0000"} />
        </mesh>
        <mesh
          position={[
            -props.sizeX / 2 + 0.05 / 2,
            props.sizeY / 2,
            -props.sizeZ / 2,
          ]}
        >
          <boxGeometry args={[0.05, 0.02, 0.02]} />

          <meshStandardMaterial color={"#ff0000"} />
        </mesh>
        <mesh
          position={[
            -props.sizeX / 2,
            props.sizeY / 2 - 0.05 / 2 + 0.01,
            -props.sizeZ / 2,
          ]}
        >
          <boxGeometry args={[0.02, 0.05, 0.02]} />

          <meshStandardMaterial color={"#ff0000"} />
        </mesh>
      </group>
      //! Bottom Front Left Frame
      <group>
        <mesh
          position={[
            -props.sizeX / 2,
            -props.sizeY / 2,
            props.sizeZ / 2 - 0.05 / 2,
          ]}
        >
          <boxGeometry args={[0.02, 0.02, 0.05]} />
          <meshStandardMaterial color={"#ff0000"} />
        </mesh>

        <mesh
          position={[
            -props.sizeX / 2 + 0.05 / 2,
            -props.sizeY / 2,
            props.sizeZ / 2,
          ]}
        >
          <boxGeometry args={[0.05, 0.02, 0.02]} />
          <meshStandardMaterial color={"#ff0000"} />
        </mesh>

        <mesh
          position={[
            -props.sizeX / 2,
            -props.sizeY / 2 + 0.05 / 2 - 0.01,
            props.sizeZ / 2,
          ]}
        >
          <boxGeometry args={[0.02, 0.05, 0.02]} />
          <meshStandardMaterial color={"#ff0000"} />
        </mesh>
      </group>
      //! Bottom Back Left Frame
      <group>
        <mesh
          position={[
            -props.sizeX / 2,
            -props.sizeY / 2,
            -props.sizeZ / 2 + 0.05 / 2,
          ]}
        >
          <boxGeometry args={[0.02, 0.02, 0.05]} />
          <meshStandardMaterial color={"#ff0000"} />
        </mesh>

        <mesh
          position={[
            -props.sizeX / 2 + 0.05 / 2,
            -props.sizeY / 2,
            -props.sizeZ / 2,
          ]}
        >
          <boxGeometry args={[0.05, 0.02, 0.02]} />
          <meshStandardMaterial color={"#ff0000"} />
        </mesh>

        <mesh position={[-props.sizeX / 2, -props.sizeY / 2, -props.sizeZ / 2]}>
          <boxGeometry args={[0.02, 0.05, 0.02]} />
          <meshStandardMaterial color={"#ff0000"} />
        </mesh>
      </group>
    </group>
  );
};

const FramesForMiddleSections = (props: {
  sizeX: number;
  sizeY: number;
  sizeZ: number;
}) => {
  return (
    <group>
      //! Top Front Left Frame
      <group>
        <mesh
          position={[
            -props.sizeX / 2,
            props.sizeY / 2,
            props.sizeZ / 2 - 0.05 / 2,
          ]}
        >
          <boxGeometry args={[0.02, 0.02, 0.05]} />
          <meshStandardMaterial color={"red"} />
        </mesh>

        <mesh position={[-props.sizeX / 2, props.sizeY / 2, props.sizeZ / 2]}>
          <boxGeometry args={[0.07, 0.02, 0.02]} />
          <meshStandardMaterial color={"red"} />
        </mesh>

        <mesh
          position={[
            -props.sizeX / 2,
            props.sizeY / 2 - 0.05 / 2 + 0.01,
            props.sizeZ / 2,
          ]}
        >
          <boxGeometry args={[0.02, 0.05, 0.02]} />
          <meshStandardMaterial color={"red"} />
        </mesh>
      </group>
      //! Top Back Left Frame
      <group>
        <mesh
          position={[
            -props.sizeX / 2,
            props.sizeY / 2,
            -props.sizeZ / 2 + 0.05 / 2,
          ]}
        >
          <boxGeometry args={[0.02, 0.02, 0.05]} />
          <meshStandardMaterial color={"#ff0000"} />
        </mesh>

        <mesh position={[-props.sizeX / 2, props.sizeY / 2, -props.sizeZ / 2]}>
          <boxGeometry args={[0.07, 0.02, 0.02]} />
          <meshStandardMaterial color={"#ff0000"} />
        </mesh>
        <mesh
          position={[
            -props.sizeX / 2,
            props.sizeY / 2 - 0.05 / 2 + 0.01,
            -props.sizeZ / 2,
          ]}
        >
          <boxGeometry args={[0.02, 0.05, 0.02]} />

          <meshStandardMaterial color={"#ff0000"} />
        </mesh>
      </group>
      //! Bottom Front Left Frame
      <group>
        <mesh
          position={[
            -props.sizeX / 2,
            -props.sizeY / 2,
            props.sizeZ / 2 - 0.05 / 2,
          ]}
        >
          <boxGeometry args={[0.02, 0.02, 0.05]} />
          <meshStandardMaterial color={"#ff0000"} />
        </mesh>

        <mesh position={[-props.sizeX / 2, -props.sizeY / 2, props.sizeZ / 2]}>
          <boxGeometry args={[0.07, 0.02, 0.02]} />
          <meshStandardMaterial color={"#ff0000"} />
        </mesh>

        <mesh
          position={[
            -props.sizeX / 2,
            -props.sizeY / 2 + 0.05 / 2 - 0.01,
            props.sizeZ / 2,
          ]}
        >
          <boxGeometry args={[0.02, 0.05, 0.02]} />
          <meshStandardMaterial color={"#ff0000"} />
        </mesh>
      </group>
      //! Bottom Back Left Frame
      <group>
        <mesh
          position={[
            -props.sizeX / 2,
            -props.sizeY / 2,
            -props.sizeZ / 2 + 0.05 / 2,
          ]}
        >
          <boxGeometry args={[0.02, 0.02, 0.05]} />
          <meshStandardMaterial color={"#ff0000"} />
        </mesh>

        <mesh position={[-props.sizeX / 2, -props.sizeY / 2, -props.sizeZ / 2]}>
          <boxGeometry args={[0.07, 0.02, 0.02]} />
          <meshStandardMaterial color={"#ff0000"} />
        </mesh>

        <mesh position={[-props.sizeX / 2, -props.sizeY / 2, -props.sizeZ / 2]}>
          <boxGeometry args={[0.02, 0.05, 0.02]} />
          <meshStandardMaterial color={"#ff0000"} />
        </mesh>
      </group>
      //! Top Front Right Frame
      <group>
        <mesh
          position={[
            props.sizeX / 2,
            props.sizeY / 2,
            props.sizeZ / 2 - 0.05 / 2,
          ]}
        >
          <boxGeometry args={[0.02, 0.02, 0.05]} />
          <meshStandardMaterial color={"#ff0000"} />
        </mesh>

        <mesh position={[props.sizeX / 2, props.sizeY / 2, props.sizeZ / 2]}>
          <boxGeometry args={[0.07, 0.02, 0.02]} />
          <meshStandardMaterial color={"#ff0000"} />
        </mesh>

        <mesh
          position={[
            props.sizeX / 2,
            props.sizeY / 2 - 0.05 / 2 + 0.01,
            props.sizeZ / 2,
          ]}
        >
          <boxGeometry args={[0.02, 0.05, 0.02]} />
          <meshStandardMaterial color={"#ff0000"} />
        </mesh>
      </group>
      //! Top Back Right Frame
      <group>
        <mesh
          position={[
            props.sizeX / 2,
            props.sizeY / 2,
            -props.sizeZ / 2 + 0.05 / 2,
          ]}
        >
          <boxGeometry args={[0.02, 0.02, 0.05]} />
          <meshStandardMaterial color={"red"} />
        </mesh>

        <mesh position={[props.sizeX / 2, props.sizeY / 2, -props.sizeZ / 2]}>
          <boxGeometry args={[0.07, 0.02, 0.02]} />
          <meshStandardMaterial color={"red"} />
        </mesh>

        <mesh
          position={[
            props.sizeX / 2,
            props.sizeY / 2 - 0.05 / 2 + 0.01,
            -props.sizeZ / 2,
          ]}
        >
          <boxGeometry args={[0.02, 0.05, 0.02]} />

          <meshStandardMaterial color={"red"} />
        </mesh>
      </group>
      //! Bottom Front Right Frame
      <group>
        <mesh
          position={[
            props.sizeX / 2,
            -props.sizeY / 2,
            props.sizeZ / 2 - 0.05 / 2,
          ]}
        >
          <boxGeometry args={[0.02, 0.02, 0.05]} />
          <meshStandardMaterial color={"red"} />
        </mesh>

        <mesh position={[props.sizeX / 2, -props.sizeY / 2, props.sizeZ / 2]}>
          <boxGeometry args={[0.07, 0.02, 0.02]} />
          <meshStandardMaterial color={"red"} />
        </mesh>

        <mesh
          position={[
            props.sizeX / 2,
            -props.sizeY / 2 + 0.05 / 2 - 0.01,
            props.sizeZ / 2,
          ]}
        >
          <boxGeometry args={[0.02, 0.05, 0.02]} />
          <meshStandardMaterial color={"red"} />
        </mesh>
      </group>
      //! Bottom Back Right Frame
      <group>
        <mesh
          position={[
            props.sizeX / 2,
            -props.sizeY / 2,
            -props.sizeZ / 2 + 0.05 / 2,
          ]}
        >
          <boxGeometry args={[0.02, 0.02, 0.05]} />

          <meshStandardMaterial color={"red"} />
        </mesh>

        <mesh position={[props.sizeX / 2, -props.sizeY / 2, -props.sizeZ / 2]}>
          <boxGeometry args={[0.07, 0.02, 0.02]} />

          <meshStandardMaterial color={"red"} />
        </mesh>
        <mesh
          position={[
            props.sizeX / 2,
            -props.sizeY / 2 + 0.05 / 2 - 0.01,
            -props.sizeZ / 2,
          ]}
        >
          <boxGeometry args={[0.02, 0.05, 0.02]} />

          <meshStandardMaterial color={"red"} />
        </mesh>
      </group>
    </group>
  );
};

const FramesForLastSection = (props: {
  sizeX: number;
  sizeY: number;
  sizeZ: number;
}) => {
  return (
    <group>
      //! Top Front Right Frame
      <group>
        <mesh
          position={[
            props.sizeX / 2,
            props.sizeY / 2,
            props.sizeZ / 2 - 0.05 / 2,
          ]}
        >
          <boxGeometry args={[0.02, 0.02, 0.05]} />
          <meshStandardMaterial color={"#ff0000"} />
        </mesh>

        <mesh
          position={[
            props.sizeX / 2 - 0.05 / 2,
            props.sizeY / 2,
            props.sizeZ / 2,
          ]}
        >
          <boxGeometry args={[0.05, 0.02, 0.02]} />
          <meshStandardMaterial color={"#ff0000"} />
        </mesh>

        <mesh
          position={[
            props.sizeX / 2,
            props.sizeY / 2 - 0.05 / 2 + 0.01,
            props.sizeZ / 2,
          ]}
        >
          <boxGeometry args={[0.02, 0.05, 0.02]} />
          <meshStandardMaterial color={"#ff0000"} />
        </mesh>
      </group>
      //! Top Back Right Frame
      <group>
        <mesh
          position={[
            props.sizeX / 2,
            props.sizeY / 2,
            -props.sizeZ / 2 + 0.05 / 2,
          ]}
        >
          <boxGeometry args={[0.02, 0.02, 0.05]} />
          <meshStandardMaterial color={"red"} />
        </mesh>

        <mesh
          position={[
            props.sizeX / 2 - 0.05 / 2,
            props.sizeY / 2,
            -props.sizeZ / 2,
          ]}
        >
          <boxGeometry args={[0.05, 0.02, 0.02]} />
          <meshStandardMaterial color={"red"} />
        </mesh>

        <mesh
          position={[
            props.sizeX / 2,
            props.sizeY / 2 - 0.05 / 2 + 0.01,
            -props.sizeZ / 2,
          ]}
        >
          <boxGeometry args={[0.02, 0.05, 0.02]} />

          <meshStandardMaterial color={"red"} />
        </mesh>
      </group>
      //! Bottom Front Right Frame
      <group>
        <mesh
          position={[
            props.sizeX / 2,
            -props.sizeY / 2,
            props.sizeZ / 2 - 0.05 / 2,
          ]}
        >
          <boxGeometry args={[0.02, 0.02, 0.05]} />
          <meshStandardMaterial color={"red"} />
        </mesh>

        <mesh
          position={[
            props.sizeX / 2 - 0.05 / 2,
            -props.sizeY / 2,
            props.sizeZ / 2,
          ]}
        >
          <boxGeometry args={[0.05, 0.02, 0.02]} />
          <meshStandardMaterial color={"red"} />
        </mesh>

        <mesh
          position={[
            props.sizeX / 2,
            -props.sizeY / 2 + 0.05 / 2 - 0.01,
            props.sizeZ / 2,
          ]}
        >
          <boxGeometry args={[0.02, 0.05, 0.02]} />
          <meshStandardMaterial color={"red"} />
        </mesh>
      </group>
      //! Bottom Back Right Frame
      <group>
        <mesh
          position={[
            props.sizeX / 2,
            -props.sizeY / 2,
            -props.sizeZ / 2 + 0.05 / 2,
          ]}
        >
          <boxGeometry args={[0.02, 0.02, 0.05]} />

          <meshStandardMaterial color={"red"} />
        </mesh>
        <mesh
          position={[
            props.sizeX / 2 - 0.05 / 2,
            -props.sizeY / 2,
            -props.sizeZ / 2,
          ]}
        >
          <boxGeometry args={[0.05, 0.02, 0.02]} />

          <meshStandardMaterial color={"red"} />
        </mesh>
        <mesh
          position={[
            props.sizeX / 2,
            -props.sizeY / 2 + 0.05 / 2 - 0.01,
            -props.sizeZ / 2,
          ]}
        >
          <boxGeometry args={[0.02, 0.05, 0.02]} />

          <meshStandardMaterial color={"red"} />
        </mesh>
      </group>
    </group>
  );
};

const FreshAirIntake = (props: {
  positionX: number;
  label: string;
  sizeX: number;
  sizeY: number;
  sizeZ: number;
}) => {
  const trapezoidalShape = () => {
    const shape = new THREE.Shape();
    shape.lineTo(props.sizeY * 0.7, 0);
    shape.lineTo(props.sizeX * 0.1, props.sizeX);
    shape.lineTo(0, props.sizeX);
    shape.closePath();
    return shape;
  };

  return (
    <group position={[props.positionX, 0, 0]}>
      <mesh
        position={[
          -props.sizeX / 2,
          (props.sizeY * 0.7) / 2,
          (-props.sizeZ * 0.6) / 2,
        ]}
        rotation={[0, 0, -Math.PI / 2]}
      >
        <extrudeGeometry
          args={[
            trapezoidalShape(),
            { depth: props.sizeZ * 0.6, bevelEnabled: false },
          ]}
        />

        <meshStandardMaterial
          color={"#987D9A"}
          transparent={true}
          opacity={0.6}
        />

        <Edges scale={1} lineWidth={2} color={"black"} />
      </mesh>

      <WidthSize sizeX={props.sizeX} sizeY={props.sizeY} sizeZ={props.sizeZ} />

      <SectionLabel
        label={props.label}
        sizeX={props.sizeX}
        sizeZ={props.sizeZ}
      />
    </group>
  );
};
