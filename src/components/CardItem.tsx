import React, { ReactNode } from 'react'

interface CardItemProps {
  children?: ReactNode;
  className?: string;
  tile: string;
  description: string;
}

const CardItem: React.FC<CardItemProps> = ({children, className, tile, description}) => {
  return (
    <div className={`flex flex-col gap-2 justify-center items-center text-gray-600 ${className}`}>
      <h2 className="text-[14px] self-start">{tile}</h2>
      {children}
      <span className="text-[14px] self-start">{description}</span>
    </div>
  )
}

export default CardItem