const { response } = require("express");
const { imagesService } = require("../services/");

const getImage = (req, res) => {
	const { filename } = req.params;
	const response = imagesService.getImage(filename); // Busca la ruta del archivo

	res.sendFile(response.data); // Devuelve el archivo correspondiente
}

const uploadImage = async (req, res) => {
	const file = req.files?.imagen;
	const response = await imagesService.uploadImage(file); // intenta cargar el archivo

	if (!response.ok) {
		return res.status(400).json({
			ok: false,
			message: response.message,
		});
	}

	res.json({
		ok: true,
		message: response.message,
		data: response.data
	});

}

module.exports = {
	getImage,
	uploadImage
}; 