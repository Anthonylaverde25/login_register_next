import { useState } from 'react'

const NavUser = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-screen-xl mx-auto px-4 py-3">
                <div className="flex items-center justify-end md:order-2">
                    {/* Contenedor relativo para el menú desplegable */}
                    <div className="relative">
                        <button
                            type="button"
                            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 transition-all"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Open user menu</span>
                            <img
                                className="w-8 h-8 rounded-full object-cover"
                                src="/docs/images/people/profile-picture-3.jpg"
                                alt="User profile"
                            />
                        </button>

                        {/* Menú desplegable */}
                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700 rounded-md shadow-lg origin-top-right z-50">
                                <div className="px-4 py-3">
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                        Bonnie Green
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                        name@flowbite.com
                                    </p>
                                </div>
                                <ul className="py-1">
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            Dashboard
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            Settings
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            Earnings
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            Sign out
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavUser
