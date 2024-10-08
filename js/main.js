const MIN_DESKTOP_WIDTH = 1200;

document.addEventListener('DOMContentLoaded', function () {
    Fancybox.bind("[data-fancybox]", {});
    initSlider();

    const faqs = document.querySelector('.component-faq')
    if (faqs) {
        new Accordion(faqs, {
            activeClass: 'component-faq__card--active',
            multiple: true
        })
    }


    initHover()
    initDesktopMenu()
    initMobileMenu()
    initSliders()
})

function initSliders() {
    const container = document.getElementById("slider");
    const options = {infinite: false};

    if (container) {
        new Carousel(container, options);
    }

    const productSlider = document.getElementById("product-slider");
    const jumpButtons = document.querySelectorAll('[data-jump-to]');

    const productOptions = {
        Dots: false,
        Thumbs: {
            type: "classic",
        },
    }

    if (productSlider) {
        const slider = new Carousel(productSlider, productOptions, {Thumbs});
        if (slider) {
            jumpButtons.forEach(function (btn) {
                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    const jumpToId = e.target.getAttribute('data-jump-to');
                    const index = slider.slides.findIndex(item => item.el.id === jumpToId);
                    if (index !== -1) {
                        slider.slideTo(index)
                    }
                })
            })
        }
    }

}

function initDesktopMenu() {
    const btn = document.getElementById('desktop-menu-button')
    const menu = document.getElementById('desktop-menu')
    const header = document.getElementById('main-header')
    const paranja = document.getElementById('shadow-for-menu')
    let isOpen = false
    if (btn && menu) {
        paranja.addEventListener('click', () => {
            closeMenu()
        })
        btn.addEventListener('click', () => {
            if (isOpen) {
                closeMenu()
            } else {
                openMenu()
            }
        })
    }

    function closeMenu() {
        btn.classList.remove('open')
        menu.classList.remove('open')
        paranja.classList.remove('open')
        document.body.style.overflow = ''
        isOpen = false
        window.removeEventListener('resize', checkWidth)
    }

    function openMenu() {
        btn.classList.add('open')
        menu.classList.add('open')
        paranja.classList.add('open')
        menu.style.top = `${header.offsetHeight + header.getBoundingClientRect().top}px`
        menu.style.maxHeight = `${window.innerHeight - header.offsetHeight - header.getBoundingClientRect().top}px`
        document.body.style.overflow = 'hidden'
        isOpen = true
        window.addEventListener('resize', checkWidth)
    }

    function checkWidth() {
        if (window.innerWidth < MIN_DESKTOP_WIDTH) {
            closeMenu()
        }
    }

}


function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-button')
    const menu = document.getElementById('mobile-menu')
    const header = document.getElementById('main-header')
    let isOpen = false
    if (btn && menu) {
        btn.addEventListener('click', () => {
            if (isOpen) {
                closeMenu()
            } else {
                openMenu()
            }
        })
    }

    function openMenu() {
        menu.classList.add('open')
        btn.classList.add('open')
        menu.style.top = `${header.offsetHeight + header.getBoundingClientRect().top}px`
        menu.style.height = `${window.innerHeight - header.offsetHeight}px`
        menu.style.maxHeight = '100svh'
        document.body.style.overflow = 'hidden'
        isOpen = true
        window.addEventListener('resize', checkWidth)
    }

    function closeMenu() {
        menu.classList.remove('open')
        btn.classList.remove('open')
        document.body.style.overflow = ''
        isOpen = false
        window.removeEventListener('resize', checkWidth)
    }

    function checkWidth() {
        if (window.innerWidth >= MIN_DESKTOP_WIDTH) {
            closeMenu()
        }
    }
}


function initHover() {
    const cards = document.querySelectorAll('.component-project-categories__card')

    cards.forEach(card => {
        const row = card.closest('.row')
        const scopedCards = row.querySelectorAll('.component-project-categories__card')
        card.addEventListener('mouseenter', () => {
            scopedCards.forEach(scopedCard => {
                scopedCard.classList.add('component-project-categories__card--unfocus')
            })
            card.classList.remove('component-project-categories__card--unfocus')
            card.classList.add('component-project-categories__card--onfocus')
        })
        card.addEventListener('mouseleave', () => {
            scopedCards.forEach(scopedCard => {
                scopedCard.classList.remove('component-project-categories__card--unfocus')
                scopedCard.classList.remove('component-project-categories__card--onfocus')
            })
        })
    })

}

function initSlider() {
    const container = document.getElementById("slider");
    const options = {infinite: false};
    if (container) {
        new Carousel(container, options);
    }
}


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
        this.closeAll()
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
            }, 100)
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
