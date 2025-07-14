"use client"

import { useState } from "react"

/**
 * COMPONENTE FORMULARIO DE BÚSQUEDA MEJORADO
 *
 * Funcionalidad: Permite al usuario ingresar términos de búsqueda
 * con una interfaz moderna y sugerencias interactivas.
 */
function SearchForm({ onSearch, loading }) {
  // Estado local para el término de búsqueda
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  /**
   * Maneja cambios en el input de búsqueda
   */
  const handleInputChange = (e) => {
    setQuery(e.target.value)
  }

  /**
   * Limpia el formulario de búsqueda
   */
  const clearSearch = () => {
    setQuery("")
    onSearch("")
  }

  /**
   * Maneja clic en sugerencias
   */
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion)
    onSearch(suggestion)
  }

  const suggestions = [
    { text: "chicken", emoji: "🍗", color: "#f59e0b" },
    { text: "pasta", emoji: "🍝", color: "#ef4444" },
    { text: "beef", emoji: "🥩", color: "#dc2626" },
    { text: "vegetarian", emoji: "🥗", color: "#10b981" },
    { text: "dessert", emoji: "🍰", color: "#8b5cf6" },
    { text: "seafood", emoji: "🦐", color: "#06b6d4" },
  ]

  return (
    <div className="search-section">
      <div className="search-header">
        <h2>¿Qué quieres cocinar hoy?</h2>
        <p>Busca entre miles de recetas deliciosas</p>
      </div>

      <form onSubmit={handleSubmit} className="search-form">
        <div className={`search-input-container ${isFocused ? "focused" : ""}`}>
          <div className="search-icon">🔍</div>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Busca tu receta favorita..."
            className="search-input"
            disabled={loading}
            maxLength={50}
          />

          {query && (
            <button type="button" onClick={clearSearch} className="clear-button" disabled={loading}>
              ✕
            </button>
          )}

          <button type="submit" className="search-submit-button" disabled={loading || !query.trim()}>
            {loading ? <div className="button-spinner"></div> : "Buscar"}
          </button>
        </div>
      </form>

      {/* SUGERENCIAS MEJORADAS */}
      <div className="suggestions-container">
        <p className="suggestions-title">Sugerencias populares:</p>
        <div className="suggestions-grid">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.text}
              onClick={() => handleSuggestionClick(suggestion.text)}
              className="suggestion-card"
              disabled={loading}
              style={{ "--suggestion-color": suggestion.color }}
            >
              <span className="suggestion-emoji">{suggestion.emoji}</span>
              <span className="suggestion-text">{suggestion.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchForm
