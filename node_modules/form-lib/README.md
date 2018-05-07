# form-lib

`React` 实现的 `Form` 组件， 和 `rsuite-schema` 结合使用可以很好的对表单数据进行校验。

[rsuite-schema API 文档](https://rsuitejs.com/components/schema)

`form-lib` 中主要提供了两个组件: `<Form>` 和 `<Field>`,  `<Field>` 必须包含在 `<Form>` 内，例如:

```html
<Form>
  <Field />
  <Field />
</Form>
```

`<Form>` 提供了 `values` 和 `defaultValues` 为整个表单设置值，对应的分别是受控和非受控表单。
同时提供了 `onChange` (数据发生改变时候触发) 和 `onCheck` (数据校验时候触发) 事件。

`<Field>` 必须拥有 `name` 属性， 并且属性值必须和 `SchemaModel` 声明的校验对象字段名一致，
`<Field>` 默认是一个 `input[type='text']` 组件， 如果需要自定义，设置一个 `accepter` 属性，
该属性是设置需要受理的表单组件。受理的组件必须实现 `value`, `defalutValue`,`onChange` 和 `onBlur` 等 API

------
## 快速开始

### 安装

```
npm i form-lib --save
```

安装 `rsuite-schema`

```
npm i rsuite-schema --save
```

