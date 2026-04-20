USE hsr_express;

CREATE TABLE IF NOT EXISTS auditoria_habilidades (
  id int(11) NOT NULL AUTO_INCREMENT,
  habilidad_id int(11) NOT NULL,
  personaje_id int(11) NOT NULL,
  accion varchar(50) NOT NULL,
  detalle varchar(255) NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (id),
  KEY fk_auditoria_habilidad (habilidad_id),
  CONSTRAINT fk_auditoria_habilidad
    FOREIGN KEY (habilidad_id) REFERENCES habilidades (id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TRIGGER IF EXISTS trg_habilidades_before_insert;
DROP TRIGGER IF EXISTS trg_habilidades_after_insert;

DELIMITER $$

CREATE TRIGGER trg_habilidades_before_insert
BEFORE INSERT ON habilidades
FOR EACH ROW
BEGIN
  SET NEW.dano_base = GREATEST(COALESCE(NEW.dano_base, 0), 0);
  SET NEW.costo_energia = GREATEST(COALESCE(NEW.costo_energia, 0), 0);
  SET NEW.nivel_requerido = GREATEST(COALESCE(NEW.nivel_requerido, 1), 1);
END$$

CREATE TRIGGER trg_habilidades_after_insert
AFTER INSERT ON habilidades
FOR EACH ROW
BEGIN
  INSERT INTO auditoria_habilidades (habilidad_id, personaje_id, accion, detalle)
  VALUES (
    NEW.id,
    NEW.personaje_id,
    'INSERT',
    CONCAT('Se registro la habilidad ', NEW.nombre, ' de tipo ', NEW.tipo)
  );
END$$

DELIMITER ;
