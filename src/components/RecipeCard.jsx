"use client"

import { useState } from "react"

/**
 * COMPONENTE TARJETA DE RECETA MEJORADO
 *
 * Funcionalidad: Muestra información de una receta individual
 * con diseño moderno y animaciones suaves.
 */
function RecipeCard({ recipe, isFavorite, onToggleFavorite }) {
  // Estados para controlar la interfaz
  const [isExpanded, setIsExpanded] = useState(false)
  const [showIngredients, setShowIngredients] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  /**
   * Extrae ingredientes y medidas del objeto receta
   */
  const getIngredients = (recipeData) => {
    const ingredients = []
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipeData[`strIngredient${i}`]
      const measure = recipeData[`strMeasure${i}`]
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : "",
        })
      }
    }
    return ingredients
  }

  /**
   * Alterna la vista expandida
   */
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  /**
   * Maneja clic en favorito con animación
   */
  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    onToggleFavorite()

    // Crear efecto de corazones flotantes
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()

    for (let i = 0; i < 6; i++) {
      const heart = document.createElement("div")
      heart.innerHTML = "💖"
      heart.className = "floating-heart"
      heart.style.left = rect.left + rect.width / 2 + "px"
      heart.style.top = rect.top + rect.height / 2 + "px"
      heart.style.animationDelay = `${i * 0.1}s`
      document.body.appendChild(heart)

      setTimeout(() => {
        if (document.body.contains(heart)) {
          document.body.removeChild(heart)
        }
      }, 2000)
    }
  }

  const ingredients = getIngredients(recipe)

  return (
    <article className={`recipe-card ${isExpanded ? "expanded" : ""}`}>
      {/* IMAGEN CON EFECTOS MEJORADOS */}
      <div className="recipe-image-container" onClick={toggleExpanded}>
        <div className={`image-placeholder ${imageLoaded ? "loaded" : ""}`}>
          <div className="placeholder-icon">🍽️</div>
        </div>
        <img
          src={recipe.strMealThumb || "/placeholder.svg?height=200&width=300"}
          alt={`Imagen de ${recipe.strMeal}`}
          className={`recipe-image ${imageLoaded ? "loaded" : ""}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />

        {/* OVERLAY CON GRADIENTE */}
        <div className="image-overlay">
          <div className="overlay-content">
            <div className="recipe-badges">
              <span className="category-badge">
                <span className="badge-icon">🏷️</span>
                {recipe.strCategory}
              </span>
              <span className="area-badge">
                <span className="badge-icon">🌍</span>
                {recipe.strArea}
              </span>
            </div>
          </div>
        </div>

        {/* BOTÓN DE FAVORITO MEJORADO */}
        <button
          className={`favorite-button ${isFavorite ? "favorited" : ""}`}
          onClick={handleFavoriteClick}
          title={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          <div className="favorite-icon">{isFavorite ? "❤️" : "🤍"}</div>
          <div className="favorite-ripple"></div>
        </button>

        {/* INDICADOR DE EXPANSIÓN */}
        <div className="expand-indicator">
          <span>{isExpanded ? "🔼" : "🔽"}</span>
        </div>
      </div>

      {/* CONTENIDO DE LA TARJETA */}
      <div className="recipe-content">
        {/* TÍTULO CON ANIMACIÓN */}
        <div className="recipe-header">
          <h3 className="recipe-title">{recipe.strMeal}</h3>
          <div className="title-underline"></div>
        </div>

        {/* DESCRIPCIÓN CON FADE */}
        <div className="recipe-description">
          <p className={`instructions ${isExpanded ? "expanded" : ""}`}>
            {isExpanded ? recipe.strInstructions : `${recipe.strInstructions.substring(0, 120)}...`}
          </p>

          <button className="expand-button" onClick={toggleExpanded}>
            <span className="expand-text">{isExpanded ? "Ver menos" : "Ver receta completa"}</span>
            <span className="expand-icon">{isExpanded ? "🔼" : "🔽"}</span>
          </button>
        </div>

        {/* SECCIÓN DE INGREDIENTES MEJORADA */}
        {isExpanded && (
          <div className="ingredients-section">
            <div className="ingredients-header">
              <h4>
                <span className="ingredients-icon">📋</span>
                Ingredientes ({ingredients.length})
              </h4>
              <button className="toggle-ingredients" onClick={() => setShowIngredients(!showIngredients)}>
                <span>{showIngredients ? "Ocultar" : "Mostrar"}</span>
                <span className="toggle-icon">{showIngredients ? "👁️‍🗨️" : "👁️"}</span>
              </button>
            </div>

            {showIngredients && (
              <div className="ingredients-container">
                <div className="ingredients-grid">
                  {ingredients.map((item, index) => (
                    <div key={index} className="ingredient-item" style={{ animationDelay: `${index * 0.05}s` }}>
                      <div className="ingredient-measure">{item.measure}</div>
                      <div className="ingredient-name">{item.ingredient}</div>
                      <div className="ingredient-separator"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ESTADÍSTICAS MEJORADAS */}
        <div className="recipe-stats">
          <div className="stat-item">
            <div className="stat-icon">🌍</div>
            <div className="stat-content">
              <span className="stat-label">Origen</span>
              <span className="stat-value">{recipe.strArea}</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">🍽️</div>
            <div className="stat-content">
              <span className="stat-label">Categoría</span>
              <span className="stat-value">{recipe.strCategory}</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <span className="stat-label">Ingredientes</span>
              <span className="stat-value">{ingredients.length}</span>
            </div>
          </div>
        </div>

        {/* ENLACE A VIDEO MEJORADO */}
        {recipe.strYoutube && (
          <div className="recipe-actions">
            <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer" className="youtube-link">
              <span className="youtube-icon">📺</span>
              <span>Ver en YouTube</span>
              <span className="external-icon">↗</span>
            </a>
          </div>
        )}
      </div>
    </article>
  )
}

export default RecipeCard
