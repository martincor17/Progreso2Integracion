async function obtenerGeorreferenciacion() {
    const nombreUsuario = document.getElementById('nombreUsuario').value;

    if (!nombreUsuario) {
        alert('Ingrese un nombre de usuario');
        return;
    }

    try {
       
        const respuestaCiudad = await obtenerCiudadDesdeBaseDeDatos(nombreUsuario);

        if (respuestaCiudad.error) {
            alert('Error al obtener la ciudad del usuario');
            return;
        }

        // Utilizar la ciudad obtenida en la URL de la solicitud a la API
        const response = await fetch(`https://geocode.xyz/${ciudad}?json=1`);

        const data = await response.json();

        if (data.error) {
            alert('Usuario no encontrado');
            return;
        }

        const resultado = document.getElementById('resultado');
        resultado.innerHTML = `
        <h3>Georreferenciación para ${nombreUsuario}:</h3>
        <p>Ciudad: ${data.standard?.city || 'N/A'}</p>
        <p>Provincia: ${data.standard?.prov || 'N/A'}</p>
        <p>País: ${data.standard?.countryname || 'N/A'}</p>
        <p>Código Postal: ${data.standard?.postal || 'N/A'}</p>
        <p>Latitud: ${data.latt}</p>
        <p>Longitud: ${data.longt}</p>
        <p>Altitud: ${data.alt?.loc?.latt || 'N/A'}</p>
        <p>Confianza: ${data.standard?.confidence || 'N/A'}</p>
        <p>Créditos restantes: ${data.remaining_credits || 'N/A'}</p>
        `;
    } catch (error) {
        console.error('Error al obtener datos de georreferenciación:', error);
        alert('Error al obtener datos de georreferenciación');
    }
}

