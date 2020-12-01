CREATE DATABASE novaDB;

USE novaDB;

CREATE TABLE usuario(
id_Usuario int NOT NULL auto_increment,
tipo_Usuario enum('editor', 'reportero', 'usuario') NOT NULL,
nombres varchar(50) NOT NULL,
apellido_P varchar(30) NOT NULL,
apellido_M varchar(30) NOT NULL,
telefono  varchar(10) NOT NULL,
email varchar(50) NOT NULL,
contrasena varchar(20) NOT NULL,
foto_Perfil longblob,
blob_type varchar(15),
estado BIT default(1),
primary key(id_Usuario)
);

CREATE TABLE seccion(
id_Seccion int NOT NULL AUTO_INCREMENT,
nombre_Seccion varchar(30) NOT NULL,
color_Seccion varchar(6) NOT NULL,
num_Prioridad tinyint NOT NULL,
estado tinyint NOT NULL default(1),
primary key(id_Seccion)
);

CREATE TABLE noticia(
id_Noticia int NOT NULL AUTO_INCREMENT,
seccion_Noticia int NOT NULL,
titulo_Noticia varchar(100) NOT NULL,
reportero_Autor int NOT NULL,
fecha_Creacion DATE NOT NULL,
fecha_Publicacion DATETIME,
fecha_Envio DATE,
fecha_Devo DATE,
fecha_Acontecimiento DATETIME NOT NULL,
lugar_Acontecimiento VARCHAR(150) NOT NULL,
descripcion_Corta VARCHAR(200) NOT NULL,
descripcion_Larga TEXT NOT NULL,
estado enum('redaccion', 'terminada', 'devuelta','publicada') NOT NULL,
cantidad_Likes int DEFAULT(0),
cantidad_Vistas int DEFAULT(0),
primary key(id_Noticia),
constraint FK_Secc_Not foreign key(seccion_Noticia) references seccion(id_Seccion),
constraint FK_Autor_Not foreign key(reportero_Autor) references usuario(id_Usuario)
);

CREATE TABLE media(
id_Media INT NOT NULL AUTO_INCREMENT,
contenido_media longblob,
blob_type varchar(15),
noticia_Duena INT NOT NULL,
PRIMARY KEY(id_Media),
constraint FK_Noticia_Media foreign key(noticia_Duena) references noticia(id_Noticia)
);

CREATE TABLE comentario(
id_Comentario int NOT NULL AUTO_INCREMENT,
comentario_Dueno int,
noticia_Comentario int NOT NULL,
usuario_Comentario int NOT NULL,
contenido_Comentario TEXT NOT NULL,
fecha_Comentario datetime NOT NULL,
primary key(id_Comentario),
constraint FK_Reply_Comment foreign key(comentario_Dueno) references comentario(id_Comentario),
constraint FK_Noticia_Comment foreign key(noticia_Comentario) references noticia(id_Noticia),
constraint FK_User_Comment foreign key(usuario_Comentario) references usuario(id_Usuario)
);

CREATE TABLE palabra_clave(
id_PalabraClv int NOT NULL AUTO_INCREMENT,
pal_Clave varchar(20) NOT NULL,
id_NoticiaProp int NOT NULL,
primary key(id_PalabraClv),
constraint FK_Noticia_Clave foreign key(id_NoticiaProp) references noticia(id_Noticia)
);

CREATE TABLE feedback_noticia(
id_NotFeed int NOT NULL AUTO_INCREMENT,
id_editorNoti int NOT NULL,
id_Noticia int NOT NULL,
feedback text NOT NULL,
primary key(id_NotFeed),
constraint FK_Editor_Feedback foreign key(id_editorNoti) references usuario(id_Usuario),
constraint FK_Noticia_Feedback foreign key(id_Noticia) references noticia(id_Noticia)
);