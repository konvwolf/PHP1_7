<!-- Хедер с блоками "Зарегистрироваться" и "Авторизоваться", модальным окном с формами регистрации
и логина, корзиной и названием сайта -->

<header>
        <h1>
            <a href="/">
                Все для мира
            </a>    
        </h1>

        <div class="reg_log">
            <div class="reg_log_links">
                <?php if (isset($_SESSION['login']) && isset($_SESSION['logged'])): ?>
                    <a href="/lk/">Личный кабинет</a>
                <?php else: ?>
                    <div class="choose_login">Авторизоваться</div> /
                    <div class="choose_register">Зарегистрироваться</div>
                <?php endif; ?>
            </div>
        </div>

        <div class="reg_log_forms">
            <form action="/login/" method="post" class="login_form invisible">
                <i class="far fa-times-circle close_window"></i>
                <input type="text" name="login" placeholder="Логин" required>
                <input type="password" name="pwd" placeholder="Пароль" required>
                <input type="hidden" name="loging" value="true">
                <button type="submit">Авторизоваться</button>
            </form>

            <form action="/register/" method="post" class="register_form invisible">
                <i class="far fa-times-circle close_window"></i>
                <input type="text" name="name" placeholder="Как вас зовут?" pattern="^([A-Za-zА-Яа-яЁё]+)$" required>
                <input type="text" name="email" placeholder="Укажите Email" pattern="^([A-Za-z0-9\.-]+)(@)([A-Za-z0-9-]+)(\.)([A-Za-z]{2,})$" required>
                <input type="text" name="login" placeholder="Придумайте логин" pattern="[A-Za-z0-9]{3,}" required>
                <input type="text" name="pwd" placeholder="Придумайте пароль" pattern="[A-Za-z0-9]{8,}" required>
                <input type="hidden" name="register" value="true">
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>

        <div class="cart">
            <button class="btn_cart" type="button">Корзина</button>
            <div class="cart_block invisible"></div>
    </div>
</header>