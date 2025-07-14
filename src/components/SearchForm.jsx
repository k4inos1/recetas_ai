import { useState } from "react";

/**
 * Componente simplificado para la búsqueda de recetas.
 * Contiene un campo de texto y un botón de búsqueda.
 */
function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");

  // Maneja el envío del formulario.
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-input-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca tu receta favorita..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
