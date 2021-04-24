/**
 * @Author: JanKinCai
 * @Date:   2021-04-24 16:24:09
 * @Last Modified by:   JanKinCai
 * @Last Modified time: 2021-04-25 01:04:59
 */
import * as child_process from 'child_process';
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as template from './template';


function createTemplateCommand(config: any, file_suffix_mapping: any): void {
    let tmplobj = new template.Template(undefined, config, file_suffix_mapping);

    if (config.custom_template_path) {
        vscode.window.showInputBox({ignoreFocusOut: true, password: false, prompt: "Please type template name"}).then(tmplname => {
            if (tmplname === undefined || tmplname.trim() === '') {
                vscode.window.showInformationMessage("Please type template name")
            }
            else {
                tmplobj.create(tmplname);
            }
        });	
    }
    else {
        vscode.window.showInformationMessage("Please set vscodefileheader custome template path.");
    }
}


function openTemplateCommand(config: any, file_suffix_mapping: any): void {
    let editor: any = vscode.window.activeTextEditor;

    if (editor) {
        let tmplobj = new template.Template(editor, config, file_suffix_mapping);

        tmplobj.open();
    }
    else {
        vscode.window.showInformationMessage("No active window");
    }
}


/**
 * Sync template Command
 * 
 * @return void
 */
 function syncTemplateCommand(config: any, file_suffix_mapping: any): void {

	if (config.custom_template_path && config.remote) {

		if (!fs.existsSync(config.custom_template_path)) {
			fs.mkdirSync(config.custom_template_path, {recursive: true});

			/* git clone */
			child_process.exec(`git clone ${config.remote} ${config.custom_template_path}`);
		}
		else {
			child_process.exec(`cd ${config.custom_template_path}`);
			child_process.exec(`git pull origin master`);
		}

		/* Read file_suffix_map.json or file_suffix_mapping.json */
		let file_suffix_mapping_path: string = path.join(config.custom_template_path, "file_suffix_map.json");

		if (!fs.existsSync(file_suffix_mapping_path))
		{
            file_suffix_mapping_path = path.join(config.custom_template_path, "file_suffix_mapping.json");
		}

        if (fs.existsSync(file_suffix_mapping_path))
        {
            Object.assign(file_suffix_mapping, require(file_suffix_mapping_path));
        }
	}
}


function updateTemplateCommand(config: any, file_suffix_mapping: any): void {
    let editor: any = vscode.window.activeTextEditor;

    if (editor) {
        let tmplobj = new template.Template(editor, config, file_suffix_mapping);

        tmplobj.update();
    }
    else {
        vscode.window.showInformationMessage("No active window");
    }
}


function updateTemplateCommand2(config: any, file_suffix_mapping: any): void {
    let editor: any = vscode.window.activeTextEditor;

    if (editor) {
        let tmplobj = new template.Template(editor, config, file_suffix_mapping);

        tmplobj.update2();
    }
}


function insertTemplateCommand(config: any, file_suffix_mapping: any): void {
    let editor: any = vscode.window.activeTextEditor;

    let tmplobj = new template.Template(editor, config, file_suffix_mapping);

    tmplobj.insert();

    if (editor) {
        let tmplobj = new template.Template(editor, config, file_suffix_mapping);

        tmplobj.insert();
    }
    else {
        vscode.window.showInformationMessage("No active window");
    }
}


export {
    createTemplateCommand,
    openTemplateCommand,
    syncTemplateCommand,
    updateTemplateCommand,
    insertTemplateCommand,
    updateTemplateCommand2,
}
