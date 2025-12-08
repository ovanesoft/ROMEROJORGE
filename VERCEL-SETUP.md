# Deploy del Chatbot a Vercel

## 📋 Pasos para Deploy

### 1. Crear cuenta en Vercel (si no tenés)
- Ir a https://vercel.com
- Hacer click en "Sign Up"
- Conectar con tu cuenta de GitHub

### 2. Importar el proyecto
- Click en "Add New..." > "Project"
- Seleccionar el repositorio `ROMEROJORGE`
- Click en "Import"

### 3. Configurar variables de entorno
**MUY IMPORTANTE:** Antes de deployar, agregá la API key:

1. En la página de configuración del proyecto, ir a "Environment Variables"
2. Agregar:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** Tu nueva API key de Anthropic
   - **Environment:** Production, Preview, Development (seleccionar todas)
3. Click en "Add"

### 4. Deploy
- Click en "Deploy"
- Esperar 1-2 minutos
- ¡Listo! El sitio estará en: `https://romerojorge.vercel.app`

## 🔑 Obtener nueva API Key

Tu API key anterior fue desactivada. Necesitás crear una nueva:

1. Ir a https://console.anthropic.com/settings/keys
2. Click en "Create Key"
3. Copiar la nueva clave (empieza con `sk-ant-api03-...`)
4. Pegarla en Vercel como variable de entorno

## 🧪 Testing Local

Para probar localmente con Vercel CLI:

```bash
# Instalar Vercel CLI
npm install -g vercel

# Crear archivo .env local
echo "ANTHROPIC_API_KEY=tu_api_key_aqui" > .env

# Correr en modo desarrollo
vercel dev
```

El servidor local correrá en `http://localhost:3000`

## 📁 Archivos del Backend

- `api/chat.js` - Serverless function que maneja las llamadas a Claude
- `vercel.json` - Configuración de Vercel
- `.env.example` - Plantilla para variables de entorno

## ✅ Verificación

Una vez deployado, probá el chatbot:
1. Abrir tu sitio en Vercel
2. Click en el botón del chatbot
3. Enviar un mensaje
4. Debería funcionar sin pedir API key

## 🔒 Seguridad

- ✅ La API key está en variables de entorno de Vercel (segura)
- ✅ No se expone en el código fuente
- ✅ GitHub no puede detectarla
- ✅ Solo el backend puede acceder a ella

## ❌ Problemas Comunes

**Error: "Failed to fetch"**
- Verificar que la API key esté configurada en Vercel
- Revisar que sea la clave correcta (no la desactivada)

**Error: "CORS"**
- Ya está configurado en el backend, no debería pasar

**Chatbot no aparece**
- Limpiar caché del navegador
- Verificar que todos los archivos estén en el repositorio

## 📞 Soporte

Si algo no funciona:
1. Revisar los logs en Vercel Dashboard
2. Verificar que la API key sea válida en console.anthropic.com
3. Contactar si el problema persiste
