const path = require('path')

module.exports = (server, router) => {
    const { db } = router

    server.post('/users/:userId/create-folder', (req, res) => {
        const { userId } = req.params
        const { folderName } = req.body

        const user = db.get('users').find({ id: userId }).value()

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        const valueNewFolder = user.folders.length + 1
        const nextFolederValue =
            user.folders.reduce((max, item) => {
                return item.order > max.order ? item : max
            }).order + 1

        const updateFolders = [
            ...user.folders,
            {
                value: String(valueNewFolder),
                title: folderName,
                order: nextFolederValue,
            },
        ]

        db.get('users')
            .find({ id: userId })
            .assign({ folders: updateFolders })
            .write()

        res.json(user)
    })

    server.patch('/users/:userId/folder-edit', (req, res) => {
        const { userId } = req.params
        const { folderValue, newTitle } = req.body

        const user = db.get('users').find({ id: userId }).value()

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        if (!newTitle.trim().length) {
            return res
                .status(404)
                .json({ error: 'Название папки не может быть пустым' })
        }

        const folderExists = user.folders.some(
            (folder) => folder.value === folderValue,
        )
        if (!folderExists) {
            return res.status(404).json({ error: 'Folder not found' })
        }

        // Проверяем, нет ли дубликата названия (кроме текущей папки)
        const duplicateFolder = user.folders.find(
            (folder) =>
                folder.title.toLowerCase() === newTitle.trim().toLowerCase() &&
                folder.value !== folderValue,
        )

        if (duplicateFolder) {
            return res
                .status(400)
                .json({ error: 'Папка с таким названием уже существует' })
        }

        const updateFolders = user.folders.map((item) => {
            if (item.value === folderValue) {
                return {
                    value: item.value,
                    title: newTitle,
                }
            }
            return item
        })

        db.get('users')
            .find({ id: userId })
            .assign({ folders: updateFolders })
            .write()

        res.json(user)
    })

    server.patch('/users/:userId/user-settings', (req, res) => {
        const { userId } = req.params
        const { userSettings } = req.body

        const { db } = router
        const user = db.get('users').find({ id: userId }).value()

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        const updateUserSettings = {
            ...user.settings,
            ...userSettings,
            appearance: {
                ...user.settings.appearance,
                ...userSettings.appearance,
            },
        }

        db.get('users')
            .find({ id: userId })
            .assign({ settings: updateUserSettings })
            .write()

        res.json(user)
    })

    server.delete('/users/:userId/folder-delete', (req, res) => {
        const { userId } = req.params
        const { folderValue } = req.body

        const user = db.get('users').find({ id: userId }).value()

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        const updateFolders = user.folders.filter(
            (folder) => folder.value !== folderValue,
        )

        db.get('users')
            .find({ id: userId })
            .assign({ folders: updateFolders })
            .write()

        res.json(user)
    })

    server.patch('/users/:userId/reorder-folders', (req, res) => {
        const { userId } = req.params
        const { folders } = req.body

        if (!folders || !Array.isArray(folders)) {
            return res.status(400).json({ error: 'Folders array is required' })
        }

        const user = db.get('users').find({ id: userId }).value()

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        try {
            db.get('users').find({ id: userId }).assign({ folders }).write()

            const updatedUser = db.get('users').find({ id: userId }).value()

            res.json(updatedUser)
        } catch (error) {
            console.error('Error reordering folders:', error)
            res.status(500).json({ error: 'Internal server error' })
        }
    })
}
