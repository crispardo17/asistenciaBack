exports.welcomeNewUser = ({ nombreUsuario, usuario, contrasenna }) => {
  return `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bienvenido a la Plataforma</title>
    </head>
    <body>
        <h1>Bienvenido a la Plataforma</h1>
        <p>Estimado ${nombreUsuario}</p>
        <p>Le damos la bienvenida a nuestra plataforma. A continuación, encontrará los datos de acceso:</p>
        <ul>
            <li><strong>Usuario:</strong> ${usuario}</li>
            <li><strong>Contraseña Temporal:</strong> ${contrasenna}</li>
        </ul>
        <p>Le recordamos la importancia de cambiar su contraseña una vez haya ingresado.</p>
        <p>¡Esperamos que disfrute su experiencia en nuestra plataforma!</p>
    </body>
    </html>`;
};
