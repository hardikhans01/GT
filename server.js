const app = require('./app');

const PORT = 5001;

const server = app.listen(PORT,() => {
    console.log(`Server listening on port ${PORT}`);
})