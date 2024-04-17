const imgs = [
    '../src/assets/imgs/preview1.jpg',
    '../src/assets/imgs/preview2.jpg',
    '../src/assets/imgs/preview3.jpg',
    '../src/assets/imgs/preview4.jpg',
    '../src/assets/imgs/preview5.jpg',
]

const container = document.querySelector('.scroll-container')
let curIdx = 0

function prevIndex() {
    return curIdx === 0 ? imgs.length - 1 : curIdx - 1
}

function nextIndex() {
    return curIdx === imgs.length - 1 ? 0 : curIdx + 1
}

function createImg(index) {
    const img = document.createElement('img')
    img.src = imgs[index]
    const div = document.createElement('div')
    div.classList.add('item')
    div.appendChild(img)
    container.appendChild(div)
    return div
}

function resetElements() {
    container.innerHTML = ''
    const prev = prevIndex()
    const next = nextIndex()
    createImg(curIdx).classList.add('cur')
    createImg(prev).classList.add('prev')
    createImg(next).classList.add('next')
}

resetElements()

// 表示是否正在动画中
let isAnimating = false
window.addEventListener('wheel', e => {
    if (!e.deltaY) return
    if (isAnimating) return
    isAnimating = true
    if (e.deltaY > 0) container.classList.add('scroll-down')
    else container.classList.add('scroll-up')
})

container.addEventListener('transitionend', () => {
    isAnimating = false
    if (container.classList.contains('scroll-down')) curIdx = nextIndex()
    else curIdx = prevIndex()
    container.className = 'scroll-container'
    resetElements()
})