// React testing library
import "@testing-library/jest-dom/extend-expect";
import { screen, waitFor, fireEvent } from "@testing-library/react";
// Provider
import { renderWithProviders } from "../store/utils/test-utils";
// Components
import App from "../App";
import { server } from "../mocks/server";

describe("Calendar Integration Test", () => {
  // Start the mock server before running the tests
  beforeAll(() => server.listen());

  // Reset and stop the mock server after all tests are done
  afterAll(() => server.close());

  it("fetches & receives user events", async () => {
    const { getByTestId, findByText } = renderWithProviders(<App />);

    // Wait for events to be loaded
    await waitFor(() => getByTestId("loading-spinner"));

    // Check if exactly one event with title "Event 1" is rendered
    expect(await findByText(/Event 1/i)).toBeInTheDocument();
  });

  it("creates a user event on button click", async () => {
    const { getByTestId, findByText } = renderWithProviders(<App />);
    const loadingSpinner = getByTestId("loading-spinner");
    // Wait for events to be loaded
    await waitFor(() => loadingSpinner);
    // Check if exactly one event with title "Event 1" is rendered
    expect(await findByText(/Event 1/i)).toBeInTheDocument();
    const stopWatchButton = getByTestId("stopwatch-button");
    expect(await stopWatchButton).toBeInTheDocument();
    // Click the Stopwatch button to start recording
    fireEvent.click(stopWatchButton);
    // Click the Stopwatch button to stop recording
    fireEvent.click(stopWatchButton);
    // Wait for events to be loaded
    await waitFor(() => loadingSpinner);
    // Wait for new event to be loaded
    expect(await screen.findByText("New event")).toBeInTheDocument();
  });

  it("updates a user event when changing name", async () => {
    const { findByText, getByText, getByRole } = renderWithProviders(<App />);

    // Check if exactly one event with title "Event 1" is rendered
    expect(await findByText(/Event 1/i)).toBeInTheDocument();

    // Simulate clicking on the title to activate edit mode
    const eventTitle = getByText(/Event 1/i);
    fireEvent.click(eventTitle);
    // Wait for the input to appear in the edit mode
    const input = getByRole("textbox");
    await waitFor(() => input);

    // Find the input element and simulate changing its value
    fireEvent.change(input, { target: { value: "New Event title" } });
    // Simulate blur event to save the updated title
    fireEvent.blur(input);

    // Wait for the updated event title to appear
    const updatedEventTitle = await findByText("New Event title");
    // Check if the updated event title is rendered
    expect(updatedEventTitle).toBeInTheDocument();
  });

  it("removes user event", async () => {
    const { findByText, queryByText, getByRole, getByTestId } = renderWithProviders(<App />);

    // Check if exactly one event with title "Event 1" is rendered
    expect(await findByText(/Event 1/i)).toBeInTheDocument();

    // Find the delete button for the first event
    const deleteButton = getByRole("button", { name: "x" });
    // Click the delete button
    fireEvent.click(deleteButton);
    const confirmButton = getByTestId("confirm-dialog");
    // Click the confirm dialog
    fireEvent.click(confirmButton);
    // Wait for the deletion to complete (you can adjust the delay as needed)
    await waitFor(() => {
      expect(queryByText(/Event 1/i)).not.toBeInTheDocument();
    });
  });
});
