import React, { Component } from 'react';


export default class Registry {

  static set(name, klass) {
    Registry.components = Registry.components || Object.create(null);
    Registry.components[name] = klass;
  }

  static get(name) {
    return Registry.components[name];
  }
}
