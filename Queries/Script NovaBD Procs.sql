DELIMITER //
CREATE PROCEDURE getUsersLogin(
    IN in_Email varchar(50),
    IN in_Password varchar(20)
    )
    BEGIN
		SELECT email, contrasena FROM usuario WHERE email = in_Email AND contrasena = in_Password;
    END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_userSignUp(
	IN in_userType varchar(15),
    IN in_name varchar(50),
    IN in_lastN varchar(30),
    IN in_lastN2 varchar(30),
    IN in_Email varchar(50),
    IN in_tel varchar(10),
    IN in_Password varchar(20)
    )
    BEGIN
	INSERT INTO usuario(tipo_Usuario,nombres, apellido_P, apellido_M, telefono, email, contrasena)
SELECT in_userType,in_name,in_lastN,in_lastN2,in_tel,in_Email, in_Password
FROM dual
WHERE NOT EXISTS (SELECT email FROM usuario WHERE email =in_Email );
    END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_getAllUsers(
	IN typeGet int
    )
    BEGIN
    if typeGet = 0 THEN
		SELECT id_Usuario, tipo_Usuario, nombres, apellido_P, apellido_M, telefono, email, contrasena FROM usuario WHERE tipo_Usuario != 'administrador' AND estado = 1 ORDER BY tipo_Usuario;
    end if;
    if typeGet = 1 THEN
		select id_Usuario, tipo_Usuario, nombres, apellido_P, apellido_M, telefono, email, contrasena from usuario where tipo_Usuario = 'reportero' AND estado = 1 ORDER BY tipo_Usuario;
    end if;
    END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_bajaUser(
	IN in_userID int
    )
    BEGIN
		update Usuario set estado = 0 WHERE id_Usuario = in_userID;
    END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_editUser(
	IN in_userID int,
	IN in_userType varchar(15),
    IN in_name varchar(50),
    IN in_lastN varchar(30),
    IN in_lastN2 varchar(30),
    IN in_Email varchar(50),
    IN in_tel varchar(10),
    IN in_Password varchar(20)
    )
    BEGIN
		update Usuario set nombres = in_name, apellido_P = in_lastN, apellido_M = in_lastN2, telefono = in_tel, email = in_Email, contrasena = in_Password, tipo_Usuario = in_userType WHERE id_Usuario = in_userID;
    END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_addSection(
	IN in_sectName varchar(30),
    IN in_color varchar(6),
    IN in_order tinyint
    )
    BEGIN
		INSERT INTO seccion (nombre_Seccion, color_Seccion, num_Prioridad)
SELECT in_sectName,in_color,in_order
FROM dual
WHERE NOT EXISTS (SELECT nombre_Seccion FROM seccion WHERE nombre_Seccion =in_sectName );
    END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_getSections()
    BEGIN
		SELECT nombre_Seccion, id_Seccion FROM seccion
        ORDER BY num_Prioridad;
    END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_noticiaRegister(
	IN in_secNot int,
    IN in_titulo varchar(50),
    IN in_reportero int,
    IN in_feAcont datetime,
    IN in_lugAcont varchar(100),
    IN in_descSh varchar(200),
    IN in_descLg TEXT,
    IN in_estado varchar(15)
    )
    BEGIN
	INSERT INTO noticia(seccion_Noticia , titulo_Noticia , reportero_Autor, fecha_Creacion, fecha_Acontecimiento,
    lugar_Acontecimiento, descripcion_Corta , descripcion_Larga, estado)
	VALUES (in_secNot, in_titulo, in_reportero, NOW(), in_feAcont, in_lugAcont, in_descSh, in_descLg, in_estado);
    END //
DELIMITER ;



DELIMITER //
CREATE PROCEDURE sp_setOrdenSeccion(
	IN in_orden tinyint,
    IN in_id tinyint
)
    BEGIN
		UPDATE seccion SET num_Prioridad=in_orden WHERE id_Seccion=in_id;
    END //
DELIMITER ;

