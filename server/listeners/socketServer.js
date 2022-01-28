import http from 'http'
import dotenv from 'dotenv'
import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import consola from 'consola'
import { addIOuser, registerUDPuser, removeIOuser } from '../controllers/userController'
import { sendInitData } from '../controllers/dataController'
import config from '../config/auth.config'
dotenv.config()

export const httpServer = http.createServer()
httpServer.listen(process.env.IOPORT, () => {
  consola.success(`Sockets listening on ${process.env.IOPORT}`)
})

export const io = new Server(httpServer, {
  cors: {
    origin: process.env.URL || 'http://localhost:' + process.env.PORT || 3000,
    methods: ['GET', 'POST'],
    credentials: true
  }
})

io.use(function (socket, next) {
  const authtoken = socket.handshake.headers.cookie
  const token = cookie.parse(authtoken)['auth._token.local'].split(' ')[1]

  if (cookie.parse(authtoken)['auth._token.local'] === 'false') {
    socket.decoded = false
    next()
  } else {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) { return next(new Error('Authentication error')) }
      socket.decoded = decoded
      next()
    })
  }
})
  .on('connection', (socket) => {
    addIOuser(socket)

    socket.on('register/game', (data) => {
      registerUDPuser(data, socket)
    })
    socket.on('room/join', (data) => {
      socket.join(data.data.slug)
      sendInitData(socket, data.data.slug)
    })
    socket.on('room/home', (data) => {
      sendInitData(socket)
    })
    socket.on('room/leave', (data) => {
      socket.leave(data.data.slug)
    })
    socket.on('disconnect', (reason) => {
      removeIOuser(socket, reason)
    })
  })
