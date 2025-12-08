# Chatbot Romero Jorge - Documentación

## 📋 Descripción

Chatbot de atención al cliente integrado en el sitio web de Romero Jorge, desarrollado en JavaScript vanilla (sin frameworks). Utiliza la API de Claude (Anthropic) para conversaciones inteligentes sobre los servicios de la empresa.

## 🎯 Características

- ✅ JavaScript vanilla (sin React, sin dependencias externas)
- ✅ Compatible con GitHub Pages
- ✅ Diseño responsive (mobile-friendly)
- ✅ Integra con paleta de colores del sitio (CSS variables)
- ✅ Persistencia en localStorage (mensajes + API key)
- ✅ Botón flotante que abre/cierra el chat
- ✅ Información completa sobre Terráneo, Fideitec y Delegales

## 📁 Archivos del Chatbot

```
/ROMEROJORGE/
├── chatbot.html    # Estructura HTML del widget
├── chatbot.css     # Estilos del chatbot
├── chatbot.js      # Lógica y llamadas a API
├── index.html      # Integrado aquí
└── quienes-somos.html  # Integrado aquí
```

## 🚀 Instalación

El chatbot ya está integrado en tu sitio. Los archivos están incluidos automáticamente en:
- `index.html`
- `quienes-somos.html`

No se requiere instalación adicional.

## 🔑 Configuración de API Key

### Para usuarios finales:

1. Abrir el sitio web
2. Hacer clic en el botón del chatbot (círculo dorado abajo a la derecha)
3. Ingresar tu API Key de Anthropic cuando te lo pida
4. La clave se guarda en localStorage (navegador)

### Para obtener una API Key:

1. Ir a https://console.anthropic.com
2. Crear una cuenta o iniciar sesión
3. Ir a "API Keys"
4. Crear nueva API Key
5. Copiar la clave (empieza con `sk-ant-...`)

**⚠️ IMPORTANTE - Seguridad:**

La API key se guarda en el navegador del cliente (localStorage). Esto significa que cada usuario debe tener su propia API key. NO es seguro para producción con una sola clave compartida.

### Solución para producción (recomendada):

Crear un backend proxy que maneje la API key de forma segura:

```
Usuario → Tu sitio web → Backend proxy → API Claude
                         (API key aquí)
```

Opciones de backend gratuitas:
- Vercel Functions
- Railway
- Render
- Cloudflare Workers

## 🎨 Personalización

### Cambiar colores:

El chatbot usa las variables CSS del sitio:

```css
/* En styles.css */
:root {
    --color-accent: #c9a961;  /* Color principal del chatbot */
    --color-primary: #1a1a1a;
    --color-white: #ffffff;
}
```

### Modificar el prompt del asistente:

Editar `chatbot.js`, buscar `const SYSTEM_PROMPT` y modificar el contenido.

### Cambiar el mensaje de bienvenida:

En `chatbot.js`, método `addWelcomeMessage()`:

```javascript
addWelcomeMessage() {
    this.messages.push({
        role: 'assistant',
        content: '¡Tu mensaje personalizado aquí!',
        timestamp: Date.now()
    });
}
```

## 🛠️ Funcionalidades

### Almacenamiento local:

- `rj_chat_messages`: Historial de conversación
- `rj_conversation_history`: Registro de interacciones
- `rj_anthropic_api_key`: Clave API del usuario

### Botones:

- **Borrar historial**: Elimina todos los mensajes guardados
- **Cerrar chat**: Oculta la ventana del chat
- **Enviar mensaje**: Envía mensaje al asistente

### Temas que maneja:

1. **Terráneo**: Desarrollos inmobiliarios
2. **Fideitec**: Tokenización inmobiliaria
3. **Delegales**: Asesoría legal

## 📱 Responsive Design

El chatbot se adapta automáticamente a:
- Desktop: Ventana 380x600px abajo a la derecha
- Mobile: Pantalla completa menos 20px de margen

## 🐛 Troubleshooting

### El chatbot no aparece:
- Verificar que los archivos estén en la misma carpeta
- Revisar la consola del navegador (F12) para errores
- Asegurarse de que el servidor local esté corriendo

### Error de API:
- Verificar que la API key sea correcta
- Confirmar que tengas créditos en tu cuenta de Anthropic
- Revisar el límite de tasa (rate limit) de la API

### Mensajes no se guardan:
- Verificar que localStorage esté habilitado en el navegador
- Revisar que no estés en modo incógnito

## 📊 Modelo de IA

- **Modelo**: Claude Sonnet 4 (`claude-sonnet-4-20250514`)
- **Max tokens**: 1024
- **Proveedor**: Anthropic

## 🔄 Actualización a Producción

Para usar en producción de forma segura:

1. **Crear backend** (ejemplo Node.js + Express):

```javascript
// backend/server.js
const express = require('express');
const app = express();

app.post('/api/chat', async (req, res) => {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'x-api-key': process.env.ANTHROPIC_API_KEY, // Seguro
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
});
```

2. **Modificar chatbot.js** para usar tu backend:

```javascript
// Cambiar en sendMessage():
const response = await fetch('https://tu-backend.com/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: apiMessages })
});
```

## 📞 Soporte

Para preguntas sobre el chatbot:
- Email: consultas@romerojorge.com
- WhatsApp: +54 11 3856-5490

## 📄 Licencia

Uso privado para Romero Jorge.
