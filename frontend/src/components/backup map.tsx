import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { useTheme } from '@mui/material/styles';

interface Props {
  coordinates: [number, number]; // [lat, lng]
  zoom: number;
}

interface PointData {
  lat: number;
  lng: number;
  size?: number;
  color?: string;
}

const Map = ({ coordinates, zoom }: Props): JSX.Element => {
  const theme = useTheme();
  const globeRef = useRef<any>();
  const containerRef = useRef<HTMLDivElement>(null); // Container reference
  const [pointData, setPointData] = useState<PointData[]>([]);
  const [pointColor, setPointColor] = useState<string>('');
  const [pointSize, setPointSize] = useState(0.4); // State for animated point size
  const [globeSize, setGlobeSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setPointData([
      {
        lat: coordinates[0],
        lng: coordinates[1],
        size: 0.5,
      },
    ]);

    setPointColor(
      theme.palette.mode === 'dark'
        ? theme.palette.primary.main
        : theme.palette.success.dark
    );
  }, [coordinates, theme.palette]);

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setGlobeSize({ width: offsetWidth, height: offsetHeight });
    }
  }, []); // Runs once when the component is mounted to get the container's size

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView(
        {
          lat: coordinates[0],
          lng: coordinates[1],
          altitude: zoom / 10,
        },
        1500
      );
      
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
    }
  }, [coordinates, zoom]);

  // Pulsing point animation using state
  useEffect(() => {
    let animationFrameId: number;
    let pulseDirection = 1;

    const animatePoint = () => {
      setPointSize(prevSize => {
        const newSize = prevSize + 0.01 * pulseDirection;
        if (newSize > 0.6) pulseDirection = -1;
        if (newSize < 0.4) pulseDirection = 1;
        return newSize;
      });
      animationFrameId = requestAnimationFrame(animatePoint);
    };

    animatePoint();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef} // Attach the ref to the container div
      style={{
        height: '100vh', // Use full viewport height
        width: '100%', // Ensure it takes full width
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden', // Ensure nothing overflows outside the container
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: `${globeSize.width}px`, // Use dynamic width
          height: `${globeSize.height}px`, // Use dynamic height
        }}
      >
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          pointsData={pointData}
          pointLat={(d) => (d as PointData).lat}
          pointLng={(d) => (d as PointData).lng}
          pointColor={() => pointColor}
          pointAltitude={() => 0.01}
          pointRadius={() => pointSize} // Use animated size here
          width={globeSize.width} // Set the width to the calculated value as number
          height={globeSize.height} // Set the height to the calculated value as number
          onGlobeReady={() => {
            if (globeRef.current) {
              globeRef.current.controls().autoRotate = true;
              globeRef.current.controls().autoRotateSpeed = 0.5;
            }
          }}
          onGlobeClick={() => {
            if (globeRef.current) {
              globeRef.current.controls().autoRotate = 
                !globeRef.current.controls().autoRotate;
            }
          }}
        />
      </div>
    </div>
  );
};

export default Map;
