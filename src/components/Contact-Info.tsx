import React from "react";

interface ContactInfoProps {
  icon: React.ReactNode;
  info: string;
}

export function ContactInfo({ icon, info }: ContactInfoProps) {
  return (
    <div className="flex items-center space-x-3 md:space-x-4 bg-white p-3 md:p-4 rounded-lg transition-all duration-300 hover:shadow-lg">
      <div>{icon}</div>
      <p className="text-base md:text-lg text-gray-700">{info}</p>
    </div>
  );
}
