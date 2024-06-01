const express = require('express')
const router = express.Router()

const Galpones = require('../model/galponesModel') // Importa el modelo Galpones
const verifyToken = require('../middlewares/verifyToken')

router.use(verifyToken)

// GET: Obtener todos los galpones
router.get('/', async (req, res) => {
  try {
    const galpones = await Galpones.findAll()
    res.json(galpones)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los galpones' })
  }
})

// GET: Obtener un galpón por ID
router.get('/:id', async (req, res) => {
  try {
    const galpon = await Galpones.findByPk(req.params.id)
    if (galpon) {
      res.json(galpon)
    } else {
      res.status(404).json({ error: 'Galpón no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el galpón' })
  }
})

// POST: Crear un nuevo galpón
router.post('/', async (req, res) => {
  try {
    const nuevoGalpon = await Galpones.create(req.body)
    res.status(201).json(nuevoGalpon)
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el galpón' })
  }
})

// PUT: Actualizar un galpón existente por ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Galpones.update(req.body, {
      where: { ID: req.params.id }
    })
    if (updated) {
      const galponActualizado = await Galpones.findByPk(req.params.id)
      res.json(galponActualizado)
    } else {
      res.status(404).json({ error: 'Galpón no encontrado' })
    }
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el galpón' })
  }
})

// DELETE: Eliminar un galpón existente por ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Galpones.destroy({
      where: { ID: req.params.id }
    })
    if (deleted) {
      res.status(204).json()
    } else {
      res.status(404).json({ error: 'Galpón no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el galpón' })
  }
})

module.exports = router
