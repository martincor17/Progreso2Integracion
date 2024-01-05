const sql = require('mssql');

const config = {
  server: 'localhost',
  database: 'ClientesIntegracion',
  options: {
    trustedConnection: true, 
  },
};

async function conectarBaseDeDatos() {
  try {
    await sql.connect(config);
    console.log('Conexión a la base de datos establecida');

    

  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
  } finally {
    
    await sql.close();
    console.log('Conexión cerrada');
  }
}

// Llamada a la función para conectar
conectarBaseDeDatos();
