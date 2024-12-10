export function Hero() {
  return (
    <section className="py-16 text-white bg-gradient-to-r from-tech-blue to-tech-purple md:py-32">
      <div className="container px-4 mx-auto text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-5xl md:mb-6">Réparation Rapide et Fiable</h2>
        <p className="mb-8 text-xl md:text-2xl md:mb-12">Nous réparons vos appareils électroniques avec expertise</p>
        <button className="px-6 py-3 text-base font-bold text-white transition-colors duration-300 rounded-full bg-tech-pink hover:bg-tech-green md:py-4 md:px-8 md:text-lg">
          Prendre rendez-vous
        </button>
      </div>
    </section>
  );
}
