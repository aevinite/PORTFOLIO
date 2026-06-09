import {
  getCountries,
  getCountryCallingCode,
  type CountryCode,
} from "libphonenumber-js";

// Web3Forms access key — PUBLIC by design (client-side), safe to commit.
// Submissions are emailed to the address this key is registered to.
// Both the contact page and the "Start a Project" modal share this one key.
export const WEB3FORMS_ACCESS_KEY = "abb7fb0c-1997-4cd7-bd4a-a2784c9589a7";

export const DEFAULT_COUNTRY: CountryCode = "IN";

export type Country = { code: CountryCode; name: string; dial: string };

// Country list with human names (from the built-in Intl.DisplayNames — no extra
// dependency) + dial codes, sorted alphabetically.
const regionNames =
  typeof Intl !== "undefined" && "DisplayNames" in Intl
    ? new Intl.DisplayNames(["en"], { type: "region" })
    : null;

export const COUNTRIES: Country[] = getCountries()
  .map((code) => ({
    code,
    name: regionNames?.of(code) ?? code,
    dial: getCountryCallingCode(code),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export function dialCode(country: CountryCode): string {
  try {
    return getCountryCallingCode(country);
  } catch {
    return "";
  }
}

// Turn an ISO country code ("IN") into its flag emoji ("🇮🇳").
export function flagEmoji(code: string): string {
  return code
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}

// NOTE: we intentionally do NOT verify email format / phone length right now —
// data is taken as given. The country selector is purely for a professional
// feel and to capture the number with its dial code.

// POSTs to Web3Forms. `fields` become the structured rows of the email.
export async function submitToWeb3Forms(
  fields: Record<string, string>
): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, ...fields }),
    });
    const data = await res.json();
    return { success: !!data.success, message: data.message || "" };
  } catch {
    return { success: false, message: "Network error. Please check your connection." };
  }
}
