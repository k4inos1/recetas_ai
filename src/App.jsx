"use client"

import { useState, useEffect } from "react"
import "./App.css"
import SearchForm from "./components/SearchForm"
import RecipeCard from "./components/RecipeCard"

/**
 * APLICACIÓN PRINCIPAL - BUSCADOR DE RECETAS
 *
 * Problemática: Las personas necesitan encontrar recetas de cocina de manera rápida
 * y poder guardar sus favoritas para consultarlas posteriormente.
 *
 * Solución: SPA que permite buscar recetas desde una API externa y gestionar
 * una lista personal de favoritos usando localStorage.
 */
function App() {
  // ========== ESTADOS DE LA APLICACIÓN ==========

  // Lista de recetas obtenidas de la API
  const [recipes, setRecipes] = useState([])

  // Lista de recetas favoritas (CRUD con localStorage)
  const [favorites, setFavorites] = useState([])

  // Estado de carga para mostrar feedback al usuario
  const [loading, setLoading] = useState(false)

  // Mensajes de error para manejo de excepciones
  const [error, setError] = useState("")

  // Pestaña activa: 'search' o 'favorites'
  const [activeTab, setActiveTab] = useState("search")

  // ========== EFECTO INICIAL - CARGAR DATOS PERSISTIDOS ==========
  useEffect(() => {
    // Cargar favoritos desde localStorage al iniciar la aplicación
    const savedFavorites = localStorage.getItem("favoriteRecipes")
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (error) {
        console.error("Error al cargar favoritos:", error)
        // Si hay error, limpiar localStorage corrupto
        localStorage.removeItem("favoriteRecipes")
      }
    }
  }, [])

  // ========== FUNCIÓN PRINCIPAL - BÚSQUEDA EN API EXTERNA ==========
  /**
   * Busca recetas en la API de TheMealDB
   * @param {string} query - Término de búsqueda ingresado por el usuario
   */
  const searchRecipes = async (query) => {
    // Validación de entrada
    if (!query.trim()) {
      setRecipes([])
      setError("")
      return
    }

    // Activar estado de carga
    setLoading(true)
    setError("")

    try {
      // Llamada a API externa - TheMealDB
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor")
      }

      const data = await response.json()

      // Procesar respuesta de la API
      if (data.meals) {
        setRecipes(data.meals)
      } else {
        setRecipes([])
        setError("No se encontraron recetas con ese nombre")
      }
    } catch (err) {
      setError("Error al conectar con el servidor. Intenta nuevamente.")
      console.error("Error en búsqueda:", err)
    } finally {
      // Desactivar estado de carga
      setLoading(false)
    }
  }

  // ========== OPERACIONES CRUD PARA FAVORITOS ==========

  /**
   * CREATE - Añadir receta a favoritos
   * @param {object} recipe - Objeto receta completo
   */
  const addToFavorites = (recipe) => {
    // Verificar que no esté ya en favoritos
    if (favorites.some((fav) => fav.idMeal === recipe.idMeal)) {
      return
    }

    const newFavorites = [...favorites, recipe]
    setFavorites(newFavorites)

    // Persistir en localStorage
    localStorage.setItem("favoriteRecipes", JSON.stringify(newFavorites))
  }

  /**
   * DELETE - Eliminar receta de favoritos
   * @param {string} recipeId - ID único de la receta
   */
  const removeFromFavorites = (recipeId) => {
    const newFavorites = favorites.filter((fav) => fav.idMeal !== recipeId)
    setFavorites(newFavorites)

    // Actualizar localStorage
    localStorage.setItem("favoriteRecipes", JSON.stringify(newFavorites))
  }

  /**
   * READ - Verificar si una receta está en favoritos
   * @param {string} recipeId - ID de la receta a verificar
   * @returns {boolean} - true si está en favoritos
   */
  const isFavorite = (recipeId) => {
    return favorites.some((fav) => fav.idMeal === recipeId)
  }

  /**
   * UPDATE/TOGGLE - Alternar estado de favorito
   * @param {object} recipe - Receta a alternar
   */
  const toggleFavorite = (recipe) => {
    if (isFavorite(recipe.idMeal)) {
      removeFromFavorites(recipe.idMeal)
    } else {
      addToFavorites(recipe)
    }
  }

  // ========== LÓGICA DE VISUALIZACIÓN ==========
  // Determinar qué recetas mostrar según la pestaña activa
  const displayedRecipes = activeTab === "search" ? recipes : favorites

  // ========== RENDERIZADO DE LA INTERFAZ ==========
  return (
    <div className="app">
      {/* HERO SECTION CON GRADIENTE ANIMADO */}
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <header className="hero-header">
          <div className="hero-content">
            <div className="hero-icon">🍳</div>
            <h1 className="hero-title">
              Descubre <span className="highlight">Sabores</span> Únicos
            </h1>
            <p className="hero-subtitle">Encuentra recetas increíbles de todo el mundo y guarda tus favoritas</p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">{recipes.length}</span>
                <span className="stat-label">Recetas encontradas</span>
              </div>
              <div className="stat">
                <span className="stat-number">{favorites.length}</span>
                <span className="stat-label">Favoritas guardadas</span>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <main className="main-content">
        {/* FORMULARIO DE BÚSQUEDA - Solo visible en pestaña de búsqueda */}
        {activeTab === "search" && (
          <div className="search-container">
            <SearchForm onSearch={searchRecipes} loading={loading} />
          </div>
        )}

        {/* NAVEGACIÓN POR PESTAÑAS CON DISEÑO MEJORADO */}
        <nav className="tabs-container">
          <div className="tabs">
            <button className={`tab ${activeTab === "search" ? "active" : ""}`} onClick={() => setActiveTab("search")}>
              <span className="tab-icon">🔍</span>
              <span className="tab-text">Explorar</span>
              <span className="tab-badge">{recipes.length}</span>
            </button>
            <button
              className={`tab ${activeTab === "favorites" ? "active" : ""}`}
              onClick={() => setActiveTab("favorites")}
            >
              <span className="tab-icon">❤️</span>
              <span className="tab-text">Favoritos</span>
              <span className="tab-badge">{favorites.length}</span>
            </button>
          </div>
        </nav>

        {/* INDICADORES DE ESTADO MEJORADOS */}
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner">
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
            </div>
            <h3>Buscando recetas deliciosas...</h3>
            <p>Explorando sabores del mundo</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <div className="error-icon">😔</div>
            <h3>¡Oops! Algo salió mal</h3>
            <p>{error}</p>
            <button className="retry-button" onClick={() => setError("")}>
              Intentar de nuevo
            </button>
          </div>
        )}

        {/* GRID DE RECETAS CON ANIMACIONES */}
        <div className="recipes-container">
          <div className="recipes-grid">
            {displayedRecipes.map((recipe, index) => (
              <div key={recipe.idMeal} className="recipe-item" style={{ animationDelay: `${index * 0.1}s` }}>
                <RecipeCard
                  recipe={recipe}
                  isFavorite={isFavorite(recipe.idMeal)}
                  onToggleFavorite={() => toggleFavorite(recipe)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ESTADOS VACÍOS MEJORADOS */}
        {activeTab === "favorites" && favorites.length === 0 && !loading && (
          <div className="empty-state favorites-empty">
            <div className="empty-animation">
              <div className="empty-icon">💝</div>
              <div className="empty-hearts">
                <span>💖</span>
                <span>💕</span>
                <span>💗</span>
              </div>
            </div>
            <h2>Tu colección está esperando</h2>
            <p>Descubre recetas increíbles y guarda las que más te gusten</p>
            <button className="cta-button" onClick={() => setActiveTab("search")}>
              <span>🚀</span>
              Explorar Recetas
            </button>
          </div>
        )}

        {activeTab === "search" && recipes.length === 0 && !loading && !error && (
          <div className="empty-state search-empty">
            <div className="empty-animation">
              <div className="empty-icon">🔍</div>
              <div className="search-rings">
                <div className="ring"></div>
                <div className="ring"></div>
                <div className="ring"></div>
              </div>
            </div>
            <h2>¡Comienza tu aventura culinaria!</h2>
            <p>Busca por nombre de plato, ingrediente o tipo de cocina</p>
            <div className="search-examples">
              <span>Prueba con:</span>
              <div className="example-tags">
                <span onClick={() => searchRecipes("pasta")}>🍝 Pasta</span>
                <span onClick={() => searchRecipes("chicken")}>🍗 Pollo</span>
                <span onClick={() => searchRecipes("dessert")}>🍰 Postre</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER MEJORADO */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>🍳 Buscador de Recetas</h4>
            <p>Tu compañero culinario perfecto</p>
          </div>
          <div className="footer-section">
            <h4>Datos</h4>
            <p>
              Powered by{" "}
              <a href="https://www.themealdb.com/" target="_blank" rel="noopener noreferrer">
                TheMealDB
              </a>
            </p>
          </div>
          <div className="footer-section">
            <h4>Almacenamiento</h4>
            <p>Tus favoritos se guardan localmente</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Hecho con ❤️ para los amantes de la cocina</p>
        </div>
      </footer>
    </div>
  )
}

export default App
