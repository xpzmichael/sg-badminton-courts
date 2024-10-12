export interface Court {
    id: number;
    name: string;
    location: string;
    pricePeak: number;
    priceNonPeak: number;
    bookingLink: string;
    img: string;
    position: [number, number];
}


export class EmptyCourt implements Court {
  id = 0;
  name = 'No court selected';
  location = 'N/A';
  pricePeak = 0;
  priceNonPeak = 0;
  bookingLink = '#';
  img = '';
  position: [number, number] = [0, 0];
}
  