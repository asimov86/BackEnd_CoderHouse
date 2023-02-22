1. Base de datos: Recopilación organizada de datos.
2. Utilidades de una DB:
    - Almacenamiento más seguro.
    - Segmentación de datos.
    - Gestión sencilla una vez configurada.
3. Comparación entre FS y DB.
4. Modelo relacional y no relacional.
5. Problema de las bases Relacionales
6. Cuándo usar base de datos relacional y cuándo usar no relacional?



# Instalar MongoDB

1. Visitar la página oficial.
    - Instalar community Server.
        https://www.mongodb.com/try/download/community
    - Seleccionar S.O
    - Descargar.
    - Instalar.

# De tener problemas al inicializar desde CLI mongo o mongod. Instalar: https://www.mongodb.com/docs/mongodb-shell/
# Agragar también PATH C:\Program Files\MongoDB\Server\6.0\bin


# Para inicializar el servico a la DB
C:\Users\Ryzen3\Documents> mongod

# Desde otro CLI ejecutar
C:\Users\Ryzen3\Documents> mongosh
 # De ese modo se comnecta a la base inicializada con "mongod"

# ver bases
Show dbs
# crea la base de datos, se para en dicha DB
use mongoLocal
# Crear una collection
db.createCollection('persona')
# busca la tabla
db.persona.find()
# insertar una persona
# le crea de una vez un id
db.persona.insertOne({name: 'John', age:24, surName: 'Klickoff'})
# ver lo insertado
db.persona.find
# si intertamos otro y cambiamos algo
db.persona.insertOne({name: 'Mathias', age:22, lastName: 'Heit', telephone: 12312432})
# de igual manera lo agregad, por más que tengas campos de más o distintos

# CRUD en mongoDB

# CRUD es un acónimo que hace referencia a las cuatro operaciones fundamentales de una base de datos:
- Create
- Read
- Update
- Delete

# Nuevos comnandos de apoyo
- db: muestra en qué base estamos posicionados.
- show collections
- db.dropDatabase(): elimina la collection en la que estas posicionado.
- db.collectionDrop(): elimina la collection en la que estas posicionado.

# Hasta que no creas una collection dentro de una DB no se termina de crear la DB.

# Comandos CRUD

- db.[name_collection].insertOne(doc) : Agrega un nuevo documento a la colección seleccionada.
- db.[name_collection].insertMany(docs): Agrega múltiples documentos a la colección seleccionada (dado un arreglo de documentos).
- db.[name_collection].findOne(opt): Busca un elemento que cumpla con los criterios de búsqueda (opt), devuelve el primer documento que cumpla con dicho criterio.
- db.[name_collection].find(opt):Devuelve todos los documentos que cumplan con dicho criterio. 
- db.[name_collection].find(opt).pretty(): Añadido para hacer más presentables los resultados de un find().


# Conteo de datos
- db.[name_collection].estimatedDocumentCount() Cuenta el estimado más próximo  al número de documentos según su metadata.
- db.[name_collection].countDocuments(opt) Cuenta los documentos que cumplan con el criterio definido en las opciones (opt).

# Ejemplo
Employee> db.pruebaMany.find({name:'tres'})
[ { _id: ObjectId("63dfc869490d198b6f779e4e"), name: 'tres' } ]

# Ejemplo
baseCRUD> db.createCollection('mascotas')
{ ok: 1 }
baseCRUD> db.mascotas.insertMany([{nombre:'cookie', especie:'perro', edad:'2'},{nombre:'scott', especie:'perro', edad:'3'},{nombre:'tigre', especie:'gato', edad:'5'}])
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId("63dfca6e490d198b6f779e50"),
    '1': ObjectId("63dfca6e490d198b6f779e51"),
    '2': ObjectId("63dfca6e490d198b6f779e52")
  }
}
baseCRUD> db.mascotas.countDocuments(especie)
ReferenceError: especie is not defined
baseCRUD> db.mascotas.countDocuments('especie')
MongoServerError: the match filter must be an expression in an object
baseCRUD> db.mascotas.find('mascotas')
MongoInvalidArgumentError: Query filter must be a plain object or ObjectId
baseCRUD> db.mascotas.find(mascotas)
ReferenceError: mascotas is not defined
baseCRUD> db.mascotas.find({edad>3})
Uncaught:
SyntaxError: Unexpected token, expected "," (1:22)

