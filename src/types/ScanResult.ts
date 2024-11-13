export interface ScanResult {
  data: string;
  image: HTMLImageElement;
  width: number;
  height: number;
  format:
    | "Email"
    | "Contact"
    | "JSON"
    | "Phone"
    | "URL"
    | "WiFi"
    | "GeoLocation"
    | "Text"
    | "Other";
  timestamp: string;
}
