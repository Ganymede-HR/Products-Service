CREATE DATABASE sdc;

USE sdc;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  productId INTEGER,
  item_name TEXT,
  slogan TEXT,
  item_description TEXT,
  category VARCHAR(100),
  default_price VARCHAR(6)
);

DROP TABLE IF EXISTS features;

CREATE TABLE features (
  id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
  feature TEXT,
  item_value TEXT,
  productId INTEGER,
    FOREIGN KEY (productId)
      REFERENCES products (id)
);

DROP TABLE IF EXISTS styles;

CREATE TABLE styles (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  productId INTEGER,
    FOREIGN KEY (productId)
      REFERENCES products (id),
  style_name TEXT,
  sale_price VARCHAR(6),
  original_price VARCHAR(6),
  photos INTEGER,
  default_style TINYINT(1) DEFAULT 0
);

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  thumbnail_url TEXT,
  url TEXT,
  style_id INTEGER,
    FOREIGN KEY (style_id)
      REFERENCES styles (id)
);


DROP TABLE IF EXISTS skus;

CREATE TABLE skus (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  quantity INTEGER,
  size VARCHAR(1),
  styleId INTEGER,
    FOREIGN KEY (styleId)
      REFERENCES styles (id)
);

DROP TABLE IF EXISTS related_products;

CREATE TABLE related_products (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  productId INTEGER,
    FOREIGN KEY (productId)
      REFERENCES products (id),
  related_product_id INTEGER,
    FOREIGN KEY (productId)
      REFERENCES products (id)
);

-- ---
-- Foreign Keys
-- ---

-- ALTER TABLE features ADD FOREIGN KEY (productId) REFERENCES products (id);
-- ALTER TABLE styles ADD FOREIGN KEY (productId) REFERENCES products (id);
-- ALTER TABLE styles_photos ADD FOREIGN KEY (style_id) REFERENCES styles (id);
-- ALTER TABLE skus ADD FOREIGN KEY (productId) REFERENCES products (id);
-- ALTER TABLE related_products ADD FOREIGN KEY (productId) REFERENCES products (id);
-- ALTER TABLE related_products ADD FOREIGN KEY (related_product_id) REFERENCES products (id);

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