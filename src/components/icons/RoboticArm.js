import SvgIcon from '@material-ui/core/SvgIcon';

import { ReactComponent as RoboticArmSvg } from 'icons/robotic_arm_black_24dp.svg';

function RoboticArm({ ...props }) {
  return <SvgIcon {...props} component={RoboticArmSvg} />;
}

export default RoboticArm;
