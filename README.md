# DATA SAM WebApp

WebApp de la comunidad de DATA SAM

## Tecnologías Utilizadas

- **React**: Biblioteca para la construcción de interfaces de usuario.
- **Next.js (App Router)**: Framework de React que proporciona renderizado del lado del servidor y generación estática.
- **TypeScript**: Superconjunto tipado de JavaScript para mejorar la robustez del código.
- **shadcn/ui**: Componentes UI reutilizables y estilizados.
- **Zustand**: Gestión de estado simple y eficiente.
- **Tailwind CSS**: Framework de estilos basado en utilidades para un diseño ágil y personalizable.

## Instalación y Configuración

1. Clonar el repositorio:

   ```sh
   git clone https://github.com/JaviCeRodriguez/datasam-webapp.git
   cd datasam-webapp
   ```

2. Instalar dependencias:

   ```sh
   npm install
   ```

3. Configurar las variables de entorno:

   - Crea un archivo `.env.local` en la raíz del proyecto.
   - Agrega las claves necesarias de Supabase:

   ```sh
   NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
   ```

4. Ejecutar la aplicación en modo desarrollo:

   ```sh
   npm run dev
   ```

## Contribuir

¡Las contribuciones son bienvenidas! Si deseas colaborar, revisa la guía de contribución en [CONTRIBUTING.md](./CONTRIBUTING.md) para más detalles sobre cómo hacer un fork, realizar cambios y enviar un pull request.

---

Si tienes dudas o sugerencias, no dudes en abrir un issue en el repositorio o dejar un mensaje en el grupo de la comunidad. ¡Gracias por tu interés en DATA SAM WebApp! 🚀
