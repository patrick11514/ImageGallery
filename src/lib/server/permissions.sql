CREATE TABLE IF NOT EXISTS `permissions` ( `id` int(11) NOT NULL, `group_name` varchar(100) NOT NULL, `permission` varchar(120) NOT NULL, `value` tinyint(1) NOT NULL ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
ALTER TABLE `permissions` ADD PRIMARY KEY (`id`), ADD KEY `group_name` (`group_name`);
ALTER TABLE `permissions` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `permissions` ADD CONSTRAINT `group_name` FOREIGN KEY (`group_name`) REFERENCES `groups` (`name`) ON DELETE CASCADE ON UPDATE CASCADE;