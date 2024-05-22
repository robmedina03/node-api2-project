// require your server and launch it here

const server = require('./api/server')

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
