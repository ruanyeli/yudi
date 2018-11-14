//初始化ace
ace.require("ace/ext/language_tools");
var editor = ace.edit("editor");
editor.setOptions({
    enableBasicAutocompletion: true,
    // enableSnippets: true, 
    enableLiveAutocompletion: true, //只能补全
});
editor.setTheme("ace/theme/monokai"); //monokai模式是自动显示补全提示
editor.getSession().setMode("ace/mode/python"); //语言
editor.setFontSize(16);