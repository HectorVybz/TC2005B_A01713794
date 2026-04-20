USE hsr_express;

DROP PROCEDURE IF EXISTS sp_buscar_personajes;

DELIMITER $$

CREATE PROCEDURE sp_buscar_personajes(IN p_termino VARCHAR(100))
BEGIN
  SELECT id, nombre, img, descripcion, created_at
  FROM personajes
  WHERE p_termino = '' OR nombre LIKE CONCAT('%', p_termino, '%')
  ORDER BY nombre;
END$$

DELIMITER ;
