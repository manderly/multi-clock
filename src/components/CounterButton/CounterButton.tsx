import { FC } from 'react';
import { Button } from 'react-bootstrap';

interface ICounterButton {
  label: string;
  onClickMethod: () => void;
}

const CounterButton: FC<ICounterButton> = ({label, onClickMethod}) => {

  return (
    <Button className="red-btn" variant="outline-primary" onClick={onClickMethod}>{label}</Button>
  );
}

export default CounterButton;