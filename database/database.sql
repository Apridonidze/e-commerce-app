-- ========================
-- TABLE: admin
-- ========================
CREATE TABLE `admin` (
  `id` int(11) DEFAULT NULL,
  `rooms` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`rooms`)),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ========================
-- TABLE: cart
-- ========================
CREATE TABLE `cart` (
  `id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `amount` int(120) DEFAULT NULL,
  KEY `fk_cart_user` (`id`),
  KEY `fk_cart_product` (`product_id`),
  CONSTRAINT `fk_cart_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`products_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_cart_user` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ========================
-- TABLE: feedback
-- ========================
CREATE TABLE `feedback` (
  `id` int(11) DEFAULT NULL,
  `feedback_id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `stars` int(5) NOT NULL DEFAULT 0,
  `type` enum('product','platform') DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`feedback_id`),
  KEY `fk_feedback_user` (`id`),
  KEY `fk_feedback_product` (`product_id`),
  CONSTRAINT `fk_feedback_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`products_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_feedback_user` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ========================
-- TABLE: ordered_items
-- ========================
CREATE TABLE `ordered_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_ordered_items_order` (`order_id`),
  KEY `fk_ordered_items_product` (`product_id`),
  CONSTRAINT `fk_ordered_items_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ordered_items_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`products_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ========================
-- TABLE: orders
-- ========================
CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `total_price` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `status` enum('Pending','OnWay','Delivered') DEFAULT NULL,
  `address` varchar(155) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `fk_orders_user` (`user_id`),
  CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ========================
-- TABLE: products
-- ========================
CREATE TABLE `products` (
  `id` int(11) DEFAULT NULL,
  `products_id` int(11) NOT NULL AUTO_INCREMENT,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `title` varchar(55) DEFAULT NULL,
  `description` varchar(5000) DEFAULT NULL,
  `category` varchar(55) DEFAULT NULL,
  `subcategory` varchar(55) DEFAULT NULL,
  `price` decimal(12,2) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `date` varchar(55) DEFAULT NULL,
  `sales_price` decimal(12,2) DEFAULT NULL,
  PRIMARY KEY (`products_id`),
  KEY `fk_products_user` (`id`),
  CONSTRAINT `fk_products_user` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ========================
-- TABLE: reports
-- ========================
CREATE TABLE `reports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `content` varchar(500) DEFAULT NULL,
  `type` enum('Platform','Service','Product','Delivery','Other') DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `status` enum('Sent','Responded','Removed') DEFAULT NULL,
  `resolution_action` enum('Content Removed (Valid)','Content Removed (Invalid)','Listing Edited (Valid)','Listing Edited (Invalid)','Already Fixed (Valid)','Already Fixed (Invalid)','No Violation (Valid)','No Violation (Invalid)','Duplicate (Valid)','Duplicate (Invalid)','Other (Valid)','Other (Invalid)') DEFAULT NULL,
  `resolved_by` int(11) DEFAULT NULL,
  `resolved_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_reports_user` (`user_id`),
  KEY `fk_reports_product` (`product_id`),
  KEY `fk_reports_admin` (`resolved_by`),
  CONSTRAINT `fk_reports_admin` FOREIGN KEY (`resolved_by`) REFERENCES `admin` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_reports_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`products_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_reports_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ========================
-- TABLE: stripe_users
-- ========================
CREATE TABLE `stripe_users` (
  `user_id` int(11) DEFAULT NULL,
  `customer_id` varchar(25) DEFAULT NULL,
  `payment_method_id` varchar(30) DEFAULT NULL,
  `brand` varchar(25) DEFAULT NULL,
  `last4` varchar(4) DEFAULT NULL,
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `fk_stripe_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ========================
-- TABLE: support_messages
-- ========================
CREATE TABLE `support_messages` (
  `message_id` int(11) NOT NULL AUTO_INCREMENT,
  `conversation_id` varchar(12) DEFAULT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `content` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `status` enum('Delivered','Seen') DEFAULT NULL,
  PRIMARY KEY (`message_id`),
  KEY `fk_support_sender` (`sender_id`),
  CONSTRAINT `fk_support_sender` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=376 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;