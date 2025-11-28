function Footer() {
  const socialLinks = [
    {
      name: "Instagram",
      icon: "instagram",
      url: "https://instagram.com/jantaicecream",
      color: "#E4405F",
    },
    {
      name: "Pinterest",
      icon: "pinterest",
      url: "https://pinterest.com/jantaicecream",
      color: "#E60023",
    },
    {
      name: "Facebook",
      icon: "facebook",
      url: "https://facebook.com/jantaicecream",
      color: "#1877F2",
    },
    {
      name: "Snapchat",
      icon: "snapchat",
      url: "https://snapchat.com/add/jantaicecream",
      color: "#FFFC00",
    },
    {
      name: "YouTube",
      icon: "youtube",
      url: "https://youtube.com/@jantaicecream",
      color: "#FF0000",
    },
  ];

  return (
    <footer className="text-white" style={{ backgroundColor: "#FF7D29" }}>
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Left Side - Branch Information */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">
              Visit Our Branch
            </h3>
            <div className="space-y-4 flex flex-col items-center md:items-start">
              <h4 className="text-xl md:text-2xl font-bold mb-4 text-white">
                Ahmedabad Branch
              </h4>

              <div
                className="flex items-start gap-4 p-4 rounded-lg transition-all hover:bg-white/10 w-full max-w-sm"
                style={{ borderLeft: "4px solid white" }}
              >
                <svg
                  className="w-6 h-6 mt-1 shrink-0 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="text-left">
                  <p className="text-white/80 text-xs mb-1">Address</p>
                  <p className="text-white font-medium">
                    CG Road, Ahmedabad - 380009
                  </p>
                </div>
              </div>

              <div
                className="flex items-start gap-4 p-4 rounded-lg transition-all hover:bg-white/10 w-full max-w-sm"
                style={{ borderLeft: "4px solid white" }}
              >
                <svg
                  className="w-6 h-6 shrink-0 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <div className="text-left">
                  <p className="text-white/80 text-xs mb-1">Phone</p>
                  <p className="text-white font-medium">+91 98765 43213</p>
                </div>
              </div>

              <div
                className="flex items-start gap-4 p-4 rounded-lg transition-all hover:bg-white/10 w-full max-w-sm"
                style={{ borderLeft: "4px solid white" }}
              >
                <svg
                  className="w-6 h-6 shrink-0 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="text-left">
                  <p className="text-white/80 text-xs mb-1">Hours</p>
                  <p className="text-white font-medium">9:00 AM - 11:30 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Social Media Links */}
          <div className="flex flex-col justify-center text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">
              Follow Us
            </h3>
            <p className="text-white/90 mb-6 text-sm md:text-base">
              Stay connected with us on social media for updates and offers!
            </p>
            <div className="flex gap-4 flex-wrap justify-center md:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all hover:scale-110 bg-white/10 hover:bg-white/20"
                  aria-label={social.name}
                >
                  {social.icon === "instagram" && (
                    <svg
                      className="w-6 h-6 md:w-7 md:h-7"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  )}
                  {social.icon === "pinterest" && (
                    <svg
                      className="w-6 h-6 md:w-7 md:h-7"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                    </svg>
                  )}
                  {social.icon === "facebook" && (
                    <svg
                      className="w-6 h-6 md:w-7 md:h-7"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  )}
                  {social.icon === "snapchat" && (
                    <svg
                      className="w-6 h-6 md:w-7 md:h-7"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.12-.064-.187 0-.225.18-.464.435-.494 3.244-.539 4.729-3.863 4.805-4.045l.015-.015c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z" />
                    </svg>
                  )}
                  {social.icon === "youtube" && (
                    <svg
                      className="w-6 h-6 md:w-7 md:h-7"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.3)" }}>
        <div className="max-w-6xl mx-auto px-4 py-6">
          <p className="text-center text-white text-sm">
            ©2025 Janta Icecream . All Rights Reserved | Designed & Developed by{" "}
            <a
              href="https://sparshtech.in"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors font-medium underline"
              style={{ color: "white" }}
              onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
              onMouseLeave={(e) => (e.target.style.opacity = "1")}
            >
              sparshtech.in
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
