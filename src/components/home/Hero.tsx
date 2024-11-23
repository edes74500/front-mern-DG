export function Hero() {
  return (
    <section className="bg-gradient-to-r from-tech-blue to-tech-purple text-white py-16 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Réparation Rapide et Fiable</h2>
        <p className="text-xl md:text-2xl mb-8 md:mb-12">Nous réparons vos appareils électroniques avec expertise</p>
        <button className="bg-tech-pink hover:bg-tech-green transition-colors duration-300 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-full text-base md:text-lg">
          Prendre rendez-vous
        </button>
      </div>
    </section>
  );
}
