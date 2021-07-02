import InputContainer from './InputContainer';
import LabelSliderNumberCombo from './LabelSliderNumberCombo';

function SpeedInput({ speed, onChange }) {
  return (
    <InputContainer heading="Velocità">
      <LabelSliderNumberCombo
        label="Velocità"
        min={10}
        max={30}
        value={speed}
        onChange={onChange}
      />
    </InputContainer>
  );
}

export default SpeedInput;
