import { FC, CSSProperties } from 'react';
import { Button } from 'react-bootstrap';

interface ITimezone {
  text: string;
  onClick: () => void;
  styles: CSSProperties;
}

const Timezone: FC<ITimezone> = ({ text, onClick, styles }) => {
  return <div>
    <Button 
      type='button' 
      variant="link" 
      size="sm" 
      aria-label="clock nickname display" 
      style={styles} 
      className="clock-link-timezone" 
      onClick={onClick}>
        {text}
      </Button>
  </div>
}

export default Timezone;
