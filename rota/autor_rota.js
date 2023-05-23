const express = require('express')
const controller = require('../controller/autor_controller')

const router = express.Router()

router.post('/', controller.cadastrarAutores)
router.get('/:nome', controller.buscarAutorPorNome)
router.get('/:id', controller.buscarAutorPorId)
router.get('/', controller.buscarAutor)
router.put('/:id', controller.atualizarAutores)
router.delete('/:id', controller.deletarAutores)

module.exports = router