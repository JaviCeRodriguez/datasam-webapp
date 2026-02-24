# Guía de Desarrollo Local - DataSam WebApp

¡Bienvenido/a al proyecto DataSam! 🎉 Esta guía te ayudará a ejecutar el proyecto en tu computadora de forma local, paso a paso. No te preocupes si no tienes mucha experiencia técnica, explicaremos todo de manera clara y sencilla.

## 📋 Tabla de Contenidos

- [Antes de Empezar](#antes-de-empezar)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración de Supabase](#configuración-de-supabase)
- [Ejecutar el Proyecto](#ejecutar-el-proyecto)
- [Uso de Inteligencia Artificial](#uso-de-inteligencia-artificial)
- [Comandos Útiles](#comandos-útiles)
- [Solución de Problemas](#solución-de-problemas)
- [Contribuir al Proyecto](#contribuir-al-proyecto)

## 🚀 Antes de Empezar

### ¿Cómo puedo contribuir?

Antes de comenzar a trabajar en el proyecto, es importante que sigas estos pasos:

1. **Tomar un Issue Existente**: Revisa los [issues abiertos](https://github.com/JaviCeRodriguez/datasam-webapp/issues) del proyecto y elige uno que te interese. Comenta en el issue que te gustaría trabajar en él.

2. **Proponer un Nuevo Issue**: Si tienes una idea para mejorar el proyecto, primero crea un issue nuevo describiendo tu propuesta. Espera la respuesta del mantenedor antes de empezar a trabajar.

3. **Hablar con el Autor**: Si no estás seguro/a por dónde empezar, puedes contactar a [@JaviCeRodriguez](https://github.com/JaviCeRodriguez) para obtener orientación.

> ⚠️ **Importante**: No empieces a trabajar en el código sin antes tomar o proponer un issue. Esto evita duplicar esfuerzos y asegura que tu contribución sea útil para el proyecto.

## 📦 Requisitos Previos

Antes de instalar el proyecto, necesitas tener instaladas estas herramientas en tu computadora:

### 1. Node.js (versión 18 o superior)

Node.js es el entorno que permite ejecutar JavaScript en tu computadora.

- **Descarga**: Visita [nodejs.org](https://nodejs.org/) y descarga la versión LTS (Long Term Support)
- **Verificar instalación**: Abre una terminal y escribe:
  ```bash
  node --version
  ```
  Deberías ver algo como `v18.x.x` o superior

### 2. pnpm (gestor de paquetes)

pnpm es una herramienta más rápida y eficiente que npm para manejar las dependencias del proyecto.

- **Instalación**: Después de instalar Node.js, ejecuta en tu terminal:
  ```bash
  npm install -g pnpm
  ```
- **Verificar instalación**:
  ```bash
  pnpm --version
  ```
  Deberías ver algo como `9.x.x`

### 3. Git

Git es el sistema de control de versiones que usamos para gestionar el código.

- **Descarga**: Visita [git-scm.com](https://git-scm.com/)
- **Verificar instalación**:
  ```bash
  git --version
  ```

### 4. Editor de Código (Opcional pero Recomendado)

Recomendamos usar uno de estos editores:
- **Visual Studio Code**: [code.visualstudio.com](https://code.visualstudio.com/)
- **Cursor**: [cursor.sh](https://cursor.sh/)

## 💻 Instalación

Sigue estos pasos para instalar el proyecto en tu computadora:

### Paso 1: Clonar el Repositorio

Abre tu terminal y ejecuta:

```bash
git clone https://github.com/JaviCeRodriguez/datasam-webapp.git
```

Esto descargará todo el código del proyecto a tu computadora.

### Paso 2: Entrar al Directorio del Proyecto

```bash
cd datasam-webapp
```

### Paso 3: Instalar las Dependencias

Este comando instalará todas las librerías y herramientas que el proyecto necesita:

```bash
pnpm install
```

Este proceso puede tardar unos minutos. ¡Ten paciencia! ☕

## 🧩 Configuración de Supabase

Para que la página de perfil funcione correctamente (edición de perfil, avatar y cuentas vinculadas), configura estos puntos en tu proyecto de Supabase:

### 1) Bucket público `avatars`

1. Ve a **Storage → Buckets → New bucket**.
2. Nombre del bucket: `avatars`.
3. Activa **Public bucket**.
4. En la configuración del bucket, limita tipos de archivo a:
   - `image/jpeg`
   - `image/png`
   - `image/webp`
5. Define **File size limit** en `2 MB`.

> En la app también existe validación de tamaño/tipo antes de subir archivo.

### 2) Providers de Auth para vinculación de cuentas

1. Ve a **Authentication → Providers**.
2. Asegúrate de tener **Google** habilitado.
3. Habilita **Manual Linking** (Identity Linking) para permitir vincular otra cuenta Google desde perfil.

### 3) Redirect URLs

En **Authentication → URL Configuration**, agrega:

- `http://localhost:3000/auth/callback`
- Tu URL de producción equivalente (por ejemplo: `https://tu-dominio.com/auth/callback`)

### 4) Variables de entorno

En `.env.local`, verifica:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## 🎮 Ejecutar el Proyecto

Una vez instaladas las dependencias, puedes ejecutar el proyecto en modo desarrollo:

```bash
pnpm dev
```

Verás un mensaje como este:

```
  ▲ Next.js 15.2.6
  - Local:        http://localhost:3000
  - Ready in XXXms
```

¡Listo! Ahora puedes abrir tu navegador y visitar:

```
http://localhost:3000
```

Deberías ver la aplicación funcionando. Cualquier cambio que hagas en el código se reflejará automáticamente en el navegador (sin necesidad de recargar la página).

### Detener el Servidor

Para detener el servidor de desarrollo, presiona `Ctrl + C` en la terminal.

## 🤖 Uso de Inteligencia Artificial

La inteligencia artificial puede ser una gran ayuda durante el desarrollo, pero es importante usarla de manera **responsable**. Aquí te explicamos cómo:

### Herramientas Recomendadas

#### 1. GitHub Copilot (en VS Code)

GitHub Copilot es un asistente de IA que te ayuda a escribir código más rápido.

**Instalación:**
1. Abre Visual Studio Code
2. Ve a la pestaña de Extensions (Ctrl+Shift+X)
3. Busca "GitHub Copilot"
4. Instala la extensión
5. Inicia sesión con tu cuenta de GitHub

**Cómo usarlo responsablemente:**
- ✅ Úsalo para autocompletar código repetitivo
- ✅ Pídele sugerencias para resolver problemas
- ✅ Aprende de las soluciones que te propone
- ❌ No copies código sin entenderlo
- ❌ Siempre revisa las sugerencias antes de aceptarlas
- ❌ No uses la IA para hacer todo el trabajo por ti

#### 2. Cursor Agent

Cursor es un editor basado en VS Code con IA integrada más potente.

**Instalación:**
1. Descarga Cursor desde [cursor.sh](https://cursor.sh/)
2. Instálalo en tu computadora
3. Abre el proyecto

**Cómo usarlo responsablemente:**
- ✅ Usa el chat de IA para hacer preguntas sobre el código
- ✅ Pídele ayuda para entender partes complejas del proyecto
- ✅ Solicita explicaciones de errores que no entiendas
- ❌ No generes código completo sin revisarlo
- ❌ Siempre verifica que el código generado sigue las convenciones del proyecto

### Mejores Prácticas con IA

1. **Entiende el código que la IA genera**: No aceptes código que no comprendas
2. **Mantén la consistencia**: Asegúrate de que el código generado siga el estilo del proyecto
3. **Prueba todo**: La IA puede cometer errores, siempre prueba el código
4. **Aprende en el proceso**: Usa la IA como una herramienta de aprendizaje, no como un reemplazo

## 🛠️ Comandos Útiles

Aquí hay una lista de comandos que puedes usar en el proyecto:

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Ejecuta el proyecto en modo desarrollo |
| `pnpm build` | Construye el proyecto para producción |
| `pnpm start` | Ejecuta el proyecto en modo producción (después de build) |
| `pnpm lint` | Verifica que el código siga las reglas de estilo |

### Ejemplo de Flujo de Trabajo

```bash
# 1. Hacer cambios en el código
# 2. Verificar que el código esté bien formateado
pnpm lint

# 3. Probar los cambios
pnpm dev

# 4. Si todo funciona, hacer commit de los cambios
git add .
git commit -m "Descripción de los cambios"
git push
```

## 🔧 Solución de Problemas

### Problema: "command not found: pnpm"

**Solución**: pnpm no está instalado. Ejecuta:
```bash
npm install -g pnpm
```

### Problema: "Error: EADDRINUSE: address already in use"

**Solución**: El puerto 3000 ya está en uso. Tienes dos opciones:

1. Detén el proceso que está usando el puerto 3000
2. Usa otro puerto:
   ```bash
   pnpm dev -- -p 3001
   ```

### Problema: Errores durante `pnpm install`

**Solución**:
1. Elimina la carpeta `node_modules` y el archivo `pnpm-lock.yaml`:
   ```bash
   rm -rf node_modules pnpm-lock.yaml
   ```
2. Vuelve a instalar:
   ```bash
   pnpm install
   ```

### Problema: La página no se actualiza cuando cambio el código

**Solución**:
1. Verifica que estés ejecutando `pnpm dev`
2. Intenta hacer un "hard refresh" en el navegador (Ctrl+Shift+R en Windows/Linux o Cmd+Shift+R en Mac)
3. Reinicia el servidor de desarrollo

### Problema: No puedo encontrar un issue para trabajar

**Solución**:
1. Revisa los [issues abiertos](https://github.com/JaviCeRodriguez/datasam-webapp/issues)
2. Filtra por etiquetas como `good first issue` o `help wanted`
3. Si no encuentras nada, contacta al autor del proyecto

## 🤝 Contribuir al Proyecto

### Flujo de Trabajo Básico

1. **Fork del repositorio**: Haz un fork del proyecto a tu cuenta de GitHub

2. **Crea una rama nueva**: 
   ```bash
   git checkout -b mi-nueva-funcionalidad
   ```

3. **Haz tus cambios**: Modifica el código según sea necesario

4. **Verifica tu código**:
   ```bash
   pnpm lint
   pnpm dev # Prueba que todo funcione
   ```

5. **Commit de cambios**:
   ```bash
   git add .
   git commit -m "Descripción clara de los cambios"
   ```

6. **Push a tu fork**:
   ```bash
   git push origin mi-nueva-funcionalidad
   ```

7. **Crea un Pull Request**: Ve a GitHub y crea un PR desde tu rama a la rama principal del proyecto

### Consejos para un Buen Pull Request

- ✅ Describe claramente qué cambios hiciste y por qué
- ✅ Referencia el issue relacionado (ej: "Closes #123")
- ✅ Asegúrate de que el código pase el linter
- ✅ Prueba tus cambios antes de enviar el PR
- ✅ Mantén los cambios pequeños y enfocados

## 📚 Recursos Adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de React](https://react.dev/)
- [Documentación de TypeScript](https://www.typescriptlang.org/docs/)
- [Guía de pnpm](https://pnpm.io/motivation)

## 💬 ¿Necesitas Ayuda?

Si tienes alguna pregunta o problema que no se cubre en esta guía:

1. Revisa los [issues existentes](https://github.com/JaviCeRodriguez/datasam-webapp/issues) por si alguien ya tuvo el mismo problema
2. Crea un nuevo issue describiendo tu problema
3. Contacta al autor del proyecto: [@JaviCeRodriguez](https://github.com/JaviCeRodriguez)

---

¡Gracias por contribuir al proyecto DataSam! 🚀✨
