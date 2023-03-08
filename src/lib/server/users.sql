CREATE TABLE IF NOT EXISTS `users` ( `id` int(11) NOT NULL, `username` varchar(20) NOT NULL, `password` varchar(100) NOT NULL, `email` varchar(40) NOT NULL, `group_name` varchar(120) NOT NULL ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
ALTER TABLE `users` ADD PRIMARY KEY (`id`), ADD KEY `group` (`group_name`);
ALTER TABLE `users` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `users` ADD CONSTRAINT `group` FOREIGN KEY (`group_name`) REFERENCES `groups` (`name`) ON DELETE NO ACTION ON UPDATE CASCADE;