> 1 | db.mascotas.find({edad>3})
    |                       ^
  2 |

baseCRUD> db.mascotas.find({edad:3})

baseCRUD> db.mascotas.find()
[
  {
    _id: ObjectId("63dfca6e490d198b6f779e50"),
    nombre: 'cookie',
    especie: 'perro',
    edad: '2'
  },
  {
    _id: ObjectId("63dfca6e490d198b6f779e51"),
    nombre: 'scott',
    especie: 'perro',
    edad: '3'
  },
  {
    _id: ObjectId("63dfca6e490d198b6f779e52"),
    nombre: 'tigre',
    especie: 'gato',
    edad: '5'
  }
]
baseCRUD> db.mascotas.find({especie:'perro'})
[
  {
    _id: ObjectId("63dfca6e490d198b6f779e50"),
    nombre: 'cookie',
    especie: 'perro',
    edad: '2'
  },
  {
    _id: ObjectId("63dfca6e490d198b6f779e51"),
    nombre: 'scott',
    especie: 'perro',
    edad: '3'
  }
]
baseCRUD> db.mascotas.find({especie:'perro'}).pretty()
[
  {
    _id: ObjectId("63dfca6e490d198b6f779e50"),
    nombre: 'cookie',
    especie: 'perro',
    edad: '2'
  },
  {
    _id: ObjectId("63dfca6e490d198b6f779e51"),
    nombre: 'scott',
    especie: 'perro',
    edad: '3'
  }
]
baseCRUD> db.mascotas.estimatedDocumentCount()
3
baseCRUD> db.mascotas.countDocuments({especie: 'perro'})
2

#####

# Ejemplo:
baseCRUD> use colegio
switched to db colegio
colegio> db.createCollection('estudiantes')
{ ok: 1 }
colegio> db.estudiantes.insertMany([{nombre: 'Adán', apellido: 'Gonzáles', curso: 'SQL', edad: 24, coreo: 'adang@gmail.com', sexo: 'M'},{nombre: 'Luis', apellido: 'Gómez', curso: 'SQL', edad: 23, coreo: 'luisgg@gmail.com', sexo: 'M'},{nombre: 'María', apellido: 'Marcano', curso: 'Desarrollo WEB', edad: 21, coreo: 'mym@gmail.com', sexo: 'F'},{nombre: 'fernanda', apellido: 'Claro', curso: 'Marketing', edad: 26, coreo: 'fC@gmail.com', sexo: 'F'},{nombre: 'Clara', apellido: 'Herrera', curso: 'Java', edad: 25}])
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId("63dfd084490d198b6f779e53"),
    '1': ObjectId("63dfd084490d198b6f779e54"),
    '2': ObjectId("63dfd084490d198b6f779e55"),
    '3': ObjectId("63dfd084490d198b6f779e56"),
    '4': ObjectId("63dfd084490d198b6f779e57")
  }
}
colegio> db.estudiantes.find
db.estudiantes.find               db.estudiantes.findOne            db.estudiantes.findOneAndDelete   db.estudiantes.findOneAndReplace  db.estudiantes.findOneAndUpdate

