const { request } = require("express");
const { response } = require("express");

const esAdminRole = (req = request, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'se quiere verificar el rol sin validar el token primero'
        });
    }

    console.log(req.usuario);
    req.usuario.rol === 'ADMIN_ROLE' ? next() : res.status(401).json({
        msg: 'No tiene permisos para realizar esta acción'
    });

}


const tieneRole = (...roles) => {

    return (req = request, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'se quiere verificar el rol sin validar el token primero'
            });
        }
        if (roles.includes(req.usuario.rol)) {
            next();
        } else {
            res.status(401).json({
                msg: 'No tiene permisos para realizar esta acción'
            });

        }
    }
}
module.exports = { esAdminRole, tieneRole };