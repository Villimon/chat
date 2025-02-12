// Для подключения сокетов
// https://github.com/cherryApp/json-socket-server
const jsonServer = require('json-server')
const path = require('path')

const server = jsonServer.create()
const router = jsonServer.router(path.resolve(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.use(async (res, req, next) => {
    await new Promise((res) => {
        setTimeout(res, 800)
    })
    next()
})

// TODO Когда буду писать авторизацию здесь нужно будет написать запрос на /login, а также проверку на авторизацию через ключ

server.use(router)

server.listen(8000, () => {
    console.log('JSON Server is running')
})
