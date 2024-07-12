const reportesQueries = {
  getAllReportes:'',
  crearReporte:'insert into reportes (idReporte,idUsuario,fechaReporte,montoGastado) values (?, ?, ?, ?)',
  reportesCount:'SELECT COUNT(*) as count FROM Reportes',


  añadirCompras:'insert into comprasRealizadas (idcompra,idReporte,idProducto,cantidad,precioUnitario) values (?, ?, ?, ?, ?)',
  
  getComprasByReporte:'',

}
export default reportesQueries;