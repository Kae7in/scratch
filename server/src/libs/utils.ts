import dotenv from "dotenv";
import { DateTime } from "luxon";

dotenv.config({ path: `.env` });

export const cookieName = (key: string) => {
  return `${process.env.COOKIE_DOMAIN ? "__Secure-" : ""}scratch.${key}`;
};

export const isValidUUID = (uuid: string) => {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
  return regexExp.test(uuid);
};

export const nextSundayEpochTimeS = ({
  fromDate = new Date(),
  forceFuture = false,
}: { fromDate?: Date; forceFuture?: boolean } = {}) => {
  if (forceFuture && fromDate < new Date()) {
    fromDate = new Date();
  }
  const nextSunday = new Date(
    fromDate.getFullYear(),
    fromDate.getMonth(),
    fromDate.getDate() + (7 - fromDate.getDay()),
    0,
    0,
    0,
    0
  );
  return nextSunday.getTime() / 1000;
};

export const nextMonthStartS = ({
  fromDate = new Date(),
  forceFuture = false,
}: { fromDate?: Date; forceFuture?: boolean } = {}) => {
  if (forceFuture && fromDate < new Date()) {
    fromDate = new Date();
  }

  const nextMonth = new Date(
    fromDate.getFullYear(),
    fromDate.getMonth() + 1,
    1,
    0,
    0,
    0,
    0
  );

  return nextMonth.getTime() / 1000;
};

export const currentMonthStartS = ({
  fromDate = new Date(),
  forceFuture = false,
}: { fromDate?: Date; forceFuture?: boolean } = {}) => {
  if (forceFuture && fromDate < new Date()) {
    fromDate = new Date();
  }

  const nextMonth = new Date(
    fromDate.getFullYear(),
    fromDate.getMonth(),
    1,
    0,
    0,
    0,
    0
  );

  return nextMonth.getTime() / 1000;
};

export const isValidEmail = (email: string) => {
  const r = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return r.test(email);
};

export function arrToString(arr: (string | null)[]) {
  const nonEmpty = arr.filter(Boolean);
  if (nonEmpty.length === 1) return nonEmpty[0];
  const firsts = nonEmpty.slice(0, nonEmpty.length - 1);
  const last = nonEmpty[nonEmpty.length - 1];
  return firsts.join(", ") + " and " + last;
}

export function formatDateWithTz(dt: Date | null, tz?: string) {
  if (dt) {
    const timezone = tz ?? "America/Los_Angeles";
    const dateObj = DateTime.fromJSDate(dt, { zone: "utc" }).setZone(timezone);

    const datePartStr = dateObj.toLocaleString({
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    const timePartStr = dateObj.toLocaleString({
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    });

    return `${datePartStr} at ${timePartStr}`;
  }
  return "";
}

export const inRange =
  (x: number, y: number) => (n: number | undefined | null) => {
    if (n === undefined || n === null) {
      return true;
    }
    return n >= x && n <= y;
  };

export function truncateWithEllipsis(
  str: string,
  n: number,
  useWordBoundary = false
) {
  if (str.length <= n) {
    return str;
  }
  const subString = str.slice(0, n - 1); // the original check
  return (
    (useWordBoundary
      ? subString.slice(0, subString.lastIndexOf(" "))
      : subString) + "&hellip;"
  );
}
