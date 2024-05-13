const usuariosQueries = {
  registrar: 'insert into usuario(email,password,telefono,provincia,ciudad,codigoPostal,direccion,activo) values (?, ?, ?, ?, ?, ?, ?, ?)',
  selectByUserAndPass: 'select from usuario where email = ? and password = ?',
}
/* i dont know */
export default usuariosQueries;