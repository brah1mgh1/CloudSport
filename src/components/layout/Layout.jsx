import { motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'

const mainVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } }
}

export default function Layout({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <motion.main
        style={{ flex: 1 }}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={mainVariants}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  )
}
