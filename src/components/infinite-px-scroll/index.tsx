import './index.less'
import {InfinitePxScrollProps} from "./interface.ts";
import {useEffect, useRef, useState} from "react";

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
    const [curIdx, setCurIdx] = useState<number>(0)
    function prevIndex() {
        return curIdx === 0 ? imgList!.length - 1 : curIdx - 1
    }

    function nextIndex() {
        return curIdx === imgList!.length - 1 ? 0 : curIdx + 1
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
        createImg(curIdx).classList.add('cur')
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
        if (scrollRef.current.classList.contains('scroll-down')) setCurIdx(nextIndex())
        else setCurIdx(prevIndex())
        scrollRef.current.className = 'scroll-container'
        resetElements()
    }

    useEffect(() => {
        console.log(1);
        if (!imgList || !imgList.length) imgList = defImgs
        resetElements()
        window.addEventListener('wheel', handleWheel)
        scrollRef.current.addEventListener('transitionend', handleTransitionEnd)
        return (() => {
            window.removeEventListener('wheel', handleWheel)
            scrollRef.current.removeEventListener('transitionend', handleTransitionEnd)
        })
    }, [curIdx]);

    return (
        <div className="scroll-container" ref={scrollRef}></div>
    )
}

export default InfinitePxScroll