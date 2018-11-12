window.onload = function () {
    // editor = ace.edit("editor"); //初始化

    // editor.setFontSize(16); //设置字体大小
    // editor.setOption("wrap", "free") //自动换行
    // editor.focus(); //获取焦点
    // editor.getSession().setMode("ace/mode/python");
    // ace.require("ace/ext/language_tools");
    // editor.setOptions({
    //     enableBasicAutocompletion: true,
    //     // enableSnippets: true,
    //     enableLiveAutocompletion: true
    // });
    // editor.setTheme("ace/theme/monokai"); //设置主题

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
}