DROP PROCEDURE IF EXISTS sp_getUsersLogin;
DELIMITER //
CREATE PROCEDURE sp_getUsersLogin(
    IN in_Email varchar(50),
    IN in_Password varchar(20)
    )
    BEGIN
		SELECT id_Usuario, tipo_Usuario, nombres, email, contrasena FROM usuario WHERE email = in_Email AND contrasena = in_Password;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_userSignUp;
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

DROP PROCEDURE IF EXISTS sp_getAllUsers;
DELIMITER //
CREATE PROCEDURE sp_getAllUsers(
	IN typeGet int
    )
    BEGIN
    if typeGet = 0 THEN
		SELECT id_Usuario, tipo_Usuario, nombres, apellido_P, apellido_M, telefono, email, contrasena, foto_Perfil, blob_type FROM usuario WHERE tipo_Usuario != 'administrador' AND estado = 1 ORDER BY tipo_Usuario;
    end if;
    if typeGet = 1 THEN
		select id_Usuario, tipo_Usuario, nombres, apellido_P, apellido_M, telefono, email, contrasena, foto_Perfil, blob_type from usuario where tipo_Usuario = 'reportero' AND estado = 1 ORDER BY tipo_Usuario;
    end if;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_getUserData;
DELIMITER //
CREATE PROCEDURE sp_getUserData(
	IN in_userID int
    )
    BEGIN
		SELECT id_Usuario, tipo_Usuario, nombres, apellido_P, apellido_M, telefono, email, contrasena, foto_Perfil, blob_type
        FROM usuario WHERE id_Usuario = in_userID;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_bajaUser;
DELIMITER //
CREATE PROCEDURE sp_bajaUser(
	IN in_userID int
    )
    BEGIN
		update Usuario set estado = 0 WHERE id_Usuario = in_userID;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_editUser;
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

DROP PROCEDURE IF EXISTS sp_editUserSelf;
DELIMITER //
CREATE PROCEDURE sp_editUserSelf(
	IN in_userID int,
    IN in_name varchar(50),
    IN in_lastN varchar(30),
    IN in_lastN2 varchar(30),
    IN in_Email varchar(50),
    IN in_tel varchar(10),
    IN in_Password varchar(20)
    )
    BEGIN
		update Usuario set nombres = in_name, apellido_P = in_lastN, apellido_M = in_lastN2, telefono = in_tel, email = in_Email, contrasena = in_Password WHERE id_Usuario = in_userID;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_updateImg;
DELIMITER //
CREATE PROCEDURE sp_updateImg(
	IN in_userID int,
    IN in_avatar longblob,
    IN in_avatarType varchar(15)
)
    BEGIN
		update Usuario set foto_Perfil = in_avatar, blob_type = in_avatarType WHERE id_Usuario = in_userID;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_addSection;
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
WHERE NOT EXISTS (SELECT nombre_Seccion FROM seccion WHERE nombre_Seccion =in_sectName AND estado=1);
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_getSections;
DELIMITER //
CREATE PROCEDURE sp_getSections()
    BEGIN
		SELECT nombre_Seccion, id_Seccion,color_Seccion FROM getSeccion_View WHERE estado=1 OR estado=2
        ORDER BY num_Prioridad;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_getSectionsByID;
DELIMITER //
CREATE PROCEDURE sp_getSectionsByID()
    BEGIN
		SELECT nombre_Seccion, id_Seccion,color_Seccion FROM getSeccion_View WHERE estado=1 OR estado=2;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_getSectionsEliminarPend;
DELIMITER //
CREATE PROCEDURE sp_getSectionsEliminarPend()
    BEGIN
		select id_Seccion,nombre_Seccion from getSeccion_View WHERE estado=2;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_noticiaRegister;
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

DROP PROCEDURE IF EXISTS sp_insertMedia;
DELIMITER //
CREATE PROCEDURE sp_insertMedia(
	IN in_media longblob,
    IN in_type varchar(15),
    IN in_noticia int
    )
    BEGIN
		INSERT INTO media(contenido_media , blob_type , noticia_Duena)
		VALUES (in_media, in_type, in_noticia);
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_noticiaUpdate;
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
    DELETE FROM media where noticia_Duena = in_notID;
    
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

