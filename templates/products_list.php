<!-- Полный список товаров сайта -->

<section class="products_list">
    <?php 
        $query = getSQLdata (PRODUCTS,
            PRODUCTS . '.id, ' . 'prod_name, prod_price, prod_hurl, ' . PHOTOS . '.file_name, ' . PHOTOS . '.image_name',
            'JOIN '.PHOTOS.' ON '.PRODUCTS.'.id = '.PHOTOS.'.prod_id GROUP BY '.PRODUCTS.'.id ORDER BY '.PRODUCTS.'.id DESC LIMIT 10');
        foreach ($query as $prods):
    ?>
        <div class="product_card" data-id="<?= $prods['id'] ?>">
            <a href="/product/<?= $prods['prod_hurl'] ?>/" class="product_link">
                <img src="/public/img/<?= $prods['file_name'] ?>" alt="<?= $prods['image_name'] ?>">
                <h2 class="product_name"><?= $prods['prod_name'] ?></h2>
                <i class="fas fa-ruble-sign"></i> <span class="product_price"><?= $prods['prod_price'] ?></span>
                <a class="to_cart"><i class="fas fa-shopping-basket"></i></a>
            </a>
        </div>
    <?php endforeach; ?>
</section>