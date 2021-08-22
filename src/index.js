//导入编译tokens函数
import parseTemplateToTokens from './parseTemplateToTokens'
// 全局提供一个vincy_template方法
window.vincy_template = {
    // 渲染方法
    render(templateStr, data) {
        // 调用ParseTemplateToTokens函数，让模板字符串能够变为tokens数组
        var tokens = parseTemplateToTokens(templateStr)
        console.log(tokens);
    }
}