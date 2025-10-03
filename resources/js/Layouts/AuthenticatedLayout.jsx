import AuthenticatedNavbar from '@/Components/AuthenticatedNavbar';

export default function AuthenticatedLayout({ children }) {

    return (
        <div className='h-screen'>
            <AuthenticatedNavbar />
            {children}
        </div>
    );
}
