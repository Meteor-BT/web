import React, { useState } from "react";
import { http } from "@/utils";

const HomePage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    async function subscribeUser(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            setLoading(true);
            await http().post("/users/join-waitlist", { email });
            setEmail("");
        } catch (err: any) {
            console.error(err?.response?.data || err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="flex flex-col max-w-full overflow-hidden">
            <section className="w-full min-h-[90vh] flex flex-col justify-center items-center relative">
                <div className="text-center">
                    <h1 className="text-6xl font-black mb-8 md:mb-10 lg:mb-14 md:text-7xl lg:text-8xl hero-text">
                        Weather
                        <br className="md:hidden md:invisible" />
                        <span> all in one</span>
                    </h1>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">Launching soon</h2>
                </div>
                <video className="absolute z-[-1] top-0 right-0 bottom-0 left-0 overflow-hidden h-full w-full object-cover" autoPlay loop muted playsInline>
                    <source src="/landing-page-bg-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute z-[-1] top-0 right-0 left-0 bottom-0 hero-linear-bg"></div>
            </section>

            <section className="w-full flex flex-col justify-center items-center p-root-container h-[60vh]">
                <article className="prose prose-invert w-full text-center">
                    <h2>Subscribe</h2>
                    <p>Sign up to be the first to get updates.</p>
                </article>
                <form onSubmit={subscribeUser} className="w-full flex flex-col md:flex-row items-center justify-center gap-4 max-w-[700px] mt-10">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        disabled={loading}
                        type="email"
                        required
                        placeholder="Enter your email"
                        className="w-full bg-transparent text-base text-white px-4 py-3 rounded border-2 border-neutral-500"
                    />
                    <button
                        disabled={loading}
                        type="submit"
                        className="px-6 py-3 text-base uppercase tracking-wider bg-white text-black rounded font-bold flex justify-center items-center min-w-max w-full md:w-auto lg:hover:bg-neutral-200 transition-colors border-2 border-white lg:hover:border-neutral-200"
                    >
                        {loading ? <div className="animate-spin h-6 w-6 border-4 border-neutral-300 rounded-full border-t-teal-500"></div> : "Sign up"}
                    </button>
                </form>
            </section>
        </main>
    );
};

export default HomePage;
