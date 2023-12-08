CREATE DATABASE sdc_products;

USE sdc_products;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  product_id INTEGER PRIMARY KEY AUTO_INCREMENT,
  item_name TEXT,
  slogan TEXT,
  item_description TEXT,
  category VARCHAR(100),
  default_price INTEGER
);

DROP TABLE IF EXISTS features;

CREATE TABLE features (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  product_id INTEGER,
    FOREIGN KEY (product_id)
      REFERENCES products (product_id),
  feature TEXT,
  item_value TEXT
);

DROP TABLE IF EXISTS styles;

CREATE TABLE styles (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  product_id INTEGER,
    FOREIGN KEY (product_id)
      REFERENCES products (product_id),
  style_name TEXT,
  sale_price VARCHAR(6),
  original_price VARCHAR(6),
  photos INTEGER,
  default_style TINYINT(1) DEFAULT 0
);

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  style_id INTEGER,
    FOREIGN KEY (style_id)
      REFERENCES styles (id),
  url TEXT,
  thumbnail_url TEXT
);


DROP TABLE IF EXISTS skus;

CREATE TABLE skus (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  product_id INTEGER,
    FOREIGN KEY (product_id)
      REFERENCES products (product_id),
  size VARCHAR(4),
  quantity INTEGER
);

DROP TABLE IF EXISTS related_products;

CREATE TABLE related_products (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  product_id INTEGER,
    FOREIGN KEY (product_id)
      REFERENCES products (product_id),
  related_product_id INTEGER,
    FOREIGN KEY (product_id)
      REFERENCES products (product_id)
);