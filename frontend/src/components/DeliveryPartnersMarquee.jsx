function DeliveryPartnersMarquee() {
  const deliveryPartners = [
    {
      name: "zomato",
      displayName: "Zomato",
      textColor: "#E23744",
      logoText: "zomato",
    },
    {
      name: "swiggy",
      displayName: "Swiggy",
      textColor: "#FC8019",
      logoText: "Swiggy",
      hasIcon: true,
    },
  ];

  // Create a base set of partners duplicated multiple times to ensure it fills the screen
  const basePartners = [
    ...deliveryPartners,
    ...deliveryPartners,
    ...deliveryPartners,
    ...deliveryPartners,
    ...deliveryPartners,
    ...deliveryPartners,
  ];

  // Double the base set for the seamless loop effect
  const duplicatedPartners = [...basePartners, ...basePartners];

  return (
    <div
      className="py-12 md:py-16 overflow-hidden"
      style={{
        backgroundColor: "#FFFFFF",
        borderTop: "2px solid #FFBF78",
        borderBottom: "2px solid #FFBF78",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 mb-8 md:mb-12">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-2"
          style={{ color: "#BD5E21" }}
        >
          Now At Your Doorstep
        </h2>
        <p className="text-center text-gray-700 text-sm md:text-base">
          Order from your favorite delivery platforms
        </p>
      </div>

      <div className="relative">
        <div className="delivery-marquee-container">
          <div className="delivery-marquee-content">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="delivery-logo-item flex items-center gap-2 md:gap-3 mx-4 md:mx-8 px-4 md:px-6 py-3 md:py-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                style={{ border: "2px solid #FFBF78" }}
              >
                {/* Icon for Swiggy */}
                {partner.hasIcon && (
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl"
                    style={{ backgroundColor: partner.textColor }}
                  >
                    S
                  </div>
                )}

                {/* Logo Text */}
                <span
                  className="text-3xl font-bold whitespace-nowrap"
                  style={{ color: partner.textColor }}
                >
                  {partner.logoText}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 w-32 h-full bg-linear-to-r from-white to-transparent pointer-events-none z-10"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-linear-to-l from-white to-transparent pointer-events-none z-10"></div>
      </div>

      <style jsx>{`
        .delivery-marquee-container {
          overflow: hidden;
          position: relative;
        }

        .delivery-marquee-content {
          display: flex;
          width: fit-content;
          animation: delivery-scroll 20s linear infinite;
        }

        @media (min-width: 768px) {
          .delivery-marquee-content {
            animation: delivery-scroll 40s linear infinite;
          }
        }

        .delivery-marquee-content:hover {
          animation-play-state: paused;
        }

        @keyframes delivery-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

export default DeliveryPartnersMarquee;
