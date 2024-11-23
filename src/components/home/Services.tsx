import { Smartphone, Laptop, Tablet } from "lucide-react";
import { ServiceCard } from "../Service-Card";

export function Services() {
  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-16 text-center text-tech-blue">Nos Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <ServiceCard
            icon={<Smartphone className="w-12 h-12 md:w-16 md:h-16 text-tech-purple" />}
            title="Réparation de smartphones"
            description="Réparation d'écrans, batteries, et plus encore pour tous les modèles."
          />
          <ServiceCard
            icon={<Laptop className="w-12 h-12 md:w-16 md:h-16 text-tech-green" />}
            title="Réparation d'ordinateurs"
            description="Dépannage matériel et logiciel pour PC et Mac."
          />
          <ServiceCard
            icon={<Tablet className="w-12 h-12 md:w-16 md:h-16 text-tech-pink" />}
            title="Réparation de tablettes"
            description="Service de réparation pour tous types de tablettes."
          />
        </div>
      </div>
    </section>
  );
}
