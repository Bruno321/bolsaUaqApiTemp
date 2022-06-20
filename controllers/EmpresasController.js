const jwt = require("jsonwebtoken");

//Models
const Empresas = require("../models/Empresas");

const { imagesService } = require("../services/");

exports.login = async (req,res,next) => {
    console.log(req.body.data)
    const { usuario, password } = req.body.data;

    const empresa = await Empresas.findOne({ where: { usuario: usuario,password:password,status:0} });

    if(!empresa) return  res.status(401).json({ msg: "Usuario o contraseña incorrecto" })
  
    const token = jwt.sign(
    {
        "empresaId":empresa.empresaId,
    },
    'debugkey'
    );
    return res.status(200).json({ message: token });
}

/* Regresa todas las empresas */
exports.getEmpresa = async (req,res,next) => {
    try {
        const empresas = await Empresas.findAll({
            order:[
                ['nombreEmpresa','ASC']
            ]
        });
        // const empresas = await Empresas.findAll();
        return res.status(200).json({ message: empresas }); 
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Error al obtener las empresas" }); 
    }
}

/* Regresa la informacion de una empresa */
exports.getEmpresaInfo = async (req,res,next) => {
    try {
        const {empresaId} = req.user
        const empresas = await Empresas.findOne({where:{empresaId}});
        // const empresas = await Empresas.findAll();
        return res.status(200).json({ message: empresas }); 
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Error al obtener la empresa" }); 
    }
}

/* Crea una empresa */
exports.postEmpresa = async (req,res,next) => {
    let data = req.body;
    // console.log(req.body)
    try {
        // aqui tenemos que subir la imagen
        console.log(req.files?.logo)
        const response = await imagesService.uploadImage(req.files?.logo);
        // Algo esta mal con la imagen
        if (!response.ok) {
            return res.status(400).json({
                ok: false,
                message: response.message,
            });
        }
        //  obtener su nuevo nombre y asignarlo a data.logo
        data.logo = response.data
        // finalmente se sube ese path a la DB
        const empresa = await Empresas.create(data)
    
        return res.status(200).json({ message: "Solicitud enviada correctamente" });
    
      } catch (error) {
        // console.log(error)
        return res.status(401).json({ message: error });
      }
}

/* Cambia el status de una empresa, cualquier int diferente de 0,1,2 regresa error */
exports.patchEmpresa = async (req,res,next) => {
    const {status,id} = req.body.data
    console.log(req.body.data)
    if(status===0 || status===1 || status===2){
        try {
           const empresa = await Empresas.findOne({where:{empresaId:id}})
           empresa.status = status
           await empresa.save()
        
           return res.status(200).json({ message: `${empresa.nombreEmpresa} editada correctamente` });
          } catch (error) {
              console.log(error)
            return res.status(400).json({ message: error });
        }
    }else{
        return res.status(400).json({ message: "Datos incorrectos" });
    }

}

/*Edita la información de una empresa */
exports.putEmpresa = async (req,res,next) => {
    const data = req.body.form
    const {empresaId} = req.user
    try{
        const empresa = await Empresas.findOne({where:{empresaId:empresaId}})
        empresa.set(data)
        await empresa.save()

       return res.status(200).json({ message: `${empresa.nombreEmpresa} editada correctamente` });
        
    } catch(e){
        console.log(e)
        return res.status(400).json({ message: "Algo salio mal" });
    }
}