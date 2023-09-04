import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Button, { ButtonProps } from "..";

describe("Button component", () => {
  const testComponent = (skin?: ButtonProps["skin"], onClick?: ButtonProps["onClick"]) =>
    render(
      <Button skin={skin} onClick={onClick}>
        Click Me
      </Button>
    );
  it("renders the Button component", () => {
    const { getByText } = testComponent();
    const buttonElement = getByText("Click Me");
    expect(buttonElement).toBeInTheDocument();
  });

  it("applies the 'default' skin", () => {
    const { container } = testComponent();
    const buttonElement = container.querySelector(".button");
    expect(buttonElement).toBeInTheDocument();
  });

  it("applies the 'ghost' skin", () => {
    const { container } = testComponent("ghost");
    const buttonElement = container.querySelector(".button--ghost");
    expect(buttonElement).toBeInTheDocument();
  });

  it("fires click event when button is clicked", () => {
    const onClickMock = jest.fn();
    const { getByText } = testComponent("ghost", onClickMock);
    const buttonElement = getByText("Click Me");
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalled();
  });
});
