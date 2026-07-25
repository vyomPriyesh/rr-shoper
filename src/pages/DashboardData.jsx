import React from 'react'
import { FaUser } from 'react-icons/fa'
import { IoBagCheck, IoTicketSharp } from 'react-icons/io5'
import { NavLink, Outlet, Route, Router, Routes } from 'react-router-dom'
import MyProfile from './dashboard/MyProfile'
import MyService from './dashboard/MyService'
import { MdOutlineDashboard } from 'react-icons/md'
import DashboardPage from './dashboard/DashboardPage'
import Tickets from './dashboard/Tickets'
import AddTickets from './dashboard/tickets/AddTickets'


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
        <div className='container mx-auto md:p-5 p-3'>
            <div className="flex md:flex-row flex-col gap-5">
                <div className="md:w-1/4 w-full rounded-lg border dashboard-menu border-primary md:p-5 px-2 py-1 flex md:flex-col flex-row text-nowrap md:overflow-visible overflow-scroll gap-2">
                    {links.map((list, index) => (
                        <NavLink
                            to={"/" + list.to}
                            key={index}
                            end={list.to === "dashboard"}
                            className={({ isActive }) => {
                                return `${isActive ? 'bg-primary font-semibold text-white' : 'md:hover:bg-primary md:hover:text-white'} flex flex-row items-center md:gap-3 gap-2 rounded-md px-3 py-2 transition duration-300 ease-in-out`
                            }}
                        >
                            <list.icon className="md:text-xl text-sm" />
                            <span className="text-sm font-medium">{list.name}</span>
                        </NavLink>
                    ))}
                </div>
                <div className="md:w-3/4 w-full rounded-lg md:border md:border-primary md:p-5">
                    <Routes>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/my-profile" element={<MyProfile />} />
                        <Route path="/my-service" element={<MyService />} />
                        <Route path="/tickets" element={<Tickets />} />
                        <Route path="/tickets/add-ticket" element={<AddTickets />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default DashboardData
