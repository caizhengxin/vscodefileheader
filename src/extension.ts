// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
// import { SSL_OP_ALL } from 'constants';
// import { URL } from 'url';
import * as fs from 'fs';
import * as moment from 'moment';
// import { print } from 'util';


var template = require("art-template");
var path = require("path");


const header_max_line:number = 10;


// Suffix ---> Template name
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
	".r": "R",
	".rs": "Rust",
    ".rst": "RestructuredText",
    ".rb": "Ruby",
    ".scala": "Scala",
    ".scss": "SCSS",
    ".sh": "ShellScript",
    ".sql": "SQL",
    ".tcl": "TCL",
	".txt": "Text",
	".ts": "TypeScript",
	".vue": "Vue",
	".xml": "XML",
	".yml": "YAML",
	".yaml": "YAML"
};


/*
 * getConfig
 *
 * @return: any
 */
function getConfig():any{
	return vscode.workspace.getConfiguration("fileheader");
}


/*
 * getPathObject
 *
 * @editor(any): editText object.
 * 
 * @return: any
 */
function getPathObject(editor: any): any{
	/*
	 * root
	 * dir
	 * base
	 * ext
	 * name
	 */
	return path.parse(editor.document.fileName);
}


/*
 * isSuffix
 *
 * @editor(any): editText object.
 * @suffix(string): File suffix name, eg: `.php`,
 * 
 * @return: boolean
 */
function isSuffix(editor: any, suffix: string): boolean{
	return getPathObject(editor).ext.lastIndexOf(suffix) !== -1;
}


/*
 * isSuffixList
 *
 * @editor(any): editText object.
 * @suffixs(any): File suffix name list, eg: [`.php`],
 * 
 * @return: boolean
 */
function isSuffixList(editor: any, suffixs: any): boolean{
	return suffixs.indexOf(getPathObject(editor).ext) !== -1;
}


/*
 * getActivePath
 *
 * @editor(any): editText object.
 * 
 * @return: string
 */
function getActivePath(editor:any):string{
	return getPathObject(editor).dir;
}


/*
 * getSuffix
 *
 * @editor(any): editText object.
 * 
 * @return: string
 */
function getSuffix(editor: any):string{
	let pathobj:any = path.parse(editor.document.fileName);

	return pathobj.ext.toLowerCase() || pathobj.name.toLowerCase();
}


/*
 * getFileName
 *
 * @editor(any): editText object.
 * 
 * @return: string
 */
function getFileName(editor:any):string{
	return path.parse(editor.document.fileName).name.toLowerCase();
}


/*
 * Match line
 *
 * @editor(any): editText object.
 * @value(string): Match value.
 * @max_line(number): Match max line.
 * 
 * @return: number, Not match line return -1
 */
function matchLine(editor:any, value:string, max_line:number=header_max_line):number{
	let document = editor.document;
	let lineCount:number = document.lineCount;
	let i:number = 0;

	if(lineCount > max_line){
		lineCount = max_line;
	}

	for(i = 0; i <= lineCount - 1; i++){
		if (document.lineAt(i).text.indexOf(value) !== -1){
			return i;
		}
	}

	return -1;
}


/*
 * Delete edittext comment
 *
 * @editor(any): editText object.
 * @value(string): Match value.
 * @max_line(number): Match max line.
 * 
 * @return: void
 */
function deleteEditorComment(editor:any, value:string, max_line:number=header_max_line):void{
	let line:number = matchLine(editor, value, max_line);

	if(line !== -1){
		editor.edit(function(editobj:any){
			editobj.delete(new vscode.Range(line, 0, line, value.length));
		});
	}
}


/*
 * deleteEditorComments
 *
 * @editor(any): editText object.
 * 
 * @return: void
 */
function deleteEditorComments(editor:any):void{
	if(isSuffix(editor, ".php")){
		deleteEditorComment(editor, "<?php", 2);
	}else if(isSuffixList(editor, [".py", ".pxd", ".pyx"])){
		deleteEditorComment(editor, "# -*- coding: utf-8 -*-", 1);
	}
}


/*
 * deleteEditorComments
 *
 * @editor(any): editText object.
 * @ignore(string[]): Filter rules.
 * 
 * @return: boolean
 */
function isIgnore(editor:any, ignore: string[]):boolean{
	let pathobj:any = getPathObject(editor);

	console.log("sss".match("[a-z]+"));

	for(let ige of ignore){
		let reg: any = new RegExp(ige.replace("*", ".*"));

		if(reg.test(pathobj.base) || reg.test(path.join(pathobj.dir, pathobj.base))){
			return false;
		}

	}

	return true;
}


