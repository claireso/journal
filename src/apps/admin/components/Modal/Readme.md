### Example

```js
initialState = { isOpen: false };
<div>
  <button onClick={() => setState({ isOpen: true })}>Open Modal</button>
  <Modal isOpen={state.isOpen} onClose={() => {setState({isOpen: false})}}>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet mauris neque. Fusce magna augue, eleifend non efficitur eget, commodo eget felis. Suspendisse pretium porttitor feugiat. Sed sodales tortor in enim suscipit dapibus. Nulla elementum purus non mauris consectetur consectetur. </p>
  </Modal>
</div>
```