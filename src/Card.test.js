import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";

// smoke test
test('check if this renders', () => {
  render(<Card />); 
});

//snapshot test
test('matches snapshot', () => {
  const {asFragment} = render(<Card />);
  expect(asFragment()).toMatchSnapshot(); 
});

