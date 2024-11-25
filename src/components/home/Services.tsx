import { Laptop, Smartphone, Tablet } from "lucide-react";
import { ServiceCard } from "./Service-Card";

export function Services() {
  return (
    <section id="services" className="relative py-16 overflow-hidden bg-transparent max-w-1400 md:py-24">
      {/* <AnimatedGradient /> */}
      <div className="container px-4 mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center md:text-4xl md:mb-16 text-tech-blue">Nos Services</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
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
