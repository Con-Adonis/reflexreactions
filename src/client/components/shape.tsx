import React, { useState, useEffect } from 'react';
import { ShapeType, ColorType } from '../global';

interface ShapeProps {
  id: string;
  shape: ShapeType;
  color: ColorType;
  onClick: (shape: ShapeType, color: ColorType) => void;
  level: number;
}

const colorClasses: Record<ColorType, string> = {
  red: 'border-red-500 bg-red-500',
  green: 'border-green-500 bg-green-500',
  blue: 'border-blue-500 bg-blue-500',
};

const Shape: React.FC<ShapeProps> = ({ id, shape, color, onClick, level }) => {
  const [position, setPosition] = useState({
    top: `${Math.random() * 80 + 10}%`,
    left: `${Math.random() * 80 + 10}%`,
    transform: `rotate(${Math.random() * 360}deg)`,
  });

  // BUG FIX: Calculate the movement speed safely
  const moveInterval = Math.max(500, 3000 - (level * 25)); // Ensures interval is never less than 500ms

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPosition({
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`,
        transform: `rotate(${Math.random() * 360}deg)`,
      });
    }, moveInterval);

    return () => clearInterval(intervalId);
  }, [id, moveInterval]); // Depend on moveInterval so it adapts if needed

  // BUG FIX: Create a dynamic style for the transition to ensure it's always smooth
  const dynamicStyle = {
    ...position,
    transition: `all ${moveInterval}ms ease-in-out`,
  };

  // Base classes no longer need the hardcoded duration
  let shapeClasses = 'absolute w-20 h-20 md:w-24 md:h-24 cursor-pointer hover:!scale-110';

  if (shape === 'circle') {
    shapeClasses += ' rounded-full';
  } else if (shape === 'triangle') {
    shapeClasses += ' w-0 h-0 bg-transparent border-l-[50px] border-r-[50px] border-b-[100px] border-l-transparent border-r-transparent';
  }
  shapeClasses += ` ${colorClasses[color]}`;

  return (
    <div
      className={shapeClasses}
      style={dynamicStyle} // Use the new dynamic style object
      onClick={() => onClick(shape, color)}
    />
  );
};

export default Shape;