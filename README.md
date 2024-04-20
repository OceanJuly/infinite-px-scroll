# 无限视差滚动

### 效果图
![Alt](https://github.com/OceanJuly/infinite-px-scroll/blob/master/public/scroll-pic.webp)

### 实现方式
- 不管有多少张图片，我们只要动态创建三张图片分别表示当前和上一张、下一张图片，并设置一个动画效果；

- 通过监听`window`的`wheel`事件（`mousewheel`不推荐使用）判断用户是向下滚动还是向上滚动，并执行动画效果；

- 再通过监听`transitionend`事件等待css效果结束对图片进行替换。

我写了一个[原生的](https://github.com/OceanJuly/infinite-px-scroll/blob/master/public/infinite-px-scroll.html)和`react组件`来实现。

### 问题
目前在`react组件`实现过程中发现当替换图片的时候，页面会有一个闪动的问题，后面再解决。

使用了useState和useEffect导致的，每次index改变都是异步的，但是监听代码是同步执行的，导致取值的问题。

`const [idx, setIdx] = useState<number>(0)`改成

`const idx = useRef<number>(0)`就行了。