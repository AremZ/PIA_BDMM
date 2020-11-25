DELIMITER //
CREATE PROCEDURE sp_getUsersLogin(
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
    IN in_Password varchar(20),
    IN in_avatar longblob,
    IN in_avatarType varchar(15)
    )
    BEGIN
		INSERT INTO usuario(tipo_Usuario, nombres, apellido_P, apellido_M, telefono, email, contrasena, foto_Perfil, blob_type)
		VALUES (in_userType,in_name,in_lastN,in_lastN2,in_tel,in_Email, in_Password, in_avatar, in_avatarType);			
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
CREATE PROCEDURE sp_getUserData(
	IN in_userID int
    )
    BEGIN
    if typeGet = 0 THEN
		SELECT id_Usuario, tipo_Usuario, nombres, apellido_P, apellido_M, telefono, email, contrasena FROM usuario WHERE tipo_Usuario != 'administrador' AND estado = 1 ORDER BY tipo_Usuario;
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
    IN in_titulo varchar(100),
    IN in_reportero int,
    IN in_feAcont datetime,
    IN in_lugAcont varchar(100),
    IN in_descSh varchar(200),
    IN in_descLg TEXT,
    IN in_estado varchar(15),
    IN in_sent int
    )
    BEGIN
	IF in_sent = 0 THEN
		INSERT INTO noticia(seccion_Noticia , titulo_Noticia , reportero_Autor, fecha_Creacion, fecha_Acontecimiento,
		lugar_Acontecimiento, descripcion_Corta , descripcion_Larga, estado)
		VALUES (in_secNot, in_titulo, in_reportero, NOW(), in_feAcont, in_lugAcont, in_descSh, in_descLg, in_estado);  
    END IF;
	IF in_sent = 1 THEN
		INSERT INTO noticia(seccion_Noticia , titulo_Noticia , reportero_Autor, fecha_Creacion, fecha_Acontecimiento,
		lugar_Acontecimiento, descripcion_Corta , descripcion_Larga, estado, fecha_Envio)
		VALUES (in_secNot, in_titulo, in_reportero, NOW(), in_feAcont, in_lugAcont, in_descSh, in_descLg, in_estado, NOW());  
    END IF;
    END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_noticiaUpdate(
	IN in_notID int,
	IN in_secNot int,
    IN in_titulo varchar(100),
    IN in_feAcont datetime,
    IN in_lugAcont varchar(100),
    IN in_descSh varchar(200),
    IN in_descLg TEXT,
    IN in_estado varchar(15),
    IN in_sent int
    )
    BEGIN
    DELETE FROM palabra_clave where id_NoticiaProp = in_notID;
    
	IF in_sent = 0 THEN
		UPDATE noticia SET seccion_Noticia = in_secNot, titulo_Noticia = in_titulo,
			   fecha_Acontecimiento = in_feAcont, lugar_Acontecimiento = in_lugAcont, descripcion_Corta = in_descSh,
			   descripcion_Larga = in_descLg, estado = in_estado WHERE id_Noticia = in_notID;    
    END IF;
    IF in_sent = 1 THEN
		UPDATE noticia SET seccion_Noticia = in_secNot, titulo_Noticia = in_titulo,
			   fecha_Acontecimiento = in_feAcont, lugar_Acontecimiento = in_lugAcont, descripcion_Corta = in_descSh,
			   descripcion_Larga = in_descLg, estado = in_estado, fecha_Envio = NOW() WHERE id_Noticia = in_notID; 
    END IF;
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

