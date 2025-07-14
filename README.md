# 🍳 Recetas Favoritas

Una aplicación web React para buscar y guardar recetas de cocina localmente, con consejos de IA generados por Claude.

## 📋 Problemática

Muchas personas buscan recetas de cocina en línea, pero enfrentan varios desafíos:

- **Pérdida de recetas**: No tienen una forma sencilla de guardar sus recetas favoritas
- **Falta de organización**: Las recetas se pierden entre marcadores del navegador
- **Ausencia de consejos personalizados**: No reciben tips específicos para mejorar sus técnicas de cocina
- **Dependencia de plataformas externas**: Necesitan crear cuentas en múltiples sitios para guardar recetas

## 💡 Solución

**Recetas Favoritas** es una Single Page Application (SPA) desarrollada en React que permite:

### ✨ Características principales:

- **🔍 Búsqueda de recetas**: Utiliza la API pública de TheMealDB para encontrar recetas por nombre
- **💾 Almacenamiento local**: Guarda recetas favoritas en localStorage sin necesidad de backend
- **🤖 Consejos de IA**: Integración con Claude de Anthropic para generar tips de cocina personalizados
- **🌍 Traducción automática**: Traduce recetas a múltiples idiomas usando Google Translate API
- **📱 Interfaz responsive**: Diseño adaptable para dispositivos móviles y desktop
- **⚡ Funcionalidad CRUD**: Agregar y eliminar recetas favoritas
- **🎨 Diseño moderno**: Interfaz atractiva con animaciones y efectos visuales

### 🛠️ Tecnologías utilizadas:

- **React 19** con hooks (useState, useEffect)
- **Vite** como build tool
- **CSS3** con Grid y Flexbox
- **TheMealDB API** para datos de recetas
- **Anthropic Claude API** para consejos de cocina
- **localStorage** para persistencia de datos

## 🚀 Instalación y Ejecución

### Prerrequisitos:

- Node.js (versión 16 o superior)
- npm o yarn
- Clave API de Anthropic Claude

### Pasos de instalación:

1. **Clonar el repositorio**:

```bash
git clone https://github.com/tu-usuario/recetas-favoritas.git
cd recetas-favoritas
```

2. **Instalar dependencias**:

```bash
npm install
```

3. **Configurar variables de entorno**:
   Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_ANTHROPIC_API_KEY=tu_clave_api_de_anthropic
```

4. **Ejecutar la aplicación**:

```bash
npm run dev
```

5. **Abrir en el navegador**:
   La aplicación estará disponible en: `http://localhost:5173`

### Comandos disponibles:

```bash
npm run dev      # Ejecutar en modo desarrollo
npm run build    # Construir para producción
npm run preview  # Previsualizar build de producción
npm run lint     # Ejecutar linter
```

## 📖 Cómo usar la aplicación

### 1. Buscar recetas:

- Navega a la pestaña "Buscar Recetas"
- Ingresa el nombre de una receta (ej: "lasagna", "pizza", "chicken")
- Presiona "🔍 Buscar" o Enter
- Explora los resultados con imágenes y descripciones

### 2. Gestionar favoritos:

- **Agregar**: Haz clic en el corazón blanco (🤍) en cualquier receta
- **Eliminar**: Haz clic en el corazón rojo (❤️) para quitar de favoritos
- **Ver favoritos**: Cambia a la pestaña "Favoritos" para ver todas tus recetas guardadas

### 3. Obtener consejos de IA:

- En cualquier receta, haz clic en "💡 Consejo de cocina"
- Espera mientras Claude genera un consejo personalizado
- Lee el tip específico para mejorar tu técnica
- Cierra el consejo con "✕ Cerrar"

### 4. Traducir recetas:

- En cualquier receta, haz clic en "🌍 Traducir"
- Selecciona el idioma deseado de la lista desplegable
- La receta se traducirá automáticamente (título, categoría e instrucciones)
- Las traducciones se guardan localmente para uso futuro
- Haz clic en "🔄 Ver original" para volver al texto original

### 5. Ver videos de YouTube:

- Si disponible, haz clic en "📺 Ver video" para ver la receta en YouTube

