import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Form from "./components/Form";
import Products from "./components/Products";
import store from "./store";
import "./App.css";
/**
 * App renders Component on specific Route
 * @extends Component
 */
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <React.Fragment>
                    <Products />
                  </React.Fragment>
                )}
              />
              <Route
                path="/edit-product"
                render={props => (
                  <React.Fragment>
                    <Form />
                  </React.Fragment>
                )}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
