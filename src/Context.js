export default class Context  {
  constructor(component) {
    this.component = component;
  }

  execute(executable){
    if(!executable.name) throw Error(`Missing executable name`);
    if(!(executable.name in this)) throw Error(`Method ${executable.name} were not found in the current context.`);

    // If it's an instance of a promise then return it if not then wrap it into a promise.
    return this[executable.name](executable.args);
  }

}
