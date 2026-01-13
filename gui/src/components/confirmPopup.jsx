import React from "react";
import "../assets/style/confirmPopup.css";

export default function ConfirmPopup({ message, onConfirm, onCancel }) {
  return (
    <div className="confirmPopupOverlay" onClick={onCancel}>
      <div className="confirmPopupContent" onClick={(e) => e.stopPropagation()}>
        <p className="confirmPopupMessage">{message}</p>
        <div className="confirmPopupButtons">
          <button className="confirmPopupBtn confirmPopupCancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirmPopupBtn confirmPopupConfirm" onClick={onConfirm}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
