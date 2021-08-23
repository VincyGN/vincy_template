//导入lookup函数
import lookup from './lookup'
//导入parseArray函数
import parseArray from './parseArray'
// 函数的功能是让tokens数组变成dom字符串
// #标记的tokens要用递归处理它的下标为2的小数组
export default function renderTemplate(tokens, data) {
    // console.log('data', tokens, data);
    // 结果字符串
    var resultStr = ''
    //测试lookup函数
    // lookup(, 'a.b.c')  
    // 遍历tokens
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i]
        // 判断类型
        if (token[0] == 'text') {
            // 追加到结果字符串上
            resultStr += token[1]
        } else if (token[0] == 'name') {
            // 如果是name类型，那么就直接使用它的值，当然要用lookup解析，因为防止这里是‘a.b.c’有逗号的形式
            resultStr += lookup(data, token[1])
        } else if (token[0] == '#') {
            // 如果有#号，就递归后面的数组  
            resultStr += parseArray(token, data)
        }
    }
    // console.log(resultStr);
    return resultStr
}