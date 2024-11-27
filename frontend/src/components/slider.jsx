// import "../css/Barber.css";
// import { useState, useEffect, React } from "react";
import Photo1 from "../css/1.png";

import Photo2 from "../css/2.png";
import Photo3 from "../css/3.png";
import Photo4 from "../css/4.png";
//  const photos = [Photo1, Photo2, Photo3, Photo4];
// export default function Slider() {
//   return (
//     <div>
//       <img src={one}></img>
//     </div>
//   );
// }
import { ImageSlider } from "./sliderEle.jsx";

const IMAGES = [
  {
    ph: Photo1,
    name: "Matt",
    story:
      "Mat Barber is a well-known figure in Lublin, Poland, recognized for his skills and contributions to the local community as a barber. His barbershop has become a staple in the city, attracting clients from various backgrounds and providing high-quality grooming services.",
  },
  {
    ph: Photo2,
    name: "Karol",
    story:
      "Karol Barber, originally from Barcelona, had always dreamed of leaving a lasting legacy in the world of barbering. After years of honing his craft, he decided to move to Lublin, Poland, hoping to share his unique approach to the trade. In Lublin, Karol opened a new barbershop, blending his Spanish style with Polish tradition. His attention to detail and friendly demeanor quickly earned him a loyal clientele. People came not just for the cuts, but for the stories, the atmosphere, and the passion Karol brought to his work.",
  },
  {
    ph: Photo3,
    name: "Dawid",
    story:
      "Dawid Barber was born and raised in the small village of Cycyów, nestled in the Lubelszczyzna region of Poland. Life in a quiet village was simple, but for Dawid, it was filled with love—for his dog, his best friend and constant companion. His dog was always by his side, whether he was working the fields or dreaming of bigger things. But there was another love in Dawid’s life: barbering. Ever since he was a young boy, he had been fascinated by the art of cutting hair. He would watch barbers in nearby towns, mesmerized by the precision and care they took in their craft. It wasn’t just a job for him—it was a passion. As he grew older, Dawid decided to pursue his dream. He moved to the city, enrolled in a barbering school, and soon opened his own shop. While his dog couldn’t follow him to the city, he knew his loyal companion was waiting for him back home, recognized for his skills and contributions to the local community as a barber. His barbershop has become a staple in the city, attracting clients from various backgrounds and providing high-quality grooming services.",
  },
  {
    ph: Photo4,
    name: "Gerard",
    story:
      "Gerarf was born in the heart of Africa, where the sun painted the sky in vibrant hues and the rhythms of the land could be felt in every heartbeat. He grew up in a small town, where he quickly developed two passions that would define his life: creating unique hairstyles and riding his bike. From a young age, Gerarf was captivated by the art of hairdressing. He loved experimenting with different styles, blending traditional African techniques with modern trends. His creativity flowed like the winds that danced through the savannah, and soon, people from all over his village sought him out for his distinct flair.",
  },
];

export default function App() {
  return (
    <div
      style={{
        width: "100%",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ImageSlider images={IMAGES} />
    </div>
  );
}
