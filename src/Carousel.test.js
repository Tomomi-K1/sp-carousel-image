import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

// smoke test
it('check if this renders', () => {
  render(<Carousel />); 
});

// snapshot test
it('matches snapshot', () => {
  const {asFragment} = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot(); 
});

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});


it("works when you click on the left arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // move forward in the carousel to be on second image
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  // move back to the first image
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, not the second image
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Josh Post on Unsplash")).not.toBeInTheDocument();
});

it("hides left arrow on the first image", function() {
  const { queryByTestId, queryByAltText, debug } = render(<Carousel />);

  // expect the first image is showing
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();

  const rightArrow = queryByTestId("right-arrow");
  const leftArrow = queryByTestId("left-arrow");

  // expect only right arrow is present when first image shows
  expect(leftArrow).not.toBeInTheDocument();
  expect(rightArrow).toBeInTheDocument();
});

it("hides left arrow on the third image", function() {
  const { queryByTestId, queryByAltText, debug } = render(<Carousel />);

  // expect the first image is showing
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();

  let rightArrow = queryByTestId("right-arrow");
  let leftArrow = queryByTestId("left-arrow");

  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // reassign rightArrow and LeftArrow from the third image html page
  rightArrow = queryByTestId("right-arrow");
  leftArrow = queryByTestId("left-arrow");
  // expect only right arrow is present when first image shows
  expect(leftArrow).toBeInTheDocument();
  expect(rightArrow).not.toBeInTheDocument();
});

// springboard solution
// it("hides and shows arrows appropriately", function() {
//   const { getByTestId } = render(<Carousel />);
//   const leftArrow = getByTestId("left-arrow");
//   const rightArrow = getByTestId("right-arrow");

//   // expect the left arrow to be missing, but the right button to be present.
//   expect(leftArrow).toHaveClass("hidden");
//   expect(rightArrow).not.toHaveClass("hidden");

//   // move forward, expect both arrow to exist
//   fireEvent.click(getByTestId("right-arrow"));
//  // expect the left arrow to be missing, but the right button to be present.
//  expect(leftArrow).not.toHaveClass("hidden");
//  expect(rightArrow).not.toHaveClass("hidden");

//   // move forward again, expect only the right arrow to be missing
//   fireEvent.click(rightArrow);
//  expect(leftArrow).not.toHaveClass("hidden");
//  expect(rightArrow).toHaveClass("hidden");

// });

// it("works when you click on the left arrow", function() {
//   const { getByTestId, queryByAltText } = render(<Carousel />);
//   const leftArrow = getByTestId("left-arrow");
//   const rightArrow = getByTestId("right-arrow");

//   // move to the right
//   fireEvent.click(rightArrow);

//   // move back to the left, expect the first image to show
//   fireEvent.click(leftArrow);
//   expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
//   expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
// });

