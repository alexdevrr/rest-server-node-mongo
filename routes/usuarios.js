const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const {
  esRoleValido,
  emailExiste,
  existeUsuaroiPorId,
} = require('../helpers/db-validators');

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

/**
 *  TODO: Siempre que usemos check, tendremos que usar
 * validarCampos ya que ahí se guardan los erroes  y nos
 * permite no ejecutar la ruta, o no llegar a ella
 * */

/**
 * @swagger
 * tags:
 *  name: Usuarios
 *  description: Endpoints para loguearnos con nuestra cuenta, dar de alta a usuarios, validar roles, etc.
 */

/**
 * @swagger
 * paths:
 *  /usuarios/:
 *   get:
 *      summary: Obtiene los datos de todos los usuarios que están guardados en la base de datos
 *      tags: [Usuarios]
 *      responses:
 *          '200':
 *            description: OK
 *            examples:
 *              application/json: {"total": 6, "usuarios": ["estado": true, "google": false, "nombre": "Alex", "email": "alexadmin@gmail.com", "rol": "ADMIN_ROLE", "uid": "62903bdad779dd9f8c0d05d3"]}
 *
 *
 */

const router = Router();

router.get('/', usuariosGet);
/**
 * @swagger
 * paths:
 *  /usuarios/:
 *   post:
 *      summary: Endpoint para dar de alta a usuarios
 *      tags: [Usuarios]
 *      responses:
 *          '200':
 *            description: Ok
 *            examples:
 *              application/json: {"usuario": ["estado": true, "google": false, "nombre": "Alex", "email": "alexadmin@gmail.com", "rol": "ADMIN_ROLE", "uid": "62903bdad779dd9f8c0d05d3"]}
 *
 *
 */
router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check(
      'password',
      'El password es obligatorio y debe de ser mayor a 6 caracteres'
    )
      .isLength({ min: 6 })
      .not()
      .isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailExiste),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom((rol) => esRoleValido(rol)),
    validarCampos,
  ],
  usuariosPost
);
/**
 * @swagger
 * paths:
 *  /usuarios/{id}:
 *   put:
 *      summary: Endpoint para modificar a un usuario en específico
 *      tags: [Usuarios]
 *      parameters:
 *       - in: id
 *         description: Numeric ID of the user to put
 *
 *
 */
router.put(
  '/:id',
  [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuaroiPorId),
    // Evita que el usuario ingrese roles no válidos
    check('rol').custom((rol) => esRoleValido(rol)),
    validarCampos,
  ],
  usuariosPut
);

router.patch('/', usuariosPatch);

/**
 * @swagger
 * paths:
 *  /usuarios/{id}:
 *   delete:
 *      summary: Endpoint para hacer un borrado lógico de un usuario
 *      tags: [Usuarios]
 *      parameters:
 *       - in: id
 *         description: Numeric ID of the user to delete
 *      responses:
 *          '200':
 *            description: Ok
 *            examples:
 *              application/json: {"usuario": ["estado": true, "google": false, "nombre": "Alex", "email": "alexadmin@gmail.com", "rol": "ADMIN_ROLE", "uid": "62903bdad779dd9f8c0d05d3"]}
 *          '401':
 *            description: Unaunthorized
 *            examples:
 *              application/json: {"msg": "No se ha mandando el token en la petición"}
 *          '400':
 *            description: Bad Request
 *            examples:
 *              application/json: {"errors": [ "value": "62942d3b7ee19000168e2390",
 *              "msg": "El ID 62942d3b7ee19000168e2390 no existe en la DB",
 *              "param": "id",
 *              "location": "params"]}
 *
 *
 */
router.delete(
  '/:id',
  [
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuaroiPorId),
    validarCampos,
  ],

  usuariosDelete
);

module.exports = router;
