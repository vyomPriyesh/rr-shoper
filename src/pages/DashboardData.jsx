import React from 'react'
import { FaUser } from 'react-icons/fa'
import { IoBagCheck, IoTicketSharp } from 'react-icons/io5'
import { NavLink, Outlet, Route, Router, Routes } from 'react-router-dom'
import MyProfile from './dashboard/MyProfile'
import MyService from './dashboard/MyService'
import { MdOutlineDashboard } from 'react-icons/md'
import DashboardPage from './dashboard/DashboardPage'
import Tickets from './dashboard/Tickets'


const DashboardData = () => {

    const links = [
        {
            name: "Dashboard", to: "dashboard",
            icon: MdOutlineDashboard
        },
        {
            name: "My Profile", to: "dashboard/my-profile",
            icon: FaUser
        },
        {
            name: "My Service", to: "dashboard/my-service",
            icon: IoBagCheck
        },
        {
            name: "Tickets", to: "dashboard/tickets",
            icon: IoTicketSharp
        },
    ]

    return (
        <div className='container mx-auto p-5'>
            <div className="flex flex-row gap-5">
                <div className="w-1/4 rounded-lg border border-primary p-5 flex flex-col gap-2">
                    {/* <div className=""> */}
                    {links.map((list, index) => (
                        <NavLink
                            to={"/" + list.to}
                            key={index}
                            end={list.to === "dashboard"}
                            className={({ isActive }) => {
                                return `${isActive ? 'bg-primary font-semibold text-white' : 'hover:bg-primary hover:text-white'} flex flex-row gap-3 rounded-md px-3 py-2 transition duration-300 ease-in-out`
                            }}
                        >
                            <list.icon className="text-xl" />
                            <span className="text-sm font-medium">{list.name}</span>
                        </NavLink>
                    ))}
                    {/* </div> */}
                </div>
                <div className="w-3/4 rounded-lg border border-primary p-5">
                    <Routes>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/my-profile" element={<MyProfile />} />
                        <Route path="/my-service" element={<MyService />} />
                        <Route path="/tickets" element={<Tickets />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default DashboardData
