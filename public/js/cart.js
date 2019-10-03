"use strict;"


/**
 * @class Cart обеспечивает работу корзины: вешает обработчики событий на кнопки, формирует массив товаров,
 * рисует содержимое корзины, считает подитог и итог.
 * 
 * @method _fillUserCart запрашивает куки содержимого корзины. Если куки есть, записи из него (хранятся в
 * виде JSON) сохраняются в массив корзины для отрисовки
 * 
 * @method _listeners вешает обработчики событий на кнопки корзины: удалить, купить, показать содержимое
 * 
 * @method _addToCart добавляет данные о выбранном пользователем товаре в массив и запускает отрисовку
 * содержимого корзины на странице
 * 
 * @method _deleteFromCart удаляет данные о выбранном товаре из корзины и запускает отрисовку содержимого
 * корзины на странице
 * 
 * @method _buy формирует JSON-строку для POST-запроса и отправляет данные о выбранных пользователем товарах
 * на сайт. Формирует заказ. После заказа содержимое корзины обнуляется
 * 
 * @method _render вызывает @class CartRender для отрисовки корзины и метод _SetCookie для сохранения
 * содержимого корзины в куки
 * 
 * @method _SetCookie сохраняет данные о выбранных пользователем товарах в куки. Куки хранятся неделю
 */
class Cart {
    constructor () {
        this.cart = document.querySelector(".btn_cart")
        this.cartContents = document.querySelector(".cart_block")
        this.toCart = document.querySelectorAll(".to_cart")
        this.userCart = []
        this._listeners()
        this._fillUserCart()
    }

    _fillUserCart () {
        this.getFromCookie = document.cookie.replace(/(?:(?:^|.*;\s*)peace_shop\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if (this.getFromCookie.length) {
            this.userCart = JSON.parse(this.getFromCookie)
            this._render()
        }
    }

    _listeners () {
        this.toCart.forEach(prod => prod.addEventListener("click", this._addToCart.bind(this)))

        this.cartContents.addEventListener("click", (event) => {
            if (event.target.classList.contains("del_button")) {
                this._deleteFromCart(event.target)
            }
        })

        this.cartContents.addEventListener("click", (event) => {
            if (event.target.classList.contains("buy_button")) {
                this._buy(event.target)
            }
        })
        
        this.cart.addEventListener("click", () => {
			this.cartContents.classList.toggle("invisible")
		})
    }

    _addToCart () {
        this.findInCart = this.userCart.find(element => element.id === event.target.parentNode.parentNode.dataset.id)
        if (!this.findInCart) {
            this.userCart.push({
                id: event.target.parentNode.parentNode.dataset.id,
                name: event.target.parentNode.parentNode.querySelector(".product_name").innerText,
                price: event.target.parentNode.parentNode.querySelector(".product_price").innerText,
                quantity: 1
            })
        } else {
            this.findInCart.quantity++
        }
        this._render()
    }

    _deleteFromCart (event) {
        this.findInCart = this.userCart.find(element => element.id === event.dataset.id)
        if (this.findInCart.quantity > 1) {
            this.findInCart.quantity--
        } else {
            this.userCart.splice(this.userCart.indexOf(this.findInCart), 1)
            document.querySelector(`.cart_item[data-id="${event.dataset.id}"]`).remove()
        }
        this._render()
    }

    _buy () {
        this.cart2String = JSON.stringify(this.userCart)
        this.xhr = new XMLHttpRequest()
        this.xhr.open ("POST", "/engine/place_order.php", true)
        this.xhr.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded")
        this.serv = "cartContents=" + this.cart2String
        this.xhr.onreadystatechange = () => {
				if (this.xhr.readyState == 4 && this.xhr.status == 200) {
                    this.userCart = []
                    document.cookie = "peace_shop=[]"
                    this._render()
				}
        }
        this.xhr.send (this.serv)
    }

    _render () {
        this.renderCart = new CartRender (this.userCart)
        this.cartContents.innerHTML = this.renderCart._render()
        this._setCookie()
    }

    _setCookie () {
        this.today = new Date()
        this.cookieExpires = this.today.getDate() + 7
        this.cart2Cookie = JSON.stringify(this.userCart)
        document.cookie = "peace_shop=" + this.cart2Cookie + ";path=/;expires=" + this.cookieExpires
    }
}



/**
 * @class CartRender отрисовывает корзину для отображения на странице. Считает подитог и итог
 */
class CartRender {
    constructor (cartItems) {
        this.cartItems = cartItems
        this.innerCart = ""
        this.totalPrice = 0
    }

    _render () {
        for (this.item of this.cartItems) {
            this.innerCart += `<div class="cart_item" data-id="${this.item.id}">
                                    <div>
                                        <p class="cart_item_name">${this.item.name}</p>
                                        <p class="cart_item_price">${this.item.price} руб. x ${this.item.quantity}</p>
                                        <p class="cart_item_subtotal">${this.item.price * this.item.quantity} руб.</p>
                                    </div>
                                    <div class="del_button" data-id="${this.item.id}">X</div>
                               </div>`
            this.totalPrice += this.item.quantity * this.item.price;
        }

        this.cartTotals = `<div class="cart-totals">
						        <div class="cart_total_sign">Total:</div>
                                <div class="cart_total_price">${this.totalPrice} руб.</div>
                                <button class="buy_button">Купить</button>
						   </div>`;

        return this.innerCart + this.cartTotals
    }
}

let cart = new Cart;