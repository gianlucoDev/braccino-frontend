export const JOINTS = {
  m1: {
    min: 0,
    max: 180,
    default: 90,
  },
  m2: {
    min: 15,
    max: 165,
    default: 45,
  },
  m3: {
    min: 0,
    max: 180,
    default: 180,
  },
  m4: {
    min: 0,
    max: 180,
    default: 180,
  },
  m5: {
    min: 0,
    max: 180,
    default: 90,
  },
  m6: {
    min: 10,
    max: 73,
    default: 10,
  },
};

/*
{
    m1: 90,
    m2: 45,
    ...
}
*/
export const DEFAULT_JOINT_VALUES = Object.fromEntries(
  Object.entries(JOINTS).map(([key, joint]) => [key, joint.default])
);
