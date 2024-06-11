const usuariosQueries = {
  registrar: 'insert into usuario (email ,password ,nombre ,apellido, telefono ,provincia ,ciudad ,codigoPostal ,direccion) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
  selectAll: 'select userId ,email,nombre ,apellido ,password ,telefono ,provincia ,ciudad ,codigoPostal ,direccion ,activo from usuario',
  selectById: 'select * from usuario where userId = ?',
  selectByEmailAndPass: 'select * from usuario where email = ? and password = ?',
  update: 'update usuario set email = ?,nombre = ?,apellido = ?,password = ?,telefono = ?,provincia = ?,ciudad = ?,codigoPostal = ?,direccion = ?,activo = ? where userId = ?',
  delete: 'delete from usuario where userId=?'
}

export default usuariosQueries;