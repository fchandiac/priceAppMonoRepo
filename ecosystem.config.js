module.exports = {
  apps: [
    {
      name: 'PricesApp',  // Nombre de la aplicación
      script: 'node_modules/next/dist/bin/next', // Ruta al binario de Next.js
      args: 'start -p 3000', // Argumentos para iniciar Next.js en el puerto 3000
      cwd: './apps/next-app', // Directorio de trabajo donde está tu app Next.js
      instances: 'max', // Inicia el número máximo de instancias basado en los núcleos de CPU
      autorestart: true, // Reinicia automáticamente en caso de falla
      watch: false, // Desactiva la observación de cambios en archivos
      max_memory_restart: '1G', // Reinicia si el uso de memoria excede 1 GB
      env: {
        NODE_ENV: 'development', // Variables de entorno para desarrollo
      },
      env_production: {
        NODE_ENV: 'production', // Variables de entorno para producción
      }
    },
    {
      name: 'PricesApi',
      script: 'npm',
      args: 'run start',
      cwd: './apps/api',
      watch: true,
      ignore_watch: ["node_modules", "public"],
      watch_options: {
        followSymlinks: false
      },
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};

