"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Calendar from "react-calendar";
import { useAuth } from "@/AuthContext";
import { toast } from "react-toastify";
import {
  getBookedDates,
  createBookedDate,
  deleteBookedDate,
  getPrices,
  createPrice,
  deletePrice,
} from "@/api";
import emailjs from "@emailjs/browser";
import ConfirmPopup from "./ConfirmPopup";
import useWindowDimensions from "@/util/useWindowDimensions";
import deviceCheck from "@/util/deviceCheck";

interface BookedDate {
  id: number;
  startDate: string;
  endDate: string;
}

interface Price {
  id: number;
  startDate: string;
  endDate: string;
  price: string;
}

export default function CalendarPage() {
  const { width } = useWindowDimensions();
  const { user, loading } = useAuth();
  const t = useTranslations();
  const locale = useLocale();

  const [checkIn, setCheckIn] = useState<string>();
  const [checkOut, setCheckOut] = useState<string>();
  const [calendarValue, setCalendarValue] = useState<[Date, Date] | null>(null);
  const [disabledDates, setDisabledDates] = useState<BookedDate[]>([]);
  const [prices, setPrices] = useState<Price[]>([]);
  const [blockToRemove, setBlockToRemove] = useState<BookedDate | null>(null);
  const [calendarKey, setCalendarKey] = useState(0);
  const [priceStartDate, setPriceStartDate] = useState("");
  const [priceEndDate, setPriceEndDate] = useState("");
  const [priceAmount, setPriceAmount] = useState("");

  useEffect(() => {
    fetchDisabledDates();
    fetchPrices();
  }, []);

  useEffect(() => {
    if (blockToRemove) {
      setCalendarValue(null);
      setCheckIn(undefined);
      setCheckOut(undefined);
      setCalendarKey((prev) => prev + 1);
    }
  }, [blockToRemove]);

  const fetchDisabledDates = async () => {
    try {
      const data = await getBookedDates();
      setDisabledDates(data);
    } catch {
      setDisabledDates([]);
      toast.error(t("toast.fetchDatesError"));
    }
  };

  const fetchPrices = async () => {
    try {
      const data = await getPrices();
      setPrices(data);
    } catch {
      setPrices([]);
      toast.error(t("toast.fetchPricesError"));
    }
  };

  const sortPrices = () =>
    [...prices].sort((a, b) => a.startDate.localeCompare(b.startDate));

  const ddmmToMmdd = (ddmm: string) => {
    if (!ddmm || !ddmm.includes(".")) return ddmm;
    const [day, month] = ddmm.split(".");
    return `${month}-${day}`;
  };

  const mmddToDdmm = (mmdd: string) => {
    if (!mmdd || !mmdd.includes("-")) return mmdd;
    const [month, day] = mmdd.split("-");
    return `${day}.${month}`;
  };

  const formatDate = (e: Date) => {
    const offset = e.getTimezoneOffset();
    const date = new Date(e.getTime() - offset * 60 * 1000);
    return date.toISOString().split("T")[0];
  };

  const getTs = (date: Date) =>
    Math.floor(new Date(date.toLocaleDateString("en")).getTime() / 1000);

  const getBlockForDate = (date: Date) => {
    const ts = getTs(date);
    return disabledDates.find((d) => {
      const start = getTs(new Date(d.startDate));
      const end = getTs(new Date(d.endDate));
      return ts > start && ts < end;
    });
  };

  const isDateBlocked = (date: Date) => !!getBlockForDate(date);

  const getDateBoundaryType = (date: Date) => {
    const ts = getTs(date);
    let startFromId: number | null = null;
    let endFromId: number | null = null;
    disabledDates.forEach((d) => {
      const start = getTs(new Date(d.startDate));
      const end = getTs(new Date(d.endDate));
      if (ts === start) startFromId = d.id;
      if (ts === end) endFromId = d.id;
    });
    const isStart = startFromId !== null;
    const isEnd = endFromId !== null;
    const isFullyBooked = isStart && isEnd && startFromId !== endFromId;
    return { isStart, isEnd, isFullyBooked };
  };

  const getBlockIncludingBoundaries = (date: Date) => {
    const ts = getTs(date);
    return disabledDates.find((d) => {
      const start = getTs(new Date(d.startDate));
      const end = getTs(new Date(d.endDate));
      return ts >= start && ts <= end;
    });
  };

  const onClickDay = (date: Date) => {
    if (!user) return;
    const { isStart, isEnd, isFullyBooked } = getDateBoundaryType(date);
    const isBlocked = isDateBlocked(date);
    if (isBlocked || isFullyBooked) {
      const block = getBlockIncludingBoundaries(date);
      if (block) setBlockToRemove(block);
      return;
    }
    if (isStart || isEnd) {
      const block = getBlockIncludingBoundaries(date);
      if (block) {
        const startDate = new Date(block.startDate);
        const endDate = new Date(block.endDate);
        const daysDiff = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        if (daysDiff === 1) setBlockToRemove(block);
      }
    }
  };

  const confirmRemoveBlock = () => {
    if (blockToRemove) {
      removeBlock(blockToRemove);
      setBlockToRemove(null);
    }
  };

  const handleCalendarChange = (value: unknown) => {
    if (Array.isArray(value) && value.length === 2) {
      setCalendarValue([value[0], value[1]]);
      setCheckIn(formatDate(value[0]));
      setCheckOut(formatDate(value[1]));
    }
  };

  const onCheckInSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckIn = new Date(e.target.value + "T00:00:00");
    const existingCheckOut = checkOut ? new Date(checkOut + "T00:00:00") : null;
    setCalendarValue(existingCheckOut ? [newCheckIn, existingCheckOut] : null);
    setCheckIn(e.target.value);
  };

  const onCheckOutSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const existingCheckIn = checkIn ? new Date(checkIn + "T00:00:00") : null;
    const newCheckOut = new Date(e.target.value + "T00:00:00");
    setCalendarValue(existingCheckIn ? [existingCheckIn, newCheckOut] : null);
    setCheckOut(e.target.value);
  };

  const submitBlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (checkIn && checkOut) {
      try {
        await createBookedDate(checkIn, checkOut);
        setCheckIn(undefined);
        setCheckOut(undefined);
        setCalendarValue(null);
        fetchDisabledDates();
        (document.getElementById("reservationForm") as HTMLFormElement)?.reset();
        toast.success(t("toast.blockAdded", { startDate: checkIn, endDate: checkOut }));
      } catch {
        toast.error(t("toast.blockError"));
      }
    }
  };

  const removeBlock = async (date: BookedDate) => {
    try {
      await deleteBookedDate(date.id);
      setCheckIn(undefined);
      setCheckOut(undefined);
      setCalendarValue(null);
      fetchDisabledDates();
      (document.getElementById("reservationForm") as HTMLFormElement)?.reset();
      toast.success(t("toast.blockRemoved"));
    } catch {
      toast.error(t("toast.blockRemoveError"));
    }
  };

  const submitPrice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (priceStartDate && priceEndDate && priceAmount) {
      try {
        await createPrice(ddmmToMmdd(priceStartDate), ddmmToMmdd(priceEndDate), priceAmount);
        setPriceStartDate("");
        setPriceEndDate("");
        setPriceAmount("");
        fetchPrices();
        toast.success(t("toast.priceAdded"));
      } catch {
        toast.error(t("toast.priceError"));
      }
    }
  };

  const removePrice = async (price: Price) => {
    try {
      await deletePrice(price.id);
      fetchPrices();
      toast.success(t("toast.priceRemoved"));
    } catch {
      toast.error(t("toast.priceRemoveError"));
    }
  };

  const SendEmail = (templateParams: Record<string, string>) =>
    new Promise<void>((resolve, reject) => {
      emailjs
        .send("service_s6zkdbo", "template_4rhgldh", templateParams, "TO7HNsppourbFcFDU")
        .then(() => {
          (document.getElementById("reservationForm") as HTMLFormElement)?.reset();
          setCheckIn(undefined);
          setCheckOut(undefined);
          setCalendarValue(null);
          resolve();
        })
        .catch(() => reject());
    });

  const submitReservation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const templateParams = {
      startDate: (form.elements[0] as HTMLInputElement).value,
      endDate: (form.elements[1] as HTMLInputElement).value,
      name: (form.elements[2] as HTMLInputElement).value,
      email: (form.elements[3] as HTMLInputElement).value,
      number: (form.elements[4] as HTMLInputElement).value,
      message: (form.elements[5] as HTMLTextAreaElement).value,
    };
    toast.promise(SendEmail(templateParams), {
      pending: t("toast.emailPending"),
      success: t("toast.emailSent"),
      error: t("toast.emailError"),
    });
  };

  const calendarLocale = locale === "hr" ? "hr" : "en";

  return (
    <>
      <div className={`CalendarElement__MainWrapper ${user ? "loggedIn" : ""} ${deviceCheck(width)}`}>
        <form
          id="reservationForm"
          onSubmit={user ? submitBlock : submitReservation}
          className="CalendarElement__FormWrapper"
        >
          {!loading && !user ? (
            <>
              <h1 className="calendarFormTitle">{t("calendar.title")}</h1>
              <p className="calendarFormDescription">{t("calendar.description")}</p>
              <label htmlFor="Check-In" className="TopMinusFive">{t("calendar.checkInDate")}</label>
              <input required onChange={onCheckInSelect} type="date" id="Check-In"
                min={formatDate(new Date())} max={checkOut} value={checkIn ?? ""}
                className="CalendarElement__Date_Input" />
              <label htmlFor="Check-Out" className="TopMinusFive">{t("calendar.checkOutDate")}</label>
              <input required type="date" onChange={onCheckOutSelect} value={checkOut ?? ""}
                min={checkIn ?? formatDate(new Date())} id="Check-Out"
                className="CalendarElement__Date_Input" />
              <label htmlFor="Name" className="TopMinusFive">{t("calendar.name")}</label>
              <input required type="text" id="Name" placeholder={t("calendar.namePlaceholder")}
                className="CalendarElement__Text_Input" />
              <label htmlFor="Email" className="TopMinusFive">{t("calendar.email")}</label>
              <input required type="email" id="Email" placeholder={t("calendar.emailPlaceholder")}
                className="CalendarElement__Text_Input" />
              <label htmlFor="ContactNumber" className="TopMinusFive">{t("calendar.contactNumber")}</label>
              <input required id="ContactNumber" className="CalendarElement__Text_Input"
                placeholder={t("calendar.phonePlaceholder")} />
              <label htmlFor="ContactTextArea" className="TopMinusFive">{t("calendar.message")}</label>
              <textarea required id="ContactTextArea" placeholder={t("calendar.messagePlaceholder")}
                className="calendarTextField" />
              <button type="submit" className="CalendarElement__MakeReservationButton calendarButton">
                {t("calendar.makeReservation")}
              </button>
            </>
          ) : (
            <>
              <label htmlFor="Check-In" className="TopMinusFive">{t("calendar.selectCheckInDate")}</label>
              <input required onChange={onCheckInSelect} type="date" id="Check-In"
                min={formatDate(new Date())} max={checkOut} value={checkIn ?? ""}
                className="CalendarElement__Date_Input" />
              <label htmlFor="Check-Out" className="TopMinusFive">{t("calendar.selectCheckOutDate")}</label>
              <input required onChange={onCheckOutSelect} type="date"
                min={checkIn ?? formatDate(new Date())} value={checkOut ?? ""} id="Check-Out"
                className="CalendarElement__Date_Input" />
              <button type="submit" className="CalendarElement__MakeReservationButton calendarButton">
                {t("calendar.block")}
              </button>
            </>
          )}
        </form>
        <Calendar
          key={calendarKey}
          maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
          returnValue="range"
          tileDisabled={({ date, view }) => {
            if (view !== "month") return false;
            if (user) return false;
            const { isFullyBooked } = getDateBoundaryType(date);
            if (isFullyBooked) return true;
            const ts = getTs(date);
            return disabledDates.some((d) => {
              const start = getTs(new Date(d.startDate));
              const end = getTs(new Date(d.endDate));
              return ts > start && ts < end;
            });
          }}
          tileClassName={({ date, view }) => {
            if (view !== "month") return null;
            const classes: string[] = [];
            const { isStart, isEnd, isFullyBooked } = getDateBoundaryType(date);
            const isBlocked = isDateBlocked(date);
            if (user) {
              if (isBlocked || isFullyBooked) classes.push("blocked-date-admin");
              else {
                if (isStart) classes.push("half-blocked-start-admin");
                if (isEnd) classes.push("half-blocked-end-admin");
              }
            }
            return classes.length > 0 ? classes.join(" ") : null;
          }}
          onClickDay={user ? onClickDay : undefined}
          selectRange={true}
          locale={calendarLocale}
          onChange={handleCalendarChange}
          value={calendarValue}
          minDate={new Date()}
          tileContent={({ date, view }) => {
            if (view !== "month") return null;
            const matchingPrice = prices.find((price) => {
              try {
                if (!price.startDate || !price.endDate) return false;
                const ts = getTs(date);
                const start = getTs(new Date(date.getFullYear() + "-" + price.startDate));
                const end = getTs(new Date(date.getFullYear() + "-" + price.endDate));
                return ts >= start && ts <= end;
              } catch {
                return false;
              }
            });
            return <p className="calendarPrice">{matchingPrice?.price || "-"}€</p>;
          }}
        />
      </div>

      {!loading && user && (
        <div className="priceManagementContainer">
          <h2 className="priceManagementTitle">{t("calendar.managePrices")}</h2>
          <form onSubmit={submitPrice} className="priceForm">
            <div className="priceFormRow">
              <label htmlFor="priceStartDate">{t("calendar.startDate")}</label>
              <input type="text" id="priceStartDate" placeholder="01.01" pattern="\d{2}\.\d{2}"
                value={priceStartDate} onChange={(e) => setPriceStartDate(e.target.value)}
                className="CalendarElement__Text_Input" required />
            </div>
            <div className="priceFormRow">
              <label htmlFor="priceEndDate">{t("calendar.endDate")}</label>
              <input type="text" id="priceEndDate" placeholder="31.01" pattern="\d{2}\.\d{2}"
                value={priceEndDate} onChange={(e) => setPriceEndDate(e.target.value)}
                className="CalendarElement__Text_Input" required />
            </div>
            <div className="priceFormRow">
              <label htmlFor="priceAmount">{t("calendar.pricePerNight")}</label>
              <input type="number" id="priceAmount" placeholder="99" value={priceAmount}
                onChange={(e) => setPriceAmount(e.target.value)}
                className="CalendarElement__Text_Input" required />
            </div>
            <button type="submit" className="CalendarElement__MakeReservationButton calendarButton">
              {t("calendar.addPrice")}
            </button>
          </form>
          <div className="pricesList">
            {sortPrices().map((price) => (
              <div className="priceItem" key={price.id}>
                <div className="priceDetails">
                  <span>{mmddToDdmm(price.startDate)}</span> - <span>{mmddToDdmm(price.endDate)}</span>:{" "}
                  <strong>{price.price}€</strong>{t("calendar.perNight")}
                </div>
                <button onClick={() => removePrice(price)} className="CalendarElement__BlockReservationButton">
                  {t("calendar.remove")}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {blockToRemove && (
        <ConfirmPopup
          message={t("popup.removeBlockMessage", {
            startDate: blockToRemove.startDate,
            endDate: blockToRemove.endDate,
          })}
          onConfirm={confirmRemoveBlock}
          onCancel={() => setBlockToRemove(null)}
        />
      )}
    </>
  );
}
