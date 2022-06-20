const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
   if(req.user.token==="ADMIN"){
        next();
   }else{
        return res.status(401).json({ code: 401, message: 'No cuentas con los permisos necesarios' });
   }
}