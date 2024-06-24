const productoQueries = {
  insert: 'insert into productos (nombre, descripcion, imagenLink, detalles, precio, precioOferta) values ( ?, ?, ?, ?, ?, ? );',
  selectAll: 'select productoId, nombre, descripcion, imagenLink, detalles, precio, preciooferta from productos;',
  update: 'update productos set nombre = ?, descripcion = ?, imagenLink = ?, detalles = ?, precio = ?, preciooferta = ? where productoId = ?',
  /* delete: 'delete from productos where productoId = ?', */
  delete: 'call eliminarProducto(?)',
  selectOfert: 'SELECT * FROM PRODUCTOS ORDER BY RAND() LIMIT 5',
  addToCart: 'insert into carritodecompras(codigoProducto, userId) values (?, ?)',
  getForCart: `select productoId, nombre, descripcion, imagenLink, detalles, precio, preciooferta 
              from carritoDeCompras c join productos p on c.codigoProducto = p.productoId  where c.userId = ?`
}
export default productoQueries;