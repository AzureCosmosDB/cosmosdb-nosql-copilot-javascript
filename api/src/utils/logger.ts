import pino from 'pino'

const logger = pino({
    base: {
        pid: false
    },
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    }
})

export default logger;