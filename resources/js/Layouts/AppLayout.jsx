import React from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Head } from '@inertiajs/react';

export default function AppLayout({ children, title, auth }) {
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-cream flex flex-col">
                <Navbar auth={auth} />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    );
}