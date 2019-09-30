<?php

// Пользователь разлогинивается

session_start();

header ('Location: /');

if (isset($_POST['logout'])) {
    session_destroy();
}