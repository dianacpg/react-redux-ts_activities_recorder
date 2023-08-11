// Testing
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
// Component
import EventItem from "./../";

const mockEvent = {
  id: 1,
  dateStart: "2023-08-11T09:00:00",
  dateEnd: "2023-08-11T11:00:00",
  title: "Test Event",
};
const handleUpdateMock = jest.fn();
const handleDeleteMock = jest.fn();
const mockElement = (
  <EventItem event={mockEvent} onDelete={handleDeleteMock} onUpdate={handleUpdateMock} />
);

describe("EventItem", () => {
  it("renders the event title", () => {
    render(mockElement);

    const eventTitle = screen.getByText("Test Event");
    expect(eventTitle).toBeInTheDocument();
  });

  it("allows editing the event title", () => {
    render(mockElement);

    const eventTitle = screen.getByText("Test Event");
    fireEvent.click(eventTitle);

    const inputField = screen.getByRole("textbox") as HTMLInputElement;
    expect(inputField).toBeInTheDocument();

    fireEvent.change(inputField, { target: { value: "Updated Title" } });
    expect(inputField.value).toBe("Updated Title");
  });

  it("calls the onUpdate function when title is updated", () => {
    render(mockElement);

    const eventTitle = screen.getByText("Test Event");
    fireEvent.click(eventTitle);

    const inputField = screen.getByRole("textbox");
    fireEvent.change(inputField, { target: { value: "Updated Title" } });

    fireEvent.blur(inputField);
    expect(handleUpdateMock).toHaveBeenCalledWith("Updated Title", mockEvent);
  });

  it("calls the onDelete function when delete button is clicked", () => {
    render(mockElement);

    const deleteButton = screen.getByText("x");
    fireEvent.click(deleteButton);

    expect(handleDeleteMock).toHaveBeenCalledWith(1);
  });
});