DROP PROCEDURE IF EXISTS sp_setOrdenSeccion;
DELIMITER //
CREATE PROCEDURE sp_setOrdenSeccion(
	IN in_orden tinyint,
    IN in_id tinyint
)
    BEGIN
		UPDATE seccion SET num_Prioridad=in_orden WHERE id_Seccion=in_id;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_lastInsertedID;
DELIMITER //
CREATE PROCEDURE sp_lastInsertedID()
    BEGIN
		SELECT lastID() AS 'LastID';
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_insertPalClav;
DELIMITER //
CREATE PROCEDURE sp_insertPalClav(
	IN in_pal_Clave varchar(20),
    IN id_NoticiaProp int
)
    BEGIN
		Insert into palabra_clave(pal_Clave, id_NoticiaProp) values (in_pal_Clave, id_NoticiaProp);
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_getNoti;
DELIMITER //
CREATE PROCEDURE sp_getNoti(
	IN in_ReporteroID int,
    IN in_estado varchar(15)
)
    BEGIN
    IF in_ReporteroID = -1 THEN
		SELECT id_Noticia, seccion_Noticia , titulo_Noticia , reportero_Autor, fecha_Creacion, fecha_Publicacion, fecha_Envio,
        fecha_Devo, fecha_Acontecimiento, lugar_Acontecimiento, descripcion_Corta , descripcion_Larga, estado, contenido_media, blob_type
		FROM noticiaEssayMedia WHERE estado = in_estado ORDER BY fecha_Creacion DESC;
	END IF;
    IF in_ReporteroID != -1 THEN
		IF in_estado = 'redaccion' THEN
			SELECT id_Noticia, seccion_Noticia , titulo_Noticia , reportero_Autor, fecha_Creacion, fecha_Publicacion, fecha_Envio,
			fecha_Devo, fecha_Acontecimiento, lugar_Acontecimiento, descripcion_Corta , descripcion_Larga, estado, contenido_media, blob_type
			FROM noticiaEssayMedia WHERE reportero_Autor = in_ReporteroID AND estado = in_estado ORDER BY fecha_Creacion DESC;
        END IF ;
		IF in_estado = 'terminada' THEN
			SELECT id_Noticia, seccion_Noticia , titulo_Noticia , reportero_Autor, fecha_Creacion, fecha_Publicacion, fecha_Envio,
			fecha_Devo, fecha_Acontecimiento, lugar_Acontecimiento, descripcion_Corta , descripcion_Larga, estado, contenido_media, blob_type
			FROM noticiaEssayMedia WHERE reportero_Autor = in_ReporteroID AND estado = in_estado ORDER BY fecha_Envio DESC;
        END IF ;
		IF in_estado = 'publicada' THEN
			SELECT id_Noticia, seccion_Noticia , titulo_Noticia , reportero_Autor, fecha_Creacion, fecha_Publicacion, fecha_Envio,
			fecha_Devo, fecha_Acontecimiento, lugar_Acontecimiento, descripcion_Corta , descripcion_Larga, estado, contenido_media, blob_type
			FROM noticiaEssayMedia WHERE reportero_Autor = in_ReporteroID AND estado = in_estado ORDER BY fecha_Publicacion DESC;
        END IF ;
	END IF;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_getRecentNews;
DELIMITER //
CREATE PROCEDURE sp_getRecentNews(
)
    BEGIN
		SELECT id_Noticia, seccion_Noticia , titulo_Noticia , reportero_Autor, fecha_Creacion, fecha_Publicacion, fecha_Envio,
        fecha_Devo, fecha_Acontecimiento, lugar_Acontecimiento, descripcion_Corta , descripcion_Larga, estado, contenido_media, blob_type
		FROM noticiaEssayMedia WHERE estado = 'publicada' ORDER BY fecha_Publicacion DESC LIMIT 6;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_getMostViewed;
DELIMITER //
CREATE PROCEDURE sp_getMostViewed(
)
    BEGIN
		SELECT id_Noticia, seccion_Noticia , titulo_Noticia , reportero_Autor, fecha_Creacion, fecha_Publicacion, fecha_Envio,
        fecha_Devo, fecha_Acontecimiento, lugar_Acontecimiento, descripcion_Corta , descripcion_Larga, estado, contenido_media, blob_type,
        cantidad_Vistas
		FROM noticiaEssayMedia WHERE estado = 'publicada' ORDER BY cantidad_Vistas DESC LIMIT 3;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_getNewsByID;
