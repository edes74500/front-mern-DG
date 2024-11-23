import { Phone, Clock, MapPin } from "lucide-react";
import { ContactInfo } from "../Contact-Info";

export function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-16 text-center text-tech-blue">Contactez-nous</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div className="space-y-6 md:space-y-8">
            <ContactInfo icon={<Phone className="w-6 h-6 md:w-8 md:h-8 text-tech-green" />} info="01 23 45 67 89" />
            <ContactInfo
              icon={<Clock className="w-6 h-6 md:w-8 md:h-8 text-tech-purple" />}
              info="Lun-Ven: 9h-18h, Sam: 10h-16h"
            />
            <ContactInfo
              icon={<MapPin className="w-6 h-6 md:w-8 md:h-8 text-tech-pink" />}
              info="123 Rue de la Réparation, 75000 Paris"
            />
          </div>
          <form className="space-y-4 md:space-y-6 bg-white p-6 md:p-8 rounded-lg">
            <input
              type="text"
              placeholder="Nom"
              className="w-full px-3 py-2 border border-tech-blue rounded-md focus:outline-none focus:ring-2 focus:ring-tech-purple"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border border-tech-blue rounded-md focus:outline-none focus:ring-2 focus:ring-tech-purple"
            />
            <input
              type="tel"
              placeholder="Téléphone"
              className="w-full px-3 py-2 border border-tech-blue rounded-md focus:outline-none focus:ring-2 focus:ring-tech-purple"
            />
            <textarea
              placeholder="Message"
              className="w-full px-3 py-2 border border-tech-blue rounded-md focus:outline-none focus:ring-2 focus:ring-tech-purple min-h-[100px] resize-none"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-tech-green hover:bg-tech-blue transition-colors duration-300 text-white font-bold py-2 md:py-3 rounded-lg text-base md:text-lg"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
