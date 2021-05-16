export const JOINTS = {
  base: {
    name: 'Base',
    min: 0,
    max: 180,
    default: 90,
  },
  shoulder: {
    name: 'Shoulder',
    min: 15,
    max: 165,
    default: 45,
  },
  elbow: {
    name: 'Elbow',
    min: 0,
    max: 180,
    default: 180,
  },
  wrist_ver: {
    name: 'Wrist_ver',
    min: 0,
    max: 180,
    default: 180,
  },
  wrist_rot: {
    name: 'Wrist_rot',
    min: 0,
    max: 180,
    default: 90,
  },
  gripper: {
    name: 'Gripper',
    min: 10,
    max: 73,
    default: 10,
  },
};

/*
{
  base: 90,
  shoulder: 45,
  ...
}
*/
export const DEFAULT_JOINT_POSITIONS = Object.fromEntries(
  Object.entries(JOINTS).map(([key, joint]) => [key, joint.default])
);
