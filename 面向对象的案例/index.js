// 定义一个类
var that ;
class Tab{
    constructor(id){
        // 获取元素
        that = this
        this.main = document.querySelector(id);
        
        this.add = this.main.querySelector('.tabadd');
        
        // li的父元素
        this.ul = this.main.querySelector('.frisrstnav ul');
        // section的父元素
        this.tabscon = document.querySelector('.tabscon');
        //方法儿：调用init
        this.init()
    }
    // 初始化
    init() {
        this.update();
        // init 初始化操作
        // 方法一 for循环
        // for(let i=0; i<this.lis.length; i++){
        //     this.lis[i].index = i
        //     this.lis[i].onclick = function() {
        //         console.log(this.index)
        //     }
        // }
        // 方法二 forEach
        // this.lis.forEach( (value, index, array) => {
        //     // array是数组本身，在这里是指this.lis
        //     array[index].onclick = function() {
        //         console.log(index)
        //     }
        // });
        for(let i=0; i<this.lis.length; i++){
            this.lis[i].index = i
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab
            this.spans[i].ondblclick = this.editTab
            this.sections[i].ondblclick = this.editTab
        }

        this.add.onclick = this.addTab;


    }
    // 获取所有的li和section
    // 动态添加元素，需要重新获取对应元素

    update(){
        this.lis = this.main.querySelectorAll("li")
        this.sections = document.querySelectorAll("section")
        this.remove = this.main.querySelectorAll(".icon-guanbi")
        this.spans = this.main.querySelectorAll(".frisrstnav ul li span:first-child")

    }
    //1.切换功能
    toggleTab(){
        console.log(this.index)
        that.clearClass();
        this.className = 'liactive'
        that.sections[this.index].className = 'conactive'
    }
    // 清空class类
    clearClass(){
        for(let i=0; i<this.lis.length; i++){
            this.lis[i].className = ''
            this.sections[i].className = ''
            
        }
    }
    // 2.添加功能
    addTab(){
        that.clearClass();
        // 1.创建li元素和section元素
        console.log(that.lis.length)
        let random = Math.random()
        let li =  '<li class="liactive"><span>测试'+ (that.lis.length + 1)  +'</span><span class="iconfont icon-guanbi">x</span></li>'
        let section =  '<section class="conactive">测试'+random+'</section>'
        // 2.将他们都添加进对应的内容中
        that.ul.insertAdjacentHTML('beforeend', li)
        that.tabscon.insertAdjacentHTML('beforeend', section)
        that.init()

    }
    // 3.删除功能
    removeTab(e){
        e.stopPropagation();// 阻止冒泡
        let index = this.parentNode.index
        console.log(index)
        that.lis[index].remove()
        that.sections[index].remove()
        that.init()
        // 当我们删除不是选中的li时，原来选中的状态不变
        if( document.querySelector('.liactive')) return;
        // 当我们删除选中的li时，让它前面的一个处于选定状态
        
        index--;
        // 如果that.lis[index]是真的化，执行that.lis[index].click()
        that.lis[index] && that.lis[index].click()// 手动调用点击事件


        
    }
    // 4.修改功能
    editTab(){
        let str = this.innerHTML
        // 双击禁止选择文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type="text" width="60px" >'
        // 这个this是span和里面的input
        let input = this.children[0]
        input.value = str
        input.select()// 文本里面的文字属于选中状态
        input.onblur = function() {
            this.parentNode.innerHTML = this.value;
        }
        // 按下键盘的回车
        input.onkeyup = function(e) {
            if(e.keyCode === 13){
                // 手动调用
                this.blur();

            }

        }
        

    }
} 
// 方法一：调用init
// const tab = new  Tab("#tab")
// tab.init()

new Tab("#tab")