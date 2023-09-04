// React
import React, { useState, useEffect, useRef, ReactElement } from "react";
// Styles
import styles from "./styles/event-item.module.scss";
// Store
import { UserEvent } from "../../lib/services";
// Utils
import { createDateKey } from "../../lib/utils/create-date-key";
import Dialog from "../dialog";
import Button from "../button";
interface EventItemProps {
  event: UserEvent;
  onDelete: (id: number) => void;
  onUpdate: (title: string, event: UserEvent) => void;
}

const EventItem = ({ event, onUpdate, onDelete }: EventItemProps): ReactElement => {
  const startHour = createDateKey(new Date(event.dateStart)).fullTime;
  const endHour = createDateKey(new Date(event.dateEnd)).fullTime;
  const inputRef = useRef<HTMLInputElement>(null);
  const [editable, setEditable] = useState(false);
  const [title, setTitle] = useState(event.title);
  const [showModal, setShowModal] = useState(false);

  const handleTitleClick = () => {
    setEditable(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleUpdate = () => {
    onUpdate(title, event);
    setEditable(false);
  };

  useEffect(() => {
    if (editable) {
      inputRef.current?.focus();
    }
  }, [editable]);

  return (
    <div key={event.id} className={styles["event-item"]}>
      <div className={styles["event-item__info"]}>
        <div className={styles["event-item__time"]}>
          {startHour} - {endHour}
        </div>
        <div className={styles["event-item__title"]}>
          {editable ? (
            <input
              type="text"
              ref={inputRef}
              value={title}
              onChange={handleChange}
              onBlur={handleUpdate}
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  handleUpdate();
                }
              }}
            />
          ) : (
            <span onClick={handleTitleClick}>{event.title}</span>
          )}
        </div>
      </div>
      <Button skin="ghost" onClick={() => setShowModal(true)}>
        x
      </Button>
      {showModal && (
        <Dialog
          title={`Are you sure you want to delete "${event.title}"?`}
          onCancel={() => setShowModal(false)}
          onConfirm={() => {
            onDelete(event.id);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default EventItem;
