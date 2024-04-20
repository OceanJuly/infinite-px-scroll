import './index.less'
import {InfinitePxScrollProps} from "./interface.ts";
import {useEffect, useRef} from "react";

const defImgs: string[] = [
    '../src/assets/imgs/preview1.jpg',
    '../src/assets/imgs/preview2.jpg',
    '../src/assets/imgs/preview3.jpg',
    '../src/assets/imgs/preview4.jpg',
    '../src/assets/imgs/preview5.jpg',
]
// 表示是否正在动画中
let isAnimating: boolean = false

const InfinitePxScroll = ({imgList}: InfinitePxScrollProps) => {
    const scrollRef = useRef<any>()
    const index = useRef<number>(0)
    function prevIndex() {
        return index.current === 0 ? imgList!.length - 1 : index.current - 1
    }

    function nextIndex() {
        return index.current === imgList!.length - 1 ? 0 : index.current + 1
    }

    function createImg(index: number) {
        const img = document.createElement('img')
        img.src = imgList![index]
        const div = document.createElement('div')
        div.classList.add('item')
        div.appendChild(img)
        scrollRef.current!.appendChild(div)
        return div
    }

    function resetElements() {
        scrollRef.current!.innerHTML = ''
        const prev = prevIndex()
        const next = nextIndex()
        createImg(index.current).classList.add('cur')
        createImg(prev).classList.add('prev')
        createImg(next).classList.add('next')
    }

    function handleWheel(e: WheelEvent) {
        if (!e.deltaY) return
        if (isAnimating) return
        isAnimating = true
        if (e.deltaY > 0) scrollRef.current.classList.add('scroll-down')
        else scrollRef.current.classList.add('scroll-up')
    }

    function handleTransitionEnd() {
        isAnimating = false
        if (scrollRef.current.classList.contains('scroll-down')) index.current = nextIndex()
        else index.current = prevIndex()
        scrollRef.current.classList.remove('scroll-down', 'scroll-up')
        resetElements()
    }

    useEffect(() => {
        if (!imgList || !imgList.length) imgList = defImgs
        resetElements()
        window.addEventListener('wheel', handleWheel)
        scrollRef.current.addEventListener('transitionend', handleTransitionEnd)
        return (() => {
            window.removeEventListener('wheel', handleWheel)
            scrollRef.current.removeEventListener('transitionend', handleTransitionEnd)
        })
    }, []);

    return (
        <div className="scroll-container" ref={scrollRef}></div>
    )
}

export default InfinitePxScroll