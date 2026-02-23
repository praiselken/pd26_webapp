export type WeddingEvent = {
  id: "apr9" | "apr11";
  title: string;
  dateLabel: string;
  time: string;
  venue: string;
  address: string;
  mapUrl: string;
};

export type RSVPFormData = {
  fullName: string;
  email: string;
  attending: "APR_9" | "APR_11" | "BOTH";
  dietary?: string;
};