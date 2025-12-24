import { useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import emailjs from "@emailjs/browser"; // Impor EmailJS

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [isSending, setIsSending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSending(true);

        const serviceId = service_yvu9jcv; // Ganti dengan Service ID Anda
        const templateId = template_2gjdaag; // Ganti dengan Template ID Anda
        const publicKey = KX1R1GJSFpWD3O97B; // Ganti dengan Public Key Anda

        emailjs
            .send(
                serviceId,
                templateId,
                {
                    from_name: formData.name,
                    to_name: "Adam Fairuz", // Ganti dengan nama Anda
                    from_email: formData.email,
                    message: formData.message,
                },
                publicKey
            )
            .then(() => {
                alert("Pesan berhasil dikirim!");
                setFormData({ name: "", email: "", message: "" });
            })
            .catch((error) => { // Menangani error jika pengiriman gagal
                console.log(error);
                alert("Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.");
            })
            .finally(() => { //  Menjalankan kode setelah request selesai (baik berhasil maupun gagal)
                setIsSending(false);
            });
    };

    return (
        <section
            id="contact"
            className="min-h-screen flex items-center justify-center py-20"
        >
            <RevealOnScroll>
                <div className="px-4 w-150">
                    <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center"> Get In Touch </h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="relative">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-white/5 border border-white/5 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
                                placeholder="Name..."
                            />
                        </div>

                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-white/5 border border-white/5 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
                                placeholder="example@gmail.com"
                            />
                        </div>

                        <div className="relative">
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={5}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full bg-white/5 border border-white/5 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
                                placeholder="Your message..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSending}
                            className="w-full bg-blue-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSending ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>
            </RevealOnScroll>
        </section>
    );
};