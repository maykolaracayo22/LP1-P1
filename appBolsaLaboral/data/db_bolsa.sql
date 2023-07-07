-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 07-07-2023 a las 09:16:45
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_bolsa`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `adm_id` int NOT NULL,
  `adm_nombre` varchar(60) NOT NULL,
  `adm_ap_paterno` varchar(60) NOT NULL,
  `adm_ap_materno` varchar(60) NOT NULL,
  `usu_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docente`
--

CREATE TABLE `docente` (
  `dt_id` int NOT NULL,
  `dt_nombre` varchar(60) NOT NULL,
  `dt_ap_paterno` varchar(60) NOT NULL,
  `dt_ap_materno` varchar(60) NOT NULL,
  `dt_foto` varchar(245) NOT NULL,
  `usu_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `egresado`
--

CREATE TABLE `egresado` (
  `egs_id` int NOT NULL,
  `egs_nombre` varchar(30) NOT NULL,
  `egs_ap_paterno` varchar(30) NOT NULL,
  `egs_ap_materno` varchar(30) NOT NULL,
  `egs_dni` varchar(15) NOT NULL,
  `egs_correo` varchar(30) NOT NULL,
  `egs_celular` varchar(15) NOT NULL,
  `egs_fecha_nacimiento` date NOT NULL,
  `usu_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `egresado`
--

INSERT INTO `egresado` (`egs_id`, `egs_nombre`, `egs_ap_paterno`, `egs_ap_materno`, `egs_dni`, `egs_correo`, `egs_celular`, `egs_fecha_nacimiento`, `usu_id`) VALUES
(1, 'david', 'asd', 'sad', '123', 'ads@gmail', '213', '2023-07-27', 1),
(2, 'robert', 'yucra', 'mamani', '41123412', 'ads@gmail', '21323213', '2023-07-04', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

CREATE TABLE `empresa` (
  `emp_id` int NOT NULL,
  `emp_razon_social` varchar(50) NOT NULL,
  `emp_direccion` varchar(100) NOT NULL,
  `emp_ruc` varchar(15) NOT NULL,
  `emp_celular` varchar(15) NOT NULL,
  `emp_rubro` varchar(100) NOT NULL,
  `emp_correo` varchar(50) NOT NULL,
  `emp_lugar` varchar(50) NOT NULL,
  `emp_rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `empresa`
--

INSERT INTO `empresa` (`emp_id`, `emp_razon_social`, `emp_direccion`, `emp_ruc`, `emp_celular`, `emp_rubro`, `emp_correo`, `emp_lugar`, `emp_rol`) VALUES
(1, 'Claro', 'lima', '20587496321', '944042326', 'qweqwe', 'claroperu@gmail.com', 'Lima', '1'),
(2, 'Servicios Integrales S.A.', 'qwew', 'qwe', '944042326', '123', '123', '123', '123');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE `eventos` (
  `ev_id` int NOT NULL,
  `ev_titulo` varchar(100) NOT NULL,
  `ev_descripcion` varchar(245) NOT NULL,
  `ev_fecha_inicio` date NOT NULL,
  `ev_fecha_final` date NOT NULL,
  `ev_foto` varchar(150) NOT NULL,
  `estado` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `institucion`
--

CREATE TABLE `institucion` (
  `inst_id` int NOT NULL,
  `inst_nombre` varchar(30) NOT NULL,
  `inst_dirrecion` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `institucion`
--

INSERT INTO `institucion` (`inst_id`, `inst_nombre`, `inst_dirrecion`) VALUES
(1, 'david', 'lima');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensaje`
--

CREATE TABLE `mensaje` (
  `m_id` int NOT NULL,
  `m_titulo` varchar(100) NOT NULL,
  `m_descripcion` varchar(245) NOT NULL,
  `emp_id` int NOT NULL,
  `egs_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `monitoreo`
--

CREATE TABLE `monitoreo` (
  `mt_id` int NOT NULL,
  `pos_id` int NOT NULL,
  `dt_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oferta_laboral`
--

CREATE TABLE `oferta_laboral` (
  `id` int NOT NULL,
  `descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `estado` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '1 habilitado\r\n0 deshabilitado\r\n2 suspendido',
  `salario` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `jornada_laboral` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'tiempo completo\r\nmedio tiempo',
  `turno` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `oferta_laboral`
--

INSERT INTO `oferta_laboral` (`id`, `descripcion`, `fecha_inicio`, `fecha_fin`, `estado`, `salario`, `jornada_laboral`, `turno`) VALUES
(1, 'Se requiere especialista en redes, con titulo universitario de ingeniero en redes.', '2023-06-08', '2024-06-18', '1', '2000.00', 'tiempo completo', 'mañana'),
(2, 'Se necesita un ingeniero de mecánica en redes.', '2023-06-08', '2024-06-30', '1', '1600.00', 'medio tiempo', 'tarde'),
(3, 'estamos buscando personas altamente motivadas y talentosas para unirse a nuestro equipo. Valoramos el compromiso, la pasión y la excelencia en el servicio al cliente.', '2023-06-20', '2024-06-05', '1', '2200.00', 'tiempo completo', 'noche'),
(4, 'Actualmente estamos buscando personas altamente motivadas y talentosas para unirse a nuestro equipo. Valoramos el compromiso, la pasión y la excelencia en el servicio al cliente.', '2023-06-04', '2023-08-10', '1', '300.00', 'medio tiempo', 'tarde'),
(5, 'En Comercializadora VentaFácil S.A., estamos buscando personas entusiastas y orientadas al servicio para unirse a nuestro equipo. Valoramos el compromiso, la pasión por las ventas y la excelencia en el servicio al cliente.', '2023-06-16', '2024-07-17', '1', '1500.00', 'tiempo completo', 'mañana'),
(6, 'En Comercializadora VentaFácil S.A., estamos buscando personas entusiastas y orientadas al servicio para unirse a nuestro equipo. Valoramos el compromiso, la pasión por las ventas y la excelencia en el servicio al cliente.', '2023-06-26', '2024-09-19', '1', '1000.00', 'medio completo', 'tarde'),
(7, 'Estamos en búsqueda de profesionales altamente capacitados y comprometidos para unirse a nuestro equipo. Valoramos el talento, la experiencia y la pasión por la excelencia en la construcción y el diseño arquitectónico.', '2023-02-15', '2024-06-02', '1', '2000.00', 'tiempo competo', 'mañana'),
(8, 'Estamos en búsqueda de profesionales altamente capacitados y comprometidos para unirse a nuestro equipo. Valoramos el talento, la experiencia y la pasión por la excelencia en la construcción y el diseño arquitectónico.', '2021-06-02', '2023-05-13', '1', '1500.00', 'tiempo completo', 'noche'),
(9, 'En Innovación Tecnológica Global S.A., buscamos personas apasionadas y altamente motivadas para unirse a nuestro equipo. Valoramos el espíritu innovador, la excelencia técnica y el compromiso con la entrega de resultados excepcionales.', '2023-06-09', '2024-06-15', '1', '1500.00', 'medio tiempo', 'tarde'),
(10, 'buscamos personas apasionadas y altamente motivadas para unirse a nuestro equipo. Valoramos el espíritu innovador, la excelencia técnica y el compromiso con la entrega de resultados excepcionales.', '2023-07-13', '2024-09-12', '1', '2000.00', 'tiempo completo', 'mañana');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil_docente`
--

CREATE TABLE `perfil_docente` (
  `pd_id` int NOT NULL,
  `pd_foto_pefil` varchar(200) NOT NULL,
  `pd_foto_portada` varchar(200) NOT NULL,
  `dt_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil_egresado`
--

CREATE TABLE `perfil_egresado` (
  `pe_id` int NOT NULL,
  `p_foto_perfil` varchar(245) NOT NULL,
  `p_foto_portada` varchar(254) NOT NULL,
  `p_cv` varchar(222) NOT NULL,
  `egs_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil_empresa`
--

CREATE TABLE `perfil_empresa` (
  `pemp_id` int NOT NULL,
  `pemp_foto_perfil` varchar(100) NOT NULL,
  `pemp_foto_portada` varchar(100) NOT NULL,
  `emp_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `postulante`
--

CREATE TABLE `postulante` (
  `pos_id` int NOT NULL,
  `pos_egs_id` int NOT NULL,
  `pos_ol_id` int NOT NULL,
  `pos_adjudicado` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `rol` varchar(1) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `email`, `password`, `rol`) VALUES
(1, 'fabrizio@gmail.com', '12345', '3'),
(2, 'empresa@gmail.com', '12345', '2'),
(4, 'docente@gmail.com', '123', '4'),
(5, 'admin@gmail.com', '12345', '1'),
(6, 'davidrobertyucramamani@gmail.com', '123', '3'),
(11, 'davidrobertyucramamani@gmail.com', '123', '1');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`adm_id`),
  ADD KEY `fk_administrador_usuarios` (`usu_id`);

--
-- Indices de la tabla `docente`
--
ALTER TABLE `docente`
  ADD PRIMARY KEY (`dt_id`),
  ADD KEY `fk_docente_usuarios` (`usu_id`);

--
-- Indices de la tabla `egresado`
--
ALTER TABLE `egresado`
  ADD PRIMARY KEY (`egs_id`),
  ADD KEY `fk_egresado_usuarios` (`usu_id`);

--
-- Indices de la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`emp_id`);

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`ev_id`);

--
-- Indices de la tabla `institucion`
--
ALTER TABLE `institucion`
  ADD PRIMARY KEY (`inst_id`);

--
-- Indices de la tabla `mensaje`
--
ALTER TABLE `mensaje`
  ADD PRIMARY KEY (`m_id`);

--
-- Indices de la tabla `monitoreo`
--
ALTER TABLE `monitoreo`
  ADD PRIMARY KEY (`mt_id`);

--
-- Indices de la tabla `oferta_laboral`
--
ALTER TABLE `oferta_laboral`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `perfil_docente`
--
ALTER TABLE `perfil_docente`
  ADD PRIMARY KEY (`pd_id`);

--
-- Indices de la tabla `perfil_egresado`
--
ALTER TABLE `perfil_egresado`
  ADD PRIMARY KEY (`pe_id`);

--
-- Indices de la tabla `perfil_empresa`
--
ALTER TABLE `perfil_empresa`
  ADD PRIMARY KEY (`pemp_id`);

--
-- Indices de la tabla `postulante`
--
ALTER TABLE `postulante`
  ADD PRIMARY KEY (`pos_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `empresa`
--
ALTER TABLE `empresa`
  MODIFY `emp_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `oferta_laboral`
--
ALTER TABLE `oferta_laboral`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD CONSTRAINT `fk_administrador_usuarios` FOREIGN KEY (`usu_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `docente`
--
ALTER TABLE `docente`
  ADD CONSTRAINT `fk_docente_usuarios` FOREIGN KEY (`usu_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `egresado`
--
ALTER TABLE `egresado`
  ADD CONSTRAINT `fk_egresado_usuarios` FOREIGN KEY (`usu_id`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
