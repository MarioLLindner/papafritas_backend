const productoQueries = {
  insert: 'insert into productos (nombre, marca, descripcion, imagenLink, detalles, precio, precioOferta, stock) values ( ?, ?, ?, ?, ?, ?, ?, ? );',
  selectAll: 'select productoId, nombre, marca, descripcion, imagenLink, detalles, precio, preciooferta, stock from productos;',
  update: 'update productos set nombre = ?, marca = ?, descripcion = ?, imagenLink = ?, detalles = ?, precio = ?, preciooferta = ?, stock = ? where productoId = ?',
  /* delete: 'delete from productos where productoId = ?', */
  delete: 'call eliminarProducto(?)',
  selectOfert: 'SELECT * FROM PRODUCTOS ORDER BY RAND() LIMIT 5',
  addToCart: 'insert into carritodecompras(codigoProducto, userId) values (?, ?)',
  delToCart: 'delete from carritoDeCompras where codigoProducto = ? and userId = ?',
  getForCart: `select productoId, nombre, marca, descripcion, imagenLink, detalles, precio, preciooferta, stock 
              from carritoDeCompras c join productos p on c.codigoProducto = p.productoId  where c.userId = ?`,
  selectOne: 'select productoId, nombre, marca, descripcion, imagenLink, detalles, precio, preciooferta, stock from productos where productoId = ?;',
}
export default productoQueries;