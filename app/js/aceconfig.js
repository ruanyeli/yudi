var editor = ace.edit("editor");
editor.setOption("wrap", "free") //自动换行
editor.setOptions({
    enableBasicAutocompletion: true,
    // enableSnippets: true, 
    enableLiveAutocompletion: true, //只能补全
});
ace.require("ace/ext/language_tools");
editor.setTheme("ace/theme/monokai"); //monokai模式是自动显示补全提示
editor.getSession().setMode("ace/mode/python"); //语言
editor.setFontSize(18);
// editor.setValue("#让主角移动起来吧");
editor.moveCursorTo(1, 0);


var languageTools = ace.require("ace/ext/language_tools");
    languageTools.addCompleter({
        getCompletions: function(editor, session, pos, prefix, callback) {
        callback(null,  [
            {
                name : "IronMan",
                value : "IronMan",
                caption: "IronMan",
                meta: "对象",
                type: "local",
                score : 1000 // 让test排在最上面
            },
            {
                name : "p",
                value : "p",
                caption: "p",
                meta: "关键字",
                type: "local",
                score : 1000 // 让test排在最上面
            },
            {
                name : "goLeft",
                value : "goLeft()",
                caption: "goLeft",
                meta: "方法",
                type: "local",
                score : 1000 // 让test排在最上面
            },{
                name : "goRight",
                value : "goRight()",
                caption: "goRight",
                meta: "方法",
                type: "local",
                score : 1000 // 让test排在最上面
            },
            {
                name : "goDown",
                value : "goDown()",
                caption: "goDown",
                meta: "方法",
                type: "local",
                score : 1000 // 让test排在最上面
            },{
                name : "goDown",
                value : "goUp()",
                caption: "goUp",
                meta: "方法",
                type: "local",
                score : 1000 // 让test排在最上面
            },{
                name : "while",
                value : "while",
                caption: "wgile",
                meta: "关键字",
                type: "local",
                score : 1000 // 让test排在最上面
            },{
                name : "True",
                value : "True",
                caption: "True",
                meta: "关键字",
                type: "local",
                score : 1001 // 让test排在最上面
            },{
                name : "return",
                value : "return",
                caption: "return",
                meta: "关键字",
                type: "local",
                score : 1001 // 让test排在最上面
            },{
                name : "continue",
                value : "continue",
                caption: "continue",
                meta: "关键字",
                type: "local",
                score : 1001 // 让test排在最上面
            },
            {
                name : "pass",
                value : "pass",
                caption: "pass",
                meta: "关键字",
                type: "local",
                score : 1001 // 让test排在最上面
            },
            {
                name : "for",
                value : "for",
                caption: "for",
                meta: "关键字",
                type: "local",
                score : 1001 // 让test排在最上面
            },
            {
                name : "def",
                value : "def",
                caption: "def",
                meta: "关键字",
                type: "local",
                score : 1001 // 让test排在最上面
            }
            
        ]);
    }
});
