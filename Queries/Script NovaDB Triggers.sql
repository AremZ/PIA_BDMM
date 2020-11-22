DELIMITER //
CREATE TRIGGER delete_keywords_noticia
BEFORE DELETE
ON noticia FOR EACH ROW
BEGIN
	delete from palabra_clave where id_NoticiaProp = OLD.id_Noticia;
	delete from feedback_noticia where id_Noticia = OLD.id_Noticia;
END //
DELIMITER ;

CREATE VIEW fullNoticia
	AS
		SELECT N.id_Noticia, N.seccion_Noticia , N.titulo_Noticia , N.reportero_Autor, N.fecha_Creacion, N.fecha_Publicacion, N.fecha_Envio,
        N.fecha_Devo, N.fecha_Acontecimiento, N.lugar_Acontecimiento, N.descripcion_Corta , N.descripcion_Larga, N.estado, U.nombres,
		U.apellido_P, U.apellido_M, S.nombre_Seccion, S.color_Seccion 
        FROM noticia N INNER JOIN usuario U ON N.reportero_Autor = U.id_Usuario
					   INNER JOIN seccion S ON N.seccion_Noticia = S.id_Seccion;
                       
CREATE VIEW fullNoticiaComments
	AS
		SELECT N.id_Noticia, N.seccion_Noticia , N.titulo_Noticia , N.reportero_Autor, N.fecha_Creacion, N.fecha_Publicacion, N.fecha_Envio,
        N.fecha_Devo, N.fecha_Acontecimiento, N.lugar_Acontecimiento, N.descripcion_Corta , N.descripcion_Larga, N.estado, FN.id_NotFeed, FN.feedback 
        FROM noticia N INNER JOIN feedback_noticia FN ON N.id_Noticia = FN.id_Noticia;