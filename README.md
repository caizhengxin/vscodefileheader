# VSCode FileHeader

[![Markeetplace Badge][marketplace-badge]][marketplace] [![Install][install-badge]][marketplace] ![Size][size-badge] [![BSD License Badge][license-badge]][license]

This is a header extension that contains multiple languages.

* Usage [cookiecutter-vscode](https://github.com/caizhengxin/cookiecutter-vscode) create project.
* [FileHeader Extension template](https://github.com/caizhengxin/fileheader-template)

## Install

Method one:

``ctrl + shift + x``, Search ``VSCodeFileHeader``

Method two:

``ctrl + p``

```bash
ext install jankincai.vscodefileheader
```

## Features

* Support for automatic update time and author
* Support for custom template(header/body)
* Support for multiple languages
* Support for suffix name mapping templates
* Support for ignore suffix
* Support for manual and automatic insert comment

## Usage

```python
# Settings
{
    "fileheader.author": "JanKinCai",
}

# Save file or ``ctrl + alt + i`` insert comment
```

## Demo

Python:

![Python](images/python.gif)

C:

![C](images/c.gif)

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
* Diff
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

## Requirements

## Extension Settings

* Set author

```json
{
    "fileheader.author": "Your name"
}
```

* Set custom suffix name

```json
{
    "fileheader.file_suffix_mapping": {
        ".pyx": "Python"
    }
}
```

* Set insert body switch

```json
{
    "fileheader.body": true
}
```

* Set open file insert comment

```python
{
    "fileheader.open": true,
}
```

* Set save file insert comment, default ``true``

```python
{
    "fileheader.save": true,
}

# Set false, Need to add comments manually

ctrl + alt + i
```

* Set date foramt

```python
{
    "fileheader.dateformat": "YYYY-MM-DD HH:mm:ss"  # moment.js
}
```

* Set ignore

```python
{
    "fileheader.ignore": [
        "*.txt",             # Ignore suffix name
        "test.py",           # Ignore file
        "test"               # Ignore path
    ]
}
```

* Set custom template

> Add Header template

template/header/EditorConfig.tmpl

```conf
# @Author: {{author}}
# @Date:   {{create_time}}
# @Last Modified by:   {{last_modified_by}}
# @Last Modified time: {{last_modified_time}}


```

> Add Body template

template/body/EditorConfig.tmpl

```conf
# http://editorconfig.org

root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.{py,rst,ini}]
indent_style = space
indent_size = 4

[*.{html,css,scss,json,yml}]
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab

[nginx.conf]
indent_style = space
indent_size = 2
```

> Set template path

```json
{
    "fileheader.custom_template_path": "xxx/template/"
}
```

> Set suffix mapping

```json
"fileheader.file_suffix_mapping": {
    ".editorconfig": "EditorConfig"
},
```

* [FileHeader Extension template](https://github.com/caizhengxin/fileheader-template)

## Known Issues

## Release Notes

[marketplace]: https://marketplace.visualstudio.com/items?itemName=jankincai.vscodefileheader#review-details
[marketplace-badge]: https://vsmarketplacebadge.apphb.com/version-short/jankincai.vscodefileheader.svg?style=flat-square
[install-badge]: https://vsmarketplacebadge.apphb.com/installs-short/jankincai.vscodefileheader.svg?style=flat-square
[size-badge]: https://img.shields.io/github/languages/code-size/caizhengxin/vscodefileheader
[license]: ./LLICENSE
[license-badge]: https://img.shields.io/badge/license-BSD-blue.svg