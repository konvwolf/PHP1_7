"use strict;"


/**
 * @class Forms отображает модальные окна с формой регистрации или формой логина в зависимости
 * от выбранной пользователем опции
 * 
 * @method _listenToLinks вешает обработчики событий на блоки "Зарегистрироваться" и "залогиниться"
 * 
 * @method _showRegisterForm показывает форму регистрации в модальном окне
 * 
 * @method _showLoginForm показывает форму логина в модальном окне
 * 
 * @method _showFormWindow показывает модальное окно с формой
 */
class Forms {
    constructor () {
        this.closeFormWindow = document.querySelectorAll(".close_window")
        this.formWindow = document.querySelector(".reg_log_forms")
        this.register = document.querySelector(".choose_register")
        this.login = document.querySelector(".choose_login")
        this.reg_form = document.querySelector(".register_form")
        this.log_form = document.querySelector(".login_form")
        this._listenToLinks ()
    }

    _listenToLinks () {
        this.closeFormWindow.forEach (close => close.addEventListener("click", () => {
            this.reg_form.className += " invisible"
            this.log_form.className += " invisible"
            this.formWindow.style.display = "none"
        }))

        if (this.login !== null && this.register !== null) {
            this.register.addEventListener("click", this._showRegisterForm.bind(this))
            this.login.addEventListener("click", this._showLoginForm.bind(this))
        }
    }

    _showRegisterForm () {
        this.reg_form.classList.toggle("invisible")
        this._showFormWindow()
    }

    _showLoginForm () {
        this.log_form.classList.toggle("invisible")
        this._showFormWindow()
    }

    _showFormWindow () {
        this.formWindow.style.display = "inline"
    }
}

let forms = new Forms ()