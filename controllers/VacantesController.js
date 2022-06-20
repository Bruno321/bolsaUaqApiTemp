//Models
const Vacantes = require("../models/Vacantes");
const Empresas = require("../models/Empresas");

/* Regresa todas las vacantes */
exports.getVacantes = async (req,res,next) => {
    try {
        const vacantes = await Vacantes.findAll({
            // include: [{ model: Empresas, attributes: ['nombreEmpresa'],order:[
            //     ['nombreEmpresa','ASC']
            // ]}],
            // // order:[
            // //     ['empresas','ASC']
            // // ]
            include: [{ model: Empresas, attributes: ['nombreEmpresa']}],
            order:[
                [{model: Empresas,}, 'nombreEmpresa', 'ASC']
            ]
        });
        return res.status(200).json({ message: vacantes });
    } catch (error) {
    console.log(error)
        return res
        .status(400)
        .json({ message: "Error al obtener las vacantes" }); 
    }
}

/* Regresa las vacantes de la empresa logeada */
exports.getVacante = async (req,res,next) => {
    try {
        const {empresaId} = req.user
        const vacantes = await Vacantes.findAll({where:{empresaId}});
        // TODO que tambien regrese el nombre de la empresa
        return res.status(200).json({ message: vacantes });
    } catch (error) {
        console.log(error)
        return res
        .status(401)
        .json({ message: "Error al obtener las vacantes" }); 
    }
}

/* Regresa el archivo PDF */
exports.getVacantePdf = async (req,res,next) => {
    // return 
}

/* Crea una vacante */
exports.postVacante = async (req,res,next) => {
    let data = req.body.form;
    const {empresaId} = req.user
    data.empresaId = empresaId
    console.log(data)
    try {
       const vacante = await Vacantes.create(data)
    
       return res.status(200).json({ message:  "Solicitud de vacante enviada" });
      } catch (error) {
        return res.status(401).json({ message: error });
      }

}

/* Edita la vacante */
exports.putVacante = async (req,res,next) => {
    const {empresaId} = req.user;
    let data = req.body.form
    data.status = 2
    try {
       const vacante = await Vacantes.findOne({where:{empresaId}})
       vacante.set(data)
       await vacante.save()
    
       return res.status(200).json({ message: `${vacante.nombreVacante} editada correctamente` });
      } catch (error) {
        return res.status(400).json({ message: error });
    }
    
}

/* Cambia el status de una vacante, cualquier int diferente de 0,1,2 regresa error */
exports.patchVacantes = async (req,res,next) => {
    const {status,id} = req.body.data
    if(status===0 || status===1 || status===2){
        try {
            console.log("statuuuuuuuus: ", id)
            const vacante = await Vacantes.findOne({where:{vacanteId:id}})
            vacante.status =  status
            await vacante.save()
        
           return res.status(200).json({ message: `${vacante.nombreVacante} editada correctamente` });
          } catch (error) {
              console.log(error)
            return res.status(400).json({ message: error });
        }
    }else{
        return res.status(400).json({ message: "Datos incorrectos" });
    }
}

/* Cambia la disponibilidad de una vacante, cualquier int diferente de 0,1 regresa error (solo la misma empresa puede realizar esta accion)*/
exports.patchVacante = async (req,res,next) => {
    const {isDisponible,vacanteId} = req.body.data
    if(isDisponible===0 || isDisponible===1){
        try {
           const vacante = await Vacantes.findOne({where:{vacanteId:vacanteId,empresaId:req.user.empresaId}})
           console.log(vacante.isDisponible)
           if(vacante.empresaId===req.user.empresaId){

               vacante.isDisponible = isDisponible
               await vacante.save()
               return res.status(200).json({ message: `${vacante.nombreVacante} editada correctamente` });
           }else{
                return res.status(401).json({ message: "No cuentas con los permisos necesarios" });
           }
        
          } catch (error) {
              console.log(error)
            return res.status(400).json({ message: "Algo salio mal" });
        }
    }else{
        return res.status(400).json({ message: "No cuentas con los permisos necesarios" });
    }
}
