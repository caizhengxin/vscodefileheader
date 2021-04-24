/**
 * @Author: JanKinCai
 * @Date:   2021-04-24 13:32:40
 * @Last Modified by:   JanKinCai
 * @Last Modified time: 2021-04-24 13:59:40
 */
import * as vscode from 'vscode';


class vscodeWrapper {
    editor: any;

    constructor() {
        this.editor = vscode.window.activeTextEditor;
    }
}

export { vscodeWrapper }
