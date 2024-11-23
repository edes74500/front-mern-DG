import React from "react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
      <div className="flex justify-center mb-4 md:mb-6">{icon}</div>
      <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4 text-[#007AFF]">{title}</h3>
      <p className="text-sm md:text-base text-gray-600">{description}</p>
    </div>
  );
}
