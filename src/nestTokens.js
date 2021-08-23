// 折叠tokens方法,将#与/之间的tokens能够整合起来，作为它的下标为3的项
// ----------------------------以下为正式代码
export default function nestTokens(tokens) {
    // 结果数组
    var nestedTokens = []
    // 栈结构，存放小tokens，栈顶（靠近端口的，最新进入的）tokens数组中当前操作的这个tokens小数组
    var sections = []
    // 定义一个收集器，默认指向nestedTokens数组，引用类型值
    // 收集器的指向会变化，当遇见#的时候，收集器会指向这个token的下标为2的数组
    var collector = nestedTokens
    // 遍历tokens
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i]
        switch (token[0]) {
            case '#':
                // 把结果放到收集器里
                collector.push(token)
                // 压栈（入栈） 
                sections.push(token)
                // 收集器要换人，给token添加下标为2的项，并且让收集器指向它
                collector = token[2] = []
                break;
            case '/':
                // 弹栈（出栈）,pop会返回刚刚弹出的项
                sections.pop()
                // 改变收集器为栈结构队尾（队尾是栈顶）那项的下标为2的数组
                collector = sections.length > 0 ? sections[sections.length - 1][2] : nestedTokens
                break;
            default:
                // 不管当前collector是谁，可能是结果nestedTokens,也可能是某个tokens的下标为2的数组，不管是谁，推入collector
                collector.push(token)
        }
    }
    return nestedTokens
}
// ----------------------------以上为正式代码



// ----------------------------以下为草稿
// export default function nestTokens(tokens) {
//     // 结果数组
//     var nestedTokens = []
//     // 栈结构，存放小tokens，栈顶（靠近端口的，最新进入的）tokens数组中当前操作的这个tokens小数组
//     var sections = []
//     // console.log(tokens);
//     // 遍历tokens
//     for (let i = 0; i < tokens.length; i++) {
//         let token = tokens[i]
//         switch (token[0]) {
//             case '#':
//                 // 给这个token下标为2的项创建一个数组，以收集子元素
//                 token[2] = []
//                 // 压栈（入栈） 
//                 sections.push(token)
//                 // 用临时变量都收集起来
//                 // console.log(token[1] + '入栈 了');
//                 nestedTokens.push(token)
//                 break;
//             case '/':
//                 // 弹栈（出栈）,pop会返回刚刚弹出的项
//                 let section_pop = sections.pop()
//                 // 刚刚弹出的项还没有加到结果数组中，因此要加进去
//                 nestedTokens.push(section_pop)
//                 // console.log(section[1] + '出栈啦');
//                 break;
//             default:
//                 //判断，栈队列当前情况
//                 if (sections.length == 0) {
//                     // 如果栈结构为空，就把token放到结果数组里
//                     nestedTokens.push(token)
//                 } else {
//                     // 如果不为空，就放到栈顶
//                     sections[sections.length - 1][2].push(token)
//                 }

//         }
//     }
//     return nestedTokens
// }
// ----------------------------以上为草稿