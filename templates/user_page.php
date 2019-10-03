<?php
if (isset($_SESSION['login']) && $_SESSION['logged'] === true){
    $userData = getSQLdata (USERS,
        USERS . '.id, ' . USERS . '.login, ' . USERS . '.name, ' .
        CART . '.shopping_date, ' . CART . '.prod_id, ' . CART . '.prod_name, ' . CART . '.quantity, ' .
        PRODUCTS . '.prod_price',
        'LEFT JOIN '. CART . ' ON '. USERS . '.login = ' . CART . '.login
         LEFT JOIN ' . PRODUCTS . ' ON ' . CART . '.prod_id = ' . PRODUCTS . '.id WHERE ' . USERS . '.login = ' . '\'' . $_SESSION['login'] . '\'
         ORDER BY ' . CART . '.shopping_date DESC');
}
?>
<!-- Страница пользователя. Отображает историю его заказов -->
<section class="user_cabinet">
    <?php if (isset($_SESSION['login']) && $_SESSION['logged'] === true): ?>
        <h2>
            Добро пожаловать в личный кабинет, <?= $userData[0]['name'] ?>!
        </h2>

        <p>
            Ваш номер в системе — <?= $userData[0]['id'] ?>, вы вошли с логином "<?= $userData[0]['login'] ?>"
        </p>

        <?php if ($userData[0]['prod_id']): ?>
            <p>Раньше вы покупали</p>
            <table class="shopping_list">
                <tr>
                    <th>
                        Дата покупки
                    </th>
                    <th>
                        Название товара
                    </th>
                    <th>
                        Цена
                    </th>
                    <th>
                        Количество
                    </th>
                    <th>
                        Общая стоимость
                    </th>
                </tr>
                <?php foreach ($userData as $data): ?>
                    <tr>
                        <td>
                            <?= $data['shopping_date'] ?>
                        </td>
                        <td>
                            <?= $data['prod_name'] ?>
                        </td>
                        <td>
                            <?= $data['prod_price'] ?>
                        </td>
                        <td>
                            <?= $data['quantity'] ?>
                        </td>
                        <td>
                            <?= $data['prod_price'] * $data['quantity'] ?>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </table>
        <?php endif; ?>

        <form action="/logout/" method="post">
            <input type="hidden" name="logout" value="true">
            <button type="submit" class="logout">Выйти из системы</button>
        </form>
    <?php else: ?>
        <h2>Вы не авторизованы!</h2>
    <?php endif; ?>
</section>