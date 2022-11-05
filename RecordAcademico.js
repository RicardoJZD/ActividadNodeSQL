class RecordAcademico{
    constructor(Id, Codigo_rec, Fecha, Periodo, Nota1, Nota2, Promedio, Codigo_doc, Codigo_est ){
        this.Id = Id,
        this.Codigo_rec = Codigo_rec,
        this.Fecha = Fecha,
        this.Periodo = Periodo,
        this.Nota1 = Nota1,
        this.Nota2 = Nota2,
        this.Promedio = Promedio,
        this.Codigo_doc = Codigo_doc,
        this.Codigo_est = Codigo_est
    }
}

module.exports = RecordAcademico;