const MIN_DESKTOP_WIDTH = 1200;

document.addEventListener('DOMContentLoaded', function () {
    initComponentProjectCategories()
    initPortfolioAndProjectPage()
    initComponentLicences()
    initComponentGallery()
    initComponentFAQ()
    initDesktopMenu()
    initMobileMenu()
})


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

function initComponentProjectCategories() {
    const UNFOCUS_CLASS = 'component-project-categories__card--unfocus'
    const ONFOCUS_CLASS = 'component-project-categories__card--onfocus'
    const CARD_CLASS = 'component-project-categories__card'

    const components = document.querySelectorAll('.component-project-categories')
    components.forEach(component => {
        const cards = component.querySelectorAll(`.${CARD_CLASS}`)
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                cards.forEach(scopedCard => {
                    scopedCard.classList.add(UNFOCUS_CLASS)
                })
                card.classList.remove(UNFOCUS_CLASS)
                card.classList.add(ONFOCUS_CLASS)
            })
            card.addEventListener('mouseleave', () => {
                cards.forEach(scopedCard => {
                    scopedCard.classList.remove(UNFOCUS_CLASS)
                    scopedCard.classList.remove(ONFOCUS_CLASS)
                })
            })
        })
    })


}

function initComponentGallery() {
    const container = document.getElementById("portfolio-slider");
    const options = {infinite: false};

    if (container) {
        const carusel = new Carousel(container, options);
    }

    Fancybox.bind("[data-fancybox='gallery']", {});
}

function initComponentLicences() {
    Fancybox.bind("[data-fancybox='licences']", {});
}

function initComponentFAQ() {
    const faqs = document.querySelectorAll('.component-faq')
    faqs.forEach(faq => {
        new Accordion(faq, {
            activeClass: 'component-faq__card--active',
            multiple: false,
            openInInit: 0
        })
    })
}

function initPortfolioAndProjectPage() {
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
            const BUTTON_ACTIVE_CLASS = 'product-info__slider-button--active'
            jumpButtons.forEach(function (btn) {
                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    const jumpToId = e.target.getAttribute('data-jump-to');
                    if (jumpToId === 'start') {
                        slider.slideTo(0)
                        return false
                    }
                    const index = slider.slides.findIndex(item => item.el.id === jumpToId);
                    if (index !== -1) {
                        slider.slideTo(index)
                    }
                })
            })
            slider.on('change', function (fancybox, slide) {
                const _slide = fancybox.slides[slide];
                jumpButtons.forEach((btn) => {
                    btn.classList.remove(BUTTON_ACTIVE_CLASS)
                    if (btn.getAttribute('data-jump-to') === _slide.el.id) {
                        btn.classList.add(BUTTON_ACTIVE_CLASS)
                    }
                })
            })
        }

        Fancybox.bind("[data-fancybox='portfolio-and-project']", {});
    }
}
