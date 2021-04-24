/**
 * @Author: JanKinCai
 * @Date:   2021-04-22 23:41:46
 * @Last Modified by:   JanKinCai
 * @Last Modified time: 2021-04-24 16:03:38
 */
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { setFlagsFromString } from 'v8';


class Template {
    editor: any;
    config: any;
    default_tmpl_path: string;
    file_suffix_mapping: any;

    constructor(editor: any, config: any, file_suffix_mapping: any) {
        this.default_tmpl_path = this.getDefaultTemplatePath();
        this.editor = editor;
        this.config = config;
        this.file_suffix_mapping = file_suffix_mapping;
    }

    /**
     * getSuffix
     * 
     * @return string 
     */
    getSuffix(): string {
        let pathobj:any = path.parse(this.editor.document.fileName);

        return pathobj.ext.toLowerCase() || pathobj.name.toLowerCase();    
    }

    /**
     * getFileName
     * 
     * @return string 
     */
    getFileName(): string {
        return path.parse(this.editor.document.fileName).name.toLowerCase();
    }

    /**
     * getDefaultTemplatePath
     * 
     * @return string 
     */
    getDefaultTemplatePath(): string {
        return path.join(path.dirname(__dirname), "template");
    }

    getDefaultArtTemplate(type: string="header"): string {
        return path.join(this.default_tmpl_path, "art", type + ".art");
    }

    /**
     * getTemplatePath
     * 
     * @param type (string): header/body
     * 
     * @return string
     */
    getTemplatePath(type: string="header"): string | undefined {
        let suffix: string = this.getSuffix();
        let name: string = this.getFileName();
        let tmpl: string = "";
    
        for (let v in this.config.file_suffix_mapping) {
            let reg: any = new RegExp("^" + v.replace("*", ".*") + "$");
    
            if (reg.test(name + suffix) || reg.test(suffix)) {
                tmpl = this.config.file_suffix_mapping[v] + ".tmpl"
                break;
            }
        }

        if (!tmpl) {
            tmpl = (this.file_suffix_mapping[name + suffix] || this.file_suffix_mapping[suffix]) + ".tmpl";
        }    

        if (tmpl) {
            let tmplpath = path.join(this.config.custom_template_path, type, tmpl);

            if (fs.existsSync(tmplpath)) {
                return tmplpath;
            }

            tmplpath = path.join(this.default_tmpl_path, type, tmpl);

            if (fs.existsSync(tmplpath)) {
                return tmplpath;
            }
        }

        return undefined;
    }

    private _create(name: string, type: string="header"): void {
		let srcpath = vscode.Uri.file(this.getDefaultArtTemplate(type));
		let dstpath = vscode.Uri.file(path.join(this.config.custom_template_path, type, name + ".tmpl"));
		vscode.workspace.fs.copy(srcpath, dstpath);
    }

    private _open(name: string, type: string="header"): void {
        let tmplpath = path.join(this.config.custom_template_path, type, name + ".tmpl");

        let textDocument: any = vscode.workspace.openTextDocument(vscode.Uri.file(tmplpath));

        let viewcolumn: number = vscode.ViewColumn.One;

        if (type === "body") {
            viewcolumn = vscode.ViewColumn.Two;
        }

        vscode.window.showTextDocument(textDocument, viewcolumn);
    }

    private _open2(tmplpath: string | undefined, type: string="header"): void {
        if (tmplpath === undefined || !fs.existsSync(tmplpath)) {
            vscode.window.showInformationMessage("Template path does not exist");
        }
        else {
            let textDocument: any = vscode.workspace.openTextDocument(vscode.Uri.file(tmplpath));

            let viewcolumn: number = vscode.ViewColumn.One;

            if (type === "body") {
                viewcolumn = vscode.ViewColumn.Two;
            }

            vscode.window.showTextDocument(textDocument, viewcolumn);
        }
    }

    create(name: string): void {
        this._create(name, "header");
        this._create(name, "body");
        this._open(name, "header");
        this._open(name, "body");
    }

    open() {
        let tmplpath = this.getTemplatePath("header");

        this._open2(tmplpath, "header");

        tmplpath = this.getTemplatePath("body");

        this._open2(tmplpath, "body");
    }

    insert() {
        
    }

    toString() {

    }
}

export { Template }