var config = require("./dbconfig");
const sql = require("mssql");
const Estudiantes = require("./Estudiantes")

//Mostrar Estudiantes
async function getEstudiantes() {
    try {
        let pool = await sql.connect(config);
        let mosEstudiantes = await pool.request()
            .execute('SP_MostrarEstudiantes')
        return mosEstudiantes.recordset
    } catch (error) {
        console.log(error)
    }
}
//Mostrar por Id
async function getEstId(Id) {
    try {
        let pool = await sql.connect(config);
        let mosEstdId = await pool.request()
            .input('Id', sql.Int, Id)
            .query('SELECT * FROM Estudiantes WHERE Id = @Id')
        return mosEstdId.recordset
    } catch (error) {
        console.log(error)
    }
}
// Insertar Estudiantes
async function postEstudiantes(Estudiantes) {
    try {
        let pool = await sql.connect(config);
        let insEstudiantes = await pool.request()
            .input('Codigo_est', sql.NVarChar, Estudiantes.Codigo_est)
            .input('Nombre_est', sql.NVarChar, Estudiantes.Nombre_est)
            .input('Apellido_est', sql.NVarChar, Estudiantes.Apellido_est)
            .input('Semestre', sql.NVarChar, Estudiantes.Semestre)
            .input('Carrera', sql.NVarChar, Estudiantes.Carrera)
            .input('Codigo_asig', sql.NVarChar, Estudiantes.Codigo_asig)
            .execute("SP_InsESTUDIANTE")
        return insEstudiantes.recordset;
    } catch (error) {
        console.log(error)
    }
}
//Editar Estudiantes
async function updateEstudiantes(Estudiantes, Id) {
    try {
        let pool = await sql.connect(config);
        let updateEstudiantes = await pool.request()
            .input('Id', sql.Int, Id)
            .input('Codigo_est', sql.NVarChar, Estudiantes.Codigo_est)
            .input('Nombre_est', sql.NVarChar, Estudiantes.Nombre_est)
            .input('Apellido_est', sql.NVarChar, Estudiantes.Apellido_est)
            .input('Semestre', sql.NVarChar, Estudiantes.Semestre)
            .input('Carrera', sql.NVarChar, Estudiantes.Carrera)
            .input('Codigo_asig', sql.NVarChar, Estudiantes.Codigo_asig)
            .execute("SP_UpdateEst")
        return updateEstudiantes.recordset;
    } catch (error) {
        console.log(error)

    }
}
//Delete Estudiantes
async function deleteEst(Id) {
    try {
        let pool = await sql.connect(config);
        let eliminarEst = await pool.request()
            .input('Id', sql.Int, Id)
            .execute('SP_DeletEst')
        return eliminarEst.recordset;
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    getEstudiantes: getEstudiantes,
    postEstudiantes: postEstudiantes,
    updateEstudiantes: updateEstudiantes,
    deleteEst: deleteEst,
    getEstId: getEstId
}