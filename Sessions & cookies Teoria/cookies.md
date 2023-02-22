Una cookie es un pequeñísimo archivo de texto donde podremos almacenar información dentro del navegador, de manera que pueda viajar entre las peticiones y sirva como un ligero contenedor de información necesaria para poder procesar ciertas peticiones.

Algunos de los datos que se suelen guardar en una cookie son:


- Nombres de usuario

- IDs de sesiones (que abarcaremos más adelante)

- Preferencias de navegación para tu página. 

## Importante

Las cookies viven en el navegador, por lo que son fácilmente accesibles por múltiples elementos externos.

Por ningún motivo guardamos información sensible en una cookie. Nunca guardamos información de métodos de pago, contraseñas, ni cualquier dato que pudiera comprometer la seguridad del cliente.

### Características

- A las cookies se les puede configurar un tiempo de vida. Una vez finalizado el mismo, la cookie se elimina del navegador.
- Al almacenarse del lado del cliente, el espacio con el que se cuenta es limitado, por lo que se recomienda elegir de forma adecuada lo que se vaya a guardar como cookie.
- Podemos asignarles claves secretas para poder aumentar la seguridad
- Viven en el navegador, así que no guardamos datos sensibles

# Instalar

npm install cookie-parser

npm install express express-handlebars cookie-parser dotenv mongoose 


## Cookie firmada

Como las cookies son almacenadas en el navegador, pueden llegar a ser alteradas mucho más fácilmente que si ésta viviera en el servidor. Es por ello que necesitamos agregar un factor de seguridad para que la cookie se “invalide” en caso de que haya sido modificada.

No podemos evitar que alguien externo altere la cookie, pero sí podemos indicar que, en caso de que la cookie ya no sea exactamente idéntica a la generada, entonces la pase como cookie inválida



## Cookie parser

Como las cookies son almacenadas en el navegador, pueden llegar a ser alteradas mucho más fácilmente que si ésta viviera en el servidor. Es por ello que necesitamos agregar un factor de seguridad para que la cookie se “invalide” en caso de que haya sido modificada.

No podemos evitar que alguien externo altere la cookie, pero sí podemos indicar que, en caso de que la cookie ya no sea exactamente idéntica a la generada, entonces la pase como cookie inválida

Inicializamos.

app.use(cookieParser("Passw0rd"));



## Session 

El sistema de sesiones permitirá que el servidor tenga almacenada información referente al cliente, con el fin de que éste pueda mantenerse identificado al momento de hacer las peticiones.

¡Finalmente rompemos el anonimato! Una vez que el cliente pase por un proceso de login, podemos procesar esa información para mantener reconocido al cliente y poder brindarle respuestas particulares acorde con su rol en la página

Session permite conseguir este almacenamiento de información de cliente. Este podremos utilizarlo a través del elemento req.session.

Algunas características de session son:

- La información que se quiera guardar en session se almacena del lado del servidor.
- Del lado del cliente, se crea un identificador único para poder acceder a esa información desde el navegador.
- Los datos almacenados en session se borran al cerrar la ventana del navegador.
- Se utiliza principalmente para guardar los datos de usuario al iniciar sesión..

## Utilizando Session
Instalar npm install express-session



npm install express express-handlebars express-session dotenv mongoose session-file-store connect-mongo
