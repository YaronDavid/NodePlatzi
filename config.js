module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!',
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'yaron',
        password: process.env.MYSQL_PASS || 'yaron',
        database: process.env.MYSQL_DB || 'node',
    }
}