DELIMITER //
CREATE PROCEDURE sp_getNewsByID(
	IN in_notID int
)
    BEGIN
		SELECT id_Noticia, seccion_Noticia , titulo_Noticia , reportero_Autor, fecha_Creacion, fecha_Publicacion, fecha_Envio,
        fecha_Devo, fecha_Acontecimiento, lugar_Acontecimiento, descripcion_Corta , descripcion_Larga, estado, contenido_media, blob_type,
        cantidad_Vistas
		FROM noticiaEssayMedia WHERE estado = 'publicada' AND id_Noticia = in_notID;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_getNewsBySection;
DELIMITER //
CREATE PROCEDURE sp_getNewsBySection(
	IN in_SectionID int,
    IN typeSel int
)
    BEGIN
		IF typeSel != 0 THEN
			SELECT id_Noticia, seccion_Noticia , titulo_Noticia , reportero_Autor, fecha_Creacion, fecha_Publicacion, fecha_Envio,
			fecha_Devo, fecha_Acontecimiento, lugar_Acontecimiento, descripcion_Corta , descripcion_Larga, estado, contenido_media, blob_type
			FROM noticiaEssayMedia WHERE estado = 'publicada' AND seccion_Noticia = in_SectionID ORDER BY fecha_Publicacion DESC LIMIT typeSel;
		END IF ;
		IF typeSel = 0 THEN
			SELECT id_Noticia, seccion_Noticia , titulo_Noticia , reportero_Autor, fecha_Creacion, fecha_Publicacion, fecha_Envio,
			fecha_Devo, fecha_Acontecimiento, lugar_Acontecimiento, descripcion_Corta , descripcion_Larga, estado, contenido_media, blob_type
			FROM noticiaEssayMedia WHERE estado = 'publicada' AND seccion_Noticia = in_SectionID ORDER BY fecha_Publicacion DESC;
		END IF ;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_getNotiDev;
DELIMITER //
CREATE PROCEDURE sp_getNotiDev(
	IN in_ReporteroID int
)
    BEGIN
		SELECT id_Noticia, seccion_Noticia , titulo_Noticia , reportero_Autor, fecha_Creacion, fecha_Publicacion, fecha_Envio,
        fecha_Devo, fecha_Acontecimiento, lugar_Acontecimiento, descripcion_Corta , descripcion_Larga, estado, id_NotFeed, feedback,
        contenido_media, blob_type
        FROM fullNoticiaComments WHERE reportero_Autor = in_ReporteroID AND estado = 'devuelta' ORDER BY fecha_Devo DESC;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_getSentNotis;
DELIMITER //
CREATE PROCEDURE sp_getSentNotis(
    IN in_estado varchar(15)
)
    BEGIN
		SELECT id_Noticia, seccion_Noticia , titulo_Noticia , reportero_Autor, fecha_Creacion, fecha_Publicacion, fecha_Envio, fecha_Devo,
        fecha_Acontecimiento, lugar_Acontecimiento, descripcion_Corta , descripcion_Larga, estado, nombres, apellido_P, apellido_M,
        nombre_Seccion, color_Seccion, contenido_media, blob_type
        FROM fullNoticia WHERE estado = in_estado ORDER BY fecha_Envio DESC;
	END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_getFullNews;
DELIMITER //
CREATE PROCEDURE sp_getFullNews(
    IN in_newsID int
)
    BEGIN
		SELECT id_Noticia, seccion_Noticia , titulo_Noticia , reportero_Autor, fecha_Creacion, fecha_Publicacion, fecha_Envio, fecha_Devo,
        fecha_Acontecimiento, lugar_Acontecimiento, descripcion_Corta , descripcion_Larga, estado, nombres, apellido_P, apellido_M,
        nombre_Seccion, color_Seccion FROM fullNotDisplay WHERE id_Noticia = in_newsID;
	END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_getKeywordsByNewsID;
DELIMITER //
CREATE PROCEDURE sp_getKeywordsByNewsID(
	IN in_NoticiaID int
)
    BEGIN
		SELECT id_PalabraClv, pal_Clave , id_NoticiaProp FROM palabra_clave WHERE id_NoticiaProp = in_NoticiaID ORDER BY id_PalabraClv ASC;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_deleteNoticia;
