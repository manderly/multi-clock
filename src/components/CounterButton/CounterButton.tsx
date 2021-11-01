import { FC } from 'react';
import { Button } from 'react-bootstrap';

interface ICounterButton {
  label: string;
  onClickMethod: () => void;
}

const CounterButton: FC<ICounterButton> = ({label, onClickMethod}) => {

  return (
    <Button className="red-btn" variant="primary" size="lg" onClick={onClickMethod}>{label}</Button>
  );
}

export default CounterButton;