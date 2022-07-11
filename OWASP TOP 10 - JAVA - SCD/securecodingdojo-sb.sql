-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 11-Jul-2022 às 06:15
-- Versão do servidor: 10.4.24-MariaDB
-- versão do PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `securecodingdojo-sb`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `pessoa_entity`
--

CREATE TABLE `pessoa_entity` (
  `id` bigint(20) NOT NULL,
  `age` int(11) NOT NULL,
  `credit_card` varchar(19) NOT NULL,
  `cvv` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` int(11) NOT NULL,
  `tem_acesso` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `pessoa_entity`
--

INSERT INTO `pessoa_entity` (`id`, `age`, `credit_card`, `cvv`, `email`, `name`, `password`, `token`, `tem_acesso`) VALUES
(1, 18, '2929 1231 3123 3213', 123, 'teste@teste.com', 'Jose Joaquim', '1234', 123456, b'1'),
(2, 81, '4123 3213 2929 1231', 125, 's.abravanel@teste.com', 'Silvio Abravanel', '1234', 123654, b'0'),
(3, 74, '1547 9654 3123 3213', 854, 'e.ezequias@teste.com', 'Everaldo Ezequias', '1234', 651325, b'0'),
(4, 16, '8421 6325 3123 3213', 654, 'd.juam@teste.com', 'Dom Juam', '1234', 543210, b'0'),
(5, 35, '9546 2621 3123 3213', 123, 'a.fagundes@teste.com', 'Antonio Fagundes', '1234', 658432, b'0'),
(6, 20, '3213 1233 6545 3213', 123, 'j.mato@teste.com', 'João do Mato', '1234', 657422, b'0');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `pessoa_entity`
--
ALTER TABLE `pessoa_entity`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_h1ltdwgti4aurqwcs8dfajxwc` (`email`),
  ADD UNIQUE KEY `UK_bcbag900uobt1plp18ydir6t9` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