colegio> db.estudiantes.find()
[
  {
    _id: ObjectId("63dfd084490d198b6f779e53"),
    nombre: 'Adán',
    apellido: 'Gonzáles',
    curso: 'SQL',
    edad: 24,
    coreo: 'adang@gmail.com',
    sexo: 'M'
  },
  {
    _id: ObjectId("63dfd084490d198b6f779e54"),
    nombre: 'Luis',
    apellido: 'Gómez',
    curso: 'SQL',
    edad: 23,
    coreo: 'luisgg@gmail.com',
    sexo: 'M'
  },
  {
    _id: ObjectId("63dfd084490d198b6f779e55"),
    nombre: 'María',
    apellido: 'Marcano',
    curso: 'Desarrollo WEB',
    edad: 21,
    coreo: 'mym@gmail.com',
    sexo: 'F'
  },
  {
    _id: ObjectId("63dfd084490d198b6f779e56"),
    nombre: 'fernanda',
    apellido: 'Claro',
    curso: 'Marketing',
    edad: 26,
    coreo: 'fC@gmail.com',
    sexo: 'F'
  },
  {
    _id: ObjectId("63dfd084490d198b6f779e57"),
    nombre: 'Clara',
    apellido: 'Herrera',
    curso: 'Java',
    edad: 25
  }
]
colegio> db.estudiantes.find({sexo:'M'})
[
  {
    _id: ObjectId("63dfd084490d198b6f779e53"),
    nombre: 'Adán',
    apellido: 'Gonzáles',
    curso: 'SQL',
    edad: 24,
    coreo: 'adang@gmail.com',
    sexo: 'M'
  },
  {
    _id: ObjectId("63dfd084490d198b6f779e54"),
    nombre: 'Luis',
    apellido: 'Gómez',
    curso: 'SQL',
    edad: 23,
    coreo: 'luisgg@gmail.com',
    sexo: 'M'
  }
]
colegio> db.estudiantes.find({sexo:'F'})
[
  {
    _id: ObjectId("63dfd084490d198b6f779e55"),
    nombre: 'María',
    apellido: 'Marcano',
    curso: 'Desarrollo WEB',
    edad: 21,
    coreo: 'mym@gmail.com',
    sexo: 'F'
  },
  {
    _id: ObjectId("63dfd084490d198b6f779e56"),
    nombre: 'fernanda',
    apellido: 'Claro',
    curso: 'Marketing',
    edad: 26,
    coreo: 'fC@gmail.com',
    sexo: 'F'
  }
]
colegio> db.estudiantes.estimatedDocumentCount()
5
colegio> db.estudiantes.estimatedDocumentCount({sexo:'F'})
5
colegio> db.estudiantes.countDocuments({sexo:'F'})
2


#####

# filtros complejos
- db.coll.find( {key: {$operator: val}} )  
- MongoDB: Operadores para Filtros de Query
- $and : Realiza operación AND -> sintaxis: {$and: [ {},{} ] }
- $or : Realiza operación OR -> sintaxis: {$or: [ {},{} ] }
- $lt : Coincide con valores que son menores que un valor especificado.
- $lte : Coincide con valores menores o iguales a un valor especificado.
- $gt : Coincide con valores mayores a un valor especificado.
- $gte : Coincide con valores mayores o iguales a un valor especificado.
- $ne : Coincide con valores que no son iguales a un valor especificado.
- $eq : Selecciona los documentos que son iguales a un valor especificado.
- $exists : Selecciona los documentos según la existencia de un campo.
- $in : Selecciona los documentos especificados en un array. sintaxis: {key:{$in: [array of values] } }
- $nin : Coincide con ninguno de los valores especificados en un array.
- $size : Coincide con el número de elementos especificados.
- $all : Coincide con todos los valores definidos dentro de un array.
- $elemMatch : Coincide con algún valor definido dentro del query.

## MongoDB: Búsqueda Avanzada
- db.coll.distinct( val ) devuelve un array con los distintos valores que toma un determinado campo en los documentos de la colección.
- db.coll.find({doc.subdoc:value}) Se utiliza para filtrar subdocumentos.
- db.coll.find({name: /^Max$/i}) filtra utilizando expresiones regulares


# Ejemplos de implementación de filtros

colegio> db.estudiantes.find({nombre:{$not:{$eq:'fernanda'}}})
[
  {
    _id: ObjectId("63dfd084490d198b6f779e53"),
    nombre: 'Adán',
    apellido: 'Gonzáles',
    curso: 'SQL',
    edad: 24,
    coreo: 'adang@gmail.com',
    sexo: 'M'
  },
  {
    _id: ObjectId("63dfd084490d198b6f779e54"),
    nombre: 'Luis',
    apellido: 'Gómez',
    curso: 'SQL',
    edad: 23,
    coreo: 'luisgg@gmail.com',
    sexo: 'M'
  },
  {
    _id: ObjectId("63dfd084490d198b6f779e55"),
    nombre: 'María',
    apellido: 'Marcano',
    curso: 'Desarrollo WEB',
    edad: 21,
    coreo: 'mym@gmail.com',
    sexo: 'F'
  },
  {
    _id: ObjectId("63dfd084490d198b6f779e57"),
    nombre: 'Clara',
    apellido: 'Herrera',
    curso: 'Java',
    edad: 25
  }
]
colegio> db.estudiantes.find({sexo:{$exists:true}})
[
  {
    _id: ObjectId("63dfd084490d198b6f779e53"),
    nombre: 'Adán',
    apellido: 'Gonzáles',
    curso: 'SQL',
    edad: 24,
    coreo: 'adang@gmail.com',
    sexo: 'M'
  },
  {
    _id: ObjectId("63dfd084490d198b6f779e54"),
    nombre: 'Luis',
    apellido: 'Gómez',
    curso: 'SQL',
    edad: 23,
    coreo: 'luisgg@gmail.com',
    sexo: 'M'
  },
  {
    _id: ObjectId("63dfd084490d198b6f779e55"),
    nombre: 'María',
    apellido: 'Marcano',
    curso: 'Desarrollo WEB',
    edad: 21,
    coreo: 'mym@gmail.com',
    sexo: 'F'
  },
  {
    _id: ObjectId("63dfd084490d198b6f779e56"),
    nombre: 'fernanda',
    apellido: 'Claro',
    curso: 'Marketing',
    edad: 26,
    coreo: 'fC@gmail.com',
    sexo: 'F'
  }
]
colegio> db.estudiantes.find({sexo:{$exists:false}})
[
  {
    _id: ObjectId("63dfd084490d198b6f779e57"),
    nombre: 'Clara',
    apellido: 'Herrera',
    curso: 'Java',
    edad: 25
  }
]

