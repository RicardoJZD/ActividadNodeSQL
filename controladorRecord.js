var config = require("./dbconfig");
const sql = require("mssql");
const RecordAcademico = require("./RecordAcademico");

//Mostrar Record
async function getRecord() {
    try {
        let pool = await sql.connect(config);
        let mosRecord = await pool.request()
            .execute('SP_MostrarRecord')
        return mosRecord.recordset
    } catch (error) {
        console.log(error)
    }
}
//Mostrar por Id
async function getRecId(Id) {
    try {
        let pool = await sql.connect(config);
        let mosRecdId = await pool.request()
            .input('Id', sql.Int, Id)
            .query('SELECT * FROM RecordAcademico WHERE Id = @Id')
        return mosRecdId.recordset
    } catch (error) {
        console.log(error)
    }
}
//Insertar Record academico
async function postRecord(RecordAcademico) {
    try {
        let pool = await sql.connect(config);
        let insRec = await pool.request()
            .input('Codigo_rec', sql.NVarChar, RecordAcademico.Codigo_rec)
            .input('Fecha', sql.Date, RecordAcademico.Fecha)
            .input('Periodo', sql.NVarChar, RecordAcademico.Periodo)
            .input('Nota1', sql.Float, RecordAcademico.Nota1)
            .input('Nota2', sql.Float, RecordAcademico.Nota2)
            .input('Codigo_doc', sql.NVarChar, RecordAcademico.Codigo_doc)
            .input('Codigo_est', sql.NVarChar, RecordAcademico.Codigo_est)
            .execute("SP_ADDRECORD")
        return insRec.recordset;
    } catch (error) {
        console.log(error)
    }
}
//Editar RECORD
async function updateRecord(RecordAcademico, Id) {
    try {
        let pool = await sql.connect(config);
        let updateRecord = await pool.request()
            .input('Id', sql.Int, Id)
            .input('Codigo_rec', sql.NVarChar, RecordAcademico.Codigo_rec)
            .input('Fecha', sql.Date, RecordAcademico.Fecha)
            .input('Periodo', sql.NVarChar, RecordAcademico.Periodo)
            .input('Nota1', sql.Float, RecordAcademico.Nota1)
            .input('Nota2', sql.Float, RecordAcademico.Nota2)
            .input('Codigo_doc', sql.NVarChar, RecordAcademico.Codigo_doc)
            .input('Codigo_est', sql.NVarChar, RecordAcademico.Codigo_est)
            .execute("SP_UPDATERECORD")
        return updateRecord.recordset;
    } catch (error) {
        console.log(error)

    }
}
//Delete Records
async function deleteRec(Id) {
    try {
        let pool = await sql.connect(config);
        let eliminarRec = await pool.request()
            .input('Id', sql.Int, Id)
            .execute('SP_DeletRec')
        return eliminarRec.recordset;
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    getRecord: getRecord,
    postRecord: postRecord,
    updateRecord: updateRecord,
    deleteRec: deleteRec,
    getRecId: getRecId
}