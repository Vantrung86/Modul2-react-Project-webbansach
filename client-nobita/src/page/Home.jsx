import React, { useEffect } from 'react'
import Header from '../components/Header/Header'
import Carousels from '../components/Main/CarouselPage'
import NewBook from '../components/Main/NewBook'
import ReleaseBook from '../components/Main/ReleaseBook'
import BookSeller from '../components/Main/BookSeller'
import Category from '../components/Main/Category'
import Footer from '../components/Footer/Footer'

function Home() {
    // Cuộn lên đầu trang
    const onUpdate = () => {
      window.scrollTo(0, 0);
    };
    useEffect(() => {
      onUpdate();
    }, []);  
  return (
    <div>
        <Header />
        <Carousels />
        <NewBook />
        <ReleaseBook />
        <BookSeller />
        <Category />
        <Footer />
    </div>
  )
}

export default Home