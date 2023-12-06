CREATE DATABASE sdc_products;

USE sdc_products;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  item_name TEXT,
  slogan TEXT,
  item_description TEXT,
  category VARCHAR(100),
  default_price INTEGER
);

DROP TABLE IF EXISTS features;

CREATE TABLE features (
  id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
  feature TEXT,
  item_value TEXT,
  product_id INTEGER,
    FOREIGN KEY (product_id)
      REFERENCES products (id)
);

DROP TABLE IF EXISTS styles;

CREATE TABLE styles (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  product_id INTEGER,
    FOREIGN KEY (product_id)
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
  size VARCHAR(3),
  styleId INTEGER,
    FOREIGN KEY (styleId)
      REFERENCES styles (id)
);

DROP TABLE IF EXISTS related_products;

CREATE TABLE related_products (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  product_id INTEGER,
    FOREIGN KEY (product_id)
      REFERENCES products (id),
  related_product_id INTEGER,
    FOREIGN KEY (product_id)
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

-- -
-- Table Properties
-- ---

-- ALTER TABLE `products` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `features` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `styles` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `styles_photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `skus` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `related_products` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
