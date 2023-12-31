-- ---
-- Seed Database
-- You will need to enable MYSQL variable LOCAL_INFILE in order for these commands to work.**
-- SET GLOBAL local_infile = 'ON';
-- **Be sure to list absolute path
-- Optionally, you can place the files in a specific directory if you wish to load the data without the local flag.  You must edit my.cnf to sidestep any
-- ---
LOAD DATA LOCAL INFILE '/Users/malloryburke/hack/rfp2310/ganymede/Products-Service/database/data/product.csv'
INTO TABLE products
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(id, name, slogan, description, category, default_price);

LOAD DATA LOCAL INFILE '/Users/malloryburke/hack/rfp2310/ganymede/Products-Service/database/data/features.csv'
INTO TABLE features
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(id, product_id,feature,item_value);

LOAD DATA LOCAL INFILE '/Users/malloryburke/hack/rfp2310/ganymede/Products-Service/database/data/styles.csv'
INTO TABLE styles
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(style_id, product_id,style_name,sale_price,original_price,`default?`);

LOAD DATA LOCAL INFILE '/Users/malloryburke/hack/rfp2310/ganymede/Products-Service/database/data/photos.csv'
INTO TABLE photos
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(id, style_id, url, thumbnail_url);

LOAD DATA LOCAL INFILE '/Users/malloryburke/hack/rfp2310/ganymede/Products-Service/database/data/skus.csv'
INTO TABLE skus
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(id, product_id, size, quantity);

LOAD DATA LOCAL INFILE '/Users/malloryburke/hack/rfp2310/ganymede/Products-Service/database/data/related.csv'
INTO TABLE related_products
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(id, product_id, related_product_id);
