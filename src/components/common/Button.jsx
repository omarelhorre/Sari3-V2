import React from 'react';

const Button = ({ children, onClick, type = 'button', style = {}, ...props }) => {
  const defaultStyle = {
    backgroundColor: '#4CAF50',
    color: '#ffffff',
    padding: '10px 30px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    ...style
  };

  return (
    <button type={type} onClick={onClick} style={defaultStyle} {...props}>
      {children}
    </button>
  );
};

export default Button;

