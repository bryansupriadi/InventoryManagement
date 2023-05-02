import monitorIcon from '../../Assets/monitor.png';
import mouseIcon from '../../Assets/mouse.png';
import printerIcon from '../../Assets/printer.png';
import keyboardIcon from '../../Assets/keyboard.png';
import cpuIcon from '../../Assets/cpu.png';
import fridgeIcon from '../../Assets/fridge.png';
import acIcon from '../../Assets/air-conditioner.png';
import sofaIcon from '../../Assets/sofa.png';
import chairIcon from '../../Assets/chair.png';
import tableIcon from '../../Assets/table.png';
import archIcon from '../../Assets/arch.png';


export const ComputerDevices = [
    {
        id: 1,
        icon : monitorIcon,
        name : 'Monitor',
        category: 'Computer Devices',
    },
    {
        id : 2,
        icon : mouseIcon,
        name : 'Mouse', 
        category: 'Computer Devices',
    },
    {
        id : 3,
        icon : printerIcon,
        name : 'Printer', 
        category: 'Computer Devices'
    },
    {
        id : 4,
        icon : keyboardIcon,
        name : 'Keyboard', 
        category: 'Computer Devices'
    },
    {
        id : 5,
        icon : cpuIcon,
        name : 'CPU', 
        category: 'Computer Devices'
    },
];


export const HouseholdAppliances = [
    {
        id: 1,
        icon : fridgeIcon,
        name: 'Fridge',
        category: 'Household Appliances'
    },
    {
        id: 2,
        icon : acIcon,
        name: 'AC',
        category: 'Household Appliances'
    },
];

export const Furniture = [
    {
        id: 1,
        icon : sofaIcon,
        name: 'Sofa',
        category: 'Furniture'
    },
    {
        id: 2,
        icon : chairIcon,
        name: 'Chair',
        category: 'Furniture'
    },
    {
        id: 3,
        icon : tableIcon,
        name: 'Table',
        category: 'Furniture'
    },
];

export const OfficeSupplies = [
    {
        id: 1,
        icon : archIcon,
        name: 'Arch File',
        category: 'OfficeSupplies'
    },
];
