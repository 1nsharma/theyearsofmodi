import { timelineData } from './timelineData';

export const getDefaultCameraPosition = () => ({
  position: [-10, 18, 50],
  target: [10, 2, 0],
  fov: 48
});

export const getCameraPositionForMarker = (marker) => {
  if (!marker) return getDefaultCameraPosition();
  
  return {
    position: [
      marker.cameraPosition?.x ?? marker.position.x,
      marker.cameraPosition?.y ?? (marker.position.y + 10),
      marker.cameraPosition?.z ?? (marker.position.z + 25)
    ],
    target: [marker.position.x, marker.position.y + 1.5, marker.position.z],
    fov: 45
  };
};

export const cameraPresets = {
  overview: {
    position: [25, 45, 110],
    target: [25, 5, 0],
    fov: 55
  },
  modelFocus: {
    position: [0, 8, 18],
    target: [0, 2, 0],
    fov: 40
  },
  cinematicSide: {
    position: [55, 20, 45],
    target: [30, 4, 10],
    fov: 48
  }
};

export default {
  getDefaultCameraPosition,
  getCameraPositionForMarker,
  cameraPresets
};
