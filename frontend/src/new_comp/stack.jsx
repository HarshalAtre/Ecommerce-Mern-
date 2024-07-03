import { useState } from "react";
import {
    motion,
    useMotionValue,
    useTransform,
    AnimatePresence
} from "framer-motion";

function Card(props) {
    const [exitX, setExitX] = useState(0);

    const x = useMotionValue(0);
    const scale = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);
    const rotate = useTransform(x, [-150, 0, 150], [-45, 0, 45], {
        clamp: false
    });

    const variantsFrontCard = {
        animate: { scale: 1, y: 0, opacity: 1 },
        exit: (custom) => ({
            x: custom,
            opacity: 0,
            scale: 0.5,
            transition: { duration: 0.2 }
        })
    };
    const variantsBackCard = {
        initial: { scale: 0, y: 105, opacity: 0 },
        animate: { scale: 0.75, y: 30, opacity: 0.5 }
    };

    function handleDragEnd(_, info) {
        if (info.offset.x < -100) {
            setExitX(-250);
            props.setIndex(props.index + 1);
        }
        if (info.offset.x > 100) {
            setExitX(250);
            props.setIndex(props.index + 1);
        }
    }

    return (
        <motion.div
            style={{
                width: "17vmax",
                height: "18vmax",
                position: "absolute",
                top: 0,
                x,
                rotate,
                cursor: "grab"
            }}
            whileTap={{ cursor: "grabbing" }}
            // Dragging
            drag={props.drag}
            dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
            onDragEnd={handleDragEnd}
            // Animation
            variants={props.frontCard ? variantsFrontCard : variantsBackCard}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={exitX}
            transition={
                props.frontCard
                    ? { type: "spring", stiffness: 300, damping: 20 }
                    : { scale: { duration: 0.2 }, opacity: { duration: 0.4 } }
            }
        >
            <motion.div
                style={{
                    width: "17vmax",
                    height: "18vmax",
                    backgroundColor: "#fff",
                    borderRadius: 30,
                    scale,
                    overflow: "hidden",
                    pointerEvents: "none" // Ensure the image doesn't interfere with dragging
                }}
            >
                <img
                    src={props.image}
                    alt="Card Image"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        pointerEvents: "none" // Ensure the image doesn't interfere with dragging
                    }}
                />
            </motion.div>
        </motion.div>
    );
}
export function Stack() {
    const [index, setIndex] = useState(0);
    const images = [
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTwHGFf3u2gQQ3qnRoLaEQfAedADIHQfcFvioVHjXhpH4VINK0AFVjtZvEEVbLTdoLG1mo1oD0kFhn3nuwHd01MpbAz4nnUjxs5HrRFyPKstUIBTz4Dtceitj8&usqp=CAE",
        "https://www.khoslaonline.com/wp-content/uploads/2023/06/ONE-PLUS-NORD-CE-2-LITE-5G-BLUE-TIDE-6GB128GB.png",
        "https://www.khoslaonline.com/wp-content/uploads/2023/06/ONE-PLUS-NORD-CE-2-LITE-5G-BLUE-TIDE-6GB128GB.png",
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTwHGFf3u2gQQ3qnRoLaEQfAedADIHQfcFvioVHjXhpH4VINK0AFVjtZvEEVbLTdoLG1mo1oD0kFhn3nuwHd01MpbAz4nnUjxs5HrRFyPKstUIBTz4Dtceitj8&usqp=CAE"
    ];
    return (
       <motion.div style={{ width: 150, height: 150, position: "relative" }}>
            <AnimatePresence initial={false}>
                <Card
                    key={index + 1}
                    frontCard={false}
                    image={images[(index + 1) % images.length]}
                />
                <Card
                    key={index}
                    frontCard={true}
                    index={index}
                    setIndex={setIndex}
                    drag="x"
                    image={images[index % images.length]}
                />
            </AnimatePresence>
        </motion.div>
    );
}
