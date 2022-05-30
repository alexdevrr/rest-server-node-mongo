const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();
/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Endpoint para loguearnos con nuestra cuenta
 */

/**
 * @swagger
 * paths:
 *  /auth/login:
 *   post:
 *      summary: Valida si existe el email, que sea un email válido, verifica si los campos no vienen vacíos
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          examples:
 *              application/json: { "usuario": ["estado": true,"google": false,"nombre": "Ale"]}
 *      responses:
 *          '200':
 *            description: ok
 *            examples:
 *              application/json: {"usuario": ["estado": true, "google": false, "nombre": "Alex", "email": "alexadmin@gmail.com", "rol": "ADMIN_ROLE","uid": "62903bdad779dd9f8c0d05d3"], "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2Mjk0MzA3ZDdlZTE5MDAwMTY4ZTIzOTEiLCJpYXQiOjE2NTM4Nzg5NzAsImV4cCI6MTY1Mzg5MzM3MH0.BQ_HHIXoIqj7ynTwhyFzElyughKnthR5Etv7tO5ohMM"}
 *          '400':
 *            description: Email no existe, Usuario o Password son incorrectos
 *          '500':
 *            description: Hable con el administrador de la DB
 *
 *
 */

router.post(
  '/login',
  [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La password es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  login
);

module.exports = router;
