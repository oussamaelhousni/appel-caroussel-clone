import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";

const IMAGES = [
  "1.jpeg",
  "2.jpeg",
  "3.jpeg",
  "4.jpeg",
  "5.jpeg?k=1",
  "1.jpeg?k=1",
  "2.jpeg?k=1",
  "3.jpeg?k=1",
  "4.jpeg?k=1",
  "5.jpeg?k=1",

  "1.jpeg?s=1",
  "2.jpeg?s=1",
  "3.jpeg?s=1",
  "4.jpeg?s=1",
  "5.jpeg?s=1",
];

const fullAspectRatio = 3 / 2;
const collapsedAspectRatio = 1 / 3;
const variants = {
  initial: (direction: number) => ({
    x: -direction * 1000,
    delay: 0.5,
    opacity: 0.8,
  }),
  current: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction * 1000, opacity: 0 }),
};
function App() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  return (
    <div className="w-screen h-screen bg-zinc-950 pt-8 overflow-x-hidden">
      <div className="w-full h-full max-w-4xl mx-auto px-4">
        <div className="w-full aspect-video relative rounded overflow-hidden border border-white">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              custom={direction}
              variants={variants}
              initial="initial"
              animate="current"
              exit="exit"
              transition={{ type: "spring", duration: 1, bounce: 0.1 }}
              key={IMAGES[index]}
              src={IMAGES[index]}
              alt={IMAGES[index]}
              className="w-full h-full object-cover absolute top-0 left-0"
            />
          </AnimatePresence>

          <button
            className="absolute top-1/2 left-4 opacity-80 hover:opacity-100 transition-opacity duration-300 bg-white w-8 h-8 rounded-full flex justify-center items-center"
            onClick={() => {
              setIndex(
                (index) => (IMAGES.length + (index - 1)) % IMAGES.length
              );
              setDirection(-1);
            }}
          >
            <IoIosArrowBack size={18} />
          </button>

          <button
            className="absolute top-1/2 right-4 opacity-80 hover:opacity-100 transition-opacity duration-300 bg-white w-8 h-8 rounded-full flex justify-center items-center"
            onClick={() => {
              setIndex((index) => (index + 1) % IMAGES.length);
              setDirection(1);
            }}
          >
            <IoIosArrowForward />
          </button>
        </div>
        <div className="flex h-14 mt-8 inset-x-0  justify-center overflow-hidden">
          {
            <motion.div
              className="flex aspect-[3/2]"
              animate={{
                x: `-${
                  (index * 100 * collapsedAspectRatio) / fullAspectRatio
                }%`,
              }}
              transition={{ type: "spring", duration: 1, bounce: 0 }}
            >
              {IMAGES.map((image, i) => {
                return (
                  <motion.img
                    src={image}
                    key={image}
                    className={`h-full object-cover aspect-[3/2] cursor-pointer shrink-0`}
                    animate={{
                      marginLeft: i === index ? "12px" : 0,
                      marginRight: i === index ? "12px" : 0,
                      aspectRatio: i === index ? "3 / 2" : "1 / 3",
                    }}
                    onClick={() => setIndex(i)}
                    transition={{ bounce: 0 }}
                  />
                );
              })}
            </motion.div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
