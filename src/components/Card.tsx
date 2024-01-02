import React, { ReactNode } from 'react'

interface CardProps {
  children?: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({children, className}) => {
  return (
    <div className={`p-6 flex gap-10 rounded-lg shadow-md text-black bg-white ${className}`}>
      {children}
    </div>
  )
}

export default Card