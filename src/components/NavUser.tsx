import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserType } from 'app/types'

export default function NavUser(user: UserType) {
    const { first_name, last_name, email } = user
    return (
        <nav className="">
            <div className="max-w-screen-xl mx-auto px-4 py-3">
                <div className="flex items-center justify-end md:order-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 transition-all">
                                <span className="sr-only">Open user menu</span>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <div className="px-4 py-3">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                    {`${first_name} ${' '} ${last_name}`}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                    {`${email}`}
                                </p>
                            </div>
                            <DropdownMenuItem>
                                <a href="#" className="w-full block text-sm">
                                    Dashboard
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <a href="#" className="w-full block text-sm">
                                    Settings
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <a href="#" className="w-full block text-sm">
                                    Earnings
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <a href="#" className="w-full block text-sm">
                                    Sign out
                                </a>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    )
}
