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
  // This state holds the target coordinates for the shape.
  const [position, setPosition] = useState({
    top: `${Math.random() * 80 + 10}%`,
    left: `${Math.random() * 80 + 10}%`,
    transform: `rotate(${Math.random() * 360}deg)`,
  });

  // This effect updates the shape's target position at a regular interval.
  useEffect(() => {
    // The *frequency* of movement increases with the level (interval gets shorter).
    // This value is set to be slightly longer than the CSS transition duration below
    // to allow one animation to finish before the next one begins.
    const moveFrequency = Math.max(1600, 3000 - level * 50); // Cap at 1.6s frequency

    const intervalId = setInterval(() => {
      setPosition({
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`,
        transform: `rotate(${Math.random() * 360}deg)`,
      });
    }, moveFrequency);

    // Clean up the interval when the component unmounts or the level changes.
    return () => clearInterval(intervalId);
  }, [id, level]); // Re-calculate the interval when the level changes.

  // --- THE KEY FIX IS HERE ---
  // The transition is defined directly in the className with a fixed duration.
  // This is stable and allows the browser to optimize the animation.
  let shapeClasses = `absolute w-20 h-20 md:w-24 md:h-24 cursor-pointer hover:!scale-110 
                      transition-all ease-linear duration-[1500ms]`; // A fixed 1.5-second transition

  if (shape === 'circle') {
    shapeClasses += ' rounded-full';
  } else if (shape === 'triangle') {
    shapeClasses += ' w-0 h-0 bg-transparent border-l-[50px] border-r-[50px] border-b-[100px] border-l-transparent border-r-transparent';
  }
  shapeClasses += ` ${colorClasses[color]}`;

  return (
    <div
      className={shapeClasses}
      style={position} // The style ONLY contains the target position, not the changing transition property.
      onClick={() => onClick(shape, color)}
    />
  );
};

export default Shape;
