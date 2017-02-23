# Loader
**Loader** allows components to display a loader while they are fetching data. If you create a completely new component (it inherits either from *Component* or *BaseComponent*) then you can use it in this way:


```javascript

class MyComponent extends BaseComponent {
  render(){
    return (
      <Loader isFetching={this.state.isFetching}>

      </Loader>
    );
  }
}
```

As soon as *state.isFetching* is true then all the components inside <Loader> and </Loader> will display.

If you are extending from the *BaseComponent* and using the *fetchData* property to fetch resources then the *isFetching* state is handled for you.

If you aren't using *fetchData* to fetch resources then you need to switch this variable manually.
