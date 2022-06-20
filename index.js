const express = require('express')
const routes = require('./routes')
const db = require('./config/db')
const expressFileUpload = require('express-fileupload');
require('./models/Empresas')
require('./models/Vacantes')


db.sync()
    .then(() => console.log('DB connected'))
    .catch(error => console.log(error))

const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());

app.use('/', routes())

// app.use("/uploads", require("./routes/uploadsRoute"));  // a través de aquí se solicitan las imágenes

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
});