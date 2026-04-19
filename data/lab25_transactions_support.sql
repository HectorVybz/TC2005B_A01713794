USE hsr_express;

CREATE TABLE IF NOT EXISTS habilidades (
  id int(11) NOT NULL AUTO_INCREMENT,
  personaje_id int(11) NOT NULL,
  nombre varchar(100) NOT NULL,
  tipo enum('Basica','Habilidad','Definitiva','Talento','Tecnica') NOT NULL,
  descripcion text NOT NULL,
  dano_base int(11) DEFAULT 0,
  costo_energia int(11) DEFAULT 0,
  nivel_requerido int(11) DEFAULT 1,
  created_at timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (id),
  KEY fk_habilidad_personaje (personaje_id),
  CONSTRAINT fk_habilidad_personaje
    FOREIGN KEY (personaje_id) REFERENCES personajes (id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