## Proyeciones
find(query, projection) ->
# Ejemplo
colegio> db.estudiantes.find({},{nombre:1})
[
  { _id: ObjectId("63dfd084490d198b6f779e53"), nombre: 'Adán' },
  { _id: ObjectId("63dfd084490d198b6f779e54"), nombre: 'Luis' },
  { _id: ObjectId("63dfd084490d198b6f779e55"), nombre: 'María' },
  { _id: ObjectId("63dfd084490d198b6f779e56"), nombre: 'fernanda' },
  { _id: ObjectId("63dfd084490d198b6f779e57"), nombre: 'Clara' }
]

# Sort

colegio> db.estudiantes.find().sort({edad:1})
[
  {
    _id: ObjectId("63dfd084490d198b6f779e55"),
    nombre: 'María',
    apellido: 'Marcano',
    curso: 'Desarrollo WEB',
    edad: 21,
    coreo: 'mym@gmail.com',
    sexo: 'F'
  },
  {
    _id: ObjectId("63dfd084490d198b6f779e54"),
    nombre: 'Luis',
    apellido: 'Gómez',
    curso: 'SQL',
    edad: 23,
    coreo: 'luisgg@gmail.com',
    sexo: 'M'
  },
  {
    _id: ObjectId("63dfd084490d198b6f779e53"),
    nombre: 'Adán',
    apellido: 'Gonzáles',
    curso: 'SQL',
    edad: 24,
    coreo: 'adang@gmail.com',
    sexo: 'M'
  },
  {
    _id: ObjectId("63dfd084490d198b6f779e57"),
    nombre: 'Clara',
    apellido: 'Herrera',
    curso: 'Java',
    edad: 25
  },
  {
    _id: ObjectId("63dfd084490d198b6f779e56"),
    nombre: 'fernanda',
    apellido: 'Claro',
    curso: 'Marketing',
    edad: 26,
    coreo: 'fC@gmail.com',
    sexo: 'F'
  }
]
colegio> db.estudiantes.find().sort({edad:-1})
[
  {
    _id: ObjectId("63dfd084490d198b6f779e56"),
    nombre: 'fernanda',
    apellido: 'Claro',
    curso: 'Marketing',
    edad: 26,
    coreo: 'fC@gmail.com',
    sexo: 'F'
  },
  {
    _id: ObjectId("63dfd084490d198b6f779e57"),
    nombre: 'Clara',
    apellido: 'Herrera',
    curso: 'Java',
    edad: 25
  },
  {
    _id: ObjectId("63dfd084490d198b6f779e53"),
    nombre: 'Adán',
    apellido: 'Gonzáles',
    curso: 'SQL',
    edad: 24,
    coreo: 'adang@gmail.com',
    sexo: 'M'
  },
  {
    _id: ObjectId("63dfd084490d198b6f779e54"),
    nombre: 'Luis',
    apellido: 'Gómez',
    curso: 'SQL',
    edad: 23,
    coreo: 'luisgg@gmail.com',
    sexo: 'M'
  },
  {
    _id: ObjectId("63dfd084490d198b6f779e55"),
    nombre: 'María',
    apellido: 'Marcano',
    curso: 'Desarrollo WEB',
    edad: 21,
    coreo: 'mym@gmail.com',
    sexo: 'F'
  }
]


