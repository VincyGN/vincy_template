/*
    Js对象的中括号里，默认不能识别p.q这种语法，比如：
    dataObj:{
        a:{
            b:{
                c:100  
            }
        }
    }
    则不能通过a[b.c]来获取属性c的值。

    lookup的功能就是可以在dataObj对象中，寻找用连续点符号的keyName属性
    那么 lookup(dataObj,'a.b.c')结果就是100
*/

export default function lookup(dataObj, keyName) {
    // console.log(dataObj, keyName);
    // 看看keyName中有没有点符号，但是它不能是.点本身
    if (keyName.indexOf('.') != -1 && keyName != '.') {
        // 如果有，就拆成数组
        var keys = keyName.split('.')
        // console.log(keys);
        // 定义一个临时变量，让这个临时变量用于中转，一层一层找下去
        var temp = dataObj
        // 遍历keys,每找一层，都把它设置为新的临时变量
        for (let i = 0; i < keys.length; i++) {
            // 让临时变量等于当前找到的这个属性对应的值
            temp = temp[keys[i]]
        }
        // console.log(temp);
        return temp
    }
    // 如果没有点符号，直接返回对应属性
    return dataObj[keyName]
}