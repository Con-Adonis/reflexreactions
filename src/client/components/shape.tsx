import React from 'react';
import { ShapeType, ColorType } from '../global';

interface ShapeProps {
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

const Shape: React.FC<ShapeProps> = ({ shape, color, onClick, level }) => {
  let shapeClasses = 'absolute w-20 h-20 md:w-24 md:h-24 cursor-pointer transition-transform duration-200 hover:!scale-110'; // Use !important to override animation

  if (shape === 'circle') shapeClasses += ' rounded-full';
  else if (shape === 'triangle') shapeClasses += ' w-0 h-0 bg-transparent border-l-[50px] border-r-[50px] border-b-[100px] border-l-transparent border-r-transparent';

  shapeClasses += ` ${colorClasses[color]}`;

  const speed = level >= 15 ? Math.max(2, 20 - Math.floor(level / 2.5)) : 20;
  const style = {
    top: `${Math.random() * 80 + 10}%`,
    left: `${Math.random() * 80 + 10}%`,
    animation: `float ${speed}s ease-in-out infinite`,
    animationDelay: `${Math.random() * 4}s`,
  };

  return <div className={shapeClasses} style={style} onClick={() => onClick(shape, color)} />;
};

export default Shape;
