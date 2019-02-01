# Loader
**Loader** allows components to display a loader while they are fetching data. 

```javascript

class MyComponent extends BaseComponent {
  render(){
    return (
      <Loader isFetching={this.state.isFetching}>
        <MyComponent>
            //...
        </MyComponent>
      </Loader>
    );
  }
}
```

As soon as *state.isFetching* is true then all the components inside <Loader> and </Loader> will display.

*ifFetching* is passed to components as props from the Dashboard `state.isFetching`