DELIMITER //
CREATE PROCEDURE sp_deleteNoticia(
	IN in_NoticiaID int
)
    BEGIN
		delete from noticia where id_Noticia = in_NoticiaID;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_updateNotStatus;
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

DROP PROCEDURE IF EXISTS sp_saveComment;
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

DROP PROCEDURE IF EXISTS sp_deleteOldFeed;
DELIMITER //
CREATE PROCEDURE sp_deleteOldFeed(
	IN in_FeedID int
)
    BEGIN
		delete from feedback_noticia where id_NotFeed = in_FeedID;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_getSeccion;
DELIMITER //
CREATE PROCEDURE sp_getSeccion(
	IN in_idSec int
)
    BEGIN
		select id_Seccion,nombre_Seccion from nombreSeccion_View WHERE id_Seccion=in_idSec;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_getSeccionData;
DELIMITER //
CREATE PROCEDURE sp_getSeccionData(
	IN in_idSec int
)
    BEGIN
		select id_Seccion,nombre_Seccion,color_Seccion from getSeccion_View WHERE id_Seccion=in_idSec;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_updateSeccion;
DELIMITER //
CREATE PROCEDURE sp_updateSeccion(
	IN in_idSec int,
    IN in_sectName varchar(30),
    IN in_color varchar(6)
)
    BEGIN
		UPDATE seccion SET nombre_Seccion=in_sectName, color_Seccion=in_color WHERE id_Seccion=in_idSec;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_deleteSeccion;
DELIMITER //
CREATE PROCEDURE sp_deleteSeccion(
	IN in_idSec int
)
    BEGIN
		UPDATE seccion SET estado=0 WHERE id_Seccion=in_idSec;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_askDeleteSeccion;
DELIMITER //
CREATE PROCEDURE sp_askDeleteSeccion(
	IN in_idSec int
)
    BEGIN
		UPDATE seccion SET estado=2 WHERE id_Seccion=in_idSec;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_sectionTo1;
DELIMITER //
CREATE PROCEDURE sp_sectionTo1(
	IN in_idSec int
)
    BEGIN
		UPDATE seccion SET estado=1 WHERE id_Seccion=in_idSec;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_getMedia;
DELIMITER //
CREATE PROCEDURE sp_getMedia(
	IN in_NoticiaID int,
    IN whatMedia varchar(3)
)
    BEGIN
		IF whatMedia = 'img' THEN
			SELECT id_Media, contenido_media, blob_type , noticia_Duena FROM media WHERE noticia_Duena = in_NoticiaID AND 
            (blob_type = 'jpeg' OR blob_type = 'png');
		END IF;
		IF whatMedia = 'vid' THEN
			SELECT id_Media, contenido_media, blob_type , noticia_Duena FROM media WHERE noticia_Duena = in_NoticiaID AND blob_type = 'mp4';
		END IF;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_oneMoreView;
DELIMITER //
CREATE PROCEDURE sp_oneMoreView(
	IN in_NoticiaID int
)
    BEGIN
		UPDATE noticia SET cantidad_Vistas = cantidad_Vistas + 1 WHERE id_Noticia = in_NoticiaID;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_Search;
DELIMITER //
CREATE PROCEDURE sp_Search(
	IN in_Opc VARCHAR(1),
    IN in_titulo VARCHAR(50),
    IN in_palabra VARCHAR(50),
    IN in_clave VARCHAR(20),
    IN in_fechaDesde DATE,
    IN in_fechaHasta DATE
)
BEGIN 
	IF in_Opc = 'B' THEN
		IF in_titulo='null' THEN SELECT null INTO in_titulo; END IF;
		IF in_palabra='null' THEN SELECT null INTO in_palabra; END IF;
        IF in_clave='null' THEN SELECT null INTO in_clave; END IF;
        SELECT id_Noticia, titulo_Noticia, fecha_Publicacion, fecha_Creacion,
		descripcion_Corta, estado, contenido_media, blob_type, PC.pal_Clave
		FROM noticiaEssayMedia 
		JOIN palabra_clave PC ON id_Noticia=id_NoticiaProp
        WHERE estado=4 AND ((titulo_Noticia LIKE CONCAT("%",in_titulo,"%"))) OR ((descripcion_Corta LIKE CONCAT("%",in_palabra,"%"))) OR ((PC.pal_Clave LIKE CONCAT("%",in_clave,"%"))) AND ((DATE(fecha_Creacion) >= in_fechaDesde AND DATE(fecha_Creacion) <= in_fechaHasta)) GROUP BY id_Noticia ORDER BY fecha_Creacion DESC ;
	END IF;
	
