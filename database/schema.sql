CREATE DATABASE sdc_products;

USE sdc_products;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name TEXT,
  slogan TEXT,
  description TEXT,
  category VARCHAR(100),
  default_price TEXT
);

DROP TABLE IF EXISTS features;

CREATE TABLE features (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  product_id INTEGER,
    FOREIGN KEY (product_id)
      REFERENCES products (id),
  feature TEXT,
  item_value TEXT
);

DROP TABLE IF EXISTS styles;

CREATE TABLE styles (
  style_id INTEGER PRIMARY KEY AUTO_INCREMENT,
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
  style_id INTEGER,
    FOREIGN KEY (style_id)
      REFERENCES styles (style_id),
  url TEXT,
  thumbnail_url TEXT
);


DROP TABLE IF EXISTS skus;

CREATE TABLE skus (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  product_id INTEGER,
    FOREIGN KEY (product_id)
      REFERENCES products (id),
  size VARCHAR(4),
  quantity INTEGER
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