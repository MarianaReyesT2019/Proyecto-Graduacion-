const express = require('express')
const router = express.Router()

const ControlPosturas = require('../model/controlPosturaModel') // Importa el modelo ControlPostura
const verifyToken = require('../middlewares/verifyToken')

router.use(verifyToken)

// Ruta para obtener todos los registros de ControlPostura
router.get('/', async (req, res) => {
  try {
    const controlPosturas = await ControlPosturas.findAll()
    res.status(200).json(controlPosturas)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error fetching ControlPostura records.' })
  }
})

// Ruta para crear un nuevo registro de ControlPostura
router.post('/', async (req, res) => {
  try {
    const nuevoControlPostura = await ControlPosturas.create(req.body)
    res.status(201).json(nuevoControlPostura)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error creating ControlPostura record.' })
  }
})
  
// Ruta para obtener un registro de ControlPostura por ID
router.get('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const controlPostura = await ControlPosturas.findByPk(id)
  
    if (controlPostura) {
      res.status(200).json(controlPostura)
    } else {
      res.status(404).json()
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error fetching ControlPostura record.' })
  }
})
  
// Ruta para actualizar un registro de ControlPostura por ID
router.put('/:id', async (req, res) => {
  const id = req.params.id
  const controlPosturaData = req.body
  
  try {
    const updatedRows = await ControlPosturas.update(
      controlPosturaData,
      {
        where: {
          ControlPosturaID: id
        }
      }
    )
  
    if (updatedRows > 0) {
      res.status(200).json()
    } else {
      res.status(404).json()
    }
  } catch (error) {
    console.error(error)
    res.status(500).json()
  }
})

// Ruta para eliminar un registro de ControlPostura por ID
router.delete('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const deletedRows = await ControlPosturas.destroy({
      where: {
        ControlPosturaID: id,
      },
    })

    if (deletedRows > 0) {
      res.status(200).json()
    } else {
      res.status(404).json()
    }
  } catch (error) {
    console.error(error)
    res.status(500).json()
  }
})

module.exports = router
