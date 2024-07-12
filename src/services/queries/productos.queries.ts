const productoQueries = {
        insert: `insert into productos (nombre, marca, descripcion, imagenLink, detalles, precio, 
          precioOferta, stock, categoria, subcategoria) values ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        selectAll: `select productoId, nombre, marca, descripcion, imagenLink, detalles, precio, 
          preciooferta, stock, categoria, subcategoria from productos;`,
        update: `update productos set nombre = ?, marca = ?, descripcion = ?, imagenLink = ?,
          detalles = ?, precio = ?, preciooferta = ?, stock = ?, categoria = ?, subcategoria = ? where productoId = ?`,
        delete: 'call eliminarProducto(?)',

        selectOfert: 'SELECT * FROM PRODUCTOS WHERE precioOferta > 0 ORDER BY RAND() LIMIT 5',

        addToCart: 'insert into carritodecompras(codigoProducto, userId) values (?, ?)',
        delToCart: 'delete from carritoDeCompras where codigoProducto = ? and userId = ?',
        getForCart: `select productoId, nombre, marca, descripcion, imagenLink, detalles, precio, preciooferta, stock, categoria, subcategoria 
              from carritoDeCompras c join productos p on c.codigoProducto = p.productoId  where c.userId = ?`,
        deleteCart:'delete from carritoDeCompras where userId = ?',
        selectOne: `select productoId, nombre, marca, descripcion, imagenLink, detalles, precio, preciooferta, stock, categoria, subcategoria from productos where productoId = ?;`,

        getAllCategorias: 'select idCategoria, nombreCategoria from categorias',
        crearCategoria: 'insert into categorias (idCategoria, nombreCategoria) values ( ?, ?)',
        updateCategoria: 'update categorias set nombreCategoria = ? where idCategoria = ?',
        deleteCategoria: 'call eliminarCategoria(?)',

        getAllSubCategorias: 'select * from subCategorias ',
        getAllSubCategoriasByIDcategoria: 'select idSubCategoria, nombreSubCategoria from subCategorias where idCategoria = ?',
        crearSubCategoria: 'insert into subCategorias (idCategoria, nombreSubCategoria) values ( ?, ?)',
        updateSubCategoria: 'update subCategorias set idCategoria = ?, nombreSubCategoria = ? where idSubCategoria = ?',
        deleteSubCategoria: 'delete from SubCategorias where idSubCategoria = ?',





}
export default productoQueries;