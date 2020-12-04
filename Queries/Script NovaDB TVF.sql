
SET GLOBAL max_allowed_packet= 64000000;
INSERT INTO Usuario (tipo_Usuario, nombres, apellido_P, apellido_M, telefono, email, contrasena)
VALUES ('administrador', 'admin', 'admin', 'admin', '00000000', 'admin@gmail.com', 'admin');

/* ---------------------------------------------------     TRIGGERS      -------------------------------------------------------------------- */

DELIMITER //
CREATE TRIGGER delete_info_noticia
BEFORE DELETE
ON noticia FOR EACH ROW
BEGIN
	insert into noticia_backup(id_Noticia, seccion_Noticia, titulo_Noticia, reportero_Autor, fecha_Creacion, fecha_Publicacion, fecha_Envio,
    fecha_Devo, fecha_Acontecimiento, lugar_Acontecimiento, descripcion_Corta, descripcion_Larga, estado, cantidad_Vistas) VALUES
    (OLD.id_Noticia, OLD.seccion_Noticia,OLD.titulo_Noticia,OLD.reportero_Autor,OLD.fecha_Creacion,OLD.fecha_Publicacion,OLD.fecha_Envio,
    OLD.fecha_Devo,OLD.fecha_Acontecimiento,OLD.lugar_Acontecimiento,OLD.descripcion_Corta,OLD.descripcion_Larga,OLD.estado,
    OLD.cantidad_Vistas);

	delete from palabra_clave where id_NoticiaProp = OLD.id_Noticia;
	delete from feedback_noticia where id_Noticia = OLD.id_Noticia;
	delete from media where noticia_Duena = OLD.id_Noticia;
	delete from comentario where noticia_Comentario = OLD.id_Noticia;
	delete from likes where id_not = OLD.id_Noticia;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER delete_noticias_reportero
AFTER UPDATE
ON usuario FOR EACH ROW
BEGIN
	IF NEW.estado = 0 THEN
		delete from noticia where reportero_Autor = OLD.id_Usuario AND estado != 'publicada';
	END IF;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER delete_news_section
AFTER UPDATE
ON seccion FOR EACH ROW
BEGIN
	IF NEW.estado = 0 THEN
		delete from noticia where seccion_Noticia = OLD.id_Seccion;
    END IF;
END //
DELIMITER ;

/* ---------------------------------------------------     FUNCTIONS      -------------------------------------------------------------------- */

CREATE FUNCTION getTotalComments (idNoticia int)
	   RETURNS int READS SQL DATA
       RETURN (SELECT COUNT(id_Comentario) AS 'totalComms' FROM comentario WHERE noticia_Comentario = idNoticia);
       
CREATE FUNCTION getTotalLikes (idNoticia int)
	   RETURNS int READS SQL DATA
       RETURN (SELECT COUNT(id_like) AS 'totalLikes' FROM likes WHERE id_not = idNoticia);
       
CREATE FUNCTION getPostedNews ()
	   RETURNS int READS SQL DATA
       RETURN (SELECT COUNT(id_Noticia) AS 'publishedNews' FROM noticia WHERE estado = 'publicada');
       
CREATE FUNCTION lastID ()
	   RETURNS int READS SQL DATA
       RETURN (SELECT LAST_INSERT_ID());
       
/* ---------------------------------------------------     VIEWS      -------------------------------------------------------------------- */

CREATE VIEW fullNoticia
	AS
		SELECT N.id_Noticia, N.seccion_Noticia , N.titulo_Noticia , N.reportero_Autor, N.fecha_Creacion, N.fecha_Publicacion, N.fecha_Envio,
        N.fecha_Devo, N.fecha_Acontecimiento, N.lugar_Acontecimiento, N.descripcion_Corta , N.descripcion_Larga, N.estado, U.nombres,
		U.apellido_P, U.apellido_M, S.nombre_Seccion, S.color_Seccion, M.contenido_media, M.blob_type 
        FROM noticia N INNER JOIN usuario U ON N.reportero_Autor = U.id_Usuario
					   INNER JOIN seccion S ON N.seccion_Noticia = S.id_Seccion
                       INNER JOIN media M ON N.id_Noticia = M.noticia_Duena
                       INNER JOIN (SELECT noticia_Duena, MIN(id_Media) AS 'MediaID' FROM media GROUP BY noticia_Duena) SEL
                       ON M.noticia_Duena = SEL.noticia_Duena AND M.id_Media = SEL.MediaID WHERE M.blob_type = 'png' OR M.blob_type = 'jpeg';
                       
