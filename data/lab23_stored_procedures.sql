USE hsr_express;

DROP PROCEDURE IF EXISTS sp_listar_personajes;
DROP PROCEDURE IF EXISTS sp_obtener_personaje;
DROP PROCEDURE IF EXISTS sp_guardar_personaje;

DELIMITER $$

CREATE PROCEDURE sp_listar_personajes()
BEGIN
  SELECT id, nombre, img, descripcion, created_at
  FROM personajes
  ORDER BY id;
END$$

CREATE PROCEDURE sp_obtener_personaje(IN p_id INT)
BEGIN
  SELECT id, nombre, img, descripcion, created_at
  FROM personajes
  WHERE id = p_id;
END$$

CREATE PROCEDURE sp_guardar_personaje(
  IN p_id INT,
  IN p_nombre VARCHAR(100),
  IN p_img VARCHAR(255),
  IN p_descripcion TEXT
)
BEGIN
  IF p_id IS NULL THEN
    INSERT INTO personajes (nombre, img, descripcion)
    VALUES (p_nombre, p_img, p_descripcion);

    SELECT LAST_INSERT_ID() AS id;
  ELSE
    UPDATE personajes
    SET nombre = p_nombre,
        img = p_img,
        descripcion = p_descripcion
    WHERE id = p_id;

    SELECT p_id AS id;
  END IF;
END$$

DELIMITER ;
