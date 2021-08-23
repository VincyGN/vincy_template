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
            //push到tokens数组里
            tokens.push(['text', words])
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