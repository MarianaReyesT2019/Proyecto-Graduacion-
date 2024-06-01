const express = require('express') // Import the express framework
const app = express() // Create an instance of the express application
const path = require('path') // Import the path module for working with file paths
const cookieParser = require('cookie-parser') // Import cookie-parser for parsing cookies
const logger = require('morgan') // Import morgan for logging

require('dotenv').config()

// Importing custom Middlewares
const { testConnection } = require('./middlewares/databaseMiddleware')
const sessionMiddleware = require('./middlewares/sessionMiddleware')
const corsOptionsMiddleware = require('./middlewares/corsOptionsMiddleware')
const cspMiddleware = require('./middlewares/cspMiddleware')
const notFoundMiddleware = require('./middlewares/notFoundMiddleware')

// Importing backend routes
const indexRouter = require('./routes/indexRouter')
const usuariosRouter = require('./routes/userRouter')
const controlPosturaRouter = require('./routes/controlPosturaRouter.js')
const bodegaRouter = require('./routes/bodegaRouter.js')
const gallinasRouter = require('./routes/gallinasRouter.js')
const galponesRouter = require('./routes/galponesRouter.js')
const ventasRouter = require('./routes/ventasRouter.js')
const loginRouter = require('./routes/authRouter')
const registerRouter = require('./routes/registerRouter')
const errorMiddleware = require('./middlewares/errorMiddleware')

app.use(corsOptionsMiddleware()) // Use the CORS options middleware
app.use(sessionMiddleware()) // Use the session middleware
app.use(express.json()) // Parse incoming JSON requests
app.use(express.urlencoded({ extended: false })) // Parse incoming URL-encoded requests
app.use(express.static(path.join(__dirname, 'public'))) // Serve static files from the 'public' directory
app.use(logger('dev')) // Use the Morgan logger with the 'dev' format
app.use(cookieParser()) // Parse incoming cookies
app.use(testConnection) // Use the custom middleware for testing database connection
app.use(cspMiddleware) // Use the Content Security Policy middleware

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Using backend routes
app.use('/', indexRouter)
app.use('/api/v1', loginRouter)
app.use('/api/v1/register', registerRouter)
app.use('/api/v1/users', usuariosRouter)
app.use('/api/v1/control-postura', controlPosturaRouter)
app.use('/api/v1/bodega', bodegaRouter)
app.use('/api/v1/gallinas', gallinasRouter)
app.use('/api/v1/galpones', galponesRouter)
app.use('/api/v1/ventas', ventasRouter)

app.use(notFoundMiddleware) // Use the custom middleware for handling 404 errors
app.use(errorMiddleware) // Use the custom middleware for handling errors

module.exports = app
