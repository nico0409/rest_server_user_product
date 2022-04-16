const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generarJWT');


const login = async (req, res) => {

    const { correo, password } = req.body;
    try {
        //verificar que el correo exista
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'El correo no existe'
            }
            )
        }

        //verificar si el usuario esta activo
        console.log('usuario inactivo' + usuario.estado);
        if (!usuario.estado) {

            return res.status(400).json({
                msg: 'El usuario no esta activo'
            }
            )
        }
        //verificar que el password sea correcto
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'El password es incorrecto'
            }
            )
        }

        //generar el jwt
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })
    } catch (error) {

        console.log(error);
        res.status(500).json({
            log: error,
            msg: 'hable con el administrador'
        })
    }


}


module.exports = {
    login
}
