CALL getUsersLogin('rm.abraham08@gmail.com', 'AbrahamRM_72');

INSERT INTO Usuario (tipo_Usuario, nombres, apellido_P, apellido_M, telefono, email, contrasena)
VALUES ('editor', 'Abraham', 'Reyes', 'Muñiz', '8116552896', 'rm.abraham08@gmail.com', 'AbrahamRM_72');
INSERT INTO Usuario (tipo_Usuario, nombres, apellido_P, apellido_M, telefono, email, contrasena)
VALUES ('editor', 'Andrea Cecilia', 'Aguayo', 'Millan', '8165893252', 'lamasmejor@gmail.com', '123454321');

DELETE FROM Usuario where id_Usuario = 52;

CALL sp_userSignUp('usuario','asdasd','dsadsa','wertwer',"123@gmail.com",'85296374','741852963');

SELECT id_Usuario, nombres, apellido_P, apellido_M, tipo_Usuario FROM usuario WHERE tipo_Usuario != "administrador" ORDER BY tipo_Usuario;

insert into seccion (nombre_Seccion, color_Seccion, num_Prioridad) values ("Musica", "Azul", 3);

SELECT LAST_INSERT_ID();
delete from usuario where id_Usuario > 55;
truncate table media;
delete from noticia where id_Noticia > 171;

CALL sp_getNoti(3,'redaccion');
CALL sp_getNoti(3,'terminada');
CALL sp_getMedia(167,'vid');

SET GLOBAL max_allowed_packet=1073741824;
SHOW VARIABLES WHERE variable_name = 'max_allowed_packet';

truncate noticia;
truncate feedback_noticia;
delete from noticia where id_Noticia > 9 and estado = 'terminada';
UPDATE noticia set descripcion_Larga = 'El lanzamiento del juego en PC es una primera vez en la historia de la serie de Persona. Anteriormente los juegos solamente estaban disponibles para las consolas de PlayStation. Persona 4 Golden, lanzado en 2012, se basa en un grupo de adolescentes que investigan una serie de asesinatos. La version mejorada del juego añade nuevos personajes, mazmorras y mas. Es uno de los juegos mas aclamados por los fans; tambien ha inspirado algunos spinoffs como Persona 4 Arena y Persona 4: Dancing All Night.' WHERE id_Noticia = 165;
delete from noticia where id_Noticia = 6;

CALL sp_saveComment(2, 17, 'Hola');
CALL sp_updateNotStatus (4, 'redaccion');
UPDATE Noticia SET fecha_Envio = NOW() WHERE id_noticia = 9;
UPDATE Noticia SET descripcion_Corta = "Que emocion!" WHERE id_noticia = 8;
CALL sp_lastInsertedID();
CALL sp_getNotiRedaccion();
CALL sp_noticiaRegister(1,'$titleNot', 3, '2016-06-03 16:39:00', '$lugAcont', '$descrSh', '$descrLg', 'redaccion');
CALL sp_noticiaUpdate($IDNot,$idSec,'$titleNot','$dateAcont','$lugAcont','$descrSh','$descrLg');
CALL sp_saveComment(3, 16, 'Pobrecito :(');
CALL sp_getNotiDev(3);
SHOW TRIGGERS FROM novadb;

ALTER TABLE usuario ADD ;
select * from gallery;
ALTER TABLE usuario MODIFY COLUMN blob_type VARCHAR(15);
ALTER TABLE usuario MODIFY COLUMN foto_Perfil longblob;
ALTER TABLE usuario MODIFY COLUMN foto_Perfil blob;
update Usuario set nombres = "pependejo", apellido_P = "arc", apellido_M = "dgb", telefono = "12312312", email = "a", contrasena = "aaa", tipo_Usuario = "usuario" WHERE id_Usuario = 9;

CALL sp_getNoti(3,'redaccion');
CALL sp_getSentNotis('terminada');
CALL sp_getNoti(-1,'publicada');

INSERT INTO feedback_noticia (id_editorNoti, id_Noticia, feedback) values (3, 168, 'wa');

UPDATE noticia set cantidad_Likes = 0 where id_Noticia >163;
UPDATE noticia set cantidad_Vistas = 0 where id_Noticia = 168;
UPDATE noticia set cantidad_Vistas = 0 where id_Noticia = 171;
UPDATE noticia set estado = 'redaccion' where id_Noticia = 169;
UPDATE noticia set descripcion_Larga = 'Ryokuoushoku Shakai, también conocido como Ryokushaka, es una banda conformada por cuatro miembros de la prefectura de Aichi. Formado en 2012, los miembros son los compañeros de preparatoria: Nagaya Haruko (vocales/guitarra), Kobayashi Issei (guitarra/coro) y peppe (teclado/coro), junto con el amigo de la infancia de Kobayashi, Anami Shingo (bajo/coro).' 
where id_Noticia = 169;
CALL sp_getSeccionData(3);

CALL sp_lastInsertedID();
CALL sp_getFullNews(165);

CALL sp_insertComment(0, 165, 3, '$comment');
CALL sp_getRepliesComments(165, 4);

select * from noticiaEssayMedia WHERE titulo_Noticia LIKE '%persona%';
CALL sp_deleteComm(10);

cALL sp_noticiaRegister(1,'A', 53, NOW(), 'Aqui', 'Corta', 'Larga', 'redaccion', 0);
CALL sp_bajaUser(53);
CALL sp_askDeleteSeccion(2);
ALTER TABLE seccion
MODIFY COLUMN estado tinyint NOT NULL default(1);

CALL sp_getSeccion(2)
update seccion set estado =1 where id_Seccion = 2;
CALL sp_getCommentsNews(165);

select * from likes;
select * from noticia_backup;
select * from usuario;
select * from noticia;
select * from seccion;
select * from palabra_clave;
select * from feedback_noticia;
select * from comentario;
select * from media;

CALL sp_getFullNews(165);
caLL sp_deleteNoticia(3, 165);
CALL sp_getLikesNews(165);
CALL sp_deleteNoticia(186);
CALL sp_getPubNews();
ALTER TABLE noticia DROP COLUMN cantidad_Likes;

CALL sp_getNewsByID(165);

UPDATE palabra_clave SET pal_Clave = LOWER(pal_Clave) WHERE id_PalabraClv != 0;
select LOWER('AAA11??345435');
CALL sp_getRelated('persona4', 165);
CALL sp_getRelated('$keyword');