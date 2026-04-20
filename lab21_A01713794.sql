-- Hector Alejandro barron Tamayo A01713794 | Lab21

-- La suma de las cantidades e importe total de todas las entregas realizadas durante el 97.
SELECT SUM(Cantidad) as 'Cantidad Total', SUM(Cantidad * (Precio + Impuesto)) as 'Importe Total'
FROM Materiales M, Entregan E
WHERE M.Clave = E.Clave
AND Fecha BETWEEN '1997-01-01' AND '1997-12-31';

-- Para cada proveedor, obtener la razón social del proveedor, número de entregas e importe total de las entregas realizadas.
SELECT RazonSocial, SUM(Cantidad * (Precio + Impuesto)) as 'Importe Total', COUNT(*) as 'Número de entregas'
FROM Proveedores P, Entregan E, Materiales M
WHERE P.RFC = E.RFC
AND E.Clave = M.Clave
GROUP BY P.RazonSocial;

/* Por cada material obtener la clave y descripción del material, la cantidad total entregada, la mínima cantidad entregada, la máxima cantidad entregada,
el importe total de las entregas de aquellos materiales en los que la cantidad promedio entregada sea mayor a 400. */
SELECT M.Clave, M.Descripcion, SUM(E.Cantidad) as 'Cantidad total entregada', MIN(E.Cantidad) as 'Cantidad mínima entregada',
MAX(E.Cantidad) as 'Cantidad máxima entregada', SUM(E.Cantidad * (Precio + Impuesto)) as 'Importe Total'
FROM Materiales M, Entregan E
WHERE M.Clave = E.Clave
GROUP BY M.Clave, M.Descripcion
HAVING AVG(E.Cantidad) > 400;

/* Para cada proveedor, indicar su razón social y mostrar la cantidad promedio de cada material entregado, detallando la clave y descripción del material,
excluyendo aquellos proveedores para los que la cantidad promedio sea menor a 500. */
SELECT P.RazonSocial, M.Clave, M.Descripcion, AVG(E.Cantidad) as 'Promedio por Material Entregado'
FROM Materiales M, Entregan E, Proveedores P
WHERE M.Clave = E.Clave
AND E.RFC = P.RFC
AND P.RFC IN (
    SELECT RFC
    FROM Entregan
    GROUP BY RFC
    HAVING AVG(Cantidad) > 500)
GROUP BY P.RFC, P.RazonSocial, M.Clave, M.Descripcion;

/* Mostrar en una solo consulta los mismos datos que en la consulta anterior pero para dos grupos de proveedores: 
aquellos para los que la cantidad promedio entregada es menor a 370 y aquellos para los que la cantidad promedio entregada sea mayor a 450.*/
SELECT P.RazonSocial, M.Clave, M.Descripcion, AVG(E.Cantidad) as 'PromedioCantidad',
CASE 
	WHEN AVG(E.Cantidad) < 370 THEN 'Menor a 370'
	WHEN AVG(E.Cantidad) > 450 THEN 'Mayor a 450'
END AS Grupo
FROM Entregan E, Proveedores P, Materiales M
WHERE E.RFC = P.RFC
AND E.Clave = M.Clave
GROUP BY P.RFC, P.RazonSocial, M.Clave, M.Descripcion
HAVING AVG(E.Cantidad) < 370 OR AVG(E.Cantidad) > 450;

-- Inserción de nuevo datos
INSERT INTO `materiales` (`clave`, `descripcion`, `precio`, `impuesto`) VALUES
(2050, 'Varilla 5/16', 175, 17.5),
(2060, 'Varilla 6/32', 190, 19),
(2070, 'Varilla 5/17', 205, 20.5),
(2080, 'Varilla 6/33', 220, 22),
(2090, 'Varilla 5/18', 235, 23.5);

-- Clave y descripción de los materiales que nunca han sido entregados.
SELECT Clave, Descripcion
FROM Materiales
WHERE Clave NOT IN(SELECT Clave
					FROM Entregan);

--  Razón social de los proveedores que han realizado entregas tanto al proyecto 'Vamos México' como al proyecto 'Querétaro Limpio'.
SELECT P.RazonSocial
FROM Proveedores P, Entregan E, Proyectos Pr
WHERE P.RFC = E.RFC
AND E.Numero = Pr.Numero
AND Pr.Denominacion IN ('Vamos México', 'Querétaro Limpio')
GROUP BY P.RFC, P.RazonSocial
HAVING COUNT(DISTINCT Pr.Denominacion) = 2;

/* Razón social y promedio de cantidad entregada de los proveedores cuyo promedio de cantidad 
entregada es mayor al promedio de la cantidad entregada por el proveedor con el RFC 'VAGO780901'. */
SELECT P.RazonSocial, AVG(E.Cantidad) as PromedioCantidad
FROM Proveedores P, Entregan E
WHERE P.RFC = E.RFC
GROUP BY P.RFC, P.RazonSocial
HAVING AVG(E.Cantidad) > (
    SELECT AVG(E2.Cantidad)
    FROM Entregan E2
    WHERE E2.RFC = 'VAGO780901');

/* RFC, razón social de los proveedores que participaron en el proyecto 'Infonavit Durango' y cuyas cantidades totales entregadas en el 2000
fueron mayores a las cantidades totales entregadas en el 2001. */
SELECT P.RFC, P.RazonSocial
FROM Proveedores P, Entregan E, Proyectos Pr
WHERE P.RFC = E.RFC
AND E.Numero = Pr.Numero
AND Pr.Denominacion = 'Infonavit Durango'
GROUP BY P.RFC, P.RazonSocial
HAVING 
    SUM(CASE 
            WHEN YEAR(E.Fecha) = 2000 THEN E.Cantidad 
            ELSE 0 
        END)
    >
    SUM(CASE 
            WHEN YEAR(E.Fecha) = 2001 THEN E.Cantidad 
            ELSE 0 
        END);
