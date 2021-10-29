import React, { useState } from 'react';

const ClockDisplay: React.FC = () => {

  const [timeZone, setTimeZone] = useState();
    return (
      <div className="blue-border clock-container">
        Clock goes here
      </div>
    )
}

export default ClockDisplay;