END//
DROP PROCEDURE IF EXISTS sp_insertComment;
DELIMITER //
CREATE PROCEDURE sp_insertComment(
	IN in_parentID int,
	IN in_userID int,
	IN in_newsID int,
	IN in_comment text
)
    BEGIN
		IF in_parentID = 0 THEN
			INSERT INTO comentario(noticia_Comentario, usuario_Comentario, contenido_Comentario, fecha_Comentario)
            VALUES (in_newsID, in_userID, in_comment, NOW());
        END IF;
		IF in_parentID != 0 THEN
			INSERT INTO comentario(noticia_Comentario, usuario_Comentario, contenido_Comentario, fecha_Comentario, comentario_Dueno)
            VALUES (in_newsID, in_userID, in_comment, NOW(), in_parentID);
        END IF;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_getNewsComments;
DELIMITER //
CREATE PROCEDURE sp_getNewsComments(
	IN in_newsID int
)
    BEGIN
		SELECT id_Usuario, nombres, apellido_P, apellido_M, foto_Perfil, blob_type,
			   id_Comentario, comentario_Dueno, contenido_Comentario, fecha_Comentario, noticia_Comentario
               FROM Comments_User where noticia_Comentario = in_newsID AND comentario_Dueno IS NULL ORDER BY fecha_Comentario DESC;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_getRepliesComments;
DELIMITER //
CREATE PROCEDURE sp_getRepliesComments(
	IN in_newsID int,
	IN in_parentID int
)
    BEGIN
		SELECT id_Usuario, nombres, apellido_P, apellido_M, foto_Perfil, blob_type,
			   id_Comentario, comentario_Dueno, contenido_Comentario, fecha_Comentario, noticia_Comentario
               FROM Comments_User where noticia_Comentario = in_newsID AND comentario_Dueno = in_parentID ORDER BY fecha_Comentario DESC;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_deleteComm;
DELIMITER //
CREATE PROCEDURE sp_deleteComm(
	IN in_commID int
)
    BEGIN
		DELETE FROM comentario WHERE comentario_Dueno = in_commID;
		DELETE FROM comentario WHERE id_Comentario = in_commID;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_getCommentsNews;
DELIMITER //
CREATE PROCEDURE sp_getCommentsNews(
	IN in_notID int
)
    BEGIN
       SELECT getTotalComments(in_notID) AS 'totalComms';
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_getLikesNews;
DELIMITER //
CREATE PROCEDURE sp_getLikesNews(
	IN in_notID int
)
    BEGIN
       SELECT getTotalLikes(in_notID) AS 'totalLikes';
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_getPubNews;
DELIMITER //
CREATE PROCEDURE sp_getPubNews(
)
    BEGIN
       SELECT getPostedNews() AS 'totalNews';
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_LikeNoticia;
DELIMITER //
CREATE PROCEDURE sp_LikeNoticia(
	IN in_userID int,
	IN in_notID int
)
    BEGIN
		INSERT INTO likes(id_user, id_not) VALUES (in_userID, in_notID);
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_deleteLike;
DELIMITER //
CREATE PROCEDURE sp_deleteLike(
	IN in_userID int,
	IN in_notID int
)
    BEGIN
		DELETE FROM likes WHERE id_user = in_userID AND id_not = in_notID;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_isLiked;
DELIMITER //
CREATE PROCEDURE sp_isLiked(
	IN in_userID int,
	IN in_notID int
)
    BEGIN
		SELECT id_like FROM likes WHERE id_user = in_userID AND id_not = in_notID;
    END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_getRelated;
DELIMITER //
CREATE PROCEDURE sp_getRelated(
	IN in_keyword varchar(20),
	IN in_actualNot int
)
    BEGIN
		SELECT id_Noticia, pal_Clave FROM Noticia_Keywords WHERE pal_Clave = in_keyword AND estado = 'publicada' AND id_Noticia != in_actualNot;
    END //
DELIMITER ;
