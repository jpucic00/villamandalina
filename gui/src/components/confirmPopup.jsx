import React from "react";
import { useTranslation } from "react-i18next";
import "../assets/style/confirmPopup.css";

export default function ConfirmPopup({ message, onConfirm, onCancel }) {
  const { t } = useTranslation();

  return (
    <div className="confirmPopupOverlay" onClick={onCancel}>
      <div className="confirmPopupContent" onClick={(e) => e.stopPropagation()}>
        <p className="confirmPopupMessage">{message}</p>
        <div className="confirmPopupButtons">
          <button className="confirmPopupBtn confirmPopupCancel" onClick={onCancel}>
            {t("popup.cancel")}
          </button>
          <button className="confirmPopupBtn confirmPopupConfirm" onClick={onConfirm}>
            {t("popup.remove")}
          </button>
        </div>
      </div>
    </div>
  );
}
