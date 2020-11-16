# VSCode FileHeader

[![Markeetplace Badge][marketplace-badge]][marketplace] [![Install][install-badge]][marketplace] [![Download][download-badge]][marketplace] ![Size][size-badge] [![BSD License Badge][license-badge]][license]

This is a header extension that contains multiple languages.

Feel good friends please give a star ~

* Usage [cookiecutter-vscode](https://github.com/caizhengxin/cookiecutter-vscode) create project.
* [Custom fileheader Extension template](https://github.com/caizhengxin/fileheader-template)

## Install

```bash
1. ctrl + shift + x
2. Search VSCodeFileHeader
```

or

```bash
1. ctrl + p
2. ext install jankincai.vscodefileheader
```

## Features

* Support for automatic update time and author
* Support for custom template(header/body)
* Support for multiple languages
* Support for suffix name mapping templates
* Support for ignore suffix
* Support for manual and automatic insert comment
* [Support vscode variables](https://code.visualstudio.com/docs/editor/variables-reference)
* Support remote synchronization

## Demo

Python:

![Python](images/python.gif)

C:

![C](images/c.gif)

PHP:

![PHP](images/php.gif)

Vue:

![Vue](images/vue.gif)

XML:

![XML](images/xml.gif)

## Language

* ActionScript
* AppleScript
* ASP
* Batch
* C
* C#
* C++
* Clojire
* CSS
* D
* Erlang
* Go
* Haskell
* HTML
* Java
* JavaScript
* LaTeX
* Lisp
* Lua
* Matlab
* Objective-C
* OCaml
* Pascal
* Perl
* PHP
* Python
* R
* Ruby
* Scala
* SCSS
* ShellScript
* SQL
* TypeScript
* Vue
* XML
* YAML

## Usage

```python
# Settings
{
    "fileheader.author": "JanKinCai",
}

# Save file or ``ctrl + alt + i`` insert comment
```

## Extension Settings

```json
{
    // Set author
    "fileheader.author": "Your name",

    // Set insert body switch, default false
    "fileheader.body": true,

    // Set open file to insert header comment, default false
    "fileheader.open": true,

    // Set save file to insert header comment, default true
    "fileheader.save": true,

    // find max line of header comment, default 10
    "fileheader.header_max_line": 10,

    // Set datetime format, default YYYY-MM-DD HH:mm:ss
    // moment.js
    "fileheader.dateformat": "YYYY-MM-DD HH:mm:ss",

    // Set template mapping
    "fileheader.file_suffix_mapping": {
        ".pyx": "Python",
    },

    "fileheader.ignore": [
        "*.txt",             // Ignore suffix name
        "test.py",           // Ignore file
        "test"               // Ignore dir
    ]
}
```

### Custom template(Add Email)

Note: ``The template header connot be modified and can be added.``

Custom Header template ``template/header/Python.tmpl``:

```conf
# @Author: {{author}}
# @Date:   {{create_time}}
# @Email:  {{email}}
# @Last Modified by:   {{last_modified_by}}
# @Last Modified time: {{last_modified_time}}
```

Custom Body template ``template/body/Python.tmpl``:

```conf


def main():
    print("Hello, World!")


if __name__ == "__main__":
    main()
```

Settings:

```python
{
    # Set template path
    "fileheader.custom_template_path": "xxx/template/",
    # Set other config
    "fileheader.other_config": {
        "email": "Your email",
    }
    # Set suffix mapping
    "fileheader.file_suffix_mapping": {
        ".py": "Python"
    },
}
```

* [Custom fileheader Extension template](https://github.com/caizhengxin/fileheader-template)

### fully modify template (example)

Custom Header template template/header/JKC.tmpl:

```conf
# @Name: {{name}}
```

Custom Header template template/body/JKC.tmpl:

```conf
```

settings:

```python
{
    "fileheader.is_header_exists": "@Name:",
    "fileheader.other_config": {
        "name": "jankincai",
    },
    "fileheader.file_suffix_mapping": {
        ".jkc": "JKC"
    },   
}
```

### vscode variables

https://code.visualstudio.com/docs/editor/variables-reference

Custom Header template ``template/header/Python.tmpl``:

```conf
# @Author: {{author}}
# @Date:   {{create_time}}
# @Last Modified by:   {{last_modified_by}}
# @Last Modified time: {{last_modified_time}}
# {{workspaceFolder}}
# {{workspaceFolderBasename}}
# {{file}}
# {{relativeFile}}
# {{relativeFileDirname}}
# {{fileBasename}}
# {{fileBasenameNoExtension}}
# {{fileDirname}}
# {{fileExtname}}
# {{cwd}}
```

### Sync remote template

```python
{
    # Set template path
    "fileheader.custom_template_path": "xxx/template/",

    # set ssh, https://jdblischak.github.io/2014-09-18-chicago/novice/git/05-sshkeys.html
    # "fileheader.remote": "git@github.com:caizhengxin/vscodefileheader.git"

    "fileheader.remote": "https://github.com/caizhengxin/vscodefileheader.git"
}
```

[marketplace]: https://marketplace.visualstudio.com/items?itemName=jankincai.vscodefileheader#review-details
[marketplace-badge]: https://vsmarketplacebadge.apphb.com/version-short/jankincai.vscodefileheader.svg?style=flat-square
[install-badge]: https://img.shields.io/visual-studio-marketplace/i/jankincai.vscodefileheader?style=flat-square
[download-badge]: https://img.shields.io/visual-studio-marketplace/d/jankincai.vscodefileheader?style=flat-square
[size-badge]: https://img.shields.io/github/languages/code-size/caizhengxin/vscodefileheader?style=flat-square
[license]: ./LICENSE
[license-badge]: https://img.shields.io/github/license/caizhengxin/vscodefileheader?style=flat-square
