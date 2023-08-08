// React testing library
import "@testing-library/jest-dom/extend-expect";
import { screen, waitFor, fireEvent } from "@testing-library/react";
// Provider
import { renderWithProviders } from "../store/utils/test-utils";
// Components
import Calendar from "../components/calendar/";
import Recorder from "../components/recorder";

describe("Calendar Integration Test", () => {
  it("fetches & receives user events", async () => {
    renderWithProviders(<Calendar />);

    // Wait for events to be loaded
    await waitFor(() => screen.getByText("Loading..."));

    // Check if exactly one event with title "Event 1" is rendered
    expect(await screen.findByText(/Event 1/i)).toBeInTheDocument();
  });

  it("creates a user event on button click", async () => {
    renderWithProviders(
      <div>
        <Recorder />
        <Calendar />
      </div>
    );

    // Click the recorder button to start recording
    fireEvent.click(screen.getByRole("button"));
    // Click the recorder button to stop recording
    fireEvent.click(screen.getByRole("button"));
    // Check if the new event title is rendered
    expect(await screen.findByText(/New event/i)).toBeInTheDocument();
  });

  it("updates a user event when changing name", async () => {
    renderWithProviders(<Calendar />);

    // Check if exactly one event with title "Event 1" is rendered
    expect(await screen.findByText(/Event 1/i)).toBeInTheDocument();
    const eventTitle = screen.getByText(/Event 1/i);

    // Simulate clicking on the title to activate edit mode
    fireEvent.click(eventTitle);
    // Wait for the input to appear in the edit mode
    await waitFor(() => screen.getByRole("textbox"));

    // Find the input element and simulate changing its value
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New Event title" } });
    // Simulate blur event to save the updated title
    fireEvent.blur(input);

    // Wait for the updated event title to appear
    const updatedEventTitle = await screen.findByText(/New Event title/i);
    // Check if the updated event title is rendered
    expect(updatedEventTitle).toBeInTheDocument();
  });

  it("removes user event", async () => {
    renderWithProviders(<Calendar />);

    // Check if exactly one event with title "Event 1" is rendered
    expect(await screen.findByText(/Event 1/i)).toBeInTheDocument();

    // Find the delete button for the first event
    const deleteButton = screen.getByRole("button", { name: "×" });
    // Click the delete button
    fireEvent.click(deleteButton);

    // Wait for the deletion to complete (you can adjust the delay as needed)
    await waitFor(() => {
      expect(screen.queryByText(/Event 1/i)).not.toBeInTheDocument();
    });
  });
});