var config = require("./dbconfig");
const sql = require("mssql");
const Docentes = require("./Docentes");

//Mostrar docentes
async function getDocentes() {
    try {
        let pool = await sql.connect(config);
        let mosDocentes = await pool.request()
            .execute('SP_MostrarDocentes')
        return mosDocentes.recordset
    } catch (error) {
        console.log(error)
    }
}
//Mostrar por Id
async function getXId(Id) {
    try {
        let pool = await sql.connect(config);
        let mosIdDoc = await pool.request()
            .input('Id', sql.Int, Id)
            .query('SELECT * FROM Docentes WHERE Id = @Id')
        return mosIdDoc.recordset
    } catch (error) {
        console.log(error)
    }
}

// Insertar Docentes
async function postDocentes(Docentes) {
    try {
        let pool = await sql.connect(config);
        let insDocente = await pool.request()
            .input('Codigo_doc', sql.NVarChar, Docentes.Codigo_doc)
            .input('Nombre_doc', sql.NVarChar, Docentes.Nombre_doc)
            .input('Apellido_doc', sql.NVarChar, Docentes.Apellido_doc)
            .input('Codigo_asig', sql.NVarChar, Docentes.Codigo_asig)
            .execute("SP_InsDocentes")
        return insDocente.recordset;
    } catch (error) {
        console.log(error)
    }
}
//Editar Docentes
async function updateDoce(Docentes, Id) {
    try {
        let pool = await sql.connect(config);
        let updateDocente = await pool.request()
            .input('Id', sql.Int, Id)
            .input('Codigo_doc', sql.NVarChar, Docentes.Codigo_doc)
            .input('Nombre_doc', sql.NVarChar, Docentes.Nombre_doc)
            .input('Apellido_doc', sql.NVarChar, Docentes.Apellido_doc)
            .input('Codigo_asig', sql.NVarChar, Docentes.Codigo_asig)
            .execute("SP_Update_Doce")
        return updateDocente.recordset;
    } catch (error) {
        console.log(error)

    }
}

//Delete Docente
async function deleteDocen(Id) {
    try {
        let pool = await sql.connect(config);
        let eliminarDoce = await pool.request()
            .input('Id', sql.Int, Id)
            .execute('SP_DeletDOCENTE')
        //.query("DELETE Docentes WHERE Id = @Id")
        return eliminarDoce.recordset;
    } catch (error) {
        console.log(error)
    }

}
//consulta multitablas
async function getAprobados() {
    try {
        let pool = await sql.connect(config);
        let mosAprobados = await pool.request()
            .execute('SP_MultiConsulta')
        return mosAprobados.recordset
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getDocentes: getDocentes,
    postDocentes: postDocentes,
    updateDoce: updateDoce,
    deleteDocen: deleteDocen,
    getAprobados: getAprobados,
    getXId: getXId
}