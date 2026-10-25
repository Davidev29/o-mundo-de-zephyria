import React from "react";

interface TouchControlsProps {
  onAction: (action: string, pressed: boolean) => void;
}

export const TouchControls: React.FC<TouchControlsProps> = ({ onAction }) => {
  const btn = (label: string, action: string) => (
    <button
      style={{
        width: 64,
        height: 64,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.3)",
        border: "none",
        color: "#fff",
        fontSize: 24,
        margin: 8,
      }}
      onTouchStart={() => onAction(action, true)}
      onTouchEnd={() => onAction(action, false)}
      onMouseDown={() => onAction(action, true)}
      onMouseUp={() => onAction(action, false)}
    >
      {label}
    </button>
  );

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, display: "flex", flexWrap: "wrap", width: 160 }}>
      {btn("↑", "moveForward")}
      {btn("↓", "moveBackward")}
      {btn("←", "moveLeft")}
      {btn("→", "moveRight")}
      {btn("✕", "jump")}
      {btn("◯", "attack")}
    </div>
  );
};
