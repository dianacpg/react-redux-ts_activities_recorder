export interface UserEvent {
  id: number;
  title: string;
  dateStart: string;
  dateEnd: string;
}

export interface UpdateUserEventDto {
  id: UserEvent["id"];
  dto: Omit<UserEvent, "id">;
}

// Example API base URL
const API_BASE_URL = "http://localhost:3001";

// Function to fetch user events
export const getUserEvents = async (): Promise<UserEvent[]> => {
  const response = await fetch(`${API_BASE_URL}/events`);
  const data: UserEvent[] = await response.json();
  return data;
};

// Function to create a new user event
export const createUserEvent = async (dto: Omit<UserEvent, "id">): Promise<UserEvent> => {
  const response = await fetch(`${API_BASE_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto),
  });

  const createdEvent: UserEvent = await response.json();
  return createdEvent;
};

// Function to update an existing user event
export const updateUserEvent = async ({ id, dto }: UpdateUserEventDto): Promise<UserEvent> => {
  const response = await fetch(`${API_BASE_URL}/events/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto),
  });

  const updatedEvent: UserEvent = await response.json();
  return updatedEvent;
};

// Function to delete a user event
export const deleteUserEvent = async (id: number): Promise<void> => {
  await fetch(`${API_BASE_URL}/events/${id}`, {
    method: "DELETE",
  });
};
