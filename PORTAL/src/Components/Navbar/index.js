import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 py-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-white font-bold">
                  Dhanus  Registration Portal
                </div>
                <ul className="flex">
                    <li className="mx-4 text-white">
                        <Link href="/admin/scan">
                            Scan
                        </Link>
                    </li>
                    <li className="mx-4 text-white">
                        <Link href="/admin/register">
                            Register
                        </Link>
                    </li>
                    <li className="mx-4 text-white">
                        <Link href="/admin/registrations/all">
                            Responses
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
