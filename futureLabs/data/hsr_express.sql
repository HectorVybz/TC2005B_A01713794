-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-04-2026 a las 23:38:39
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `hsr_express`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habilidades`
--

CREATE TABLE `habilidades` (
  `id` int(11) NOT NULL,
  `personaje_id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `tipo` enum('Basica','Habilidad','Definitiva','Talento','Tecnica') NOT NULL,
  `descripcion` text NOT NULL,
  `dano_base` int(11) DEFAULT 0,
  `costo_energia` int(11) DEFAULT 0,
  `nivel_requerido` int(11) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `habilidades`
--

INSERT INTO `habilidades` (`id`, `personaje_id`, `nombre`, `tipo`, `descripcion`, `dano_base`, `costo_energia`, `nivel_requerido`, `created_at`) VALUES
(1, 1, 'Caressing Moonlight', 'Basica', 'Ataque basico que inflige dano de rayo a un enemigo.', 50, 0, 1, '2026-04-07 18:38:54'),
(2, 1, 'Midnight Tumult', 'Habilidad', 'Kafka inflige dano de rayo y detona efectos de dano prolongado.', 120, 20, 4, '2026-04-07 18:38:54'),
(3, 1, 'Twilight Trill', 'Definitiva', 'Inflige dano de rayo a todos los enemigos.', 200, 120, 10, '2026-04-07 18:38:54'),
(4, 2, 'Octobolt Flash', 'Basica', 'Corte electrico rapido que inflige dano de rayo.', 52, 0, 1, '2026-04-07 18:38:54'),
(5, 2, 'Abyss Thunder', 'Habilidad', 'Golpe potente de rayo dirigido a un enemigo.', 125, 25, 4, '2026-04-07 18:38:54'),
(6, 2, 'Slashed Dream Cries in Red', 'Definitiva', 'Ataque devastador de rayo a todos los enemigos.', 215, 140, 10, '2026-04-07 18:38:54'),
(7, 3, 'Lucent Moonglow', 'Basica', 'Ataque basico de hielo con espada.', 55, 0, 1, '2026-04-07 18:38:54'),
(8, 3, 'Transcendent Flash', 'Habilidad', 'Ataque de hielo mejorado a un enemigo.', 130, 25, 4, '2026-04-07 18:38:54'),
(9, 3, 'Florephemeral Dreamflux', 'Definitiva', 'Ataque de hielo de gran dano con poder lunar.', 220, 140, 10, '2026-04-07 18:38:54'),
(10, 4, 'Beneficent Lotus', 'Basica', 'Ataque basico mejorado con dano imaginario.', 60, 0, 1, '2026-04-07 18:38:54'),
(11, 4, 'Dracore Libre', 'Habilidad', 'Potencia su ataque imaginario con energia draconica.', 135, 30, 4, '2026-04-07 18:38:54'),
(12, 4, 'Azure Aqua Ablutes All', 'Definitiva', 'Ataque imaginario de gran dano a todos los enemigos.', 210, 140, 10, '2026-04-07 18:38:54'),
(13, 5, 'Farewell Hit', 'Basica', 'Ataque basico fisico con bate.', 48, 0, 1, '2026-04-07 18:38:54'),
(14, 5, 'RIP Home Run', 'Habilidad', 'Golpea al enemigo con fuerza y aumenta la presion ofensiva.', 115, 20, 4, '2026-04-07 18:38:54'),
(15, 5, 'Stardust Ace', 'Definitiva', 'Ataque fisico masivo contra todos los enemigos.', 205, 120, 10, '2026-04-07 18:38:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos`
--

CREATE TABLE `permisos` (
  `id` int(11) NOT NULL,
  `clave` varchar(100) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `permisos`
--

INSERT INTO `permisos` (`id`, `clave`, `descripcion`, `created_at`) VALUES
(1, 'personajes_crear', 'Permite crear nuevos personajes', '2026-04-07 19:10:00'),
(2, 'personajes_editar', 'Permite editar personajes existentes', '2026-04-07 19:10:00'),
(3, 'rbac_ver', 'Permite ver el panel RBAC', '2026-04-07 19:10:00'),
(4, 'rbac_asignar_roles', 'Permite asignar roles a otros usuarios', '2026-04-07 19:10:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personajes`
--

CREATE TABLE `personajes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `img` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `personajes`
--

INSERT INTO `personajes` (`id`, `nombre`, `img`, `descripcion`, `created_at`) VALUES
(1, 'Kafka', 'kafka.webp', 'Miembro de los Stellaron Hunters con habilidades de rayo.', '2026-04-07 18:38:54'),
(2, 'Acheron', 'acheron.webp', 'Misteriosa espadachina errante con poder de rayo.', '2026-04-07 18:38:54'),
(3, 'Jingliu', 'jingliu.webp', 'Espadachina legendaria de la Xianzhou Luofu.', '2026-04-07 18:38:54'),
(4, 'Dan Heng IL', 'dan_heng_il.webp', 'Forma Imbibitor Lunae de Dan Heng.', '2026-04-07 18:38:54'),
(5, 'Trailblazer', 'trailblazer.webp', 'Protagonista versatil que puede adaptarse a distintos caminos.', '2026-04-07 18:38:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `nombre`, `descripcion`, `created_at`) VALUES
(1, 'admin', 'Control total sobre personajes y administración RBAC', '2026-04-07 19:10:00'),
(2, 'editor', 'Puede crear y editar personajes, pero no administrar roles', '2026-04-07 19:10:00'),
(3, 'viewer', 'Solo puede consultar el contenido público', '2026-04-07 19:10:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_permisos`
--

CREATE TABLE `rol_permisos` (
  `rol_id` int(11) NOT NULL,
  `permiso_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol_permisos`
--

INSERT INTO `rol_permisos` (`rol_id`, `permiso_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_roles`
--

CREATE TABLE `usuario_roles` (
  `usuario_id` int(11) NOT NULL,
  `rol_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `habilidades`
--
ALTER TABLE `habilidades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_habilidad_personaje` (`personaje_id`);

--
-- Indices de la tabla `permisos`
--
ALTER TABLE `permisos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `clave` (`clave`);

--
-- Indices de la tabla `personajes`
--
ALTER TABLE `personajes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `rol_permisos`
--
ALTER TABLE `rol_permisos`
  ADD PRIMARY KEY (`rol_id`,`permiso_id`),
  ADD KEY `fk_rol_permisos_permiso` (`permiso_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `usuario_roles`
--
ALTER TABLE `usuario_roles`
  ADD PRIMARY KEY (`usuario_id`,`rol_id`),
  ADD KEY `fk_usuario_roles_rol` (`rol_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `habilidades`
--
ALTER TABLE `habilidades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `permisos`
--
ALTER TABLE `permisos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `personajes`
--
ALTER TABLE `personajes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `habilidades`
--
ALTER TABLE `habilidades`
  ADD CONSTRAINT `fk_habilidad_personaje` FOREIGN KEY (`personaje_id`) REFERENCES `personajes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `rol_permisos`
--
ALTER TABLE `rol_permisos`
  ADD CONSTRAINT `fk_rol_permisos_permiso` FOREIGN KEY (`permiso_id`) REFERENCES `permisos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_rol_permisos_rol` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario_roles`
--
ALTER TABLE `usuario_roles`
  ADD CONSTRAINT `fk_usuario_roles_rol` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usuario_roles_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
