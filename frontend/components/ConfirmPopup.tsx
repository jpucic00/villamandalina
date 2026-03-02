"use client";

import { useTranslations } from "next-intl";

interface Props {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmPopup({ message, onConfirm, onCancel }: Props) {
  const t = useTranslations();

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
