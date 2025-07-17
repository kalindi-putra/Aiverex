
import './globals.css';
import Script from "next/script"; 
import { AuthProvider } from '../context/UserContext';

export const metadata = {
    title: 'Aivrex Educate',
    description: 'Learning platform for next Generation',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Script
                    src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
                    strategy="afterInteractive"
                />
                { }

                { }
                <AuthProvider>
                    { }
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}