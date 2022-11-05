--CREATE DATABASE Universidad
--GO
USE Universidad

CREATE TABLE Asignaturas(
Id INT IDENTITY (1,1) NOT NULL,
Codigo_asig VARCHAR(5) PRIMARY KEY,
Nombre VARCHAR(30) NOT NULL,
Creditos TINYINT NOT NULL,
)
GO
CREATE TABLE Docentes(
Id INT IDENTITY (1,1) NOT NULL,
Codigo_doc VARCHAR(5) PRIMARY KEY,
Nombre_doc VARCHAR(25) NOT NULL,
Apellido_doc VARCHAR(25) NOT NULL,
Codigo_asig VARCHAR(5) 
FOREIGN KEY REFERENCES Asignaturas (Codigo_asig)
ON UPDATE CASCADE
)
GO
CREATE TABLE Estudiantes(
Id INT IDENTITY (1,1) NOT NULL,
Codigo_est VARCHAR(5) PRIMARY KEY,
Nombre_est VARCHAR(25) NOT NULL,
Apellido_est VARCHAR(25) NOT NULL,
Semestre VARCHAR(15) NOT NULL,
Carrera VARCHAR(25) NOT NULL,
Codigo_asig VARCHAR(5) 
FOREIGN KEY REFERENCES Asignaturas (Codigo_asig)
ON UPDATE CASCADE
)
GO
CREATE TABLE RecordAcademico(
Id INT IDENTITY (1,1) NOT NULL,
Codigo_rec VARCHAR(5) PRIMARY KEY,
Fecha DATE NOT NULL,
Periodo VARCHAR(15) NOT NULL,
Nota1 FLOAT NOT NULL,
Nota2 FLOAT NOT NULL,
Promedio AS CONVERT(NUMERIC(5,2),(Nota1 + Nota2)/2),
Codigo_doc VARCHAR(5) 
FOREIGN KEY REFERENCES Docentes (Codigo_doc),
Codigo_est VARCHAR(5)
FOREIGN KEY REFERENCES Estudiantes(Codigo_est)
ON UPDATE CASCADE
)

CREATE PROC SP_MostrarDocentes
AS 
	BEGIN
	SELECT * FROM Docentes
	END

exec SP_MostrarDocentes

GO
ALTER PROC SP_InsDocentes(
	@Codigo_doc VARCHAR(5), 
	@Nombre_doc VARCHAR(25), 
	@Apellidos_doc VARCHAR(25), 
	@Codigo_asig VARCHAR(5)
)AS
	BEGIN
	INSERT INTO Docentes (Codigo_doc, Nombre_doc, Apellido_doc, Codigo_asig) 
	VALUES(@Codigo_doc, @Nombre_doc, @Apellidos_doc, @Codigo_asig)
	END

EXEC SP_InsDocentes 'D03', 'Ana', 'Millan', 'A03'

GO
ALTER PROC SP_Update_Doce(
	@Id INT,
	@Codigo_doc VARCHAR(5), 
	@Nombre_doc VARCHAR(25), 
	@Apellido_doc VARCHAR(25), 
	@Codigo_asig VARCHAR(5)
)AS
	BEGIN
	UPDATE Docentes SET Codigo_doc = @Codigo_doc, Nombre_doc = @Nombre_doc, Apellido_doc = @Apellido_doc, Codigo_asig = @Codigo_asig
	WHERE Id = @Id
	END

GO
CREATE PROC SP_DeletDOCENTE(
	@Id INT
)
AS
	BEGIN
	DELETE Docentes WHERE Id = @Id
	END


CREATE PROC SP_MostrarEstudiantes
AS 
	BEGIN
	SELECT * FROM Estudiantes
	END


CREATE PROC SP_InsESTUDIANTE(
	@Codigo_est VARCHAR(5), 
	@Nombre_est VARCHAR(25), 
	@Apellido_est VARCHAR(25),
	@Semestre VARCHAR(25),
	@Carrera VARCHAR(15),
	@Codigo_asig VARCHAR(5)
)AS
	BEGIN
	INSERT INTO Estudiantes (Codigo_est, Nombre_est, Apellido_est, Semestre, Carrera, Codigo_asig) 
	VALUES(@Codigo_est, @Nombre_est, @Apellido_est, @Semestre, @Carrera, @Codigo_asig)
	END


CREATE PROC SP_UpdateEst(
	@Id INT,
	@Codigo_est VARCHAR(5), 
	@Nombre_est VARCHAR(25), 
	@Apellido_est VARCHAR(25),
	@Semestre VARCHAR(25),
	@Carrera VARCHAR(15),
	@Codigo_asig VARCHAR(5)
)AS
	BEGIN
	UPDATE Estudiantes SET Codigo_est = @Codigo_est, Nombre_est = @Nombre_est, Apellido_est = @Apellido_est, Semestre = @Semestre, Carrera = @Carrera,Codigo_asig = @Codigo_asig
	WHERE Id = @Id
	END

GO
CREATE PROC SP_DeletEst(
	@Id INT
)
AS
	BEGIN
	DELETE Estudiantes WHERE Id = @Id
	END

--sp redcord
GO
CREATE PROC SP_MostrarRecord
AS 
	BEGIN
	SELECT * FROM RecordAcademico
	END

GO
CREATE PROC SP_ADDRECORD(
	@Codigo_rec VARCHAR(5),
	@Fecha DATE,
	@Periodo VARCHAR(15),
	@Nota1 FLOAT,
	@Nota2 FLOAT,
	@Codigo_doc VARCHAR(5), 
	@Codigo_est VARCHAR(5)
)AS
	BEGIN
	INSERT INTO RecordAcademico (Codigo_rec, Fecha, Periodo, Nota1, Nota2, Codigo_doc, Codigo_est) 
	VALUES( @Codigo_rec, @Fecha, @Periodo, @Nota1, @Nota2, @Codigo_doc, @Codigo_est)
	END

GO
ALTER PROC SP_UPDATERECORD(
	@Id INT,
	@Codigo_rec VARCHAR(5),
	@Fecha DATE,
	@Periodo VARCHAR(15),
	@Nota1 FLOAT,
	@Nota2 FLOAT,
	@Codigo_doc VARCHAR(5), 
	@Codigo_est VARCHAR(5)
)AS
	BEGIN
	UPDATE  RecordAcademico SET Codigo_rec =  @Codigo_rec, Fecha = @Fecha, Periodo = @Periodo,
	Nota1 = @Nota1, Nota2 = @Nota2, Codigo_doc = @Codigo_doc, Codigo_est = @Codigo_est
	WHERE Id = @Id
	END 
GO
CREATE PROC SP_DeletRec(
	@Id INT
)
AS
	BEGIN
	DELETE RecordAcademico WHERE Id = @Id
	END

ALTER PROC SP_MultiConsulta
	AS
		BEGIN
		SELECT EST.Nombre_est, EST.Apellido_est, ASIG.Nombre, REC.Promedio, DOC.Nombre_doc, DOC.Apellido_doc 
		From Asignaturas AS ASIG
		INNER JOIN Estudiantes AS EST ON ASIG.Codigo_asig = EST.Codigo_asig
		INNER JOIN Docentes AS DOC ON ASIG.Codigo_asig = DOC.Codigo_asig
		INNER JOIN RecordAcademico AS REC ON EST.Codigo_est = REC.Codigo_est
		WHERE REC.Promedio >= 3 
		END

exec SP_MultiConsulta

SELECT * FROM Docentes