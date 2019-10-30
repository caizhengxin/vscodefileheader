// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { SSL_OP_ALL } from 'constants';
import { URL } from 'url';

var template = require("art-template");
var path = require("path");


const header_max_line:number = 10;


const file_suffix_mapping:any = {
    ".as": "ActionScript",
    ".scpt": "AppleScript",
    ".asp": "ASP",
    ".aspx": "ASP",
    ".bat": "Batch File",
    ".cmd": "Batch File",
    ".c": "C",
    ".cs": "C#",
    ".cpp": "C++",
    ".clj": "Clojure",
    ".css": "CSS",
    ".D": "D",
    ".erl": "Erlang",
    ".go": "Go",
    ".groovy": "Groovy",
    ".hs": "Haskell",
    ".htm": "HTML",
    ".html": "HTML",
    ".java": "Java",
    ".js": "JavaScript",
    ".tex": "LaTeX",
    ".lsp": "Lisp",
    ".lua": "Lua",
    ".md": "Markdown",
    ".mat": "Matlab",
    ".m": "Objective-C",
    ".ml": "OCaml",
    ".p": "Pascal",
    ".pl": "Perl",
    ".php": "PHP",
    ".py": "Python",
    ".R": "R",
    ".rst": "RestructuredText",
    ".rb": "Ruby",
    ".scala": "Scala",
    ".scss": "SCSS",
    ".sh": "ShellScript",
    ".sql": "SQL",
    ".tcl": "TCL",
    ".txt": "Text",
    ".xml": "XML"
};


function get_suffix(obj: any):string{
	return obj.fileName.substr(obj.fileName.lastIndexOf("."));
}


function dateFormat(date:any, fmt:string):string{
	let ret:any;

    let opt:any = {
		"y+": date.getYear(),                       // 年
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")));
        }
	}

    return fmt;
}


// 获取行号
function get_line(editor:any, str:string):number{
	// "Last Modified time"
	let document = editor.document;
	let i:number = 0;

	for(i = 0; i <= 10; i++){
		if (document.lineAt(i).text.indexOf(str) !== -1){
			return i;
		}
	}

	return -1;
}


// 判断头部是否存在
function is_header(editor:any):boolean{
	let text:string = editor.document.getText(0, 0, header_max_line + 1, 0);

	if(text.indexOf("@Author:") !== -1 && text.indexOf("@Last Modified by:") !== -1){
		return true;
	}
	return false;
}


// 获取模板
function get_tmpl(editor:any, config:any, type:string="header"):string{
	let suffix:string = get_suffix(editor.document);
	let tmpl:string = (config.file_suffix_mapping[suffix] || file_suffix_mapping[suffix]) + ".tmpl";

	return path.join(config.custom_template_path, type, tmpl);
}


// Write Header
function write_header(editor:any, config:any):void{

	vscode.workspace.fs.readFile(vscode.Uri.file(get_tmpl(editor, config))).then(s => {

		let date:string = dateFormat(new Date(), config.dateformat);
					
		let ret:string = template.render(s.toString(), {
			author: config.author,
			create_time: date,
			last_modified_by: config.author,
			last_modified_time: date,
		});
		
		editor.edit(function(editobj:any){
			editobj.insert(new vscode.Position(0, 0), ret);
		});

		editor.document.save();
	});
}


// Write Body
function write_body(editor:any, config:any):void{

	let linecount:number = editor.document.lineCount;

	vscode.workspace.fs.readFile(vscode.Uri.file(get_tmpl(editor, config, "body"))).then(s => {
		editor.edit(function(editobj:any){
			editobj.insert(new vscode.Position(linecount, 0), "\r\n\r\n" + s.toString() + "\r\n");
		});
	});

	editor.document.save();
}


// Update Header
function update_header(editor:any, config:any):void{
	editor.edit(function(editobj:any){

		let date:string = dateFormat(new Date(), config.dateformat);
		let line:number = get_line(editor, "@Last Modified time:");
		let start:number = editor.document.lineAt(line).text.indexOf(":") + 1;

		editobj.replace(new vscode.Range(line, start, line, 100), " " + date);

		line = get_line(editor, "@Last Modified by:");
		start = editor.document.lineAt(line).text.indexOf(":") + 1;
	
		editobj.replace(new vscode.Range(line, start, line, 100), "   " + config.author);
	});

	editor.document.save();	
}


// Write Header or Body
function write_header_body():void{
	let config:any = vscode.workspace.getConfiguration("fileheader");

	let editor:any = vscode.window.activeTextEditor;
	// let line:number = editor.selection.active.line;

	let document:any = editor.document;

	if(is_header(editor)){
		update_header(editor, config);
	}else if(editor.document.lineCount <= 1){
		if(config.body){
			write_body(editor, config);
		}

		write_header(editor, config);
	}else{
		write_header(editor, config);
	}

	editor.document.save();
}


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscodefileheader" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.fileheader', () => {
		// The code you place here will be executed every time your command is executed

		write_header_body();
	
	});

	context.subscriptions.push(disposable);

	vscode.workspace.onWillSaveTextDocument(e => {
		write_header_body();
		// console.log(process.cwd());
	});

	vscode.workspace.onDidOpenTextDocument(e => {
		write_header_body();
	});
}

// this method is called when your extension is deactivated
export function deactivate() {}
