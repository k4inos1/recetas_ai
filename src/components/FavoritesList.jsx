import RecipeCard from "./RecipeCard";
import { t, formatCount } from "../utils/translations";

/**
 * Componente para mostrar la lista de recetas favoritas
 * Muestra las recetas guardadas en localStorage y permite eliminarlas
 */
function FavoritesList({ favorites, onRemoveFavorite, uiLanguage = "es" }) {
  // Si no hay favoritos, mostrar mensaje
  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <div className="empty-state">
          <h2>{t("noFavorites", {}, uiLanguage)}</h2>
          <p>{t("noFavoritesDesc", {}, uiLanguage)}</p>
          <p>{t("localStorageInfo", {}, uiLanguage)}</p>
        </div>
      </div>
    );
  }

  const countData = formatCount(favorites.length);

  return (
    <div className="favorites-section">
      <div className="favorites-header">
        <h2>{t("myFavorites", {}, uiLanguage)}</h2>
        <p>{t("favoritesCount", countData, uiLanguage)}</p>
      </div>

      <div className="favorites-grid">
        {favorites.map((recipe) => (
          <div key={recipe.idMeal} className="favorite-item">
            <RecipeCard
              recipe={recipe}
              isFavorite={true}
              onToggleFavorite={() => onRemoveFavorite(recipe.idMeal)}
              uiLanguage={uiLanguage}
            />
          </div>
        ))}
      </div>

      {/* Información adicional sobre el almacenamiento local */}
      <div className="favorites-info">
        <p className="storage-info">{t("storageNote", {}, uiLanguage)}</p>
      </div>
    </div>
  );
}

export default FavoritesList;
