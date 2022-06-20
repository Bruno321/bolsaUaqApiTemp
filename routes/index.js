const express = require("express");
const router = express.Router();
const auth  = require('../middleware/auth') 
const isAdmin  = require('../middleware/isAdmin') 
const jwt = require("jsonwebtoken");


// Controllers
const EmpresasController = require('../controllers/EmpresasController')
const VacantesController = require('../controllers/VacantesController')
const { getImage } = require("../controllers/uploadsController");

module.exports = function () {
    /*----------Auth-----------*/
    /* login alumno */
    router.post("/loginEmpresa", EmpresasController.login);
    /* login trabajador */
    router.post("/loginVinculador", (req,res,next)=>{
        if(req.body.data.usuario==="ADMIN" && req.body.data.password==="ADMIN"){
            const token = jwt.sign(
                {
                    "token":"ADMIN",
                },
                'debugkey'
                );
                return res.status(200).json({ message: token });
        }else{
            return res.status(401).json({ message: "Datos incorrectos" });
        }
    });
  
    /*----------Empresa-----------*/
    /* GET obtener todas las empresas */
    router.get("/empresa",
        auth,
        isAdmin, 
        EmpresasController.getEmpresa);

    /* GET obtiene la informacion de una empresa */
    router.get("/empresaInfo",
        auth,
        EmpresasController.getEmpresaInfo);

    /* POST crea una empresa */
    router.post("/empresa",
        EmpresasController.postEmpresa);

    /* PATCH edita el status de una empresa */
    router.patch("/empresa",
        auth,
        isAdmin, 
        EmpresasController.patchEmpresa);
    
    /* PUT edita una empresa */
    router.put("/empresa",
        auth,
        EmpresasController.putEmpresa);

    /* GET busca la imagen de una empresa */
    router.get("/uploads/:filename", 
        getImage); 

    /* PUT sube la imagen de una empresa */
    // router.put("/empresaImg", 
    //     auth, 
    //     uploadImage); 

    /*----------Vacante-----------*/
    /* GET obtener todas las vacantes */
    router.get("/vacantes",
        auth, 
        isAdmin,
        VacantesController.getVacantes);
    /* GET obtiene las vacantes de la empresa logeada*/
    router.get("/vacante",
        auth, 
        VacantesController.getVacante);

    /* GET obtiene el archivo PDF de esa vacante */
    router.get("/vacantePdf/:id",
        auth, 
        isAdmin,
        VacantesController.getVacantePdf);

    /* POST crear una vacante */
    router.post("/vacante",
        auth, 
        VacantesController.postVacante);

    /* PATCH edita el status de una vacante */
    router.patch("/vacantes",
        auth, 
        isAdmin,
        VacantesController.patchVacantes);

    /* PUT edita una vacante*/
    router.put("/vacante",
        auth, 
        VacantesController.putVacante);

    /* PATCH edita la disponibilidad de una vacante*/
    router.patch("/vacante",
        auth, 
        VacantesController.patchVacante);

    return router
}