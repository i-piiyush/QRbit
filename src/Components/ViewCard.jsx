import React from 'react';
import RenderSelectedCard from './RenderSelectedCard';

const ViewCard = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 bg-zinc-900">
      <div className="w-[380px] ">
        <RenderSelectedCard />
      </div>
    </div>
  );
};

export default ViewCard;