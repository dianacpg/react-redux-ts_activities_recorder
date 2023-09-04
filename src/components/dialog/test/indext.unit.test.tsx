import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Dialog from "..";

describe("Dialog", () => {
  const defaultProps = {
    title: "Sample Dialog",
    description: "This is a test dialog.",
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
  };

  it("renders the dialog with the provided title and description", () => {
    const { getByText } = render(<Dialog {...defaultProps} />);

    // Ensure that the title and description are rendered
    expect(getByText("Sample Dialog")).toBeInTheDocument();
    expect(getByText("This is a test dialog.")).toBeInTheDocument();
  });

  it("calls onCancel when the 'Cancel' button is clicked", () => {
    const { getByTestId } = render(<Dialog {...defaultProps} />);
    const cancelButton = getByTestId("cancel-dialog");
    fireEvent.click(cancelButton);

    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
  });

  it("calls onConfirm when the 'Confirm' button is clicked", () => {
    const { getByTestId } = render(<Dialog {...defaultProps} />);
    const confirmButton = getByTestId("confirm-dialog");

    // Simulate a click on the 'Confirm' button
    fireEvent.click(confirmButton);

    // Verify that onConfirm has been called
    expect(defaultProps.onConfirm).toHaveBeenCalled();
  });
});
