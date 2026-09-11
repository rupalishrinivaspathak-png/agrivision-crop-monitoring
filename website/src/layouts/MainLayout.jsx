import Navbar from "../components/Navbar/Navbar";

export default function MainLayout({ children }) {
    return (
        <div className="bg-[#081420] min-h-screen text-white">

            <Navbar />

            <main>
                {children}
            </main>

        </div>
    );
}
