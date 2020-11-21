DELIMITER //
CREATE TRIGGER delete_keywords_noticia
BEFORE DELETE
ON noticia FOR EACH ROW
BEGIN
	delete from palabra_clave where id_NoticiaProp = OLD.id_Noticia;
END //
DELIMITER ;