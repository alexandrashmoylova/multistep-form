import * as React from "react";
import { render, screen } from "@testing-library/react";
import App from "./app";
import { Provider } from "react-redux";
import { store } from './store'

test('check page h1 title loads', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>);
  const element = screen.getByTestId('main-title');
  expect(element).toBeInTheDocument();
});