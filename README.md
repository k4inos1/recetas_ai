# 🍳 Buscador de Recetas - Aplicación Web SPA

## 📋 Descripción de la Problemática

En la vida cotidiana, las personas enfrentan el desafío constante de decidir qué cocinar y cómo preparar diferentes platos. Muchas veces:

- **Falta de inspiración culinaria**: No saben qué cocinar con los ingredientes disponibles
- **Pérdida de recetas favoritas**: Olvidan recetas que les gustaron anteriormente
- **Búsqueda ineficiente**: Pierden tiempo buscando recetas en múltiples sitios web
- **Falta de organización**: No tienen un lugar centralizado para sus recetas preferidas

## 💡 Solución Propuesta

**Buscador de Recetas** es una Single Page Application (SPA) que soluciona estos problemas mediante:

### Funcionalidades Principales:
1. **Búsqueda Inteligente**: Permite buscar recetas por nombre de plato desde una API externa
2. **Gestión de Favoritos**: Sistema CRUD completo para guardar y organizar recetas preferidas
3. **Interfaz Intuitiva**: Navegación por pestañas entre búsqueda y favoritos
4. **Información Detallada**: Muestra ingredientes, instrucciones, origen y categoría de cada receta
5. **Persistencia Local**: Los favoritos se guardan en localStorage del navegador

### Tecnologías Utilizadas:
- **Framework**: React con Vite
- **API Externa**: TheMealDB (https://www.themealdb.com/api.php)
- **Almacenamiento**: localStorage para persistencia de favoritos
- **Estilos**: CSS3 con variables personalizadas y diseño responsivo

## 🏗️ Estructura de Datos

### Objeto Receta (desde API):
\`\`\`javascript
{
  idMeal: "52977",
  strMeal: "Corba",
  strCategory: "Side",
  strArea: "Turkish",
  strInstructions: "Pick through your lentils...",
  strMealThumb: "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg",
  strYoutube: "https://www.youtube.com/watch?v=VVnZd8A84z4",
  strIngredient1: "Lentils",
  strMeasure1: "1 cup",
  // ... hasta strIngredient20 y strMeasure20
}
\`\`\`

### Almacenamiento Local:
\`\`\`javascript
// localStorage key: "favoriteRecipes"
[
  {
    idMeal: "52977",
    strMeal: "Corba",
    // ... resto de propiedades de la receta
  }
]
\`\`\`

## 🚀 Instrucciones de Instalación y Uso

### Prerrequisitos:
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación:
1. **Clonar el repositorio**:
   \`\`\`bash
   git clone https://github.com/tu-usuario/buscador-recetas.git
   cd buscador-recetas
   \`\`\`

2. **Instalar dependencias**:
   \`\`\`bash
   npm install
   \`\`\`

3. **Ejecutar en modo desarrollo**:
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Abrir en navegador**:
   - La aplicación estará disponible en: \`http://localhost:3000\`

### Uso de la Aplicación:

#### 🔍 Búsqueda de Recetas:
1. En la pestaña "Buscar Recetas"
2. Escribir el nombre de un plato en el campo de búsqueda
3. Hacer clic en "Buscar" o presionar Enter
4. Explorar los resultados mostrados en tarjetas

#### ❤️ Gestión de Favoritos:
1. **Añadir**: Hacer clic en el corazón blanco (🤍) en cualquier receta
2. **Ver favoritos**: Cambiar a la pestaña "Mis Favoritos"
3. **Eliminar**: Hacer clic en el corazón rojo (❤️) en una receta favorita

#### 📖 Ver Detalles:
1. Hacer clic en "Ver receta completa" en cualquier tarjeta
2. La tarjeta se expandirá mostrando:
   - Instrucciones completas
   - Lista de ingredientes con medidas
   - Estadísticas (origen, categoría, número de ingredientes)
   - Enlace a video de YouTube (si disponible)

## 🎯 Cumplimiento de Criterios de Evaluación

### ✅ 3.1.1 - Componentes en Framework SPA (25 pts)
- **App.jsx**: Componente principal que orquesta toda la aplicación
- **SearchForm.jsx**: Componente reutilizable para búsqueda con validación
- **RecipeCard.jsx**: Componente complejo para mostrar recetas con múltiples estados

### ✅ 3.1.2 - CRUD con LocalStorage (25 pts)
- **CREATE**: \`addToFavorites()\` - Añade recetas a favoritos
- **READ**: \`isFavorite()\` - Verifica si una receta está en favoritos
- **UPDATE**: \`toggleFavorite()\` - Alterna estado de favorito
- **DELETE**: \`removeFromFavorites()\` - Elimina recetas de favoritos
- **Persistencia**: Todos los cambios se guardan automáticamente en localStorage

### ✅ 3.1.3 - Carga desde API (20 pts)
- **API Externa**: TheMealDB (\`https://www.themealdb.com/api/json/v1/1/search.php\`)
- **Manejo de Estados**: Loading, error y éxito
- **Procesamiento**: Extracción y formateo de ingredientes desde la respuesta

### ✅ 3.1.4 - Propuesta de Solución (20 pts)
- **Problemática Clara**: Dificultad para encontrar y organizar recetas
- **Solución Coherente**: SPA que centraliza búsqueda y gestión de favoritos
- **Estructura Lógica**: Separación clara entre búsqueda y favoritos

### ✅ Presentación y Orden del Código (10 pts)
- **Comentarios Extensivos**: Cada función y sección documentada
- **Estructura Clara**: Separación por componentes y responsabilidades
- **Buenas Prácticas**: Manejo de errores, validaciones y estados

## 🔧 Funcionalidades Adicionales

- **Búsquedas Sugeridas**: Tags con búsquedas populares
- **Diseño Responsivo**: Adaptable a móviles y tablets
- **Feedback Visual**: Animaciones y transiciones suaves
- **Accesibilidad**: ARIA labels y navegación por teclado
- **Manejo de Errores**: Mensajes informativos para el usuario

## 📱 Compatibilidad

- **Navegadores**: Chrome, Firefox, Safari, Edge (versiones modernas)
- **Dispositivos**: Desktop, tablet y móvil
- **Resoluciones**: Desde 320px hasta 1920px+

## 🤝 Contribución

Este es un proyecto académico individual. Para sugerencias o mejoras:

1. Fork del repositorio
2. Crear rama para nueva funcionalidad
3. Commit de cambios
4. Push a la rama
5. Crear Pull Request

## 📄 Licencia

Proyecto académico - Uso educativo únicamente

---

**Desarrollado por**: [Tu Nombre]  
**Curso**: Desarrollo Web Frontend  
**Fecha**: [Fecha actual]