# Skip y Limit


colegio> db.estudiantes.find().skip(1)
[
  {
    _id: ObjectId("63dfd084490d198b6f779e54"),
    nombre: 'Luis',
    apellido: 'Gómez',
    curso: 'SQL',
    edad: 23,
    coreo: 'luisgg@gmail.com',
    sexo: 'M'
  },
  {
    _id: ObjectId("63dfd084490d198b6f779e55"),
    nombre: 'María',
    apellido: 'Marcano',
    curso: 'Desarrollo WEB',
    edad: 21,
    coreo: 'mym@gmail.com',
    sexo: 'F'
  },
  {
    _id: ObjectId("63dfd084490d198b6f779e56"),
    nombre: 'fernanda',
    apellido: 'Claro',
    curso: 'Marketing',
    edad: 26,
    coreo: 'fC@gmail.com',
    sexo: 'F'
  },
  {
    _id: ObjectId("63dfd084490d198b6f779e57"),
    nombre: 'Clara',
    apellido: 'Herrera',
    curso: 'Java',
    edad: 25
  }
]

##
colegio> db.estudiantes.find().skip(3)
[
  {
    _id: ObjectId("63dfd084490d198b6f779e56"),
    nombre: 'fernanda',
    apellido: 'Claro',
    curso: 'Marketing',
    edad: 26,
    coreo: 'fC@gmail.com',
    sexo: 'F'
  },
  {
    _id: ObjectId("63dfd084490d198b6f779e57"),
    nombre: 'Clara',
    apellido: 'Herrera',
    curso: 'Java',
    edad: 25
  }
]

## Limit

colegio> db.estudiantes.find().limit(3)
[
  {
    _id: ObjectId("63dfd084490d198b6f779e53"),
    nombre: 'Adán',
    apellido: 'Gonzáles',
    curso: 'SQL',
    edad: 24,
    coreo: 'adang@gmail.com',
    sexo: 'M'
  },
  {
    _id: ObjectId("63dfd084490d198b6f779e54"),
    nombre: 'Luis',
    apellido: 'Gómez',
    curso: 'SQL',
    edad: 23,
    coreo: 'luisgg@gmail.com',
    sexo: 'M'
  },
  {
    _id: ObjectId("63dfd084490d198b6f779e55"),
    nombre: 'María',
    apellido: 'Marcano',
    curso: 'Desarrollo WEB',
    edad: 21,
    coreo: 'mym@gmail.com',
    sexo: 'F'
  }
]

colegio> db.estudiantes.find().skip(0).limit(3)
[
  {
    _id: ObjectId("63dfd084490d198b6f779e53"),
    nombre: 'Adán',
    apellido: 'Gonzáles',
    curso: 'SQL',
    edad: 24,
    coreo: 'adang@gmail.com',
    sexo: 'M'
  },
  {
    _id: ObjectId("63dfd084490d198b6f779e54"),
    nombre: 'Luis',
    apellido: 'Gómez',
    curso: 'SQL',
    edad: 23,
    coreo: 'luisgg@gmail.com',
    sexo: 'M'
  },
  {
    _id: ObjectId("63dfd084490d198b6f779e55"),
    nombre: 'María',
    apellido: 'Marcano',
    curso: 'Desarrollo WEB',
    edad: 21,
    coreo: 'mym@gmail.com',
    sexo: 'F'
  }
]

##

colegio> db.estudiantes.find().skip(3).limit(1)
[
  {
    _id: ObjectId("63dfd084490d198b6f779e56"),
    nombre: 'fernanda',
    apellido: 'Claro',
    curso: 'Marketing',
    edad: 26,
    coreo: 'fC@gmail.com',
    sexo: 'F'
  }
]

#### CRUD - UD
## Update & Delete

- db.collection.updateOne(query,update,option)
    - query: sirve para filtrar qué elementos actualizar (usa los filtros iguales al find)
    - update: Apartado para indicar qué actualizar de los documentos que cumplen con el filtro. Update tiene sus propios operadores como $set, $unset, $inc, $rename $mul, $min, $max
    - option: Opciones a tomar en cuenta para la actualización (como upsert, que inserta el valor en caso de que el documento a actualizar ni siquiera exista).
- db.collection.updateMany(query,update,options) Actualiza múltiples documentos que cumplan con el criterio. 