## 🏗️ Estructura del proyecto

```
recetas-favoritas/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── SearchForm.jsx      # Formulario de búsqueda
│   │   ├── RecipeCard.jsx      # Tarjeta individual de receta
│   │   └── FavoritesList.jsx   # Lista de recetas favoritas
│   ├── api/
│   │   └── claude.jsx          # Componente para integración con Claude
│   ├── App.jsx                 # Componente principal
│   ├── App.css                 # Estilos principales
│   ├── index.css               # Estilos globales
│   └── main.jsx                # Punto de entrada
├── utils/
│   ├── anthropic.js            # Utilidades para API de Claude
│   └── googleTranslate.js      # Utilidades para traducción
├── .env                        # Variables de entorno
├── package.json
├── vite.config.js
└── README.md
```

## 🔧 Componentes principales

### `App.jsx`

- Componente principal que maneja el estado global
- Gestiona la búsqueda de recetas y favoritos
- Implementa la navegación por pestañas

### `SearchForm.jsx`

- Formulario controlado para búsqueda de recetas
- Valida entrada del usuario
- Maneja el envío de consultas

### `RecipeCard.jsx`

- Muestra información de cada receta
- Incluye botón de favoritos
- Integra funcionalidad de consejos de IA
- Maneja enlaces a videos de YouTube

### `FavoritesList.jsx`

- Lista todas las recetas favoritas
- Permite eliminar recetas de favoritos
- Muestra estado vacío cuando no hay favoritos

## 🎯 Funcionalidades técnicas

### Gestión de estado:

- `useState` para estados locales de componentes
- `useEffect` para efectos secundarios y carga inicial
- Props drilling para comunicación entre componentes

### Almacenamiento local:

- Persistencia automática en localStorage
- Recuperación de datos al cargar la aplicación
- Sincronización entre pestañas del navegador

### Integración con APIs:

- **TheMealDB**: Búsqueda de recetas por nombre
- **Anthropic Claude**: Generación de consejos personalizados
- Manejo de errores y estados de carga

### Diseño responsive:

- Grid system para layout de recetas
- Media queries para dispositivos móviles
- Flexbox para componentes internos

## 🌟 Características avanzadas

### Consejos de IA:

- Prompts contextualizados por receta
- Consejos específicos por categoría y región
- Manejo de errores de API
- Loading states durante generación

### Interfaz de usuario:

- Animaciones CSS para mejor experiencia
- Hover effects y transiciones suaves
- Iconos emoji para mejor usabilidad
- Feedback visual para acciones del usuario

### Optimización:

- Lazy loading de imágenes
- Truncado de texto largo
- Responsive images
- Optimización para dispositivos móviles

## 🔐 Configuración de seguridad

### Variables de entorno:

```env
VITE_ANTHROPIC_API_KEY=tu_clave_api_aqui
```

### Mejores prácticas:

- API keys en variables de entorno
- Validación de entrada del usuario
- Manejo seguro de errores
- CORS configurado correctamente

## 🚨 Solución de problemas

### Problemas comunes:

1. **Error de API de Claude**:

   - Verificar que la clave API esté configurada
   - Comprobar conectividad a internet
   - Validar formato de la clave

2. **Recetas no aparecen**:

   - Verificar conexión a TheMealDB
   - Probar con términos de búsqueda en inglés
   - Comprobar consola del navegador

3. **Favoritos no se guardan**:
   - Verificar que localStorage esté habilitado
   - Comprobar espacio disponible en navegador
   - Revisar modo incógnito (localStorage limitado)

## 📝 Próximas mejoras

- [ ] Filtros avanzados por categoría y región
- [ ] Búsqueda por ingredientes
- [ ] Modo offline con Service Workers
- [ ] Exportar/importar favoritos
- [ ] Notas personales por receta
- [ ] Temporizador de cocina integrado
- [ ] Planificador de menús semanal

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 👨‍💻 Autor

Desarrollado con ❤️ para demostrar habilidades en React y integración con APIs.

---

⭐ ¡Si te gusta este proyecto, dale una estrella en GitHub!
