const express = require('express')
const router = express.Router()

const Ventas = require('../model/ventasModel') // Importa el modelo Ventas
const verifyToken = require('../middlewares/verifyToken')

router.use(verifyToken)

// GET: Obtener todas las ventas
router.get('/', async (req, res) => {
  try {
    const ventas = await Ventas.findAll()
    res.json(ventas)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las ventas' })
  }
})

// GET: Obtener una venta por ID
router.get('/:id', async (req, res) => {
  try {
    const venta = await Ventas.findByPk(req.params.id)
    if (venta) {
      res.json(venta)
    } else {
      res.status(404).json({ error: 'Venta no encontrada' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la venta' })
  }
})

// POST: Crear una nueva venta
router.post('/', async (req, res) => {
  try {
    const nuevaVenta = await Ventas.create(req.body)
    res.status(201).json(nuevaVenta)
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la venta' })
  }
})

// PUT: Actualizar una venta existente por ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Ventas.update(req.body, {
      where: { VentasID: req.params.id }
    })
    if (updated) {
      const ventaActualizada = await Ventas.findByPk(req.params.id)
      res.json(ventaActualizada)
    } else {
      res.status(404).json({ error: 'Venta no encontrada' })
    }
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar la venta' })
  }
})

// DELETE: Eliminar una venta existente por ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Ventas.destroy({
      where: { VentasID: req.params.id }
    })
    if (deleted) {
      res.status(204).json()
    } else {
      res.status(404).json({ error: 'Venta no encontrada' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la venta' })
  }
})

module.exports = router
