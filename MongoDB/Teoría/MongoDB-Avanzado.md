## Elementos a integrar

- Clases
- Express y modelo request / response
- Router y Multer
- Handlebars
- MongoDB y Mongoose

### DAO 

Data access Object

## Glosario
- DBaaS: Database as a Service. Sirve para poder contar con un alojamiento de nuestra base de datos desde un servidor en la nube, para evitar hacer almacenamientos físicos propios.

- Mongo Atlas : DBaaS pensada para MongoDB para setear Clusters y alojar múltiples bases de datos.

- Cliente CLI: Cliente que conecta a la base de datos desde una terminal de comandos.

- Cliente UI: Cliente que conecta a la base de datos a partir de un programa de escritorio, como MongoDB Compass

- Cliente Web: Cliente que conecta a la base de datos a partir del navegador, como la gestión a partir de Atlas

- Cliente App:   Client que conecta dentro de nuestro sistema de backend. Como nuestro programa de nodejs con mongoose.

- Mongoose:   ODM utilizado para gestionar schemas definidos para mantener un control en la flexibilidad de MongoDB. Además de otras operaciones importantes para el manejo de sus datos.



### Indexación

Es un recurso utilizado en MongoDB para poder hacer consultas mucho más rápidas.

Éste nos permitirá tener una referencia previa al momento de buscar un documento, con el fin de evitar recorrer toda la colección, documento por documento, hasta encontrar dicho valor. 

El índice se asocia a un atributo del documento y permite que las búsquedas se hagan desde puntos específicos, evitando el recorrido completo de la colección.


Prever un buen plan de indexación evitará problemas de lentitud en las consultas y se considera una práctica necesaria a nivel enterprise, al momento de configurar los schemas de nuestros distintos modelos.
¡Hagamos hábito de utilizarlos!



### Procedimiento

Luego de crear el modelo del esquema y de la collection, se realiza la indexación.
 

Ejecutar:
C:\Users\Ryzen3\Documents\GitHub\Desafios_Curso_BackEnd_CoderHouse\MongoAvanzado_I\src\index.js
Exist[ia una diferencia en el 
para response:
executionTimeMillis: 0,

para response1:
executionTimeMillis: 1,

Luego de agregar la indexación en products.models.js

para response:
executionTimeMillis: 1,

para response1:
executionTimeMillis: 1,


Tal vez porque son muy pocos los productos y no se nota la diferencia. 


Resumen:
Es evidente que hay una reducción en el tiempo de respuesta, y que esta mejora de performance será mucho más notoria conforme el número de documentos crezca.

Entonces, podemos crear indexación de los campos que consideremos que pueden ocasionar problemas de lentitud dentro de nuestras búsquedas

Parte de tu trabajo está en analizar los servicios que utiliza tu aplicativo, para poder desarrollar una estrategia de indexación adecuada a las búsquedas que realicemos en la base de datos.

#####
# Importante
Un índice no debe ser utilizado en todos los campos, sólo deben ser utilizados en los campos que sepamos tienen repercusión en nuestras búsquedas. 

Colocar un índice en cada campo de cada documento, significa alentar procesos de escritura en cada insert, así también como generar un almacenamiento adicional e innecesario en la base de datos.


###### #### ######

Population

###

Aggregation

Consiste en la realización de múltiples operaciones, generalmente sobre múltiples documentos.

Pueden utilizarse para:

- Agrupar documentos con base en un criterio específico.

- Realizar alguna operación sobre dichos documentos, con el fin de obtener un solo resultado.

- Analizar cambios de información con el paso del tiempo.




- $count : Cuenta el número de documentos disponibles que se encuentren en la stage actual.

- $group: Permite agrupar los documentos disponibles en nuevos grupos según un criterio especificado. cada grupo cuenta con un _id nuevo, además de los valores acumulados.

- $limit: Limita el número de documentos que saldrán de dicha stage.

- $lookup: Permite realizar un “left join” (combinación de campos), de una colección de la misma base de datos a los documentos de la stage actual.

- $set / $addFields : Agregan una nueva propiedad a los documentos que se encuentren en dicha stage.

- $skip: Devuelve sólo los documentos que se encuentren después del offset indicado.

- $sort: Ordena los documentos en la stage actual.

- $match: Devuelve sólo los documentos que cumplan con un criterio de búsqueda, podemos colocar filtros comunes aquí

- $merge: escribe los resultados del pipeline en una colección. Debe ser la última stage del pipeline para poder funcionar.

### Paginación

mongoose-paginate-v2 es un plugin para mongoose que nos permitirá realizar paginaciones eficientes para los modelos que nosotros especifiquemos.

npm install mongoose-paginate-v2

docs: Los documentos devueltos en la página
totalDocs: Los documentos totales de la consulta realizada.
limit: Límite de resultados por página.
page: Página actual en la que nos encontramos
totalPages: Páginas totales que pueden ser solicitadas en la búsqueda.
hasNextPage: Indica si es posible avanzar a una página siguiente.
nextPage: Página siguiente en la búsqueda
hasPrevPage: Indica si es posible retroceder a una página anterior.
prevPage: Página anterior en la búsqueda.
pagingCounter: Número de documento en relación con la página actual.



Para CARTS
 
 no entiendo

PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body

