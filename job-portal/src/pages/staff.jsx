import React from 'react'
import ContactSection from '../Staff/ContactSection'
import StaffServices from '../Staff/StaffServices'
import TechStack from '../Staff/TechStack'
import Footer from "../Home/Footer"
import StaffAugmentation from '../Staff/StaffAugmentation'


const staff = () => {
  return (
    <>
    <ContactSection/>
    <StaffServices/>
    <TechStack/>
    <StaffAugmentation/>
    <Footer/>
    </>
  )
}

export default staff