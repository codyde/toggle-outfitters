import Image from "next/image";
import Inventory from "@/components/inventory";
import styles from "@/styles/Home.module.css";
import { Button } from "./ui/button";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { once } from "events";
import { useFlags } from "launchdarkly-react-client-sdk";

const StoreContent = () => {
  const { headerConfig } = useFlags();

  const [headerColor, setHeaderColor] = useState("from-blue-500 to-green-500");

  useEffect(() => {
    switch(headerConfig) {
      case 'blue':
        setHeaderColor('from-blue-500 to-green-500');
        break;
      case 'orange':
        setHeaderColor('from-orange-500 to-red-500');
        break;
      case 'purple':
        setHeaderColor('from-purple-500 to-blue-500');
        break;
      default:
        console.log('Invalid color');
    }
    // handleHeaderColor();
  }, [headerConfig]);

  async function handleHeaderColor() {
    console.log("Updating header color to: " + headerConfig)
    await setHeaderColor(headerConfig);
    return headerColor
  }

  const handleScroll = (e: any) => {
    console.log("going");
    e.preventDefault();
    const href = "store";
    const elem = document.getElementById(href);
    console.log(elem);
    elem?.scrollIntoView({ behavior: "smooth" });
  };

  const ref = useRef(null);
  const isInView = useInView(ref);

  const maincontrols = useAnimation();

  useEffect(() => {
    console.log(isInView);
    if (isInView) {
      maincontrols.start("visible");
    }
  }, [isInView]);


  return (
    <main className={`${styles.main} bg-ldgray relative`}>
      <div className={`absolute top-0 left-0 w-full h-1/6 bg-gradient-to-br ${headerColor} rounded-md filter blur-3xl opacity-30 z-0`}></div>
      <div
        className={cn(
          "flex text-3xl w-full md:text-6xl lg:text-7xl font-sans text-yellow-500 mx-auto place-items-center place-content-center animate-fade-in z-10",
          fontSans.variable
        )}
      >
        <motion.div
          ref={ref}
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={maincontrols}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex justify-between items-center mx-2 lg:mx-12 2xl:mx-64 mt-24 "
        >
          <div className="w-full md:w-1/2">
            <p className={`text-lg md:text-2xl lg:text-4xl ${styles.subhead}`}>
              The New
            </p>
            <p className={`grid mx-auto ${styles.outfitters}`}>
              Toggle Outfitters!
            </p>
            <p className="unset text-md md:text-xl lg:text-2xl font-sohne font-light text-gray-500 hidden md:block">
              Launched in 2023, Toggle Outfitters is an online retailer for all
              your random needs.
            </p>
            <div className="w-1/2">
              <Button
                variant={"enterstore"}
                size={"lg"}
                onClick={(e) => {
                  handleScroll(e);
                }}
                className="hidden md:block text-2xl mt-8"
              >
                Enter Store
              </Button>
            </div>
          </div>
          <div className="justify-end hidden md:block">
            <img src="/Toggle-5.png" className="" />
          </div>
        </motion.div>
      </div>

      <div id="store" className={`mb-24 ${styles.center}`}>
        <Inventory />
      </div>
    </main>
  );
};

export default StoreContent;
