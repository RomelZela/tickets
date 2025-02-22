export interface Evento {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  place: string;
  startDate: string | Date;
  endDate: string | Date;
  description: string;
}
