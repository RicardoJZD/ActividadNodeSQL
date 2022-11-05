var config = require("./dbconfig");
const sql = require("mssql");
const Asignaturas = require("./Asignaturas");

//Funcion para mostrar las asignaturas
async function getAsignaturas() {
    try {
        let pool = await sql.connect(config);
        let Asignaturas = await pool.request()
            .query('SELECT * FROM Asignaturas')
        return Asignaturas.recordset
    } catch (error) {
        console.log(error)
    }
}
//Mostrar por Id
async function getAsigId(Id) {
    try {
        let pool = await sql.connect(config);
        let mosAsidId = await pool.request()
            .input('Id', sql.Int, Id)
            .query('SELECT * FROM Asignaturas WHERE Id = @Id')
        return mosAsidId.recordset
    } catch (error) {
        console.log(error)
    }
}


//Creacion funcion de insertar(Post)
async function postAsignatura(Asignaturas) {
    try {
        let pool = await sql.connect(config);
        let insertarAsig = await pool.request()
            .input('Codigo_asig', sql.NVarChar, Asignaturas.Codigo_asig)
            .input('Nombre', sql.NVarChar, Asignaturas.Nombre)
            .input('Creditos', sql.Int, Asignaturas.Creditos)
            .query("INSERT INTO Asignaturas (Codigo_asig, Nombre, Creditos) VALUES(@Codigo_asig, @Nombre, @Creditos)")
        return insertarAsig.recordset;
    } catch (error) {
        console.log(error)
    }
}
//Creacion de la funcion Editar(Put-Update)
async function updateAsig(Asignaturas, Id) {
    try {
        let pool = await sql.connect(config);
        let actulizar = await pool.request()
            .input('Id', sql.Int, Id)
            .input('Codigo_asig', sql.NVarChar, Asignaturas.Codigo_asig)
            .input('Nombre', sql.NVarChar, Asignaturas.Nombre)
            .input('Creditos', sql.Int, Asignaturas.Creditos)
            .query("UPDATE Asignaturas SET Codigo_asig = @Codigo_asig, Nombre = @Nombre, Creditos = @Creditos WHERE Id = @Id")
        return actulizar.recordset;
    } catch (error) {
        console.log(error)
    }

}

//Creacion de la funcion Eliminar(Delete)
async function deleteAsig(Id) {
    try {
        let pool = await sql.connect(config);
        let eliminar = await pool.request()
            .input('Id', sql.Int, Id)
            .query("DELETE Asignaturas WHERE Id = @Id")
        return eliminar.recordset;
    } catch (error) {
        console.log(error)
    }

}

//Exportacion de funciones
module.exports = {
    getAsignaturas: getAsignaturas,
    postAsignatura: postAsignatura,
    updateAsig: updateAsig,
    deleteAsig: deleteAsig,
    getAsigId: getAsigId
}
