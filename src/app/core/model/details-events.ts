export interface DetailsEvents {
  event: {
    id: string;
    title: string;
    subtitle: string;
    image: string;
  };
  sessions: {
    date: string;
    availability: string;
  }[];
}
