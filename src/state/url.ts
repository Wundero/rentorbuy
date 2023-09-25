import { atomWithStorage } from "jotai/utils";
import superjson from "superjson";

export const atomInQuery = <T>(key: string, initialValue: T) =>
  atomWithStorage(key, initialValue, {
    getItem(key, initialValue) {
      const params = new URLSearchParams(window.location.search);
      const value = params.get(key);
      return value ? superjson.parse<T>(value) : initialValue;
    },
    setItem(key, newValue) {
      const params = new URLSearchParams(window.location.search);
      params.set(key, superjson.stringify(newValue));
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState(null, "", newUrl);
    },
    removeItem(key) {
      const params = new URLSearchParams(window.location.search);
      params.delete(key);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState(null, "", newUrl);
    },
    subscribe(key, callback, initialValue) {
      const listener = () => {
        const params = new URLSearchParams(window.location.search);
        const value = params.get(key);
        callback(value ? superjson.parse<T>(value) : initialValue);
      };
      window.addEventListener("popstate", listener);
      return () => {
        window.removeEventListener("popstate", listener);
      };
    },
  });

const a = atomInQuery; // shorthand

// == Own properties ==

// Base value
export const propertyPrice = a("property", 1_000_000);

// Initial fees
export const downpayment = a("downpayment", 0.2);
export const initialFeesPercentage = a<Record<string, number>>(
  "initialFeesPercentage",
  {
    "Closing Costs": 0.015,
  },
);
export const initialFeesAbsolute = a<Record<string, number>>(
  "initialFeesAbsolute",
  {
    "Home Inspection": 300,
    "Legal Fees": 1000,
    "Title Insurance": 1000,
  },
);

export type ValueOrChangingValue =
  | number
  | {
      years: Record<number, number>;
    };

// Outstanding fees
export const mortgageInterest = a<ValueOrChangingValue>("interestRate", 0.065);
export const ongoingFeesPercentage = a<Record<string, ValueOrChangingValue>>(
  "ongoingFeesPercentage",
  {
    HOA: 0.0012,
    Maintenance: 0.01,
    "Property Tax": 0.02,
    Insurance: 0.01,
  },
);
export const ongoingFeesAbsolute = a<Record<string, ValueOrChangingValue>>(
  "ongoingFeesAbsolute",
  {},
);
export const appreciation = a<ValueOrChangingValue>("appreciation", 0.03);

// == Rent properties ==

// Base value
export const rent = a("rent", 1000);

// Ongoing fees
export const rentIncrease = a<ValueOrChangingValue>("rentIncrease", 0.02);
export const rentFeesPercentage = a<Record<string, ValueOrChangingValue>>(
  "rentFeesPercentage",
  {
    Insurance: 0.0025,
  },
);
export const rentFeesAbsolute = a<Record<string, ValueOrChangingValue>>(
  "rentFeesAbsolute",
  {},
);
export const investmentReturn = a<ValueOrChangingValue>(
  "investmentReturn",
  0.07,
);
