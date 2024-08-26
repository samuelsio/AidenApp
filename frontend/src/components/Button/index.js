import React from 'react';
import './Button.scss';

export default function Button({ variant, large, label, fullWidth, onClick, disabled, type, small }) {
    // Variant could be "Primary", "Secondary", "Outline"

    const btnClassName = [
      'btnBaseStyle',
      variant,
      fullWidth,
      large,
      small,
  ].join(' ');


  return (
    // <input type="button" className={variant} value="Click me" />
    <input type={type} className={btnClassName} value={label} onClick={onClick} disabled={disabled}/>
  )
}
