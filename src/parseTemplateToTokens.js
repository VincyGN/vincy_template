// 导入扫描器类
import Scanner from './Scanner'
// 导入折叠tokens的方法
import nestTokens from './nestTokens'
// 把传入的字符编译成tokens数组的方法
export default function parseTemplateToTokens(templateStr) {
    var tokens = []
    // 实例化一个扫描器，构造的时候提供一个参数，这个参数就是模板字符串
    // 也就是说这个扫描器就是针对这个模板字符串工作的
    var scanner = new Scanner(templateStr)
    //寻找{{
    // var words = scanner.scanUtil('{{')
    // console.log(words, scanner.pos); //5
    // scanner.scan("{{")
    // console.log('scan', scanner.pos); //7

    //当没有扫描完的时候，也就是指针没有到头的时候，不断交替执行scan和scanUtil
    var words
    while (!scanner.eos()) {
        // 先找左大括号，收集开始出现{{标记之前的字符
        words = scanner.scanUtil('{{')
        // console.log(words);
        if (words != '') {
            // 尝试写一下去掉空格，只能判断是普通文字的空格，还是标签的空格
            // 标签的空格不能去掉， 比如< id="container">不能去掉id前的空格
            // 是否在尖括号里
            let isInKH = false
            // 准备空白字符串
            var _words = ''
            // 遍历words
            for (let i = 0; i < words.length; i++) {
                // 如果不是空格，就拼接到_words里
                if (!/\s/.test(words[i])) {
                    _words += words[i]
                } else {
                    if (isInKH) {
                        // 如果是空格， 只有它在标签标签内的时候，才拼接上
                        _words += ' '
                    }
                }
                if (words[i] == '<') {
                    isInKH = true
                } else if (words[i] == '>') {
                    isInKH = false
                }
            }
            // console.log(_words);
            //push到tokens数组里,去掉空格
            tokens.push(['text', words.replace(/\s/g, '')])
        }
        scanner.scan('{{')
        // 再找右大括号,收集开始出现再{{}}标记之间的字符
        words = scanner.scanUtil('}}')
        // console.log(words);
        if (words != '') {
            // 这里的words就是{{}}中间的东西，判断一下首字符
            if (words[0] == '#') {
                // 存下标为1的那项,因为下标为0的是#
                tokens.push(['#', words.substring(1)])
            } else if (words[0] == '/') {
                // 存下标为1的那项,因为下标为0的是#
                tokens.push(['/', words.substring(1)])
            } else {
                //push到tokens数组里
                tokens.push(['name', words])
            }
        }
        scanner.scan('}}')
    }
    // 返回折叠收集的tokens
    return nestTokens(tokens)
}