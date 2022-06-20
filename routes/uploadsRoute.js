/**
 * Ruta para la carga y recuperación de imágenes locales.
 * Path: api/uploads/
 */


const { Router } = require("express");
const expressFileUpload = require('express-fileupload');
const auth = require('../middleware/auth')
const { getImage, uploadImage } = require("../controllers/uploadsController");

const router = Router();

router.use(expressFileUpload());

router.get("/:filename", getImage); // Busca una imagen
router.put("/", auth, uploadImage); // Carga una imagen

module.exports = router;
