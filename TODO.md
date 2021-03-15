# TODO

- [x] 模板映射支持通配符"*"
- [x] 支持模板函数，比如大小写转换

```
{{ string | upper }}
{{ string | lower }}
{{ string | lower | replace "-", "_"}}
{{ string | replace "-", "_"}}
```

- [x] 自定义插入.h文件模板

```c
#include <stdint.h>

#ifndef __{{fileBasenameNoExtension | upper | replace "-", "_"}}_H__
#define __{{fileBasenameNoExtension | upper | replace "-", "_"}}_H__

typedef struct _{{fileBasenameNoExtension | replace "-", "_"}}
{

}{{fileBasenameNoExtension | replace "-", "_"}}_t;

#endif /* __{{fileBasenameNoExtension | upper | replace "-", "_"}}_H__ */
```

- [ ] vscode编辑器支持打开自定义模板和编辑
- [ ] 丰富模板内容
- [ ] 使用TypeScript语法重构代码
