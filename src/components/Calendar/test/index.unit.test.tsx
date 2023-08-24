// React testing library
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Calendar from "../";
import { GroupedEventsData } from "../../../store/selectors/user-events";

describe("Calendar", () => {
  const mockEvents: GroupedEventsData = {
    sortedGroupKeys: ["2023-08-24"],
    groupedEvents: {
      "2023-08-24": [
        { id: 1, title: "Event 1", dateStart: "monday", dateEnd: "friday" },
        { id: 2, title: "Event 2", dateStart: "monday", dateEnd: "friday" },
      ],
    },
  };

  const testingComponent = (
    <Calendar events={mockEvents} onDelete={() => jest.fn()} onUpdate={() => jest.fn()} />
  );

  it("renders loading message when events are undefined", () => {
    render(<Calendar events={undefined} onDelete={() => jest.fn()} onUpdate={() => jest.fn()} />);
    const loadingMessage = screen.getByText("Loading...");
    expect(loadingMessage).toBeInTheDocument();
  });

  it("renders day items when events are provided", () => {
    render(testingComponent);
    const eventTitles = screen.getAllByText(/Event/);
    expect(eventTitles).toHaveLength(2);
  });
});
