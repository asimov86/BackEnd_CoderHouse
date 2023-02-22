##

## Session

Una sesión es un vínculo que se genera cuando el cliente conecta con un servidor, este vínculo se representa por una sessionId, la cual se guarda en el navegador como identificador de la sesión. Sin embargo… ¿Dónde se guarda la sesión en el servidor?

## Memory Storage

El almacenamiento de una sesión por memory storage es exactamente igual a la persistencia en memoria que trabajamos la clase pasada. Es un almacenamiento muy peligroso, ya que si el servidor muere o se reinicia, la sesión morirá con él y no habrá forma de recuperarla.

## File Storage

Al igual que las primeras clases del curso, el File storage permitirá dar una persistencia de archivos a las sesiones que trabajamos, esto hará que el servidor pueda tomarlas de algún lado en caso de que algo inesperado llegase a pasar (un reinicio, o una caída).

Así, los usuarios pueden seguir haciendo consultas con sus sessionid, y el servidor podrá consultarlas del archivo que persiste en éste.
Es un recurso simple y que tiene sus defectos, sin embargo, es una solución sencilla para resolver el asunto de sesiones, sin tener que ocupar recursos de terceros.

## instalar
npm install session-file-store

Posteriormente, inicializamos el fileStore como lo indica la imagen, esto utilizando los tres argumentos principales:
path, ttl, retires. 
Al final, se generará un archivo con la información indicada



## A considerar

Utilizando file storage

- Aun cuando reiniciemos el servidor, la sesión persistirá en el tiempo indicado

- Cuando llegue a expirar una sesión, el servidor generará un nuevo archivo con la consulta, indicando el nuevo sessionId.

- Los archivos viejos no se limpian automáticamente, quedan en un cementerio de registros, lo cual puede generar complicaciones futuras.



## Session storage con Mongo Atlas

¡Seguro ya lo habías pensado! Si FileSystem terminará generando conflictos, ¿podría solucionarse con bases de datos, como hicimos con nuestros carritos y productos? La respuesta es: sí, ¡y en qué forma!

Session puede trabajar de la mano con MongoDB y MongoAtlas para poder guardar una sesión en una base de datos, esto permitirá que las sesiones tengan una gestión más limpia, además de poder contar con autoeliminación de sesiones expiradas. 


