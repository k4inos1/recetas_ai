import RecipeCard from "./RecipeCard"

function FavoritesList({ favorites, onRemoveFavorite, onToggleFavorite, isFavorite }) {
  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <div className="empty-state">
          <h2>No tienes recetas favoritas</h2>
          <p>¡Busca recetas y guárdalas para verlas aquí!</p>
          <p>Tus favoritos se guardan en tu navegador</p>
        </div>
      </div>
    )
  }

  return (
    <div className="favorites-section">
      <div className="favorites-header">
        <h2>Mis Favoritos</h2>
        <p>
          Tienes {favorites.length} receta{favorites.length !== 1 ? "s" : ""} guardada
          {favorites.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="favorites-grid">
        {favorites.map((recipe) => (
          <div key={recipe.idMeal} className="favorite-item">
            <RecipeCard
              recipe={recipe}
              isFavorite={isFavorite(recipe.idMeal)}
              onToggleFavorite={() => onToggleFavorite(recipe)}
            />
          </div>
        ))}
      </div>

      <div className="favorites-info">
        <p className="storage-info">Nota: Tus recetas favoritas se guardan localmente en tu navegador</p>
      </div>
    </div>
  )
}

export default FavoritesList
