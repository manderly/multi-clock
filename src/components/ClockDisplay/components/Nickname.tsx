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
      aria-label="clock nickname display" 
      style={styles} 
      className="clock-link-nickname clickable" 
      onClick={onClick}>
        {`${text}`}
      </Button>
  </div>
}

export default Nickname;