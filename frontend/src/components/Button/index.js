import React from 'react'

export default function Button({ variant, large, label, fullWidth, onClick, disabled, type }) {
    // Variant could be "Primary", "Secondary", "Outline"

    function getStyle() {

    }
  return (
    // <input type="button" className={variant} value="Click me" />
    <input type="button" style={variant === "Primary" ? {backgroundColor: "red"}} value="Click me" />
  )
}