DELIMITER //
CREATE PROCEDURE sp_lastInsertedID()
    BEGIN
		SELECT LAST_INSERT_ID() AS 'LastID';
    END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_insertPalClav(
	IN in_pal_Clave varchar(20),
    IN id_NoticiaProp int
)
    BEGIN
		Insert into palabra_clave(pal_Clave, id_NoticiaProp) values (in_pal_Clave, id_NoticiaProp);
    END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_getNoti(
	IN in_ReporteroID int,
    IN in_estado varchar(15)
)
    BEGIN
    IF in_ReporteroID = -1 THEN
		SELECT id_Noticia, seccion_Noticia , titulo_Noticia , reportero_Autor, fecha_Creacion, fecha_Publicacion, fecha_Envio,
        fecha_Devo, fecha_Acontecimiento, lugar_Acontecimiento, descripcion_Corta , descripcion_Larga, estado
        FROM noticia WHERE estado = in_estado ORDER BY fecha_Creacion DESC;
	END IF;
    IF in_ReporteroID != -1 THEN
		IF in_estado = 'redaccion' THEN
			SELECT id_Noticia, seccion_Noticia , titulo_Noticia , reportero_Autor, fecha_Creacion, fecha_Publicacion, fecha_Envio,
			fecha_Devo, fecha_Acontecimiento, lugar_Acontecimiento, descripcion_Corta , descripcion_Larga, estado
			FROM noticia WHERE reportero_Autor = in_ReporteroID AND estado = in_estado ORDER BY fecha_Creacion DESC;
        END IF ;
		IF in_estado = 'terminada' THEN
			SELECT id_Noticia, seccion_Noticia , titulo_Noticia , reportero_Autor, fecha_Creacion, fecha_Publicacion, fecha_Envio,
			fecha_Devo, fecha_Acontecimiento, lugar_Acontecimiento, descripcion_Corta , descripcion_Larga, estado
			FROM noticia WHERE reportero_Autor = in_ReporteroID AND estado = in_estado ORDER BY fecha_Envio DESC;
        END IF ;
		IF in_estado = 'publicada' THEN
			SELECT id_Noticia, seccion_Noticia , titulo_Noticia , reportero_Autor, fecha_Creacion, fecha_Publicacion, fecha_Envio,
			fecha_Devo, fecha_Acontecimiento, lugar_Acontecimiento, descripcion_Corta , descripcion_Larga, estado
			FROM noticia WHERE reportero_Autor = in_ReporteroID AND estado = in_estado ORDER BY fecha_Publicacion DESC;
        END IF ;
	END IF;
    END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_getNotiDev(
	IN in_ReporteroID int
)
    BEGIN
		SELECT id_Noticia, seccion_Noticia , titulo_Noticia , reportero_Autor, fecha_Creacion, fecha_Publicacion, fecha_Envio,
        fecha_Devo, fecha_Acontecimiento, lugar_Acontecimiento, descripcion_Corta , descripcion_Larga, estado, id_NotFeed, feedback
        FROM fullNoticiaComments WHERE reportero_Autor = in_ReporteroID AND estado = 'devuelta' ORDER BY fecha_Devo DESC;
    END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_getSentNotis(
    IN in_estado varchar(15)
)
    BEGIN
		SELECT id_Noticia, seccion_Noticia , titulo_Noticia , reportero_Autor, fecha_Creacion, fecha_Publicacion, fecha_Envio, fecha_Devo,
        fecha_Acontecimiento, lugar_Acontecimiento, descripcion_Corta , descripcion_Larga, estado, nombres, apellido_P, apellido_M,
        nombre_Seccion, color_Seccion 
        FROM fullNoticia WHERE estado = in_estado ORDER BY fecha_Envio DESC;
	END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_getKeywordsByNewsID(
	IN in_NoticiaID int
)
    BEGIN
		SELECT id_PalabraClv, pal_Clave , id_NoticiaProp FROM palabra_clave WHERE id_NoticiaProp = in_NoticiaID ORDER BY id_PalabraClv ASC;
    END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_deleteNoticia(
	IN in_NoticiaID int
)
    BEGIN
		delete from noticia where id_Noticia = in_NoticiaID;
    END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_updateNotStatus(
	IN in_NoticiaID int,
    IN in_estado varchar(15)
)
    BEGIN
		IF in_estado = 'devuelta' THEN
			UPDATE noticia SET estado = in_estado, fecha_Devo = NOW() WHERE id_Noticia = in_NoticiaID;        
        END IF;
		IF in_estado = 'publicada' THEN
			UPDATE noticia SET estado = in_estado, fecha_Publicacion = NOW() WHERE id_Noticia = in_NoticiaID;        
        END IF;
    END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_saveComment(
	IN in_EditorID int,
	IN in_NoticiaID int,
    IN in_feed text
)
    BEGIN
		INSERT INTO feedback_noticia(id_editorNoti, id_Noticia, feedback) VALUES (in_EditorID, in_NoticiaID, in_feed);
    END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_deleteOldFeed(
	IN in_FeedID int
)
    BEGIN
		delete from feedback_noticia where id_NotFeed = in_FeedID;
    END //
DELIMITER ;
