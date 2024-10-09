const defaultOptions = {
    duration: 300,
    initAccessibility: true,
    openInInit: null,
    multiple: false,
    collapse: true,
    accordionItem: '[data-accordion]',
    accordionItemButton: '[data-accordion-button]',
    accordionItemBody: '[data-accordion-body]',
    activeClass: 'js-accordion-open',
}

class Accordion {
    constructor(element, options) {
        this.options = Object.assign({}, defaultOptions, options)
        this.elements = element.querySelectorAll(this.options.accordionItem)
        if (this.options.activeClass.length === 0) {
            console.error(
                'Ошибка: Наличие активного класса обязательно для продолжения работы скрипта!'
            )
        }
        this.addEvent()
    }

    addEvent() {
        for (let i = 0; i < this.elements.length; i++) {
            const accordion = this.elements[i]
            const button = accordion.querySelector(
                this.options.accordionItemButton
            )
            const body = accordion.querySelector(this.options.accordionItemBody)
            if (!button)
                console.error(
                    'Ошибка: Не найдена кнопка аккордиона у элемента',
                    accordion
                )
            if (!body)
                console.error(
                    'Ошибка: Не найдено тело аккордиона у элемента',
                    accordion
                )

            button.addEventListener('click', () => {
                this.toggle(i)
            })
            body.style.transitionDuration = this.options.duration + 'ms'
            body.style.overflow = 'hidden'
            body.addEventListener('transitionend', () => {
                if (body.style.height !== '0px') {
                    body.style.height = ''
                }
            })
            if (this.options.initAccessibility) {
                const idBody =
                    body.getAttribute('id') ? body.getAttribute('id') :
                        this.options.accordionItemBody.replace(/[^\w\s]/gi, '') +
                        '-' +
                        i
                const idButton =
                    button.getAttribute('id') ? body.getAttribute('id') :
                        this.options.accordionItemButton.replace(/[^\w\s]/gi, '') +
                        '-' +
                        i
                button.setAttribute('id', idButton)
                button.setAttribute('type', 'button')
                button.setAttribute('role', 'button')
                button.setAttribute('aria-expanded', 'true')
                button.setAttribute('aria-disabled', 'false')
                button.setAttribute('aria-controls', idBody)
                body.setAttribute('id', idBody)
                body.setAttribute('role', 'region')
                body.setAttribute('aria-labelledby', idButton)
            }
        }
        // this.closeAll()
        if (this.options.openInInit !== null) {
            this.open(this.options.openInInit)
        }
    }

    getOpenAccordionCount() {
        let count = 0
        for (let i = 0; i < this.elements.length; ++i) {
            if (this.elements[i].classList.contains(this.options.activeClass))
                count++
        }
        return count
    }

    open(index, fromOpenAll = false) {
        const element = this.elements[index]
        if (element) {
            if (!this.options.multiple && !fromOpenAll) this.closeAll()
            setTimeout(() => {
                const body = element.querySelector(this.options.accordionItemBody)
                body.style.height = body.scrollHeight + 'px'
                element.classList.add(this.options.activeClass)
                if (this.options.initAccessibility) {
                    const button = element.querySelector(
                        this.options.accordionItemButton
                    )
                    button.setAttribute('aria-expanded', 'true')
                    button.setAttribute('aria-disabled', 'true')
                }
            })
        }
    }

    close(index) {
        const element = this.elements[index]
        if (element) {
            const body = element.querySelector(this.options.accordionItemBody)
            body.style.height = body.scrollHeight + 'px'
            setTimeout(() => {
                element.classList.remove(this.options.activeClass)
                body.style.height = '0'
                if (this.options.initAccessibility) {
                    const button = element.querySelector(
                        this.options.accordionItemButton
                    )
                    button.setAttribute('aria-expanded', 'false')
                    button.setAttribute('aria-disabled', 'false')
                }
            })
        }
    }

    toggle(index) {
        const element = this.elements[index]
        if (element) {
            if (element.classList.contains(this.options.activeClass)) {
                if (this.options.collapse || this.getOpenAccordionCount() > 1) {
                    this.close(index)
                }
            } else {
                this.open(index)
            }
        }
    }

    toggleAll() {
        for (let i = 0; i < this.elements.length; i++) {
            this.toggle(i)
        }
    }

    openAll() {
        for (let i = 0; i < this.elements.length; i++) {
            this.open(i, true)
        }
    }

    closeAll() {
        for (let i = 0; i < this.elements.length; i++) {
            this.close(i)
        }
    }
}
