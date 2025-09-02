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

server.post('/users/:userId', (req, res) => {
    const { userId } = req.params
    const { folderName } = req.body

    const { db } = router
    const user = db.get('users').find({ id: userId }).value()

    if (!user) {
        return res.status(404).json({ error: 'User not found' })
    }

    const valueNewFolder = user.folders.length + 1

    const updateFolders = [
        ...user.folders,
        { value: String(valueNewFolder), title: folderName },
    ]

    db.get('users')
        .find({ id: userId })
        .assign({ folders: updateFolders })
        .write()

    res.json(user)
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
                    (item) => item !== userId,
                )

                const interlocutor = db.users.find(
                    (item) => item.id === interlocutorId,
                )

                return {
                    ...dialog,
                    interlocutor:
                        {
                            id: interlocutor.id,
                            firstName: interlocutor.firstName,
                            lastName: interlocutor.lastName,
                            username: interlocutor.username,
                            avatar: interlocutor.avatar,
                            dialogSettings: interlocutor.dialogSettings,
                            folders: interlocutor.folders,
                        } || null,
                }
            }

            return dialog
        })

    dialogs = dialogs.map((dialog) => {
        return {
            ...dialog,
            userSettings: dialog.userSettings[userId],
        }
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
        dialogs = dialogs.filter((dialog) => {
            const userFolders = dialog.userSettings.folders || []

            return userFolders.includes(folder)
        })
    }

    if (_sort) {
        dialogs.sort((a, b) => {
            const valA = _sort.split('.').reduce((o, i) => o[i], a)
            const valB = _sort.split('.').reduce((o, i) => o[i], b)

            // Получаем настройки пользователя (предполагаем, что userId известен)
            const userSettingsA = a.userSettings
            const userSettingsB = b.userSettings

            const currentFolder = folder || 'all'

            // Проверяем, закреплены ли диалоги
            const isPinnedA =
                userSettingsA?.pinned?.[currentFolder]?.isPinned || false
            const isPinnedB =
                userSettingsB?.pinned?.[currentFolder]?.isPinned || false

            // Получаем порядок закрепления
            const orderA =
                userSettingsA?.pinned?.[currentFolder]?.order || Infinity
            const orderB =
                userSettingsB?.pinned?.[currentFolder]?.order || Infinity

            // Сначала сортируем по pinned: закрепленные выше
            if (isPinnedA && !isPinnedB) return -1
            if (!isPinnedA && isPinnedB) return 1

            // Если оба закреплены, сортируем по order
            if (isPinnedA && isPinnedB) {
                if (orderA !== orderB) {
                    return orderB - orderA
                }
            }

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

server.patch('/dialogs/:dialogId/toggle-mute', (req, res) => {
    const { dialogId } = req.params
    const { userId } = req.body

    const { db } = router
    const dialog = db.get('dialogs').find({ id: dialogId }).value()

    if (!dialog) {
        return res.status(404).json({ error: 'Dialog not found' })
    }

    if (!dialog.userSettings[userId]) {
        return res.status(400).json({ error: 'User settings not found' })
    }

    const updatedSettings = {
        ...dialog.userSettings,
        [userId]: {
            ...dialog.userSettings[userId],
            isMuted: !dialog.userSettings[userId].isMuted,
        },
    }

    db.get('dialogs')
        .find({ id: dialogId })
        .assign({ userSettings: updatedSettings })
        .write()

    let resultDialog = db.get('dialogs').value()
    resultDialog = resultDialog.map((dialog) => {
        return {
            ...dialog,
            userSettings: dialog.userSettings[userId],
        }
    })

    res.json({
        data: resultDialog,
        currentPage: 1,
        totalPages: 1,
        totalItems: 1,
    })
})

server.patch('/dialogs/:dialogId/pinning-dialog', (req, res) => {
    const { dialogId } = req.params
    const { userId, nextOrder, pinned, valueFolder } = req.body

    const { db } = router
    const dialog = db.get('dialogs').find({ id: dialogId }).value()

    if (!dialog) {
        return res.status(404).json({ error: 'Dialog not found' })
    }

    if (!dialog.userSettings[userId]) {
        return res.status(400).json({ error: 'User settings not found' })
    }

    let updatedSettings

    if (pinned) {
        updatedSettings = {
            ...dialog.userSettings,
            [userId]: {
                ...dialog.userSettings[userId],
                pinned: {
                    ...dialog.userSettings[userId].pinned,
                    [valueFolder]: {
                        isPinned: pinned,
                        order: nextOrder,
                    },
                },
            },
        }
    } else {
        updatedSettings = {
            ...dialog.userSettings,
            [userId]: {
                ...dialog.userSettings[userId],
                pinned: {
                    ...dialog.userSettings[userId].pinned,
                    [valueFolder]: {
                        isPinned: pinned,
                        order: dialog.userSettings[userId].pinned[valueFolder]
                            .order,
                    },
                },
            },
        }
    }

    db.get('dialogs')
        .find({ id: dialogId })
        .assign({ userSettings: updatedSettings })
        .write()

    let resultDialog = db.get('dialogs').value()
    resultDialog = resultDialog.map((dialog) => {
        return {
            ...dialog,
            userSettings: dialog.userSettings[userId],
        }
    })

    res.json(resultDialog)
})

server.patch('/dialogs/:dialogId/leave-dialog', (req, res) => {
    const { dialogId } = req.params
    const { userId } = req.body

    const { db } = router
    const dialog = db.get('dialogs').find({ id: dialogId }).value()

    if (!dialog) {
        return res.status(404).json({ error: 'Dialog not found' })
    }

    if (!dialog.userSettings[userId]) {
        return res.status(400).json({ error: 'User settings not found' })
    }

    const updatedParticipants = dialog.participants.filter(
        (item) => item !== userId,
    )

    db.get('dialogs')
        .find({ id: dialogId })
        .assign({ participants: updatedParticipants })
        .write()

    res.json(dialog)
})

server.patch('/dialogs/:dialogId/add-to-folder', (req, res) => {
    const { dialogId } = req.params
    const { userId, valueFolder } = req.body

    const { db } = router
    const dialog = db.get('dialogs').find({ id: dialogId }).value()

    if (!dialog) {
        return res.status(404).json({ error: 'Dialog not found' })
    }

    if (!dialog.userSettings[userId]) {
        return res.status(400).json({ error: 'User settings not found' })
    }

    if (dialog.userSettings[userId].folders.includes(valueFolder)) {
        return res.status(400).json({ error: 'Такая папка уже есть' })
    }

    const updatedFolders = {
        ...dialog.userSettings,
        [userId]: {
            ...dialog.userSettings[userId],
            folders: [...dialog.userSettings[userId].folders, valueFolder],
        },
    }

    db.get('dialogs')
        .find({ id: dialogId })
        .assign({ userSettings: updatedFolders })
        .write()

    let resultDialog = db.get('dialogs').value()
    resultDialog = resultDialog.map((dialog) => {
        return {
            ...dialog,
            userSettings: dialog.userSettings[userId],
        }
    })

    res.json(resultDialog)
})

server.patch('/dialogs/:dialogId/remove-to-folder', (req, res) => {
    const { dialogId } = req.params
    const { userId, valueFolder } = req.body

    const { db } = router
    const dialog = db.get('dialogs').find({ id: dialogId }).value()

    if (!dialog) {
        return res.status(404).json({ error: 'Dialog not found' })
    }

    if (!dialog.userSettings[userId]) {
        return res.status(400).json({ error: 'User settings not found' })
    }

    if (!dialog.userSettings[userId].folders.includes(valueFolder)) {
        return res.status(400).json({ error: 'Такая папки нет' })
    }

    const updatedFolders = {
        ...dialog.userSettings,
        [userId]: {
            ...dialog.userSettings[userId],
            folders: dialog.userSettings[userId].folders.filter(
                (item) => item !== valueFolder,
            ),
        },
    }

    db.get('dialogs')
        .find({ id: dialogId })
        .assign({ userSettings: updatedFolders })
        .write()

    let resultDialog = db.get('dialogs').value()
    resultDialog = resultDialog.map((dialog) => {
        return {
            ...dialog,
            userSettings: dialog.userSettings[userId],
        }
    })

    res.json(resultDialog)
})

server.patch('/dialogs/:dialogId/update-read-status', (req, res) => {
    const { dialogId } = req.params
    const { userId } = req.body

    const { db } = router
    const dialog = db.get('dialogs').find({ id: dialogId }).value()

    if (!dialog) {
        return res.status(404).json({ error: 'Dialog not found' })
    }

    if (!dialog.userSettings[userId]) {
        return res.status(400).json({ error: 'User settings not found' })
    }

    const updatedUnreadCount = {
        ...dialog.userSettings,
        [userId]: {
            ...dialog.userSettings[userId],
            unreadCount: dialog.userSettings[userId].unreadCount > 0 ? 0 : 1,
        },
    }

    db.get('dialogs')
        .find({ id: dialogId })
        .assign({ userSettings: updatedUnreadCount })
        .write()

    let resultDialog = db.get('dialogs').value()
    resultDialog = resultDialog.map((dialog) => {
        return {
            ...dialog,
            userSettings: dialog.userSettings[userId],
        }
    })

    res.json(dialog)
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
