// Для подключения сокетов
// https://github.com/cherryApp/json-socket-server
const jsonServer = require('json-server')
const path = require('path')
const fs = require('fs')

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

server.post('/login', (req, res) => {
    try {
        const { username, password } = req.body
        const db = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, 'db.json'), 'utf-8'),
        )
        const { users = [] } = db

        const userFromBd = users.find(
            (user) => user.username === username && user.password === password,
        )

        if (userFromBd) {
            return res.json(userFromBd)
        }

        return res.status(403).json({ message: 'Not found user' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
})

server.get('/dialogs', (req, res) => {
    const db = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'),
    )

    const { userId, _limit, _page, _sort, folder, _query } = req.query

    if (!userId) {
        return res.status(400).json({ error: 'Missing userId parameter' })
    }

    const user = db.users.find((item) => item.id === userId)

    let dialogs = db.dialogs
        .filter((item) => item.participants.includes(userId))
        .map((dialog) => {
            if (dialog.type === 'private') {
                const interlocutorId = dialog.participants.find(
                    (item) => item !== req.query.userId,
                )

                const interlocutor = db.users.find(
                    (item) => item.id === interlocutorId,
                )

                return {
                    ...dialog,
                    interlocutor: interlocutor || null,
                }
            }

            return dialog
        })

    if (_query) {
        dialogs = dialogs.filter((dialog) => {
            const query = _query.toLowerCase()
            const title = dialog.title?.toLowerCase() || ''
            let userFullName = ''
            let userName = ''

            if (dialog.interlocutor) {
                userFullName =
                    `${dialog.interlocutor.firstName} ${dialog.interlocutor.lastName}`.toLowerCase()
                userName = dialog.interlocutor.username.toLowerCase()
            }

            return (
                title.includes(query) ||
                userFullName.includes(query) ||
                userName.includes(query)
            )
        })
    }

    if (folder) {
        dialogs = dialogs.filter((dialog) =>
            user.dialogs.some(
                (userDialog) =>
                    userDialog.dialogId === dialog.id &&
                    userDialog.folders.includes(folder),
            ),
        )
    }

    if (_sort) {
        dialogs.sort((a, b) => {
            const valA = _sort.split('.').reduce((o, i) => o[i], a)
            const valB = _sort.split('.').reduce((o, i) => o[i], b)

            return new Date(valB) - new Date(valA)
        })
    }

    const start = (_page - 1) * _limit
    const end = start + +_limit
    const paginatedDialogs = dialogs.slice(start, end)

    res.json({
        data: paginatedDialogs,
        currentPage: _page,
        totalPages: Math.ceil(dialogs.length / _limit),
        totalItems: dialogs.length,
    })
})

server.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'AUTH ERROR' })
    }

    next()
})

server.use(router)

server.listen(8000, () => {
    console.log('JSON Server is running')
})
