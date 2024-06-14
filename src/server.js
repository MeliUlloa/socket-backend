const express = require ('express');
//inicializamos express
const app = express();
//le pasamos la constante app que creamos arriba
const http = require('http').Server(app);
//le pasamos la constante http
const io = require('socket.io')(http);

//indicamos que queremos cargar los archivos estaticos que se encuentran en dicha carpeta
app.use(express.static('/public'))
//esta ruta carga nuetsro archivo index.html en la raiz de la misma
app.get('/', (req,res)=> {
    res.sendFile('index.html', {root:__dirname})
}) 
// el servidor funsionando en el puerto 3000
http.listen(3000,() => console.log('SERVER ON')) 

io.on('connection', (socket)=>{
    // "connection" se ejecuta la primera vez que se abre una nueva conexion
    console.log('Usuario conectado')
    // se imprimia solo la primera vez que se ha abierto la conexion
}) 

// Servidor
io.on('connection', socket=>{
    console.log ('Usuario conectos')
    socket.emit('mi mensaje', 'Este es mi mensaje desde el servidos')
})

//Cliente
socket.on('mi mensaje', data =>{
    alert(data)
})

//Cliente 
socket.on('mi mensaje', data =>{
    alert(data)
    socket.emit('notificacion','Mensaje recibido exitosamente')
})

//Servidor

socket.on('notificacion', data =>{
    console.log(data)
})

io.on('connection', socket =>{
    console.log('!Nuevo cliente conectado!');
    /*Envio los mensajes al cliente que se conecto*/
    socket.emit('mensajes', mensajes);
    /*Esculo los mensajes enviados por el cliente y se los propago a todos*/
    socket.on('mensajes', data=>{
        mensajes.push({socketid: socket.id, mensaje: data})
        io.socket.emit('mensajes', mensajes);
    }); 
});