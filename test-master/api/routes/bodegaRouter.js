const express = require('express')
const router = express.Router()

const Bodega = require('../model/bodegaModel') // Importa el modelo Bodega
const verifyToken = require('../middlewares/verifyToken')

router.use(verifyToken)

// GET: Obtener todas las bodegas
router.get('/', async (req, res) => {
  try {
    const bodegas = await Bodega.findAll()
    res.json(bodegas)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las bodegas' })
  }
})

// GET: Obtener una bodega por ID
router.get('/:id', async (req, res) => {
  try {
    const bodega = await Bodega.findByPk(req.params.id)
    if (bodega) {
      res.json(bodega)
    } else {
      res.status(404).json({ error: 'Bodega no encontrada' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la bodega' })
  }
})

// POST: Crear una nueva bodega
router.post('/', async (req, res) => {
  try {
    const nuevaBodega = await Bodega.create(req.body)
    res.status(201).json(nuevaBodega)
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la bodega' })
  }
})

// PUT: Actualizar una bodega existente por ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Bodega.update(req.body, {
      where: { BodegaID: req.params.id }
    })
    if (updated) {
      const bodegaActualizada = await Bodega.findByPk(req.params.id)
      res.json(bodegaActualizada)
    } else {
      res.status(404).json({ error: 'Bodega no encontrada' })
    }
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar la bodega' })
  }
})

// DELETE: Eliminar una bodega existente por ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Bodega.destroy({
      where: { BodegaID: req.params.id }
    })
    if (deleted) {
      res.status(204).json()
    } else {
      res.status(404).json({ error: 'Bodega no encontrada' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la bodega' })
  }
})

module.exports = router
