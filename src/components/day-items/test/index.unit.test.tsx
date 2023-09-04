// React testing
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
// Components
import DayItems from "./../";
// Types
import { UserEvent } from "../../../lib/services";

describe("DayItems Component", () => {
  const mockEvents: UserEvent[] = [
    {
      id: 1,
      title: "running",
      dateStart: "2023-07-17T15:48:02.499Z",
      dateEnd: "2023-07-17T15:48:08.720Z",
    },
    {
      id: 2,
      title: "walking",
      dateStart: "2023-07-17T15:48:02.499Z",
      dateEnd: "2023-07-17T15:48:08.720Z",
    },
    {
      id: 3,
      title: "swimming",
      dateStart: "2023-07-17T15:48:02.499Z",
      dateEnd: "2023-07-17T15:48:08.720Z",
    },
    {
      id: 4,
      title: "sleeping",
      dateStart: "2023-07-17T15:48:02.499Z",
      dateEnd: "2023-07-17T15:48:08.720Z",
    },
    {
      id: 5,
      title: "eating",
      dateStart: "2023-07-17T15:48:02.499Z",
      dateEnd: "2023-07-17T15:48:08.720Z",
    },
    {
      id: 6,
      title: "working",
      dateStart: "2023-07-17T15:48:02.499Z",
      dateEnd: "2023-07-17T15:48:08.720Z",
    },
  ];

  const mockComponent = (
    <DayItems
      day={10}
      month="August"
      events={mockEvents}
      onDelete={jest.fn()}
      onUpdate={jest.fn()}
    />
  );

  const firstThreeEvents = mockEvents.slice(0, 3);
  const remainingEvents = mockEvents.slice(3);

  test("renders date and month", () => {
    const { getByText } = render(mockComponent);

    expect(getByText("August")).toBeInTheDocument();
    expect(getByText("10")).toBeInTheDocument();
  });

  test("renders up to 3 events for each day when rendered", () => {
    const { getByText, queryByText } = render(mockComponent);

    // Verify that the first 3 events are rendered when collapsed
    firstThreeEvents.forEach((event) => {
      expect(getByText(event.title)).toBeInTheDocument();
    });

    remainingEvents.forEach((event) => {
      expect(queryByText(event.title)).not.toBeInTheDocument();
    });
  });

  test("toggles expansion when button is clicked", () => {
    const { getByRole, getByText, queryByText } = render(mockComponent);

    // Click the expand button
    fireEvent.click(getByRole("button", { name: "expand" }));

    // Verify that all events are rendered when expanded
    mockEvents.forEach((event) => {
      expect(getByText(event.title)).toBeInTheDocument();
    });

    // Click the collapse button
    fireEvent.click(getByRole("button", { name: "collapse" }));
    // Verify that remaining events are not rendered when collapsed
    remainingEvents.forEach((event) => {
      expect(queryByText(event.title)).not.toBeInTheDocument();
    });
  });
});
