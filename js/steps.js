document.addEventListener('DOMContentLoaded', () => {
    const steps = document.getElementById('steps')

    if (steps) {
        const wrapper = steps.querySelector('.steps__container')
        const top = steps.getBoundingClientRect().top + document.documentElement.scrollTop
        const parentElement = steps.parentElement
        const hiddenElement = document.createElement('div')
        hiddenElement.style.height = steps.offsetHeight + 'px'
        steps.classList.add('steps--sticky')

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > top) {
                setTimeout(() => {
                    steps.classList.add('steps--fixed')
                    parentElement.insertBefore(hiddenElement, steps)
                })
            } else {
                setTimeout(() => {
                    steps.classList.remove('steps--fixed')
                    hiddenElement.remove()
                })
            }
        })

        const links = steps.querySelectorAll('a')

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const link = getLinkByHref(entry.target.id)
                if (entry.isIntersecting) {
                    links.forEach(link => {
                        link.classList.remove('steps__link--active')
                    })
                    link.classList.add('steps__link--active')
                    wrapper.scrollLeft = link.offsetLeft - wrapper.offsetLeft

                }
            })
        }, {
            root: null,
            rootMargin: '-50%',
        })

        links.forEach(link => {
            const url = link.getAttribute('href')
            if (!url) return

            const el = document.querySelector(url)

            if (!el) return
            observer.observe(el)
        })

        function getLinkByHref(href) {
            console.log(href)
            return steps.querySelector(`a[href="#${href}"]`)
        }
    }
})