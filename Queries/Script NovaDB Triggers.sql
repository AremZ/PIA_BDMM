DELIMITER //
CREATE TRIGGER delete_info_noticia
BEFORE DELETE
ON noticia FOR EACH ROW
BEGIN
	delete from palabra_clave where id_NoticiaProp = OLD.id_Noticia;
	delete from feedback_noticia where id_Noticia = OLD.id_Noticia;
	delete from media where noticia_Duena = OLD.id_Noticia;
END //
DELIMITER ;

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
			N.fecha_Devo, N.fecha_Acontecimiento, N.lugar_Acontecimiento, N.descripcion_Corta , N.descripcion_Larga, N.estado, M.contenido_media,
			M.blob_type FROM noticia N INNER JOIN media M ON N.id_Noticia = M.noticia_Duena INNER JOIN
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
        
CREATE VIEW nombreSeccion_View
	AS
		SELECT id_Seccion,nombre_Seccion FROM seccion;
        
        
CREATE VIEW getSeccion_View
	AS
		SELECT  id_Seccion,nombre_Seccion,num_Prioridad,estado,color_Seccion FROM seccion;

        
        
        
        
        
/* ---------------------------------------------------     FUNCTIONS      -------------------------------------------------------------------- */

CREATE FUNCTION lastID ()
	   RETURNS int READS SQL DATA
       RETURN (SELECT LAST_INSERT_ID());
