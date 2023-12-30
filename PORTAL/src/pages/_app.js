import '@/styles/globals.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useContext, createContext, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/Components/Navbar';
import Head from 'next/head';


export const parentStore = createContext(null)


export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [parentState, setParentState ] = useState(null)

  // Mounting State From Session Storage To Context
  useEffect(() => {
    let data = sessionStorage.getItem('data')
    if (data !== null) {
      data = JSON.parse(data)
      setParentState(data)
    }
  }, [])

  // Private Route Logic
  useEffect(() => {
    if(router.pathname.startsWith('/admin') && !sessionStorage.getItem('data')) router.push('/admin/login')
  }, [router.pathname])

  return (
    <div>
      <Head > <title>Dhanus Registration </title>  </Head>
      <parentStore.Provider value={{parentState,setParentState}}>
        <ToastContainer theme='dark' position="top-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHovertheme="dark" />
        <Navbar />
        <Component {...pageProps} />
      </parentStore.Provider>
    </div>
  )
}
