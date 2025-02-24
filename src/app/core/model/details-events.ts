export interface Session {
  date: string | Date;
  availability: string | number;
  cart: number | undefined
}

export interface DetailsEvents {
  event: {
    id: string;
    title: string;
    subtitle: string;
    image: string;
  };
  sessions: Session[];
}
