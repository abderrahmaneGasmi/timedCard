import React, { useEffect, useState } from "react";
import "./App.scss";
import { motion } from "framer-motion";
interface CardProps {
  title: string;
  description: string;
  image: string;
  location: string;
}
const animate = 10;
const cards: CardProps[] = [
  {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
    image: "/cards (1).jpg",
    location: "Tarifa - Spain",
    title: "LOS LANCES BEACH",
  },
  {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
    image: "/cards (2).jpg",
    location: "Tarifa - Spain",
    title: "LOS LANCES BEACH",
  },
  {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
    image: "/cards (3).jpg",
    location: "Tarifa - Spain",
    title: "LOS LANCES BEACH",
  },
  {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
    image: "/cards (4).jpg",
    location: "Tarifa - Spain",
    title: "LOS LANCES BEACH",
  },
  {
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/cards (5).jpg",
    location: "Tarifa - Spain",
    title: "LOS LANCES BEACH",
  },
];
function App() {
  const [selectedcard, setselectedcard] = useState(cards[0]);
  const [oldcard, setoldcard] = useState<CardProps | null>(null);
  const [selectedidx, setSelectedidx] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedidx < cards.length - 1) {
        setSelectedidx(selectedidx + 1);
        setselectedcard(cards[selectedidx + 1]);
      } else {
        setSelectedidx(0);
        setselectedcard(cards[0]);
      }
      setoldcard(cards[selectedidx]);
    }, 2500);
    return () => {
      clearInterval(interval);
    };
  }, [selectedidx]);
  const mainref = React.useRef<HTMLDivElement>(null);
  function calcWidth(co: number) {
    if (co === selectedidx) {
      return window.innerWidth / 2;
    } else {
      if (co < selectedidx) {
        return window.innerWidth / 2 + 240 * (cards.length - selectedidx + co);
      } else {
        return window.innerWidth / 2 + 240 * (co - selectedidx);
      }
    }
  }
  return (
    <div
      className="main"
      ref={mainref}
      // onClick={(e) => {
      //   const rect = mainref.current?.getBoundingClientRect();
      //   const x = e.clientX - (rect?.left || 0);
      //   const y = e.clientY - (rect?.top || 0);
      //   console.log(x, y);
      // }}
    >
      <div></div>
      <div className="container">
        <div className="container-info">
          <div className="container-info-location">Tarifa - Spain</div>
          <div className="container-info-title">LOS LANCES BEACH</div>
          <div className="container-info-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            euismod bibendum laoreet. Proin gravida dolor sit amet lacus
            accumsan et viverra justo commodo. Proin sodales pulvinar tempor.
            Cum sociis natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra
            vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget
            odio.
          </div>
        </div>
        {/* <div className="container-cards"> */}

        {/* </div> */}
      </div>
      {cards.map((card, i) => {
        if (selectedidx === i) {
          return (
            <>
              {
                <motion.div
                  className="card"
                  initial={{
                    x: calcWidth(i + 1),
                    y: "136%",
                    opacity: 1,
                  }}
                  animate={{
                    x: calcWidth(i),
                    y: "136%",
                  }}
                  transition={{
                    duration: 1,
                    opacity: 0,
                  }}
                >
                  <div className="card-image">
                    <img src={card.image} alt="beach" />
                  </div>
                  <div className="card-info">
                    <div className="card-info-location">{card.location}</div>
                    <div className="card-info-title">{card.title}</div>
                  </div>
                </motion.div>
              }

              <motion.div
                initial={{
                  x: calcWidth(i),
                  y: "136%",
                  height: "30rem",
                  width: "220px",
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  y: 0,

                  height: "100%",
                  width: "100%",
                  zIndex: -1,
                  opacity: 1,
                }}
                transition={{
                  duration: 1,
                  delay: 1,

                  ease: "easeInOut",
                }}
                className="card tsea"
              >
                <div className="card-image">
                  <img src={selectedcard.image} alt="beach" />
                </div>
              </motion.div>
            </>
          );
        }

        return (
          <motion.div
            className="card"
            initial={{
              x: calcWidth(i + 1),
              y: "136%",
            }}
            animate={{
              x: calcWidth(i),
              y: "136%",
            }}
            transition={{
              duration: 1,
            }}
          >
            <div className="card-image">
              <img src={card.image} alt="beach" />
            </div>
            <div className="card-info">
              <div className="card-info-location">{card.location}</div>
              <div className="card-info-title">{card.title}</div>
            </div>
          </motion.div>
        );
      })}
      {oldcard && (
        <div className="main-image">
          <img src={oldcard.image} alt="beach" />
        </div>
      )}
    </div>
  );
}

export default App;
