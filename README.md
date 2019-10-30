# VSCode FileHeader

This is a header extension that contains multiple languages.

## Install

```bash
ext install jankincai.vscodefileheader
```

## Features

Python

![Python](https://raw.githubusercontent.com/caizhengxin/vscodefileheader/develop/images/python.png)

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

* Set date foramt

```python
{
    "fileheader.dateformat": "YYYY-MM-DD HH:mm:ss"  # moment.js
}
```

* Set custom template

Create path

```bash
mkdir template
cd template
mkdir header
vim Python.tmpl

# -*- coding: utf-8 -*-
# @Author: {{author}}
# @Date:   {{create_time}}
# @Last Modified by:   {{last_modified_by}}
# @Last Modified time: {{last_modified_time}}
```

```json
{
    "fileheader.custom_template_path": "xxx/template/"
}
```

## Known Issues

## Release Notes
