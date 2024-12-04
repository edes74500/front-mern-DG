const DashboardWelcomePage = () => {
  // Simuler des données dynamiques (statistiques sur les notes)
  const userName = "John Doe"; // Récupéré via un contexte ou une API
  const stats = {
    active: 15,
    completed: 8,
    archived: 5,
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 gap-y-8">
      {/* Titre de bienvenue */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">Bienvenue, {userName}!</h1>
        <p className="mt-2 text-lg text-gray-600">Voici un aperçu rapide de vos notes.</p>
      </div>

      {/* Section des statistiques */}
      <div className="grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="p-6 text-center bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">{stats.active}</h2>
          <p className="text-gray-500">Notes actives</p>
        </div>
        <div className="p-6 text-center bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">{stats.completed}</h2>
          <p className="text-gray-500">Notes complétées</p>
        </div>
        <div className="p-6 text-center bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">{stats.archived}</h2>
          <p className="text-gray-500">Notes archivées</p>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="flex flex-wrap justify-center gap-4">
        <button
          className="px-6 py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => console.log("Afficher les notes actives")}
        >
          Voir les notes actives
        </button>
        <button
          className="px-6 py-3 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          onClick={() => console.log("Afficher les notes complétées")}
        >
          Voir les notes complétées
        </button>
        <button
          className="px-6 py-3 font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={() => console.log("Afficher les notes archivées")}
        >
          Voir les notes archivées
        </button>
      </div>
    </div>
  );
};

export default DashboardWelcomePage;
