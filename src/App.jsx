import { useState, useEffect } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm";
import RecipeCard from "./components/RecipeCard";
import FavoritesList from "./components/FavoritesList";
import FoodParticles from "./components/FoodParticles";
import { t } from "./utils/translations";

/** 
 * Componente principal de la aplicación de recetas.
 * Orquesta todos los demás componentes y gestiona el estado global,
 * incluyendo la lista de recetas, favoritos, y el estado de la UI.
 */
function App() {
  // --- ESTADOS ---
  // Almacena las recetas obtenidas de la búsqueda en la API.
  const [recipes, setRecipes] = useState([]);
  // Almacena las recetas favoritas del usuario, persistidas en localStorage.
  const [favorites, setFavorites] = useState([]);
  // Controla si se muestra el indicador de carga durante las peticiones a la API.
  const [loading, setLoading] = useState(false);
  // Guarda mensajes de error para mostrarlos al usuario.
  const [error, setError] = useState("");
  // Determina la pestaña activa: 'search' para buscar o 'favorites' para ver guardadas.
  const [activeTab, setActiveTab] = useState("search");
  // Define el idioma actual de la interfaz (actualmente no implementada selección).
  const [uiLanguage, setUiLanguage] = useState("es");
  // Controla la visibilidad del efecto de partículas en el fondo.
  const [showParticles, setShowParticles] = useState(true);

  // --- EFECTOS ---
  // Se ejecuta una vez al montar el componente para cargar datos desde localStorage.
  useEffect(() => {
    // Carga las recetas favoritas guardadas.
    const savedFavorites = localStorage.getItem("favoriteRecipes");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    // Carga la preferencia de idioma (no implementado en UI).
    const savedLanguage = localStorage.getItem("uiLanguage");
    if (savedLanguage) {
      setUiLanguage(savedLanguage);
    }
    // Carga la preferencia de visibilidad de partículas.
    const savedParticles = localStorage.getItem("showParticles");
    if (savedParticles !== null) {
      setShowParticles(JSON.parse(savedParticles));
    }
  }, []);

  // --- MANEJADORES DE EVENTOS Y FUNCIONES ---
  /**
   * Alterna la visibilidad del efecto de partículas y guarda la preferencia
   * en localStorage para persistir la elección del usuario.
   */
  const toggleParticles = () => {
    const newValue = !showParticles;
    setShowParticles(newValue);
    localStorage.setItem("showParticles", JSON.stringify(newValue));
  };

  /**
   * Realiza una búsqueda de recetas en la API de TheMealDB.
   * @param {string} query - El término de búsqueda introducido por el usuario.
   */
  const searchRecipes = async (query) => {
    // Si la búsqueda está vacía, limpia los resultados y errores.
    if (!query.trim()) {
      setRecipes([]);
      setError("");
      return;
    }
    // Activa el estado de carga y limpia errores previos.
    setLoading(true);
    setError("");
    try {
      // Realiza la petición a la API.
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await response.json();
      // Si se encuentran recetas, se actualiza el estado.
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        // Si no, se limpia el estado y se muestra un error.
        setRecipes([]);
        setError(t("noResults", {}, uiLanguage));
      }
    } catch (err) {
      // En caso de error en la petición, se muestra un mensaje.
      setError(t("searchError", {}, uiLanguage));
      console.error("Error:", err);
    } finally {
      // Desactiva el estado de carga al finalizar.
      setLoading(false);
    }
  };

  /**
   * Añade una receta a la lista de favoritos y la guarda en localStorage.
   * @param {object} recipe - La receta a añadir.
   */
  const addToFavorites = (recipe) => {
    const newFavorites = [...favorites, recipe];
    setFavorites(newFavorites);
    localStorage.setItem("favoriteRecipes", JSON.stringify(newFavorites));
  };

  /**
   * Elimina una receta de la lista de favoritos usando su ID.
   * @param {string} recipeId - El ID de la receta a eliminar.
   */
  const removeFromFavorites = (recipeId) => {
    const newFavorites = favorites.filter((fav) => fav.idMeal !== recipeId);
    setFavorites(newFavorites);
    localStorage.setItem("favoriteRecipes", JSON.stringify(newFavorites));
  };

  /**
   * Comprueba si una receta está en la lista de favoritos.
   * @param {string} recipeId - El ID de la receta a comprobar.
   * @returns {boolean} - True si es favorita, false si no.
   */
  const isFavorite = (recipeId) => {
    return favorites.some((fav) => fav.idMeal === recipeId);
  };

  /**
   * Maneja el evento de clic en el botón de favorito de una tarjeta.
   * Añade o elimina la receta de favoritos según su estado actual.
   * @param {object} recipe - La receta sobre la que se actúa.
   */
  const handleToggleFavorite = (recipe) => {
    if (isFavorite(recipe.idMeal)) {
      removeFromFavorites(recipe.idMeal);
    } else {
      addToFavorites(recipe);
    }
  };

  // --- RENDERIZADO ---
  // Determina qué lista de recetas se debe mostrar (búsqueda o favoritos).
  const displayedRecipes = activeTab === "search" ? recipes : favorites;

  return (
    <div className="App">
      <FoodParticles enabled={showParticles} />
      <header className="header">
        <div className="header-content">
          <h1>{t("appTitle", {}, uiLanguage)}</h1>
          <p>{t("appSubtitle", {}, uiLanguage)}</p>
        </div>
        <div className="header-controls">
          <button
            className="particles-toggle"
            onClick={toggleParticles}
            title={showParticles ? "Ocultar partículas" : "Mostrar partículas"}
          >
            {showParticles ? "✨" : "⚪"}
          </button>
        </div>
      </header>

      <main className="main-content">
        <SearchForm onSearch={searchRecipes} />
        <nav className="tabs">
          <button
            className={`tab ${activeTab === "search" ? "active" : ""}`}
            onClick={() => setActiveTab("search")}
          >
            {t("searchTab", {}, uiLanguage)}
          </button>
          <button
            className={`tab ${activeTab === "favorites" ? "active" : ""}`}
            onClick={() => setActiveTab("favorites")}
          >
            {t("favoritesTab", {}, uiLanguage)} ({favorites.length})
          </button>
        </nav>

        {loading && (
          <div className="loading" aria-live="polite">
            {t("searching", {}, uiLanguage)}
          </div>
        )}
        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        <div className="recipes-grid">
          {displayedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              isFavorite={isFavorite(recipe.idMeal)}
              onToggleFavorite={() => handleToggleFavorite(recipe)}
              uiLanguage={uiLanguage}
            />
          ))}
        </div>

        {activeTab === "favorites" && favorites.length === 0 && !loading && (
          <div className="empty-state">
            <h2>No tienes recetas favoritas.</h2>
            <p>¡Busca recetas y guárdalas para verlas aquí!</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
