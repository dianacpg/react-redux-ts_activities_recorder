// React
import React, { useState, useEffect, useRef } from 'react';
// Store
import { deleteUserEvent, updateUserEvent } from '../store/modules/user-events';
import { useDispatch } from 'react-redux';
import { UserEvent } from '../../lib/services';
// Utils
import { createDateKey } from '../../lib/utils/create-date-key';

interface Props {
    event: UserEvent;
}

const EventItem: React.FC<Props> = ( {event }) => { 
    const startHour = createDateKey( new Date(event.dateStart)).fullTime
    const endHour = createDateKey( new Date(event.dateEnd)).fullTime
    
    const dispatch = useDispatch();         
    const handleDeleteClick= () => {
        dispatch(deleteUserEvent(event.id));
    }
    const [editable, setEditable] = useState(false)
    const handleTitleClick = () => {
        setEditable(true)
    };

    const inputRef = useRef<HTMLInputElement>(null)
    useEffect (()=> {
        if (editable) {
            inputRef.current?.focus();
        }
    }, [editable]);

    const [title, setTitle] = useState(event.title);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }
    const handleBlur = () => {
        if (title !== event.title) {
            dispatch(updateUserEvent({
                ...event,
                title
            }));
        }
        setEditable(false);
    }
    
    return (
        <div key={event.id} className="calendar-event">
        <div className="calendar-event-info">
            <div className="calendar-event-time">{startHour} - {endHour}</div>
            <div className="calendar-event-title">
                {editable? (
                    <input 
                    type="text" 
                    ref={inputRef} 
                    value={title} 
                    onChange={handleChange}
                    onBlur={handleBlur}/>
                ) : (<span onClick={handleTitleClick}>{event.title}</span>)} 
            </div>
        </div>
        <button className="calendar-event-delete-button" onClick={handleDeleteClick}>&times;</button>
        </div>
    );
}

export default EventItem;