import React, { useState } from "react";
import "./MyTrips.css";

const Trip = ({ trip, onDeleteTrip, onEditTrip }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTrip, setEditedTrip] = useState({
        id: trip.id,
        title: trip.title,
        startTrip: trip.startTrip,
        endTrip: trip.endTrip,
        description: trip.description,
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTrip({ ...editedTrip, [name]: value });
    };

    const handleSaveClick = (e) => {
        e.preventDefault();
        onEditTrip(editedTrip);
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedTrip({
            id: trip.id,
            title: trip.title,
            startTrip: trip.startTrip,
            endTrip: trip.endTrip,
            description: trip.description,
        });
    };

    return (
        <div className="trip-row">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        name="title"
                        value={editedTrip.title}
                        onChange={handleInputChange}
                        className="trip-input"
                    />
                    <input
                        type="text"
                        name="startTrip"
                        value={editedTrip.startTrip}
                        onChange={handleInputChange}
                        className="trip-input"
                    />
                    <input
                        type="text"
                        name="endTrip"
                        value={editedTrip.endTrip}
                        onChange={handleInputChange}
                        className="trip-input"
                    />
                    <input
                        type="text"
                        name="description"
                        value={editedTrip.description}
                        onChange={handleInputChange}
                        className="trip-input"
                    />
                    <span className="trip-actions">
                        <form onSubmit={handleSaveClick}>
                            <button type="submit" className="save-btn">Save</button>
                        </form>
                        <button onClick={handleCancelClick} className="cancel-btn">Cancel</button>
                    </span>
                </>
            ) : (
                <>
                    <span className="trip-id">{trip.id}</span>
                    <span className="trip-title">{trip.title}</span>
                    <span className="trip-date">{trip.startTrip}</span>
                    <span className="trip-date">{trip.endTrip}</span>
                    <span className="trip-actions">
                        <form onSubmit={(e) => { e.preventDefault(); onDeleteTrip(trip.id); }}>
                            <button type="submit" className="delete-btn">🗑️</button>
                        </form>
                        <button onClick={handleEditClick} className="edit-btn">Edit</button>
                    </span>
                </>
            )}
        </div>
    );
};

export default Trip;
