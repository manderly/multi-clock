import { FC, CSSProperties } from 'react';
import { Button } from 'react-bootstrap';

interface INickname {
  text: string;
  onClick: () => void;
  styles: CSSProperties;
}

const Nickname: FC<INickname> = ({ text, onClick, styles }) => {
  return <div>
    <Button 
      type='button' 
      variant="link" 
      size="sm" 
      aria-label="single clock nickname button"
      style={styles} 
      className="clock-nickname-button clickable"
      onClick={onClick}>
        {`${text}`}
      </Button>
  </div>
}

export default Nickname;