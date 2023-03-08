CREATE TABLE IF NOT EXISTS `groups` (`id` int(11) NOT NULL,`name` varchar(120) NOT NULL,`color` varchar(6) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
INSERT INTO `groups` (`id`, `name`, `color`) VALUES (1, 'admin', 'e0283b');
ALTER TABLE `groups` ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `group_name` (`name`);
ALTER TABLE `groups` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;