CREATE VIEW noticiaEssayMedia
	AS
	SELECT N.id_Noticia, N.seccion_Noticia , N.titulo_Noticia , N.reportero_Autor, N.fecha_Creacion, N.fecha_Publicacion, N.fecha_Envio,
			N.fecha_Devo, N.fecha_Acontecimiento, N.lugar_Acontecimiento, N.descripcion_Corta , N.descripcion_Larga, N.cantidad_Vistas,
            N.estado, M.contenido_media, M.blob_type FROM noticia N INNER JOIN media M ON N.id_Noticia = M.noticia_Duena INNER JOIN
	( SELECT noticia_Duena, MIN(id_Media) AS 'MediaID' FROM media GROUP BY noticia_Duena) S ON M.noticia_Duena = S.noticia_Duena AND
	M.id_Media = S.MediaID WHERE M.blob_type = 'png' OR M.blob_type = 'jpeg';
                       
CREATE VIEW fullNoticiaComments
	AS
		SELECT N.id_Noticia, N.seccion_Noticia , N.titulo_Noticia , N.reportero_Autor, N.fecha_Creacion, N.fecha_Publicacion, N.fecha_Envio,
        N.fecha_Devo, N.fecha_Acontecimiento, N.lugar_Acontecimiento, N.descripcion_Corta , N.descripcion_Larga, N.estado, FN.id_NotFeed, FN.feedback,
        M.contenido_media, M.blob_type 
        FROM noticia N INNER JOIN feedback_noticia FN ON N.id_Noticia = FN.id_Noticia
                       INNER JOIN media M ON N.id_Noticia = M.noticia_Duena
                       INNER JOIN (SELECT noticia_Duena, MIN(id_Media) AS 'MediaID' FROM media GROUP BY noticia_Duena) SEL
                       ON M.noticia_Duena = SEL.noticia_Duena AND M.id_Media = SEL.MediaID WHERE M.blob_type = 'png' OR M.blob_type = 'jpeg';
                       
                       
CREATE VIEW fullNotDisplay
	AS
		SELECT N.id_Noticia, N.seccion_Noticia , N.titulo_Noticia , N.reportero_Autor, N.fecha_Creacion, N.fecha_Publicacion, N.fecha_Envio,
        N.fecha_Devo, N.fecha_Acontecimiento, N.lugar_Acontecimiento, N.descripcion_Corta , N.descripcion_Larga, N.estado, U.nombres,
		U.apellido_P, U.apellido_M, S.nombre_Seccion, S.color_Seccion 
        FROM noticia N INNER JOIN usuario U ON N.reportero_Autor = U.id_Usuario
					   INNER JOIN seccion S ON N.seccion_Noticia = S.id_Seccion;
        
CREATE VIEW nombreSeccion_View
	AS
		SELECT id_Seccion,nombre_Seccion FROM seccion;
        
        
CREATE VIEW getSeccion_View
	AS
		SELECT  id_Seccion,nombre_Seccion,num_Prioridad,estado,color_Seccion FROM seccion;
        
CREATE VIEW Comments_User
	AS
		SELECT U.id_Usuario, U.nombres, U.apellido_P, U.apellido_M, U.foto_Perfil, U.blob_type,
			   C.id_Comentario, C.comentario_Dueno, C.contenido_Comentario, C.fecha_Comentario, C.noticia_Comentario
        FROM usuario U INNER JOIN comentario C ON C.usuario_Comentario = U.id_Usuario;
        
CREATE VIEW Noticia_Keywords
	AS
		SELECT id_Noticia, pal_Clave, titulo_Noticia, estado FROM palabra_clave PC INNER JOIN noticia N on PC.id_NoticiaProp = N.id_Noticia;
