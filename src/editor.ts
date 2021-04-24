/**
 * @Author: JanKinCai
 * @Date:   2021-04-24 16:57:18
 * @Last Modified by:   JanKinCai
 * @Last Modified time: 2021-04-25 01:40:20
 */
import * as path from 'path';
import * as vscode from 'vscode';
import * as moment from 'moment';
import * as fs from 'fs';


/*
    * root
    * dir
    * base
    * ext
    * name
    */


class editorObject {
    editor: vscode.TextEditor;
    config: vscode.WorkspaceConfiguration;
    pathobj: any;
    datetimeFormat: string;

    constructor(editor: any, config: any) {
        this.editor = editor;
        this.pathobj = undefined;

        if (this.editor) {
            this.pathobj = path.parse(this.editor.document.fileName);
        }
        this.config = config || vscode.workspace.getConfiguration("fileheader");
        this.datetimeFormat = config.dateformat
    }

    isEditor(): boolean {
        return this.editor === undefined;
    }

    isSuffix(s: any): boolean {
        return this.pathobj.ext.lastIndexOf(s) !== -1;
    }

    isSuffixList(s: string[]): boolean {
        return s.indexOf(this.pathobj.ext) !== -1;
    }

    isIgnore(s: string[]): boolean {
        for(let ige of s){
            let reg: any = new RegExp(ige.replace(".", "\\.").replace("*", ".*"));
    
            if(reg.test(this.pathobj.base) || reg.test(path.join(this.pathobj.dir, this.pathobj.base))){
                return true;
            }
        }
    
        return false;    
    }

    getDateTime(): string {
        return moment().format(this.datetimeFormat);
    }

    getFileBirthDateTime(): string {
        let fileStat: any = fs.statSync(this.editor.document.fileName);
        let birthTime: string = fileStat.birthtime;
    
        if (birthTime.toString().startsWith("1970")) {
            birthTime = fileStat.ctime; // When birthtime is not available
        }
    
        return moment(birthTime).format(this.datetimeFormat);    
    }

    getSuffix(): string {
        return this.pathobj.ext.toLowerCase() || this.pathobj.name.toLowerCase();    
    }

    getFileName(): string {
        return this.pathobj.name.toLowerCase();
    }

    getMaxHeaderLine(): number {
        return Math.min(this.editor.document.lineCount, this.config.header_max_line);
    }

    findStringLine(text: string, max_line: number = this.config.header_max_line): number {
        let lineCount: number =  Math.min(max_line, this.editor.document.lineCount);
        let i: number = 0;
    
        for(i = 0; i <= lineCount - 1; i++){
            if (this.editor.document.lineAt(i).text.toLowerCase().indexOf(text.toLowerCase()) !== -1){
                return i;
            }
        }
    
        return -1;    
    }

    deleteEditorComment(text: string, max_line: number): void {
        let line: number = this.findStringLine(text, max_line);

        if(line !== -1){
            this.editor.edit((editobj: any) => {
                editobj.delete(new vscode.Range(line, 0, line, text.length));
            });
        }
    }

    insertEditorComment(text: string): void {
        let line: number = this.editor.document.lineCount + 1;
        this.editor.edit((editobj: any) => {
            editobj.delete(new vscode.Range(line, 0, line, text.length));
        });    
    }

    isHeaderExists(): boolean {
        if (this.config.is_header_exists && this.findStringLine(this.config.is_header_exists, this.getMaxHeaderLine()) !== -1) {
            return true;
        }
    
        if(this.findStringLine("@Author:", this.getMaxHeaderLine()) !== -1){
            return true;
        }
    
        return false;    
    }
}


export {
    editorObject
}