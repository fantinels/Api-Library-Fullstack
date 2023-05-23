const express = require('express')
const rota = require('./rota/rota')
const rotaLivro = require('./rota/livro_rota')
const rotaCliente = require('./rota/cliente_rota')
const rotaAutor = require('./rota/autor_rota')

const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/retirada", rota)
app.use("/api/devolucao", rota)
app.use("/api/livros", rotaLivro)
app.use("/api/clientes", rotaCliente)
app.use("/api/autor", rotaAutor)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})