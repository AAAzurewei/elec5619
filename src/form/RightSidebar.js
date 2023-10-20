import React, { useState } from 'react';
import './style.css'

function RightSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
    <div>
      
    </div></div>
  );
}

export default RightSidebar;