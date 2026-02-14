# FideliQR - Sistema de Fidelización Digital

Sistema de fidelización de clientes mediante códigos QR. Cada 10 compras, el cliente gana una recompensa.

## 🚀 Características

- ✅ Panel de administración completo
- ✅ Registro manual de clientes
- ✅ Código QR único por negocio
- ✅ Sistema de recompensas automático (10 compras = 1 recompensa)
- ✅ Notificaciones por Telegram
- ✅ Panel de seguridad con bloqueo de clientes
- ✅ Actualización automática cada 10 segundos

## 🛠️ Tecnologías

- Next.js 16 (App Router)
- TypeScript
- Prisma ORM
- PostgreSQL (Supabase)
- Tailwind CSS
- shadcn/ui

## 📋 Variables de Entorno

Crea un archivo `.env` con las siguientes variables:

```env
# Database
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres

# Telegram Bot
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
TELEGRAM_CHAT_ID=your-telegram-chat-id

# Email (opcional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## 🚀 Despliegue en Vercel

1. Fork o clona este repositorio
2. Conecta tu repositorio en [Vercel](https://vercel.com)
3. Agrega las variables de entorno en Vercel
4. ¡Despliega!

## 📱 Uso

1. Registra tu negocio en la página principal
2. Accede al panel de administración
3. Registra tus clientes manualmente
4. Descarga e imprime tu código QR
5. Los clientes escanean el QR y marcan compras

## 📄 Licencia

MIT
