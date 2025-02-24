# Contribuyendo a DATA SAM WebApp

¡Gracias por tu interés en contribuir a `datasam-webapp`! Sigue estos pasos para hacer tu aporte correctamente.

## 1. Hacer un fork del repositorio

1. Ve al repositorio en GitHub: [datasam-webapp](https://github.com/JaviCeRodriguez/datasam-webapp)
2. Haz clic en el botón **Fork** en la esquina superior derecha.
3. Se creará una copia del repositorio en tu cuenta de GitHub.

## 2. Clonar el repositorio

Clona tu fork en tu PC con:

```sh
 git clone https://github.com/TU_USUARIO/datasam-webapp.git
 cd datasam-webapp
```

## 3. Crear una rama

Antes de hacer cambios, crea una nueva rama descriptiva:

```sh
git checkout -b feature/nueva-funcionalidad
```

## 4. Configurar Supabase

Para ejecutar el proyecto localmente, necesitas configurar una instancia de Supabase:

1. [Crea una cuenta en Supabase](https://supabase.com/)
2. Crea un nuevo proyecto. Los valores default que ofrece (región, recursos) están más que bien. Asegurate entrar en el proyecto dentro de Supabase.
3. Haz clic en el botón **Connect** (ubicado arriba, al lado del nombre del proyecto) y se abrirá un modal.
4. Selecciona el tab **App Frameworks** > Framework: **Next.js** > Using: **App Router** > With: **supabase-js**, y copia los valores de las envs:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Crea un archivo `.env.local` en la raíz del proyecto y agrega:

```sh
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

> [!NOTE]
> Esto va a ser útil para que se pueda ejecutar el proyecto sin inconvenientes 😉

## 5. Instalar dependencias y ejecutar el proyecto

```sh
npm install
npm run dev
```

## 6. Hacer un commit y push

Después de hacer cambios, guarda y sube tu código:

```sh
git add .
git commit -m "Descripción clara de los cambios"
git push origin feature/nueva-funcionalidad
```

> [!TIP]
> Trate de hacer cambios chicos en cada commit! Sirve para hacer un control de los cambios de forma progresiva.

## 7. Crear un Pull Request (PR)

1. Ve a tu fork en GitHub.
2. Haz clic en **Pull requests** > **New pull request**.
3. Asegúrate de que el PR tenga un título claro y una descripción detallada. Si se adjuntan capturas/videos mucho mejor!
4. Espera revisión y feedback.

---

Si tienes dudas, no dudes en preguntar en los issues del proyecto o en el grupo de la comunidad. ¡Gracias por tu contribución! 🎉
