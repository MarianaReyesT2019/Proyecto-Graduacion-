const express = require('express')
const router = express.Router()

const Gallinas = require('../model/gallinasModel') // Importa el modelo Gallinas
const verifyToken = require('../middlewares/verifyToken')

router.use(verifyToken)

// GET: Obtener todas las gallinas
router.get('/', async (req, res) => {
  try {
    const gallinas = await Gallinas.findAll()
    res.json(gallinas)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las gallinas' })
  }
})

// GET: Obtener una gallina por ID
router.get('/:id', async (req, res) => {
  try {
    const gallina = await Gallinas.findByPk(req.params.id)
    if (gallina) {
      res.json(gallina)
    } else {
      res.status(404).json({ error: 'Gallina no encontrada' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la gallina' })
  }
})

// POST: Crear una nueva gallina
router.post('/', async (req, res) => {
  try {
    const nuevaGallina = await Gallinas.create(req.body)
    res.status(201).json(nuevaGallina)
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la gallina' })
  }
})

// PUT: Actualizar una gallina existente por ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Gallinas.update(req.body, {
      where: { ID: req.params.id }
    })
    if (updated) {
      const gallinaActualizada = await Gallinas.findByPk(req.params.id)
      res.json(gallinaActualizada)
    } else {
      res.status(404).json({ error: 'Gallina no encontrada' })
    }
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar la gallina' })
  }
})

// DELETE: Eliminar una gallina existente por ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Gallinas.destroy({
      where: { ID: req.params.id }
    })
    if (deleted) {
      res.status(204).json()
    } else {
      res.status(404).json({ error: 'Gallina no encontrada' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la gallina' })
  }
})

module.exports = router
