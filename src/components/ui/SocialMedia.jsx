import React from 'react'
import { Link } from 'react-router-dom'
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
} from 'react-icons/fa'

const SocialMedia = () => {

    const socialLinks = [
        {
            icon: <FaFacebookF />,
            path: '/',
        },
        {
            icon: <FaInstagram />,
            path: '/',
        },
        {
            icon: <FaLinkedinIn />,
            path: '/',
        },
        {
            icon: <FaYoutube />,
            path: '/',
        },
    ]

    // className="
    //                                 w-12 h-12 text-xl rounded-2xl bg-white
    //                                 flex items-center justify-center
    //                                 text-primary
    //                                 transition-all duration-300
    //                                 hover:bg-primary
    //                                 hover:text-white
    //                                 hover:-translate-y-1
    //                                 shadow-md
    //                             "

    return (
        socialLinks.map((item, index) => (
            <Link
                key={index}
                to={item.path}
                className="
                                        w-12 h-12 text-2xl rounded-2xl text-white
                                        flex items-center justify-center
                                        bg-primary
                                        transition-all duration-300
                                        hover:text-primary
                                        hover:bg-white
                                        hover:-translate-y-1
                                        hover:shadow-xl
                                        border border-transparent
                                        hover:border-primary
                                    "
            >
                {item.icon}
            </Link>
        ))
    )
}

export default SocialMedia
