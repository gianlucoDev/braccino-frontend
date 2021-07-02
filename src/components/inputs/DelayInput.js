import InputContainer from './InputContainer';
import LabelNumberCombo from './LabelNumberCombo';

function DelayInput({ delay, onChange }) {
  return (
    <InputContainer heading="Delay">
      <LabelNumberCombo
        label="Delay"
        min={0}
        value={delay}
        onChange={onChange}
      />
    </InputContainer>
  );
}

export default DelayInput;
