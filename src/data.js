
import cafeImg from "@/assets/cafe.jpeg";
import eventImg from "@/assets/event.jpg";
import shopImg from "@/assets/shop.jpg";
import parkImg from "@/assets/park.jpg";

export const spots = [
  {
    id: 1,
    title: "Park Café",
    description: "Gemütliches Café mitten im Stadtpark. Perfekt zum Lernen oder Freunde treffen.",
    category: "cafe",
    address: "Am Stadtgarten 5, Konstanz",
    image: cafeImg
  },
  {
    id: 2,
    title: "Eventhalle Konstanz",
    description: "Hier finden regelmäßig Konzerte, Theateraufführungen und Partys statt.",
    category: "event",
    address: "Benediktinerplatz 12, Konstanz",
    image: eventImg
  },
  {
    id: 3,
    title: "Seerhein Shopping",
    description: "Ein modernes Einkaufszentrum mit Restaurants und Second-Hand-Stores.",
    category: "shopping",
    address: "Theodor-Heuss-Straße 22, Konstanz",
    image: shopImg
  },
  {
    id: 4,
    title: "Stadtpark Konstanz",
    description: "Großer Park direkt am Wasser. Ideal zum Entspannen, Joggen und Picknicken.",
    category: "park",
    address: "Spanierstraße 1, Konstanz",
    image: parkImg
  }
];
