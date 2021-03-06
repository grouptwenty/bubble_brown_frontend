import React from 'react';

const Branch = React.lazy(() => import('./views/Branch'));
const Order = React.lazy(() => import('./views/Order'));
const Booking = React.lazy(() => import('./views/Booking'));
const Promotion = React.lazy(() => import('./views/Promotion'));
const Profile = React.lazy(() => import('./views/Profile'));
const Login = React.lazy(() => import('./views/Login'));
const HistoryBook = React.lazy(() => import('./views/HistoryBook'));
// const Laundry = React.lazy(() => import('./views/Laundry'));
// const Repair = React.lazy(() => import('./views/Repair'));
// const News = React.lazy(() => import('./views/News'));
// const Contact = React.lazy(() => import('./views/Contact'));
// const About = React.lazy(() => import('./views/About'));
// const Instruction = React.lazy(() => import('./views/Instruction'));
// const WashingMachine = React.lazy(() => import('./views/WashingMachine'))
// const MachineBrand = React.lazy(() => import('./views/WashingMachinemanage/MachineBrand'))
// const MachineGeneration = React.lazy(() => import('./views/WashingMachinemanage/MachineGeneration'))
// const MachineProgram = React.lazy(() => import('./views/WashingMachinemanage/MachineProgram'))
// const MachineType = React.lazy(() => import('./views/WashingMachinemanage/MachineType'))
// const Setting = React.lazy(() => import('./views/Setting'))
// const Agreement = React.lazy(() => import('./views/Agreement'))
// const Report = React.lazy(() => import('./views/Report'))
// const License = React.lazy(() => import('./views/License'))



const routes = [
    { path: '/branch/', name: 'Branch', component: Branch },
    { path: '/order/', name: 'Order', component: Order },
    { path: '/booking/', name: 'Booking', component: Booking },
    { path: '/promotion/', name: 'Promotion', component: Promotion },
    { path: '/profile/', name: 'Profile', component: Profile },
    { path: '/login_customer/', name: 'Login', component: Login },
    { path: '/bookhistory/', name: 'HistoryBook', component: HistoryBook },
    // { path: '/laundry/', name: 'Laundry', component: Laundry },
    // { path: '/repair/', name: 'Repair', component: Repair },
    // { path: '/news/', name: 'News', component: News },
    // { path: '/contact/', name: 'Contact', component: Contact },
    // { path: '/about/', name: 'About', component: About },
    // { path: '/instruction/', name: 'Instruction', component: Instruction },
    // { path: '/washing-machine/', name: 'WashingMachine', component: WashingMachine },
    // { path: '/machine-manage/machine-brand/', name: 'MachineBrand', component: MachineBrand },
    // { path: '/machine-manage/machine-generation/', name: 'MachineGeneration', component: MachineGeneration },
    // { path: '/machine-manage/machine-program/', name: 'MachineProgram', component: MachineProgram },
    // { path: '/machine-manage/machine-type/', name: 'MachineType', component: MachineType },
    // { path: '/agreement/', name: 'Agreement', component: Agreement },
    // { path: '/license/', name: 'License', component: License },
    // { path: '/report/', name: 'Report', component: Report },
    // { path: '/setting/', name: 'Setting', component: Setting },
]
export default routes;