const path = require('path')

module.exports = (server, router) => {
    const db = router.db

    server.delete('/user_sessions/logout-others', (req, res) => {
        try {
            const session_token = req.headers.authorization

            if (!session_token) {
                return res
                    .status(400)
                    .json({ error: 'Session token is required' })
            }

            const currentSession = db
                .get('user_sessions')
                .find({ session_token: session_token })
                .value()

            if (!currentSession) {
                return res
                    .status(404)
                    .json({ error: 'Current session not found' })
            }

            const userId = currentSession.user_id

            db.get('user_sessions')
                .remove(
                    (session) =>
                        session.user_id === userId &&
                        session.session_token !== session_token,
                )
                .write()

            const remainingSessions = db
                .get('user_sessions')
                .filter((session) => session.user_id === userId)
                .value()

            res.json({
                message: 'All other sessions terminated successfully',
                terminated_count: remainingSessions.length - 1, // -1 т.к. текущая осталась
                current_session_id: currentSession.id,
            })
        } catch (error) {
            console.error('Error terminating sessions:', error)
            res.status(500).json({ error: 'Internal server error' })
        }
    })

    server.delete('/user_sessions/:sessionId', (req, res) => {
        try {
            const { sessionId } = req.params

            if (!sessionId) {
                return res
                    .status(400)
                    .json({ error: 'Session token is required' })
            }

            db.get('user_sessions')
                .remove((session) => session.session_token === sessionId)
                .write()

            res.json({
                status: 'success',
            })
        } catch (error) {
            console.error('Error terminating sessions:', error)
            res.status(500).json({ error: 'Internal server error' })
        }
    })
}
