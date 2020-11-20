import "../styles/tailwind.css";
import '../styles/globals.css'
import { useState } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import MainLayout from "../layouts/MainLayout";

function SplashScreen() {
  const controls = useAnimation();
  controls.start({
    scale: 1,
    transition: { duration: 1 }
  }).then(() => {
    setTimeout(() => {
      controls.start({
        scale: 0,
        transition: { duration: 0.5 },
      });
    }, 1000)
  })
  return (
    <div className="bg-light flex h-screen">
      <motion.div initial={{ scale: 0 }} animate={controls}  className="m-auto tracking-widest bg-primary p-4 rounded-xl">
        <div className="text-secondary font-bold text-6xl">Diner</div>
        <div className="text-secondary font-bold text-6xl ml-10 mt-1">
          Direct
        </div>
      </motion.div>
    </div>
  );
}

function MyApp({ Component, pageProps, router }) {
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  // setTimeout(() => {
  //   setShowSplashScreen(false)
  //   console.log('showSplashScreen', showSplashScreen);
  // }, 3000)
  return (
    <MainLayout>
      {/* <AnimatePresence exitBeforeEnter> */}
        {showSplashScreen ? (
          <SplashScreen />
        ) : (
          <Component {...pageProps} key={router.route} />
        )}
      {/* </AnimatePresence> */}
    </MainLayout>
  );
}

export default MyApp
