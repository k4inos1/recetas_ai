import { useState, useEffect } from "react";
// Traducción eliminada
import { t } from "../utils/translations";

/**
 * Componente que muestra una tarjeta de receta individual.
 * Es interactivo, permitiendo expandir detalles, ver ingredientes y traducir.
 * @param {object} props - Propiedades del componente.
 * @param {object} props.recipe - El objeto de la receta a mostrar.
 * @param {boolean} props.isFavorite - Indica si la receta es favorita.
 * @param {function} props.onToggleFavorite - Función para añadir/eliminar de favoritos.
 * @param {string} props.uiLanguage - Idioma actual de la UI.
 */
function RecipeCard({
  recipe,
  isFavorite,
  onToggleFavorite,
  uiLanguage = "es",
}) {
  // --- ESTADOS ---
  // Almacena la receta actual.
  const [currentRecipe, setCurrentRecipe] = useState(recipe);
  // Controla si la tarjeta está expandida para mostrar detalles.
  const [isExpanded, setIsExpanded] = useState(false);
  // Controla la visibilidad de la lista de ingredientes.
  const [showIngredients, setShowIngredients] = useState(false);

  // --- EFECTOS ---
  // Sincroniza la receta actual si la prop 'recipe' cambia.
  useEffect(() => {
    setCurrentRecipe(recipe);
  }, [recipe]);

  // --- MANEJADORES DE EVENTOS Y FUNCIONES ---

  /**
   * Alterna la vista expandida de la tarjeta.
   */
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  /**
   * Extrae y formatea la lista de ingredientes y sus medidas desde el objeto de la receta.
   * @param {object} recipeData - La receta de la cual extraer los ingredientes.
   * @returns {Array<object>} - Un array de objetos, cada uno con 'ingredient' y 'measure'.
   */
  const getIngredients = (recipeData) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipeData[`strIngredient${i}`];
      const measure = recipeData[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : "",
        });
      }
    }
    return ingredients;
  };

  // --- RENDERIZADO ---
  const ingredients = getIngredients(currentRecipe);

  return (
    <div className={`recipe-card-enhanced ${isExpanded ? "expanded" : ""}`}>
      <div className="recipe-image-container-enhanced">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="recipe-image-enhanced"
          onClick={toggleExpanded}
        />
        <button
          className={`favorite-button-enhanced ${
            isFavorite ? "favorited" : ""
          }`}
          onClick={onToggleFavorite}
          title={
            isFavorite
              ? t("removeFromFavorites", {}, uiLanguage)
              : t("addToFavorites", {}, uiLanguage)
          }
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
        <div className="recipe-overlay">
          <div className="recipe-badges">
            <span className="category-badge">{currentRecipe.strCategory}</span>
            <span className="area-badge">{currentRecipe.strArea}</span>
          </div>
        </div>
      </div>
      <div className="recipe-content-enhanced">
        <div className="recipe-header-enhanced">
          <h3 className="recipe-title-enhanced">{currentRecipe.strMeal}</h3>
        </div>
        <div className="recipe-description-enhanced">
          <p className={`instructions ${isExpanded ? "expanded" : ""}`}>
            {isExpanded
              ? currentRecipe.strInstructions
              : currentRecipe.strInstructions.substring(0, 200) + "..."}
          </p>
          <button className="expand-button" onClick={toggleExpanded}>
            {isExpanded ? "Ver menos 🔼" : "Ver receta completa 🔽"}
          </button>
        </div>
        {isExpanded && (
          <div className="ingredients-section">
            <div className="ingredients-header">
              <h4>📋 Ingredientes ({ingredients.length})</h4>
              <button
                className="toggle-ingredients"
                onClick={() => setShowIngredients(!showIngredients)}
              >
                {showIngredients ? "Ocultar 👁️‍🗨️" : "Mostrar 👁️"}
              </button>
            </div>
            {showIngredients && (
              <div className="ingredients-list">
                {ingredients.map((item, index) => (
                  <div key={index} className="ingredient-item">
                    <span className="measure">{item.measure}</span>
                    <span className="ingredient">{item.ingredient}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="translation-controls-enhanced">
          {/* Traducción eliminada */}
        </div>
        <div className="recipe-stats">
          <div className="stat-item">
            <span className="stat-icon">👨‍🍳</span>
            <span className="stat-label">Origen</span>
            <span className="stat-value">{currentRecipe.strArea}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🍽️</span>
            <span className="stat-label">Categoría</span>
            <span className="stat-value">{currentRecipe.strCategory}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">📊</span>
            <span className="stat-label">Ingredientes</span>
            <span className="stat-value">{ingredients.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
