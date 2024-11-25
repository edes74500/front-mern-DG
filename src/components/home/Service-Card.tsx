import React from "react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="z-10 p-6 transition-all duration-300 bg-white rounded-lg shadow-lg md:p-8 hover:shadow-2xl hover:scale-105">
      <div className="flex justify-center mb-4 md:mb-6">{icon}</div>
      <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4 text-[#007AFF]">{title}</h3>
      <p className="text-sm text-gray-600 md:text-base">{description}</p>
    </div>
  );
}
