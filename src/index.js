// 导入扫描器类
import Scanner from './Scanner'
window.vincy_template = {
    render(templateStr, data) {
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
            // 先找左大括号
            words = scanner.scanUtil('{{')
            console.log(words);
            scanner.scan('{{')
            // 再找右大括号
            words = scanner.scanUtil('}}')
            console.log(words);
            scanner.scan('}}')
        }
    }
}