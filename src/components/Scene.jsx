import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { timelineData } from '../utils/timelineData';

// Fallback mesh if 3D model takes time or has an issue
function ModelFallback({ currentPosition, color = '#FF9933' }) {
  const meshRef = useRef();

  useEffect(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.position, {
        x: currentPosition.x,
        y: currentPosition.y + 1.2,
        z: currentPosition.z,
        duration: 1.8,
        ease: 'power2.inOut'
      });
    }
  }, [currentPosition]);

  return (
    <group ref={meshRef} position={[currentPosition.x, currentPosition.y + 1.2, currentPosition.z]}>
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.9, 1.8, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={0.3} roughness={0.4} />
      </mesh>
      <pointLight color="#FF9933" intensity={2} distance={8} />
    </group>
  );
}

// 3D Modi Model Loader
function ModiModel({ currentPosition, activeEvent }) {
  const modelRef = useRef();
  
  // Safely attempt to load the GLTF model
  let gltf = null;
  try {
    gltf = useGLTF('/models/modi-model.glb');
  } catch (err) {
    console.warn('GLTF load fallback:', err);
  }

  useEffect(() => {
    if (modelRef.current) {
      gsap.to(modelRef.current.position, {
        x: currentPosition.x,
        y: currentPosition.y,
        z: currentPosition.z,
        duration: 1.8,
        ease: 'power3.out'
      });
    }
  }, [currentPosition]);

  // Subtle floating idle rotation
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });

  if (!gltf || !gltf.scene) {
    return <ModelFallback currentPosition={currentPosition} color={activeEvent?.color} />;
  }

  return (
    <group
      ref={modelRef}
      position={[currentPosition.x, currentPosition.y, currentPosition.z]}
    >
      <primitive
        object={gltf.scene}
        scale={2.2}
        position={[0, 0, 0]}
      />
      {/* Halo spotlight under model */}
      <pointLight
        color={activeEvent?.color || '#FF9933'}
        intensity={3}
        distance={10}
        position={[0, 3, 2]}
      />
    </group>
  );
}

// Smooth glowing timeline tube path
function TimelinePath({ activeMarker }) {
  const curve = useMemo(() => {
    const points = timelineData.map(
      (item) => new THREE.Vector3(item.position.x, item.position.y, item.position.z)
    );
    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.2);
  }, []);

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 160, 0.16, 12, false);
  }, [curve]);

  return (
    <group>
      <mesh geometry={tubeGeometry}>
        <meshStandardMaterial
          color="#FF9933"
          emissive="#FF9933"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {/* Outer translucent glow tube */}
      <mesh>
        <primitive object={new THREE.TubeGeometry(curve, 100, 0.35, 8, false)} />
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.15}
          wireframe
        />
      </mesh>
    </group>
  );
}

// Timeline Markers along the path
function TimelineMarkers({ onMarkerClick, activeMarker, filteredIds }) {
  return timelineData.map((item) => {
    const isFiltered = filteredIds && !filteredIds.includes(item.id);
    const isActive = activeMarker === item.id;

    return (
      <group
        key={item.id}
        position={[item.position.x, item.position.y, item.position.z]}
      >
        {/* Interactive Clickable Sphere */}
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            onMarkerClick(item);
          }}
          onPointerOver={() => {
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'auto';
          }}
          scale={isActive ? 1.6 : isFiltered ? 0.6 : 1.1}
        >
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshStandardMaterial
            color={item.color}
            emissive={item.color}
            emissiveIntensity={isActive ? 1.2 : 0.4}
            roughness={0.1}
            metalness={0.9}
            opacity={isFiltered ? 0.3 : 1}
            transparent={isFiltered}
          />
        </mesh>

        {/* Outer Pulsing Ring on Active */}
        {isActive && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.9, 1.2, 32]} />
            <meshBasicMaterial color={item.color} side={THREE.DoubleSide} transparent opacity={0.8} />
          </mesh>
        )}

        {/* Milestone 3D HTML Label */}
        <Html
          position={[0, 1.8, 0]}
          center
          distanceFactor={35}
          zIndexRange={[100, 0]}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              onMarkerClick(item);
            }}
            style={{
              background: isActive
                ? `linear-gradient(135deg, rgba(20, 25, 35, 0.95), rgba(40, 20, 10, 0.95))`
                : `rgba(15, 20, 25, 0.85)`,
              color: '#ffffff',
              padding: '6px 14px',
              borderRadius: '8px',
              whiteSpace: 'nowrap',
              fontSize: '12px',
              fontFamily: "'Inter', sans-serif",
              border: isActive ? `1.5px solid ${item.color}` : '1px solid rgba(255,255,255,0.15)',
              boxShadow: isActive ? `0 0 20px ${item.color}77` : '0 4px 16px rgba(0,0,0,0.5)',
              cursor: 'pointer',
              transform: isActive ? 'scale(1.1)' : 'scale(1)',
              transition: 'all 0.3s ease',
              opacity: isFiltered ? 0.4 : 1,
              pointerEvents: 'auto'
            }}
          >
            <div style={{ fontWeight: 800, color: item.color, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>{item.year}</span>
              {isActive && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.color, display: 'inline-block' }} />}
            </div>
            <div style={{ fontSize: '11px', color: '#E2E8F0', marginTop: '2px', fontWeight: 500 }}>
              {item.title}
            </div>
          </div>
        </Html>
      </group>
    );
  });
}

