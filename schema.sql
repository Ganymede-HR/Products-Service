-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'products'
--
-- ---

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` MEDIUMTEXT NULL DEFAULT NULL,
  `slogan` MEDIUMTEXT NULL DEFAULT NULL,
  `description` MEDIUMTEXT NULL DEFAULT NULL,
  `category` VARCHAR(100) NULL DEFAULT NULL,
  `default_price` VARCHAR(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'features'
--
-- ---

DROP TABLE IF EXISTS `features`;

CREATE TABLE `features` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `feature` MEDIUMTEXT NULL DEFAULT NULL,
  `value` MEDIUMTEXT NULL DEFAULT NULL,
  `products_table_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'styles'
--
-- ---

DROP TABLE IF EXISTS `styles`;

CREATE TABLE `styles` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `style_id` INT NULL DEFAULT NULL,
  `name` MEDIUMTEXT NULL DEFAULT NULL,
  `original_price` VARCHAR(6) NULL DEFAULT NULL,
  `sale_price` VARCHAR(6) NULL DEFAULT NULL,
  `photos` INTEGER NULL DEFAULT NULL,
  `default` TINYINT(1) NULL DEFAULT 0,
  `product_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'styles_photos'
--
-- ---

DROP TABLE IF EXISTS `styles_photos`;

CREATE TABLE `styles_photos` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `thumbnail_url` MEDIUMTEXT NULL DEFAULT NULL,
  `url` MEDIUMTEXT NULL DEFAULT NULL,
  `style_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'skus'
--
-- ---

DROP TABLE IF EXISTS `skus`;

CREATE TABLE `skus` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `quantity` INTEGER NULL DEFAULT NULL,
  `size` VARCHAR(1) NULL DEFAULT NULL,
  `product_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'related_products'
--
-- ---

DROP TABLE IF EXISTS `related_products`;

CREATE TABLE `related_products` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `product_id` INTEGER NOT NULL,
  `related_product_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `features` ADD FOREIGN KEY (products_table_id) REFERENCES `products` (`id`);
ALTER TABLE `styles` ADD FOREIGN KEY (product_id) REFERENCES `products` (`id`);
ALTER TABLE `styles_photos` ADD FOREIGN KEY (style_id) REFERENCES `styles` (`id`);
ALTER TABLE `skus` ADD FOREIGN KEY (product_id) REFERENCES `products` (`id`);
ALTER TABLE `related_products` ADD FOREIGN KEY (product_id) REFERENCES `products` (`id`);
ALTER TABLE `related_products` ADD FOREIGN KEY (related_product_id) REFERENCES `products` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `products` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `features` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `styles` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `styles_photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `skus` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `related_products` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `products` (`id`,`name`,`slogan`,`description`,`category`,`default_price`) VALUES
-- ('','','','','','');
-- INSERT INTO `features` (`id`,`feature`,`value`,`products_table_id`) VALUES
-- ('','','','');
-- INSERT INTO `styles` (`id`,`style_id`,`name`,`original_price`,`sale_price`,`photos`,`default`,`product_id`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `styles_photos` (`id`,`thumbnail_url`,`url`,`style_id`) VALUES
-- ('','','','');
-- INSERT INTO `skus` (`id`,`quantity`,`size`,`product_id`) VALUES
-- ('','','','');
-- INSERT INTO `related_products` (`id`,`product_id`,`related_product_id`) VALUES
-- ('','','');