
import './globals.css'; 
import { AuthProvider } from '../context/UserContext';

export const metadata = {
    title: 'Aivrex Educate', 
    description: 'Learning platform for next Generation', 
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                { }

                { }
                <AuthProvider>
                    {     }
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}