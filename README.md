## Tâches à Réaliser

### Gestion des Notes

- [ ] Ajouter l'édition pour les notes
- [x] Ajouter le delete pour les notes
- [x] Ajouter la single page pour les notes
- [ ] Ajouter la possibilité de claim pour les notes
- [ ] Ajouter l'assignement pour les notes
- [ ] Modifier la recherche pour les notes pour les trier par status dans le backend

### Backend

- [ ] Fixer le tri par role dans le backend
- [ ] Ajouter une route pour récupérer chaque note par user dans le contrôleur de note avec `populate`

### Gestion des Utilisateurs

- [ ] Ajouter un menu déroulant dans le panel utilisateur pour afficher certains roles uniquement
- [x] Retirer l'entity pour les users
- [ ] Voir les notes assignées dans le menu utilisateur
- [ ] Ajouter une barre de recherche pour les utilisateurs avec un nouveau controller

### Validation et Zod

- [ ] Comprendre les erreurs
- [x] Créer une erreur personnalisée pour Zod
- [x] Créer un middleware pour afficher les erreurs Zod (non nécessaire mais logique ajustée)
- [x] Déplacer la logique des logs pour ignorer les erreurs Zod
- [ ] Ajouter toute la logique de validation avec Zod
- [ ] Redéfinir les types de toutes les requêtes en fonction de Zod

### Documentation

- [ ] Voir comment passer de Zod à Swagger

### Shared Module

- [ ] Comprendre pourquoi les imports `@shared` bug (résolution à ajouter dans `tsconfig` avec
      [tsc-alias](https://www.npmjs.com/package/tsc-alias))
- [ ] Régler le `tsconfig` du front pour accéder au dossier `shared`
- [ ] Passer le dossier `shared` en composant téléchargeable

### Frontend

- [ ] Fixer le push sur Netlify et ajouter la clé d'environnement
- [ ] Ajouter Zod pour valider les schémas avec `react-hook-form`
- [ ] Ajouter une validation par une route avec debounce et éviter le submit

### Authentification

- [x] Faire le logout
- [x] Implémenter le limitateur de connexions maximales
- [ ] Créer les routes avec RTK Query
- [ ] Comprendre l'utilité de l'access token en frontend
- [ ] Comprendre les routes en frontend
- [x] Comprendre le middleware qui check l'access token en backend (amélioration avec `req`)
- [ ] Comprendre comment RTK Query effectue un fetch automatique pour un nouveau access/refresh token si le middleware
      renvoie une réponse `forbidden`
