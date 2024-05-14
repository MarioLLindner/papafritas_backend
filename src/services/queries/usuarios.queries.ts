const usuariosQueries = {
  registrar: 'insert into usuario(email,password,telefono,provincia,ciudad,codigoPostal,direccion) values (?, ?, ?, ?, ?, ?, ?)',
  selectAll: 'select userId,email,password,telefono,provincia,ciudad,codigoPostal,direccion,activo from usuario',
  selectByEmailAndPass: 'select * from usuario where email = ? and password = ?',
}
/* i dont know */
export default usuariosQueries;