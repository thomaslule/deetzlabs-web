import React from 'react';
import * as api from './api';

const ApiContext = React.createContext();

export class ApiContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cache: {},
    };
  }

  fetch(path) {
    const { cache } = this.state;
    if (!cache[path]) {
      cache[path] = api.get(path);
    }
    return cache[path];
  }

  render() {
    const { children } = this.props;

    return (
      <ApiContext.Provider
        value={{
          fetch: path => this.fetch(path),
        }}
      >
        {children}
      </ApiContext.Provider>
    );
  }
}

export function withApi(Component) {
  return props => (
    <ApiContext.Consumer>
      {context => <Component {...props} {...context} />}
    </ApiContext.Consumer>
  );
}