// Get Time
function get_datetime(fmt:any="YYYY-MM-DD HH:mm:ss"):string{
	return moment().format(fmt);
}


// Get default template
function get_default_template():string{
	return  path.join(path.dirname(__dirname), "template");
}


// Get line
function get_line(editor:any, str:string, line:number=header_max_line):number{
	let document = editor.document;
	let lineCount:number = document.lineCount;
	let i:number = 0;

	if(lineCount > 10){
		lineCount = line;
	}

	for(i = 0; i <= lineCount - 1; i++){
		if (document.lineAt(i).text.indexOf(str) !== -1){
			return i;
		}
	}

	return -1;
}


// Judge if the head exists
function is_header(editor:any):boolean{
	let text:string = editor.document.getText(0, 0, header_max_line + 1, 0);

	if(text.indexOf("@Author:") !== -1 && text.indexOf("@Last Modified by:") !== -1){
		return true;
	}
	return false;
}


// Get Template
function get_tmpl(editor:any, config:any, tmplpath:string="", type:string="header"):string{
	let suffix:string = getSuffix(editor);
	let name:string = getFileName(editor);

	let tmpl:string = (config.file_suffix_mapping[name + suffix] || config.file_suffix_mapping[suffix] || file_suffix_mapping[suffix]) + ".tmpl";
	// var tmpl_path:string = config.custom_template_path || get_default_template();

	return path.join(tmplpath || config.custom_template_path , type, tmpl);
}


// Open Template
function open_tmpl(editor:any, config:any, type:string="header", callback:any){
	let tmpl_path:string = get_tmpl(editor, config, "", type);

	fs.exists(tmpl_path, (exists) => {
		if(exists){
			vscode.workspace.fs.readFile(vscode.Uri.file(tmpl_path)).then(s => {
				callback(s);
			});	
		}else{
			// 默认模板
			tmpl_path = get_tmpl(editor, config, get_default_template(), type);
			fs.exists(tmpl_path, (exists) => {
				if(exists){
					vscode.workspace.fs.readFile(vscode.Uri.file(tmpl_path)).then(s => {
						callback(s);
					});	
				}else{
					callback("");
					console.log("Not found fileheader template: " + tmpl_path);
				}
			});		
		}
	});
}


// Update Header
function update_header(editor:any, config:any):void{
	editor.edit(function(editobj:any){

		let date:string = get_datetime();
		let line:number = get_line(editor, "@Last Modified time:");
		let start:number = editor.document.lineAt(line).text.indexOf(":") + 1;

		editobj.replace(new vscode.Range(line, start, line, 100), " " + date);

		line = get_line(editor, "@Last Modified by:");
		start = editor.document.lineAt(line).text.indexOf(":") + 1;
	
		editobj.replace(new vscode.Range(line, start, line, 100), "   " + config.author);
	});

	editor.document.save();	
}


// Insert Header or Body
function insert_header_body(editor:any, config:any):void{
	let lineCount:number = editor.document.lineCount;

	deleteEditorComments(editor);

	open_tmpl(editor, config, "header", function(s:any){
		let date:string = get_datetime();

		let ret:any = template.render(s.toString(), Object.assign(
			{
				author: config.author,
				create_time: date,
				last_modified_by: config.author,
				last_modified_time: date,
			},
			config.other_config
		));

		if(lineCount <= 1){
			open_tmpl(editor, config, "body", function(s:any){
				ret += s.toString() + "\r\n";

				editor.edit(function(editobj:any){
					editobj.insert(new vscode.Position(0, 0), ret);
				});
				editor.document.save();
			});
		}else{
			console.log(ret);
			editor.edit(function(editobj:any){
				editobj.insert(new vscode.Position(0, 0), ret);
			});
			editor.document.save();					
		}
	});	
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
		let config:any = getConfig();
		let editor:any = vscode.window.activeTextEditor;


		if(!is_header(editor)){
			insert_header_body(editor, config);
		}
	});

	context.subscriptions.push(disposable);


	// Save
	vscode.workspace.onWillSaveTextDocument(e => {
		let config:any = getConfig();
		let editor:any = vscode.window.activeTextEditor;


		// Update Header
		if(is_header(editor)){
			update_header(editor, config);
		}else if(config.save && isIgnore(editor, config.ignore)){
			insert_header_body(editor, config);
		}
	});


	// Open
	vscode.workspace.onDidOpenTextDocument(e => {
		let config:any = getConfig();
		let editor:any = vscode.window.activeTextEditor;

		if(config.open && !is_header(editor) && isIgnore(editor, config.ignore)){
			insert_header_body(editor, config);
		}
	});
}

// this method is called when your extension is deactivated
export function deactivate() {}
