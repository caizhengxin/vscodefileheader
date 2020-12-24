/**
 * @Author: JanKinCai
 * @Date:   2020-01-03 22:02:02
 * @Last Modified by:   JanKinCai
 * @Last Modified time: 2020-12-24 18:13:45
 */

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as moment from 'moment';
import * as child_process from 'child_process';

var template = require("art-template");
var path = require("path");


const header_max_line: number = 10;


// Suffix ---> Template name
var file_suffix_mapping: any = {
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
		".dart": "Dart",
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


/**
 * Sync template 
 * 
 * @return void
 */
function syncTemplate(config: any): void {

	if (config.custom_template_path && config.remote) {

		if (!fs.existsSync(config.custom_template_path)) {
			fs.mkdirSync(config.custom_template_path, {recursive: true});
		}

		/* git clone */
		child_process.exec(`git clone ${config.remote} ${config.custom_template_path}`);

		/* Read file_suffix_map.json */
		let file: string = path.join(config.custom_template_path, "file_suffix_map.json");

		if (fs.existsSync(file))
		{
			try {
				Object.assign(file_suffix_mapping, require(file));
			} catch (error) {
				console.log(error);
			}
		}
	}
}


/**
 * getConfig
 *
 * @return any
 */
function getConfig(): any {
	return vscode.workspace.getConfiguration("fileheader");
}


/**
 * getPathObject
 *
 * @param editor(any): editText object.
 * 
 * @return any
 */
function getPathObject(editor: any): any {
	/*
	 * root
	 * dir
	 * base
	 * ext
	 * name
	 */
	return path.parse(editor.document.fileName);
}


/**
 * isSuffix
 *
 * @param editor(any): editText object.
 * @param suffix(string): File suffix name, eg: `.php`,
 * 
 * @return boolean
 */
function isSuffix(editor: any, suffix: string): boolean {
	return getPathObject(editor).ext.lastIndexOf(suffix) !== -1;
}


/**
 * isSuffixList
 *
 * @param editor(any): editText object.
 * @param suffixs(any): File suffix name list, eg: [`.php`],
 * 
 * @return boolean
 */
function isSuffixList(editor: any, suffixs: any): boolean {
	return suffixs.indexOf(getPathObject(editor).ext) !== -1;
}


/**
 * Get max header line
 * 
 * @param editor(any): editText object.
 * 
 * @return number
 */
function getMaxHeaderLine(editor: any, config: any): number {
	let lineCount: number = editor.document.lineCount;

	if (lineCount > config.header_max_line) {
		lineCount = config.header_max_line;
	}

	return lineCount;
}


/**
 * getActivePath
 *
 * @param editor(any): editText object.
 * 
 * @return string
 */
function getActivePath(editor: any): string {
	return getPathObject(editor).dir;
}


/**
 * getSuffix
 *
 * @param editor(any): editText object.
 * 
 * @return string
 */
function getSuffix(editor: any): string {
	let pathobj:any = path.parse(editor.document.fileName);

	return pathobj.ext.toLowerCase() || pathobj.name.toLowerCase();
}


/**
 * getFileName
 *
 * @param editor(any): editText object.
 * 
 * @return string
 */
function getFileName(editor: any): string {
	return path.parse(editor.document.fileName).name.toLowerCase();
}


/**
 * Match line
 *
 * @param editor(any): editText object.
 * @param value(string): Match value.
 * @param max_line(number): Match max line.
 * 
 * @return number: Not match line return -1
 */
function matchLine(editor: any, value: string, max_line: number=header_max_line): number {
	let document: any = editor.document;
	let lineCount: number = getMaxHeaderLine(editor, max_line);
	let i: number = 0;

	for(i = 0; i <= lineCount - 1; i++){
		if (document.lineAt(i).text.toLowerCase().indexOf(value.toLowerCase()) !== -1){
			return i;
		}
	}

	return -1;
}


/**
 * Delete edittext comment
 *
 * @param editor(any): editText object.
 * @param value(string): Match value.
 * @param max_line(number): Match max line.
 * 
 * @return void
 */
function deleteEditorComment(editor: any, value: string, max_line: number=header_max_line): void {
	let line: number = matchLine(editor, value, max_line);

	if(line !== -1){
		editor.edit((editobj: any) => {
			editobj.delete(new vscode.Range(line, 0, line, value.length));
		});
	}
}


/**
 * deleteEditorComments
 *
 * @param editor(any): editText object.
 * 
 * @return void
 */
function deleteEditorComments(editor: any): void {
	if(isSuffix(editor, ".php")){
		deleteEditorComment(editor, "<?php", 2);
	}else if(isSuffixList(editor, [".py", ".pxd", ".pyx"])){
		deleteEditorComment(editor, "# -*- coding: utf-8 -*-", 1);
	}
}


/**
 * Insert End Comment
 *
 * @param editor(any): editText object.
 * @param value(string): Insert value.
 * @param line(number): End line.
 * 
 * @return void
 */
function insertEndComment(editor: any, value: string, line: number): void {
	editor.edit((editobj: any) => {
		editobj.delete(new vscode.Range(line, 0, line, value.length));
	});
}


/**
 * Insert End Comments
 * 
 * @param editor(any): editText object.
 * @param config(any): VScode config.
 * 
 * @return void
 */
function insertEndComments(editor: any, config: any): void {
	let lineCount: number = editor.document.lineCount;

	if(config.body && lineCount <= 1){
		if(isSuffix(editor, ".php")){
			insertEndComment(editor, "?>", lineCount + 1);
		}
	}
}


/**
 * deleteEditorComments
 *
 * @param editor(any): editText object.
 * @param ignore(string[]): Filter rules.
 * 
 * @return boolean
 */
function isIgnore(editor: any, ignore: string[]): boolean {
	let pathobj: any = getPathObject(editor);

	for(let ige of ignore){
		let reg: any = new RegExp(ige.replace("*", ".*"));

		if(reg.test(pathobj.base) || reg.test(path.join(pathobj.dir, pathobj.base))){
			return false;
		}

	}

	return true;
}


/**
 * getDateTime
 *
 * @param fmt(string): DateTime format, default ``YYYY-MM-DD HH:mm:ss``.
 * 
 * @return string
 */
function getDateTime(fmt: string="YYYY-MM-DD HH:mm:ss"): string {
	return moment().format(fmt);
}


/**
 * getDefaultTemplate
 * 
 * @return string
 */
function getDefaultTemplate(): string {
	return path.join(path.dirname(__dirname), "template");
}


/**
 * Judge if the head exists
 * 
 * @param editor(any): editText object.
 * 
 * @return boolean: Judge if the head exists.
 */
function isHeaderExists(editor: any, config: any): boolean {

	if (config.is_header_exists && matchLine(editor, config.is_header_exists, config.header_max_line) !== -1) {
		return true;
	}

	if(matchLine(editor, "@Author:", config.header_max_line) !== -1){
		return true;
	}

	return false;
}


/**
 * Get template
 * 
 * @param editor(any): editText object.
 * @param config(any): VScode config.
 * @param tmplpath(string): Template path, default ``""``.
 * @param type(string): body or header, default ``header``
 * 
 * @return boolean: Template path.
 */
function getTemplatePath(editor: any, config: any, tmplpath: string="", type: string="header"): string {
	let suffix: string = getSuffix(editor);
	let name: string = getFileName(editor);
	let tmpl: string = (config.file_suffix_mapping[name + suffix] || config.file_suffix_mapping[suffix] || file_suffix_mapping[name + suffix] || file_suffix_mapping[suffix]) + ".tmpl";

	return path.join(tmplpath || config.custom_template_path || "", type, tmpl);
}


/**
 * openTemplate
 * 
 * @param editor(any): editText object.
 * @param config(any): VScode config.
 * @param type(string): body or header, default ``header``
 * @param callback(any): Callback.
 * 
 * @return void
 */
function openTemplate(editor: any, config: any, type: string="header", callback: any): void {
	let tmpl_path: string = getTemplatePath(editor, config, "", type);

	if (!fs.existsSync(tmpl_path)) {
		tmpl_path = getTemplatePath(editor, config, getDefaultTemplate(), type);
	}

	if (fs.existsSync(tmpl_path)) {
		vscode.workspace.fs.readFile(vscode.Uri.file(tmpl_path)).then(s => {
			callback(s);
		});	
	}
	else
	{
		console.log("Not found fileheader template: " + tmpl_path);
	}
}


/**
 * updateHeader
 * 
 * @param editor(any): editText object.
 * @param config(any): VScode config.
 * 
 * @return void
 */
function updateHeader(editor: any, config: any): void {
	let maxline: number = getMaxHeaderLine(editor, config);
	let start: number = 0;
	let line: number = 0;

	editor.edit((editobj: any) => {
		line = matchLine(editor, "@Last Modified time:", maxline);

		if (line !== -1) {
			start = editor.document.lineAt(line).text.indexOf(":") + 1;
			editobj.replace(new vscode.Range(line, start, line, 100), " " + getDateTime());				
		}

		line = matchLine(editor, "@Last Modified by:", maxline);

		if (line !== -1) {
			start = editor.document.lineAt(line).text.indexOf(":") + 1;
			editobj.replace(new vscode.Range(line, start, line, 100), "   " + config.author);				
		}
	});

	if (vscode.version < "1.43.0") {
		editor.document.save();	
	}
}


/**
 * Support Predefined variables: https://code.visualstudio.com/docs/editor/variables-reference
 */
function predefinedVariables(editor: any): any {
	const pathobj: any = getPathObject(editor);
	const rfd: any = pathobj.dir.split(path.sep);

	return {
		"workspaceFolder": vscode.workspace.rootPath,
		"workspaceFolderBasename": vscode.workspace.name,
		"file": editor.document.fileName,
		"relativeFile": path.join(rfd[rfd.length - 1], pathobj.base),
		"relativeFileDirname": rfd[rfd.length - 1],
		"fileBasename": pathobj.base,
		"fileBasenameNoExtension": pathobj.name,
		"fileDirname": pathobj.dir,
		"fileExtname": pathobj.ext,
		"cwd": vscode.workspace.rootPath,
	};
}


/**
 * insertHeaderBody
 * 
 * @param editor(any): editText object.
 * @param config(any): VScode config.
 * 
 * @return void
 */
function insertHeaderBody(editor: any, config: any): void {
	let lineCount: number = editor.document.lineCount;

	// Delete comment
	deleteEditorComments(editor);

	openTemplate(editor, config, "header", (s:any) => {
		let date: string = getDateTime();
		let ret: any = template.render(s.toString(), Object.assign(
			{
				author: config.author,
				create_time: date,
				last_modified_by: config.author,
				last_modified_time: date,
			},
			config.other_config,
			predefinedVariables(editor),
		));

		if(lineCount <= 1){
			openTemplate(editor, config, "body", (s:any) => {
				ret += s.toString() + "\r\n";

				editor.edit((editobj:any) => {
					editobj.insert(new vscode.Position(0, 0), ret);
				});

				editor.document.save();
			});
		}else{
			editor.edit((editobj:any) => {
				editobj.insert(new vscode.Position(0, 0), ret);
			});

			editor.document.save();					
		}
	});

	// Insert End Comment
	insertEndComments(editor, config);
}


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscodefileheader" is now active!');

	let config: any = getConfig();
	syncTemplate(config);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.fileheader', () => {
		// The code you place here will be executed every time your command is executed
		let editor: any = vscode.window.activeTextEditor;

		if(!isHeaderExists(editor, config)){
			insertHeaderBody(editor, config);
		}
	});

	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('extension.synctemplate', () => {
		syncTemplate(config);
	});
	context.subscriptions.push(disposable);

	// Save
	vscode.workspace.onWillSaveTextDocument(() =>{
		let editor: any = vscode.window.activeTextEditor;

		// console.log(vscode.workspace.rootPath);

		// Update Header

		if (isIgnore(editor, config.ignore)) {
			if(isHeaderExists(editor, config)){
				updateHeader(editor, config);
			}else if(config.save){
				insertHeaderBody(editor, config);
			}
		}
	});


	// Open
	vscode.workspace.onDidOpenTextDocument(() => {
		let editor: any = vscode.window.activeTextEditor;

		if(config.open && !isHeaderExists(editor, config) && isIgnore(editor, config.ignore)){
			insertHeaderBody(editor, config);
		}
	});
}

// this method is called when your extension is deactivated
export function deactivate() {}
