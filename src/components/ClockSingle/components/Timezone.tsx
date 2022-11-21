import { FC, CSSProperties } from 'react';
import { Button } from 'react-bootstrap';

interface ITimezone {
  text: string;
  onClick: () => void;
  styles: CSSProperties;
}

const Timezone: FC<ITimezone> = ({ text, onClick, styles }) => {
  return <Button
      type='button' 
      variant="link" 
      size="sm" 
      aria-label="clock nickname display" 
      style={styles} 
      className="clock-link-timezone clickable" 
      onClick={onClick}>
        {text}
      </Button>
}

export default Timezone;
