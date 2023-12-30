import React from 'react'
import RegistrationForm from '../../Components/RegistrationForm/index'
import logo from '../../../public/logo.png'

function register() {
    return (
        // <div style={{ marginTop: '50px', background: `url(${logo.src})`, backgroundPosition:'center' }} >
        <div style={{ marginTop: '50px',}} >
            <img className='register_topbar_img' src='/cek.png' />
            <RegistrationForm />
        </div>
    )
}

export default register