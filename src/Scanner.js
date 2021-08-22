// 扫描器类，是一个指针，用来扫描传入的字符串
export default class Scanner {
    constructor(templateStr) {
        // 将模板字符串写到实例自己身上
        this.templateStr = templateStr
        // 当前指针位置
        this.pos = 0
        //扫描的时候，当前指针的尾巴，一开始没扫描，尾巴就是整个模板字符串
        //尾巴的定义是包括当前指针的
        this.tail = templateStr
    }
    // 功能较弱，就是跳过{{}}标记,没有返回值
    scan(tag) {
        //当前的尾巴正好是tag的时候，就跳过它
        if (this.tail.indexOf(tag) == 0) {
            // tag有多长，比如{{长度是2,就让指针后移多少位，跳过{{
            this.pos += tag.length
            // 尾巴改成从当前指针这个字符开始，到最后的全部字符
            this.tail = this.templateStr.substring(this.pos)
        }

    }
    // 让指针进行扫描，直到遇见指定的内容，也就是{{或}}结束，并把扫描过的文字返回
    scanUtil(stopTag) {
        // 记录一下执行本方法的时候pos的值
        const pos_backup = this.pos
        // 当尾巴的开头不是stopTag的时候，就说明还没扫描到stopTag。
        //写&&很有必要 pos要小于字符串长度，否则会一直扫描，死循环
        while (!this.eos() && this.tail.indexOf(stopTag) != 0) {
            // 指针从初始位置开始一直循环移动扫描
            this.pos++
            // 改变尾巴为当前指针开始 到最后的所有字符
            this.tail = this.templateStr.substr(this.pos)
        }
        // 返回从本次开始位置到当前位置的字符串
        return this.templateStr.substring(pos_backup, this.pos)
    }
    // 指针是否已经到头，返回布尔值，当pos大于等于字符串长度的时候，就说明到头了,end of string
    eos() {
        return this.pos >= this.templateStr.length
    }
}