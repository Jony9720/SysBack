const express = require('express');
const sequelize = require('./config/db');
const jaulasRoutes = require('./routes/jaulas');
const personalRoutes = require('./routes/personal');
const mascotasRoutes = require('./routes/mascotas');
const serviciosRoutes = require('./routes/Servicios');
const serviciosArchivados = require('./routes/Servicios');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const { Mascotas, Servicios, Jaulas, Personal } = require('./models/index');

const app = express();

sequelize.sync({ alter: true })
    .then(() => console.log('Base de datos sincronizada'))
    .catch((err) => console.error('Error al sincronizar la base de datos:', err));

app.use(cors());
app.use(express.json({ limit: '10mb' })); // Aumenta el límite si las firmas son grandes
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api/jaulas', jaulasRoutes);
app.use('/api/personal', personalRoutes);
app.use('/api/mascotas', mascotasRoutes);
app.use('/api/servicios', serviciosRoutes);
app.use('/api/archivados', serviciosArchivados);
app.use('/api/auth', authRoutes.router);

// Ruta raíz para la API
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de grooming. Usa las rutas en /api para interactuar con el sistema.');
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Exportar la aplicación en lugar de iniciar el servidor
module.exports = app;
