const productoQueries = {
  insert: 'insert into productos (nombre, descripcion, imagenLink, detalles, precio, precioOferta) values ( ?, ?, ?, ?, ?, ? );',
  selectAll: 'select productoId, nombre, descripcion, imagenLink, detalles, precio, preciooferta from productos;',
  update: 'update productos set nombre = ?, descripcion = ?, imagenLink = ?, detalles = ?, precio = ?, preciooferta = ? where productoId = ?',
  /* delete: 'delete from productos where productoId = ?', */
  delete: 'call eliminarProducto(?)'
}
export default productoQueries;