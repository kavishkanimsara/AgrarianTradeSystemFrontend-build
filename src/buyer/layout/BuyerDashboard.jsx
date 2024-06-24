import { Configurator, DashboardNavbar, Sidenav,} from '@/widgets/layout'
import React from 'react'
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import Routing from '../route/Routing';
import { SideBar } from '../components/SideBar';
const BuyerDashboard = () => {
    const [controller, dispatch] = useMaterialTailwindController();
    const { sidenavType } = controller;
 
    return (
    <div className='min-h-screen bg-blue-gray-50/50'>
        <SideBar/>
        <div className='p-4 xl:ml-80'>
             <DashboardNavbar/>
             <Configurator/>
        <Routing/>
        </div>
    </div>
  )
}
BuyerDashboard.displayName="src/buyer/BuyerDashboard.jsx";
export default BuyerDashboard;