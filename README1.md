# 前端组件

## 表单相关

### Antd 中 表单项封装引起的问题

- 以下常规写法能正确变更 select 组件的 value， 并且显示正确

```typescript
<Form.Item>
  <Select options={options} onChange={onChange} />
</Form.Item>
```

- 将 Select 做一个额外封装之后就会发现表单的 value 值错误，而且基于 SelectContainer 封装的不同可能还会造成显示错误。

```typescript
// Parent.tsx
<Form.Item>
  <SelectContaienr options={options} />
</Form.Item>;

// SelectContainer
export default function SelectContainer(props) {
  const { options } = props;
  return <Select options={options} />;
}
```

原因在于 Form.Item 会默认向 Select 组件传递一个 value 属性，并且这个 value 属性是受控的，所以 Select 组件的 value 值会受 Form.Item 控制，而第二种写法中 Select 组件的 value 值是 SelectContainer 组件自己维护的，所以就会有冲突，导致 Select 组件的 value 值错误。
在封装的场景下 SelectContainer 的正确写法是, 将 Form.Item 传递的属性透传给 Select 组件:

```typescript
const SelectContainer = (props) => {
  const { options, ...other } = props;
  return <Select options={options} {...other} />;
};
```
