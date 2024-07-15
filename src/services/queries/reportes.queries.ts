const reportesQueries = {
  getAllReportes:'select * from reportes',
  crearReporte:'insert into reportes (idReporte,idUsuario,fechaReporte,montoGastado) values (?, ?, ?, ?)',
  reportesCount:'SELECT COUNT(*) as count FROM Reportes',
  añadirCompras:'insert into comprasRealizadas (idcompra,idReporte,idProducto,cantidad,precioUnitario) values (?, ?, ?, ?, ?)',
  getComprasByReporte:'select idcompra,idReporte,idProducto,cantidad,precioUnitario from comprasRealizadas where idReporte = ?',

}
export default reportesQueries;