- db.collection.deleteOne({key:val}) : Elimina sólo el primer elemento que cumpla con el criterio, se usa principalmente para encontrar identificadores específicos.Se recomienda no utilizar si somos conscientes de que el valor a buscar no es repetido.
- db.collection.deleteMany({key:val}) :  Elimina todos los documentos que cumplan con el criterio, se usa cuando sabemos que más de un valor va a contar con ese valor y necesitamos hacer una limpieza general.





##### Ejercicio

- Listar todos los documentos de la colección estudiantes ordenados por edad descendente.

db.estudiantes.find().sort({edad: -1})

- Listar el estudiante más jóven.

db.estudiantes.find().sort({edad: -1}).limit(1)

- Listar el segundo estudiante más joven.

db.estudiantes.find().sort({edad: 1}).skip(1).limit(1)

- Listar los estudiantes del curso de SQL

db.estudiantes.find({curso:'SQL'})

- Listar los estudiantes del curso de SQL que tengan 23 años

colegio> db.estudiantes.find({$and:[{curso:'SQL'},{edad:23}]})

- Listar los estudiantes del curso de SQL que se llamen Luis o fernanda

colegio> db.estudiantes.find({$or:[{nombre:'Luis'},{nombre:'fernanda'}]})

- Listar los estudiantes mayores a 23 años

db.estudiantes.find({edad:{$gt:23}})


#####
##### Mongose
#####

# Clientes de BD

- Cliente GUI
- Cliente APP
- Cliente Web


# Database as a Service DBaaS

- Escalabilidad y factibilidad.

- ¿Qué pasa cuando tu empresa va creciendo y necesitamos almacenar cantidades enormes de información?
- ¿Estamos dispuestos a dedicar cuartos completos con bases de datos?
- ¿Qué tan elevados pueden llegar a ser los costos de tener que comprar infraestructura física para el negocio? ¿Valdrá la pena?
- ¿Y si hubiera forma de “rentar” dicho espacio a un proveedor, para sólo preocuparme en los aspectos más  superficiales de la base de datos?


## La solución: DBaaS
Utilizar una base de datos como servicio, implica el poder hacer uso de una base de datos, sin preocuparse en tener que gestionar todo el aspecto físico que éste implica, es decir, podemos rentar espacios para poder alojar la información de nuestra base de datos. 


Todos los aspectos físicos, de mantenimiento y seguridad de dichas bases de datos, vienen gestionados por el proveedor de dicho servicio.

Amazon, Google, Microsoft, Mongo Atlas son algunos ejemplos.


## MongoDB Atlas

# MongoDB Atlas: características destacadas
- Automatización: una manera fácil de crear, lanzar y escalar aplicaciones en MongoDB.
- Flexibilidad: DBaaS con todo lo necesario para las aplicaciones modernas.
- Seguridad: varios niveles de seguridad disponibles.
- Escalabilidad: gran escalabilidad sin interrumpir la actividad.
- Alta disponibilidad: implementaciones con tolerancia a errores y autoreparación predeterminadas.
- Alto rendimiento: el necesario para las cargas de trabajo exigentes.
## Ventajas: 
- Ejecución
- Puesta en marcha de un clúster en segundos.
- Implementaciones replicadas y sin interrupción.
- Total escalabilidad: escalado horizontal o vertical sin interrumpir la actividad.
- Revisiones automáticas y actualizaciones simplificadas.
- Protección y seguridad
- Autenticación y cifrado.
- Copias de seguridad continuas con recuperación temporal.
- Supervisión detallada y alertas personalizadas.



# MongoAtlas

Cluster: CoderCluster()
Usuario: kvelandia
Contraseña: Reveron.123 

## Conectando con nuestra aplicación: mongose
# Crear estructura de carpetas
npm init -y
npm install express express-handlebars
npm install mongose

- Crear archivo utils.js
- Crear carpeta models, dentro crear un modelo funcional para insertar datos a la tabla
- importar el user model en la ruta de los usuarios. users.router.js



## Siempre que trabajemos con Mongo los métodos son asíncronicos. OJO OJO O JO






### Seguir viendo>

https://www.youtube.com/watch?v=MYqpw0P31ms


Socket.io Nodejs Mongodb CRUD | Aplicación en tiempo real con websockets



db.carts.findOneAndDelete({_id: ObjectId('63e2f3aecae487e581d06f70'), products: {$elemMatch: {product: {$eq:23263}}}})