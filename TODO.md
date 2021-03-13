# TODO

- [ ] 模板映射支持通配符"*"
- [ ] 支持模板函数，比如大小写转换

```
{{ string | upper }}
{{ string | lower }}
```

- [ ] 自定义插入.h文件模板

```c
#ifndef __{{fileBasename|upper()}}_H__
#define __{{fileBasename|upper()}}_H__

#endif /* __{{fileBasename|upper()}}_H__ */
```

- [ ] vscode编辑器支持打开自定义模板和编辑
- [ ] 丰富模板内容
- [ ] 使用TypeScript语法重构代码
