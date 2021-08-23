//导入lookup函数
import lookup from './lookup'
//导入renderTemplate函数
import renderTemplate from './renderTemplate'
/*
    处理数组，结合renderTemplate实现递归
    注意：这个函数收的参数是token，而不是tokens
    token是一个简单的['#', 'students', Array(5)]

    这个函数要递归调用renderTemplate函数，调用多少次，由data决定，比如data的形式是这样的：
    {
        students: [{
                "name": "小明",
                "hobbies": ["游泳", "健身"]
            },
            {
                "name": "小红",
                "hobbies": ["足球", "篮球", "羽毛球"]
            },
            {
                "name": "小强",
                "hobbies": ["吃饭", "睡觉"]
            },
        ]
    }
    那么parseArray()这个函数就要递归调用renderTemplate函数3次，因为数组长度是3
*/
export default function parseArray(token, data) {
    // console.log(token, data);
    // 得到整体数据data中这个数组要使用的部分
    var v = lookup(data, token[1])
    // console.log(v);
    // 结果字符串
    var resultStr = ''
    // 遍历v数组，v一定是数组
    // 下面这个循环可能是整个包中最难思考的一个循环
    // 它是遍历数据，而不是遍历tokens，数组中有几条数据，就要遍历几条
    for (let i = 0; i < v.length; i++) {
        // 这里要补充一个’.‘的属性
        resultStr += renderTemplate(token[2], {
            // 把v[i]对象展开
            ...v[i],
            // 补一个点属性
            ".": v[i]
        })
    }
    return resultStr
}