// Для подключения сокетов
// https://github.com/cherryApp/json-socket-server
const jsonServer = require('json-server')
const path = require('path')
const fs = require('fs')
const uuidv4 = require('uuidv4')

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

function getBrowserFromUserAgent(userAgent) {
    if (userAgent.includes('Chrome')) return 'Chrome'
    if (userAgent.includes('Firefox')) return 'Firefox'
    if (userAgent.includes('Safari')) return 'Safari'
    return 'Unknown'
}

function getOSFromUserAgent(userAgent) {
    if (userAgent.includes('Windows')) return 'Windows'
    if (userAgent.includes('Mac OS')) return 'macOS'
    if (userAgent.includes('Linux')) return 'Linux'
    if (userAgent.includes('Android')) return 'Android'
    if (userAgent.includes('iOS')) return 'iOS'
    return 'Unknown'
}

function getPlatformFromUserAgent(userAgent) {
    if (!userAgent) return 'unknown'

    const ua = userAgent.toLowerCase()

    // Мобильные устройства
    if (/mobile|android|iphone|ipod|ipad|blackberry|windows phone/.test(ua)) {
        // Проверяем, является ли это мобильным приложением или мобильным браузером
        if (/myapp|custom-app-name/.test(ua)) {
            return 'mobile-app' // кастомное мобильное приложение
        }
        return 'mobile' // мобильный браузер
    }

    // Планшеты
    if (/tablet|ipad|android(?!.*mobile)|kindle|silk/.test(ua)) {
        return 'tablet'
    }

    // Десктопные платформы
    if (/windows/.test(ua)) return 'desktop-windows'
    if (/macintosh|mac os/.test(ua)) return 'desktop-mac'
    if (/linux/.test(ua)) return 'desktop-linux'

    // Веб-браузеры (десктоп по умолчанию)
    if (/chrome|firefox|safari|edge|opera/.test(ua)) {
        return 'desktop-web'
    }

    // Боты и специальные клиенты
    if (/bot|crawler|spider|facebookexternalhit|telegrambot/.test(ua)) {
        return 'bot'
    }

    // Если ничего не определили - считаем веб-браузером
    return 'web'
}

function cleanupExpiredSessions() {
    try {
        const { db } = router

        const now = new Date()
        const expiredSessions = db
            .get('user_sessions')
            .filter((session) => new Date(session.expires_at) < now)
            .value()

        if (expiredSessions.length > 0) {
            // Логируем информацию об удаляемых сессиях
            expiredSessions.forEach((session) => {
                console.log(
                    `🗑️ Removing session for user ${session.user_id}, expired at ${session.expires_at}`,
                )
            })

            // Удаляем
            db.get('user_sessions')
                .remove((session) => new Date(session.expires_at) < now)
                .write()

            console.log(
                `✅ Cleaned up ${expiredSessions.length} expired sessions`,
            )
        } else {
            console.log(
                `✅ No expired sessions to clean up (${now.toISOString()})`,
            )
        }
    } catch (error) {
        console.error('❌ Error cleaning up sessions:', error)
    }
}

server.post('/login', (req, res) => {
    try {
        const { username, password } = req.body
        const { db } = router
        // eslint-disable-next-line camelcase
        const userFromBd = db.get('users').find({ username, password }).value()

        if (!userFromBd) {
            return res.status(403).json({ message: 'Not found user' })
        }

        const newSession = {
            id: uuidv4.uuid(), // уникальный ID сессии
            user_id: userFromBd.id, // тот же ID, что идет на фронтенд
            user_agent: req.headers['user-agent'],
            session_token: uuidv4.uuid(),
            ip_address: req.ip || req.connection.remoteAddress,
            platform: getPlatformFromUserAgent(req.headers['user-agent']),
            browser: getBrowserFromUserAgent(req.headers['user-agent']),
            os: getOSFromUserAgent(req.headers['user-agent']),
            created_at: new Date().toISOString(),
            last_activity_at: new Date().toISOString(),
            expires_at: new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000,
            ).toISOString(),
        }

        db.get('user_sessions').push(newSession).write()

        return res.json({
            ...userFromBd,
            password: '_',
            token: newSession.session_token,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
})

server.use(async (req, res, next) => {
    try {
        // Пропускаем публичные роуты (логин, регистрация)
        if (req.path === '/login' || req.path === '/register') {
            return next()
        }

        const token = req.headers.authorization

        if (!token) {
            return res.status(403).json({ message: 'AUTH ERROR' })
        }

        const { db } = router

        const activeSession = db
            .get('user_sessions')
            .find(
                (session) =>
                    session.session_token === token &&
                    new Date(session.expires_at) > new Date(),
            )
            .value()

        if (!activeSession) {
            return res
                .status(401)
                .json({ message: 'Session expired or not found' })
        }

        db.get('user_sessions')
            .find({ id: activeSession.id })
            .assign({
                last_activity_at: new Date().toISOString(),
                expires_at: new Date(
                    Date.now() + 30 * 24 * 60 * 60 * 1000,
                ).toISOString(), // продлеваем сессию
            })
            .write()

        // Сохраняем данные в запросе
        req.user = { id: activeSession.user_id }
        req.session = activeSession

        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
})

require('./routes/dialog/index')(server, router)
require('./routes/user/index')(server, router)
require('./routes/session/index')(server, router)

server.use(router)

server.listen(8000, () => {
    console.log('JSON Server is running')
    // Запускаем очистку сразу при старте
    cleanupExpiredSessions()

    setInterval(cleanupExpiredSessions, 1 * 60 * 60 * 1000)
})
