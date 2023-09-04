import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LoadingSpinner from "..";

describe("LoadingSpinner", () => {
  it("renders loading spinner component without errors", () => {
    const { getByTestId } = render(<LoadingSpinner />);

    expect(getByTestId("loading-spinner")).toBeInTheDocument();
  });
});