// Floating Tricolor Particles Field
function ParticleField() {
  const count = 300;
  const meshRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const saffron = new THREE.Color('#FF9933');
    const white = new THREE.Color('#FFFFFF');
    const green = new THREE.Color('#138808');
    const palette = [saffron, white, green];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.3) * 160;
      pos[i * 3 + 1] = Math.random() * 30 - 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;

      const chosen = palette[i % 3];
      col[i * 3] = chosen.r;
      col[i * 3 + 1] = chosen.g;
      col[i * 3 + 2] = chosen.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.4}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// GSAP Camera Controller
function CameraController({ targetPosition, cameraTarget }) {
  const { camera } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    if (targetPosition) {
      gsap.to(camera.position, {
        x: targetPosition[0],
        y: targetPosition[1],
        z: targetPosition[2],
        duration: 2.2,
        ease: 'power3.inOut'
      });
    }
  }, [targetPosition, camera]);

  return null;
}

export default function Scene({ activeMarker, onMarkerClick, filteredIds }) {
  const activeEvent = useMemo(
    () => timelineData.find((d) => d.id === activeMarker) || timelineData[0],
    [activeMarker]
  );

  const [currentPosition, setCurrentPosition] = useState(activeEvent.position);
  const [cameraTargetPos, setCameraTargetPos] = useState([
    activeEvent.cameraPosition.x,
    activeEvent.cameraPosition.y,
    activeEvent.cameraPosition.z
  ]);

  useEffect(() => {
    if (activeEvent) {
      setCurrentPosition(activeEvent.position);
      setCameraTargetPos([
        activeEvent.cameraPosition.x,
        activeEvent.cameraPosition.y,
        activeEvent.cameraPosition.z
      ]);
    }
  }, [activeEvent]);

  return (
    <Canvas
      camera={{ position: [-35, 12, 35], fov: 48 }}
      style={{ width: '100%', height: '100vh', background: '#080a0f' }}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#080a0f']} />
      <fog attach="fog" args={['#080a0f', 50, 160]} />

      {/* Lighting */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[20, 30, 20]} intensity={1.5} color="#fff8e7" castShadow />
      <pointLight position={[-30, 20, 10]} intensity={1.2} color="#FF9933" />
      <pointLight position={[50, 20, 10]} intensity={1.2} color="#138808" />

      {/* 3D Modi Model */}
      <ModiModel currentPosition={currentPosition} activeEvent={activeEvent} />

      {/* Timeline 3D Curved Ribbon */}
      <TimelinePath activeMarker={activeMarker} />

      {/* Interactive Milestone Nodes */}
      <TimelineMarkers
        onMarkerClick={onMarkerClick}
        activeMarker={activeMarker}
        filteredIds={filteredIds}
      />

      {/* Tricolor Floating Atmospheric Particles */}
      <ParticleField />

      {/* GSAP Smooth Camera Tracking */}
      <CameraController targetPosition={cameraTargetPos} />

      {/* Orbit Controls for Free Look */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={8}
        maxDistance={120}
        maxPolarAngle={Math.PI / 2 + 0.05}
        target={[currentPosition.x, currentPosition.y + 1, currentPosition.z]}
      />

      {/* Subtle Ground Grid */}
      <gridHelper
        args={[220, 80, '#2d3748', '#1a202c']}
        position={[25, -0.5, 0]}
      />
    </Canvas>
  );
}
