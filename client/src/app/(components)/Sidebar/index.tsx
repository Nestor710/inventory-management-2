'use client'
import { useAppDispatch, useAppSelector } from "@/app/redux"
import { setIsSidebarCollapsed } from "@/state";
import { Archive, CircleDollarSign, Clipboard, Layout, LucideIcon, Menu, SlidersHorizontal, User } from "lucide-react"
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
    isCollapsed?: boolean;
}

const SidebarLink = ({
    href,
    icon: Icon,
    label,
    isCollapsed
}: SidebarLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href || (pathname === '/' && href === '/dashboard');

    return (
        <Link href={href}>
            <div className={`flex items-center cursor-pointer hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors 
                ${
                    isCollapsed ? 'justify-center py-4' : 'justify-start px-8 py-4'
                }
                ${ 
                    isActive ? 'bg-blue-200 text-white' : '' 
                }`
            }>
                <Icon className="w-6 h-6 text-gray-700" />
                <span className={`${ 
                    isCollapsed ? 'hidden' : 'block' 
                } font-medium text-gray-700`}
                >
                    {label}
                </span>
            </div>
        </Link>
    )
}

const Sidebar = () => {

    const items: SidebarLinkProps[] = [
        { 
            href: '/dashboard', 
            label: 'Dashboard',
            icon: Layout
        },
        { 
            href: '/inventory', 
            label: 'Inventorio',
            icon: Archive
        },
        {
            href: '/products',
            label: 'Productos',
            icon: Clipboard
        },
        {
            href: '/users',
            label: 'Usuarios',
            icon: User
        },
        {
            href: '/settings',
            label: 'Configuración',
            icon: SlidersHorizontal
        },
        {
            href: '/expenses',
            label: 'Gastos',
            icon: CircleDollarSign
        }
    ];

    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector(
        (state) => state.global.isSidebarCollapsed
    );

    const toggleSidebar = () => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));    

    const sidebarClassNames = `fixed flex flex-col ${
        isSidebarCollapsed ? 'w-0 md:w-16' : 'w-72 md:w-64'
    } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`

    return (
        <div className={sidebarClassNames}>
            {/* Top Logo */}
            <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${isSidebarCollapsed ? 'px-5' : 'px-8'}`}>
                <div>Logo</div>
                <h1 className={`${
                    isSidebarCollapsed ? 'hidden' : 'block'
                } font-extrabold text-2xl`}>STOCKIFY</h1>
                <button
                    className="md:hidden px-3 py-3 bg-gray-100 hover>bg-blue-100 rounded-full"
                    onClick={toggleSidebar}
                >
                    <Menu className="w-4 h-4" />
                </button>
            </div>
            {/* Links over here */}
            <div className="flex-grow mt-8">
                {
                    items.map((item, index) => (
                        <SidebarLink 
                            key={`${item.href}-${index}`}
                            href={item.href}
                            icon={item.icon}
                            label={item.label}
                            isCollapsed={isSidebarCollapsed}
                        />
                    ))
                }
            </div>

            {/* Footer */}
            <div className={`${isSidebarCollapsed ? 'hidden' : 'block'} mb-10`}>
                <p className="text-center text-xs text-gray-500">
                    &copy; 2024 STOCKIFY
                </p>
            </div>
        </div>
    )
}

export default Sidebar