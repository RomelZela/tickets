export class Dates {

  static convertStringToDate(date: string | Date): Date {
    if(typeof date === 'string') {
      return new Date(Number(date));
    } else {
      return date
    }
  }
}
