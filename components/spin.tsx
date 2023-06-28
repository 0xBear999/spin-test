'use client'
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { toast } from 'react-toast'
import {location as LocationIcon} from './icons';

interface Props {
  rolling: boolean
}
const Spin = ({rolling}: Props) => {
  const [spinning, setSpinning] = useState(false);
  const [animate, setAnimate] = useState("");
  const [pieBackground, setPieBackground] = useState("conic-gradient(rgb(242, 100, 112) 50.5618%, rgb(100, 183, 242) 0deg, rgb(100, 183, 242) 94.382%, rgb(100, 242, 211) 0deg, rgb(100, 242, 211) 100%);");
  const [winner, setWinner] = useState("");

  useEffect(() => {
    let random = Math.floor(Math.random() * 360)
    console.log(">> ", random)
    if (random<240 && random>120) {
      setWinner("User 1");
    } else if (random>=240) {
      setWinner("User 3");
    } else {
      setWinner("User 2");
    }
    let deg = 3600+random;
    
    const style = `
      @-webkit-keyframes wheel-spin-${deg} {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(${deg}deg); }
      }
    `;
    const styleElement = document.createElement("style");
    let styleSheet = null;

    document.head.appendChild(styleElement);

    styleSheet = styleElement.sheet;

    if (styleSheet) {
      styleSheet.insertRule(style, styleSheet.cssRules.length);
    }

    setAnimate(`wheel-spin-${deg}`);
    setSpinning(true);
  }, [rolling])
  
  return (
      <>
      <AspectRatio.Root
        ratio={1 / 1}
        className="
          flex aspect-square
          items-center justify-center rounded-full border-[3px] border-[#273A64] 
          border-opacity-60 bg-[#312F54] bg-opacity-70 shadow-lg"
      >
        <div className="relative flex h-[96.5%] w-[96.5%] rounded-full shadow-lg">
          <div className="absolute top-0 left-0 h-full w-full overflow-hidden rounded-full">
            <motion.div
              initial={false}
              style={{
                  background: "conic-gradient(rgb(242, 100, 112) 33.33%, rgb(100, 183, 242) 120deg, rgb(100, 183, 242) 66.66%, rgb(100, 242, 211) 240deg, rgb(100, 242, 211) 100%)",
                  animationName: animate,
                  animationDuration: "7s",
                  animationTimingFunction: "cubic-bezier(0.25, 0.01, 0.01, 0.98)",
                  animationFillMode: "forwards",
              }}
              onAnimationEnd={() => {
                  console.log("done animating");
                  setSpinning(false);
                  toast(winner +' Won! 👋');
              }}
              className={`absolute top-0 left-0 h-full w-full rounded-full`}
            >
              <div style={{ rotate: `${(360 * 33.33) / 100+60}deg`}} className={`absolute top-0 left-0 z-10 flex h-full w-full rounded-full`} >
                <div className="relative mx-auto h-1/2 w-0.5 bg-light text-center">
                  User1
                </div>
              </div>
              <div style={{ rotate: `${(360 * 66.66) / 100+60}deg`, }} className={`absolute top-0 left-0 z-10 flex h-full w-full rounded-full`} >
                <div className="relative mx-auto h-1/2 w-0.5 bg-light text-center">
                User2
                </div>
              </div>
              <div style={{ rotate: `${(360 * 100) / 100+60}deg`, }} className={`absolute top-0 left-0 z-10 flex h-full w-full rounded-full`} >
                <div className="relative mx-auto h-1/2 w-0.5 bg-light text-center">
                User3
                </div>
              </div>
            </motion.div>
            <div  style={{background: 'linear-gradient(270.18deg, rgb(255 255 255) 0.17%, rgb(255 255 255) 19.9%, rgb(255 255 255) 50.02%, rgb(255 255 255) 74.94%, rgb(255 255 255) 99.87%)', position: "absolute", width: "250px", height: "250px", zIndex:"20", top:"19px", left: "19px", borderRadius: "500px"}}>

            </div>
            
          </div>
        </div>
      </AspectRatio.Root>
      <div style={{position: "absolute", top: "-80px", left: "115px"}}>
          <LocationIcon />
        </div>
      </>
  )
}

export default Spin;