import { useState, useEffect } from "react";
import {useNavigate}  from 'react-router-dom';

const GALLERY = {
  Exterior: [
    "http://kevnitserver.com/projects/elegant_builders/exterior1.jpg",
    "http://kevnitserver.com/projects/elegant_builders/exterior2.jpg",
    "http://kevnitserver.com/projects/elegant_builders/exterior3.jpg",
    "http://kevnitserver.com/projects/elegant_builders/exterior4.jpg",
  ],
  Interior: [
    "http://kevnitserver.com/projects/elegant_builders/interior1.jpg",
    "http://kevnitserver.com/projects/elegant_builders/interior2.jpg",
    "http://kevnitserver.com/projects/elegant_builders/interior3.jpg",
    "http://kevnitserver.com/projects/elegant_builders/interior4.jpg",
  ],
  "Master Plan": ["http://kevnitserver.com/projects/elegant_builders/masterplan.png"],
  "Floor Plan": null,
};

const NAV_LINKS = ["Overview", "Location", "Amenities", "Gallery", "Sustainability", "Contact"];

const HIGHLIGHTS = [
  // { num: "2", label: "Towers", sub: "G+14 Floors" },
  // { num: "136", label: "Perfect Units", sub: "Freewall Homes" },
  { num: "3 & 3.5", label: "BHK", sub: "Configurations" },
  { num: "1.8", label: "Acres", sub: "Of Everything You Desire" },
  // { num: "50+", label: "Amenities", sub: "Across All Levels" },
  { num: "10K", label: "Sq.ft Clubhouse", sub: "Premium Facilities" },
];

const FEATURE_ICONS = {
  vaastu: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 3L3 12h4v17h6v-8h6v8h6V12h4L16 3z" stroke="#5F733C" strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
      <circle cx="16" cy="15" r="2.5" stroke="#5F733C" strokeWidth="1.6" fill="none"/>
      <path d="M16 6v2M16 24v2M6 15H4M28 15h-2" stroke="#5F733C" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
   
  ),
  light: (
     <img src="../images/forest.png" width="32" height="32" alt="Forest"/>
  ),
  privacy: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="14" width="24" height="14" rx="2.5" stroke="#5F733C" strokeWidth="1.8" fill="none"/>
      <path d="M10 14v-4a6 6 0 0112 0v4" stroke="#5F733C" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <circle cx="16" cy="21" r="2.5" stroke="#5F733C" strokeWidth="1.6" fill="none"/>
      <path d="M16 23.5v2.5" stroke="#5F733C" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  location: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 3C11.6 3 8 6.6 8 11c0 6.5 8 18 8 18s8-11.5 8-18c0-4.4-3.6-8-8-8z" stroke="#5F733C" strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
      <circle cx="16" cy="11" r="3" stroke="#5F733C" strokeWidth="1.6" fill="none"/>
    </svg>
  ),
};

const FEATURES = [
  { iconKey: "vaastu", title: "Vaastu-Compliant, Corner Residences", desc: "Homes designed to open on all sides for natural breeze, daylight, and harmonious energy flow. " },
  { iconKey: "light", title: "Forest-Front Sustainable Living", desc: "Directly facing the GKVK Green Zone for unblocked greenery and cleaner surroundings. An IGBC Silver-Rated project featuring rainwater harvesting and solar power." },
  { iconKey: "privacy", title: "Privacy with Freewall Homes", desc: "No shared walls between units ensures more light, ventilation, and the quiet of an independent home." },
  { iconKey: "location", title: "Low-Density Boutique Community", desc: "Only 136 homes with just 5 units per floor for a more private experience." },
];

const GREEN_ZONES = [
  { dir: "North East & North West", places: "Avalahalli Forest, Kodimanchanahalli Tree Park, Forest Research Station", stat: "1,200+ Acres" },
  { dir: "East", places: "Gandhi Krishi Vigyana Kendra (GKVK)", stat: "1,400 Acres" },
  { dir: "South", places: "Jarkabandi Forest, Shetty Halli Forest, IISC Campus", stat: "1,300 Acres" },
  { dir: "Surrounding", places: "14 Lakes within 10 km radius", stat: "Your Personal Island" },
];

const AMENITY_ICONS = {
  clubhouse: (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M3 22V11L13 4l10 7v11" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" fill="none"/>
      <rect x="9" y="14" width="8" height="8" rx="1" stroke="#fff" strokeWidth="1.5" fill="none"/>
      <path d="M13 14v8" stroke="#fff" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  terrace: (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <circle cx="13" cy="10" r="4.5" stroke="#fff" strokeWidth="1.7" fill="none"/>
      <path d="M13 2v2M13 16v2M3 10H1M25 10h-2M5.7 4.7l1.4 1.4M18.9 17.9l1.4 1.4M4.3 17.9l1.4-1.4M19.9 5.1l1.4-1.4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M5 22h16" stroke="#fff" strokeWidth="1.7" strokeLinecap="round"/>
      <path d="M8 22v-2.5M13 22v-4M18 22v-2.5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  periphery: (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M13 3C9.5 3 7 6 7 9.5c0 4.5 6 11.5 6 11.5s6-7 6-11.5C19 6 16.5 3 13 3z" stroke="#fff" strokeWidth="1.7" fill="none"/>
      <circle cx="13" cy="9.5" r="2.3" stroke="#fff" strokeWidth="1.4" fill="none"/>
      <path d="M4 22h18" stroke="#fff" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  ),
  outdoors: (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M3 20l5-9 4 5 3-4 5 8H3z" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" fill="none"/>
      <circle cx="19" cy="7" r="3" stroke="#fff" strokeWidth="1.5" fill="none"/>
      <path d="M3 23h20" stroke="#fff" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  ),
};

const AMENITY_CATS = [
  { title: "In the Clubhouse", iconKey: "clubhouse", items: ["Infinity swimming pool", "Sunlit café & cafeteria", "Pool deck with loungers", "Two party halls", "Games room"] },
  { title: "On the Terrace", iconKey: "terrace", items: ["Sky work hub & rooftop café", "Yoga terrace & sculpture court", "Stargazing zone", "Terrace party lawn", "Outdoor gym facing GKVK"] },
  { title: "Along the Periphery", iconKey: "periphery", items: ["Badminton, volleyball, basketball", "Skating rink & dribble court", "Pet park", "Children's play area", "Amphitheatre & stage"] },
  { title: "Just Outdoors", iconKey: "outdoors", items: ["Thoughtfully designed commercial centre", "Daily essentials close at hand", "Ringed by trees and calm", "Vehicle-free zones", "Floral garden & tree court"] },
];

const SUSTAIN_ICONS = {
  solar: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect x="4" y="14" width="28" height="8" rx="2" stroke="#a8c476" strokeWidth="1.8" fill="none"/>
      <path d="M8 14V10M14 14V8M20 14V8M26 14V10M28 22v4M8 22v4" stroke="#a8c476" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M10 22h16" stroke="#a8c476" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="29" cy="8" r="3.5" stroke="#a8c476" strokeWidth="1.5" fill="none"/>
      <path d="M29 3v2M29 11v2M24 8h-2M36 8h-2M25.5 4.5l1.4 1.4M31.1 10.1l1.4 1.4M25.5 11.5l1.4-1.4M31.1 5.9l1.4-1.4" stroke="#a8c476" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  water: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M18 4C18 4 8 16 8 22a10 10 0 0020 0C28 16 18 4 18 4z" stroke="#a8c476" strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
      <path d="M12 22c0 3.3 2.7 6 6 6" stroke="#a8c476" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  waste: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M18 5c-7.2 0-13 5.8-13 13s5.8 13 13 13 13-5.8 13-13S25.2 5 18 5z" stroke="#a8c476" strokeWidth="1.8" fill="none"/>
      <path d="M12 18l4 4 8-8" stroke="#a8c476" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  climate: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect x="5" y="10" width="26" height="18" rx="3" stroke="#a8c476" strokeWidth="1.8" fill="none"/>
      <path d="M5 16h26" stroke="#a8c476" strokeWidth="1.5"/>
      <path d="M12 13v-5M18 13V8M24 13v-5" stroke="#a8c476" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="23" r="2" stroke="#a8c476" strokeWidth="1.4" fill="none"/>
      <circle cx="20" cy="23" r="2" stroke="#a8c476" strokeWidth="1.4" fill="none"/>
    </svg>
  ),
};

const SUSTAIN = [
  { iconKey: "solar", title: "Smart Power & Solar", desc: "Solar panels and windmills generate 30,000+ kWh/year, powering 37% of common lighting. Smart sensors optimise usage by 30%." },
  { iconKey: "water", title: "Water-Secure Homes", desc: "Efficient fixtures, recycled STP water and sponge-effect landscaping cut freshwater demand by 70%." },
  { iconKey: "waste", title: "Zero Waste to Landfill", desc: "95% of construction debris is reused. On-site Organic Waste Converter turns kitchen waste into compost." },
  { iconKey: "climate", title: "Climate-Responsive Architecture", desc: "Smart layouts and high-performance glass reduce heat gain — lower energy bills, less glare, perfect harmony with nature." },
];

const FLOOR_PLANS = [
  { label: "3 BHK – Type A", area: "~1,680 sq.ft", rooms: ["Living & Dining", "Master Bedroom (WFH)", "Bedroom 2", "Bedroom 3", "Kitchen + Utility", "3 Bathrooms", "2 Balconies"] },
  { label: "3 BHK – Type B", area: "~1,720 sq.ft", rooms: ["Living & Dining", "Master Bedroom (Attached)", "Bedroom 2", "Bedroom 3", "Kitchen + Utility", "3 Bathrooms", "3 Balconies"] },
  { label: "3.5 BHK – Type C", area: "~2,050 sq.ft", rooms: ["Living & Dining", "Master Bedroom (Lounge)", "Bedroom 2", "Bedroom 3", "Study / 0.5 Room", "Kitchen + Utility", "4 Bathrooms", "3 Balconies"] },
];
function FloorPlanCard({ plan }) {

  return (
    <div style={{ background: "#f9f7f2", border: "1.5px solid #5F733C33", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ background: "#5F733C", color: "#fff", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700 }}>{plan.label}</span>
        <span style={{ fontSize: 13, opacity: 0.85 }}>{plan.area}</span>
      </div>
      <div style={{ padding: 20 }}>
        <svg viewBox="0 0 300 220" width="100%" style={{ display: "block", borderRadius: 8, border: "1px solid #5F733C22" }}>
          <rect width="300" height="220" fill="#faf9f5" />
          <rect x="10" y="10" width="280" height="200" fill="none" stroke="#5F733C" strokeWidth="3" rx="3" />
          <rect x="10" y="10" width="130" height="90" fill="#e8f0dc" stroke="#5F733C" strokeWidth="1.5" />
          <text x="75" y="58" textAnchor="middle" fontSize="9" fill="#3d4f27" fontFamily="DM Sans, DM Sans, sans-serif">Living &amp; Dining</text>
          <rect x="140" y="10" width="150" height="90" fill="#dce8f0" stroke="#5F733C" strokeWidth="1.5" />
          <text x="215" y="58" textAnchor="middle" fontSize="9" fill="#3d4f27" fontFamily="DM Sans, DM Sans, sans-serif">Master Bedroom</text>
          <rect x="10" y="100" width="85" height="70" fill="#e8dce0" stroke="#5F733C" strokeWidth="1.5" />
          <text x="52" y="138" textAnchor="middle" fontSize="8" fill="#3d4f27" fontFamily="DM Sans, DM Sans, sans-serif">Bed 2</text>
          <rect x="95" y="100" width="75" height="70" fill="#dce8dc" stroke="#5F733C" strokeWidth="1.5" />
          <text x="132" y="138" textAnchor="middle" fontSize="8" fill="#3d4f27" fontFamily="DM Sans, DM Sans, sans-serif">Bed 3</text>
          <rect x="170" y="100" width="75" height="50" fill="#f0ead8" stroke="#5F733C" strokeWidth="1.5" />
          <text x="207" y="128" textAnchor="middle" fontSize="8" fill="#3d4f27" fontFamily="DM Sans, DM Sans, sans-serif">Kitchen</text>
          <rect x="245" y="100" width="45" height="50" fill="#e8e8dc" stroke="#5F733C" strokeWidth="1.5" />
          <text x="267" y="128" textAnchor="middle" fontSize="7" fill="#3d4f27" fontFamily="DM Sans, DM Sans, sans-serif">Utility</text>
          <rect x="10" y="170" width="175" height="40" fill="#c8d8b0" stroke="#5F733C" strokeWidth="1.5" rx="2" />
          <text x="97" y="194" textAnchor="middle" fontSize="8" fill="#3d4f27" fontFamily="DM Sans, DM Sans, sans-serif">Balcony</text>
          <rect x="185" y="150" width="50" height="40" fill="#d8e0f0" stroke="#5F733C" strokeWidth="1" />
          <text x="210" y="173" textAnchor="middle" fontSize="7" fill="#3d4f27" fontFamily="DM Sans, DM Sans, sans-serif">Bath</text>
          <rect x="235" y="150" width="55" height="40" fill="#d8e0f0" stroke="#5F733C" strokeWidth="1" />
          <text x="262" y="173" textAnchor="middle" fontSize="7" fill="#3d4f27" fontFamily="DM Sans, DM Sans, sans-serif">Bath</text>
          <circle cx="280" cy="25" r="12" fill="#5F733C22" stroke="#5F733C" strokeWidth="1" />
          <text x="280" y="29" textAnchor="middle" fontSize="10" fill="#5F733C" fontWeight="bold">N</text>
        </svg>
        <ul style={{ margin: "14px 0 0", padding: 0, listStyle: "none", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px" }}>
          {plan.rooms.map((r) => (
            <li key={r} style={{ fontSize: 12, color: "#555", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#5F733C", display: "inline-block", flexShrink: 0 }} />
              {r}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
const BUILDER_STATS = [
  { label: "Trusted Since", num: "2004" },
  { label: "Projects Delivered", num: "50+" },
  { label: "Happy Customers", num: "16,000+" },
  { label: "Sq. Ft. Built & Delivered", num: "3.5 Million" },
  { label: "Sq. Ft. Upcoming", num: "3 Million" },
  { label: "Value Appreciated", num: "80%" },
];

const AWARDS = [
  { title: "Realty Plus", year: "2023", desc: "Lifetime Achievement Award" },
  { title: "Economic Times Edge", year: "2025", desc: "Best realty Brands" },
  { title: "Realty Plus", year: "2024", desc: "CXO of the year" },
  { title: "Zee Business", year: "2025", desc: "Most Innovative Luxury project of the year" },
  { title: "Realty Plus", year: "2024", desc: "Published as south india's most promising brand" },
  { title: "Zee Business", year: "2024", desc: "Most Adorable luxury project of the year" },
  { title: "WBR CORP", year: "2024", desc: "Notable Real Estate Developer of the year" },
  { title: "Realty Plus", year: "2024", desc: "Best Residential project of the year" },
];
export default function ElegantAtmos() {
  const [galleryTab, setGalleryTab] = useState("Exterior");
  const [lightbox, setLightbox] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
 
  useEffect(() => {
      // Set a timer to trigger the popup after 5000 milliseconds (5 seconds)
      const autoPopupTimer = setTimeout(() => {
        // This checks if the user hasn't already manually opened a modal
        setModalSource((currentSource) => {
          if (!currentSource) {
            return "popup"; // Opens the "Book a Site Visit" variation automatically
          }
          return currentSource;
        });
      }, 10000);

      // Clean up the timer if the user navigates away before 5 seconds passes
      return () => clearTimeout(autoPopupTimer);
    }, []); // Empty dependency array means this runs exactly once when the page loads

    useEffect(() => {
    const handleScrollClose = () => {
      if (menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScrollClose);

    return () => {
      window.removeEventListener("scroll", handleScrollClose);
    };
  }, [menuOpen]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navBg = scrollY > 80 ? "rgba(15,22,10,0.92)" : "transparent";
  const navShadow = scrollY > 80 ? "0 2px 24px rgba(0,0,0,0.18)" : "none";

const [formData, setFormData] = useState({
  fullName: "",
  phone: "",
  email: "",
  message: "",
  formType: ""
});

  const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState("");
const [error, setError] = useState("");
const navigate = useNavigate();
const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData({
    ...formData,
    [name]: value
  });
};

const handlePhoneChange = (e) => {
  let value = e.target.value.replace(/\D/g, "");
  value = value.slice(0, 10);

  setFormData({
    ...formData,
    phone: value
  });

  setError("");
};

const handleSubmit = async (e, source = "general") => {
  e.preventDefault();

  setSuccess("");
  setError("");

  // 1. Validation Checks
  if (!formData.fullName.trim()) {
    setError("Full Name is required");
    setTimeout(() => setError(""), 3000);
    return;
  }

  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(formData.phone)) {
    setError("Please enter a valid 10-digit mobile number.");
    setTimeout(() => setError(""), 3000);
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email.trim())) {
    setError("Enter a valid email address");
    setTimeout(() => setError(""), 3000);
    return;
  }

  setLoading(true);

  try {
    // 2. Fetch API Request
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullName: formData.fullName.trim(),
        phone: formData.phone,
        email: formData.email.trim(),
        message: formData.message || "",
        formType: source // 👈 Sends 'general', 'brochure', 'floor-plan', or 'popup' straight to DB
      })
    });

    const data = await response.json();

    if (data.success) {
      let openedFile = false;

      // 3. Precise File Handling Routing
      if (source === "brochure") {
        window.open(
          "https://kevnitserver.com/projects/elegant_builders/Elegant_atmos_Brochure.pdf", 
          "_blank", 
          "noopener,noreferrer"
        );
        openedFile = true;
      } else if (source === "floor-plan") {
        window.open(
          "./images/Elegant-Atmos-Floor-Plans-and-Cost-Sheet.pdf", 
          "_blank", 
          "noopener,noreferrer"
        );
        openedFile = true;
      }

      // 4. Reset Input State Containers
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        message: "",
        formType: source
      });

      // 5. Instantly dismiss popup wrappers if open
      if (typeof setModalSource === "function") {
        setModalSource(""); 
      }

      // 6. Conditional Routing Resolution Block
      if (openedFile) {
        // Keeps user on landing page for brochure/floor-plan files download
        setSuccess("Thank you! Opening your requested documents in a new tab...");
        setTimeout(() => setSuccess(""), 4000);
      } else {
        // 👈 Redirects directly to Thank You page for "general" and "popup" form fields
        navigate('/thank-you');
      }

    } else {
      setError(data.message || "Something went wrong");
      setTimeout(() => setError(""), 3000);
    }
  } catch (error) {
    setError("Server error. Please try again later.");
    setTimeout(() => setError(""), 3000);
  }

  setLoading(false);
};
const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  background: "#2a3d24", // Dark green matched pill tone
  border: "1px solid #2a3d24",
  borderRadius: "50px",
  padding: "12px 20px",
  color: "#fff",
  fontSize: "14px",
  outline: "none"
};

const [modalSource, setModalSource] = useState("");
const handleNavClick = (link) => {
  const targetId = link.toLowerCase();
  
  // 1. Update the URL hash
  window.location.hash = targetId; 
  
  // 2. Trigger your existing scroll function
  scrollTo(targetId); 
};
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', DM Sans, sans-serif; background: #fff; color: #1a1a1a; overflow-x: hidden; }
        html, body {  overflow-x: hidden;  width: 100%;}
        * {  max-width: 100%;}
        @media (max-width: 600px) {
          body {
            width: 100%;
            h2{font-size: 25px !important;}
            .hero{
            .btn-outline {width: 100%}
            .btn-primary {width: 100%}}
          }
        }
        :root {
          --green: #5F733C;
          --green-dark: #3d4f27;
          --green-light: #8fa86a;
          --cream: #f7f5ef;
          --charcoal: #1a1a1a;
          --muted: #6b7553;
        }

        .fade-up { opacity: 0; transform: translateY(40px); animation: fadeUp 0.8s ease forwards; }
        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }

        .section-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 700; color: var(--charcoal); line-height: 1.15; }
        .section-subtitle { font-size: 14px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: var(--green); margin-bottom: 12px; }

        section { padding: 20px 0; }
        .container { width:100%; max-width: 1200px; margin: 0 auto; padding: 0 40px; }
        @media(max-width:768px) { .container { padding: 0 20px; } section { padding: 40px 0; } }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--green); color: #fff; padding: 16px 36px; border-radius: 4px;
          font-family: 'DM Sans', DM Sans, sans-serif; font-size: 14px; font-weight: 500;
          letter-spacing: 0.08em; text-transform: uppercase; border: none; cursor: pointer;
          transition: background 0.3s, transform 0.2s; text-decoration: none;
        }
        .btn-primary:hover { background: var(--green-dark); transform: translateY(-2px); }

        .btn-outline {
          display: inline-flex; align-items: center; gap: 10px;
          background: transparent; color: var(--green); padding: 14px 32px; border-radius: 4px;
          font-family: 'DM Sans', DM Sans, sans-serif; font-size: 14px; font-weight: 500;
          letter-spacing: 0.08em; text-transform: uppercase; border: 1.5px solid var(--green);
          cursor: pointer; transition: all 0.3s; text-decoration: none;
        }
        .btn-outline:hover { background: var(--green); color: #fff; }
        .btn-animation{ animation: attentionPulse 2.5s infinite ease-in-out;}
        @keyframes attentionPulse {
        0% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(168, 196, 118, 0.4);
          background : rgba(168, 196, 118, 0.4);
          color: #fff
        }
        50% {
          transform: scale(1.03); /* Subtle grow */
          box-shadow: 0 0 15px 5px rgba(168, 196, 118, 0.2); /* Soft glow */
          background: var(--green);
          color: #fff
        }
        100% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(168, 196, 118, 0.4);
        
        }
      }
        /* Lightbox */
        .lightbox { position: fixed; inset: 0; background: rgba(0,0,0,0.92); z-index: 9999; display: flex; align-items: center; justify-content: center; cursor: zoom-out; }
        .lightbox img { max-width: 90vw; max-height: 88vh; border-radius: 8px; object-fit: contain; }
        .lightbox-close { position: absolute; top: 24px; right: 28px; color: #fff; font-size: 36px; cursor: pointer; line-height: 1; background: none; border: none; }

        /* Nav */
        nav { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; transition: background 0.4s, box-shadow 0.4s; padding: 0 40px; }
        .nav-inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; height: 76px; }
        .nav-links { display: flex; gap: 36px; list-style: none; }
        .nav-btn {
          color: rgba(255,255,255,0.88); font-size: 13px; letter-spacing: 0.1em;
          text-transform: uppercase; font-weight: 500; background: none; border: none;
          cursor: pointer; transition: color 0.2s; font-family: 'DM Sans', DM Sans, sans-serif; padding: 0;
        }
        .nav-btn:hover { color: #fff; }
        .hamburger {
  display: none;
  position: relative;
  width: 42px;
  height: 42px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1201;
  padding: 0;
}

.hamburger span {
  position: absolute;
  left: 9px;
  width: 24px;
  height: 2px;
  background: #fff;
  border-radius: 10px;
  transition: all 0.35s ease;
  transform-origin: center;
}

/* Top line */
.hamburger span:nth-child(1) {
  top: 13px;
}

/* Middle line */
.hamburger span:nth-child(2) {
  top: 20px;
}

/* Bottom line */
.hamburger span:nth-child(3) {
  top: 27px;
}

/* OPEN STATE */

.hamburger.open span:nth-child(1) {
  top: 20px;
  transform: rotate(45deg);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  top: 20px;
  transform: rotate(-45deg);
}


        @media(max-width:900px) { .nav-links { display: none; } .hamburger { display: flex; } }
        .menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 998;
  animation: fadeOverlay 0.3s ease;
}

@keyframes fadeOverlay {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
  .mobile-btn {
  display: block;
  color: #fff;
  padding: 16px 0;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  background: none;
  border-left: none;
  border-right: none;
  border-top: none;
  width: 100%;
  text-align: left;
  font-family: 'DM Sans', sans-serif;
  transition: all 0.25s ease;
}

.mobile-btn:hover {
  color: #b8cc94;
  padding-left: 6px;
}
        .mobile-menu {
  position: fixed;
  top: 76px;
  left: 0;
  right: 0;
  background: rgba(15,22,10,0.96);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  padding: 24px 20px;
  z-index: 999;
  animation: slideDown 0.35s ease;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
  @keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
        .mobile-btn {
          display: block; color: #fff; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.1);
          font-size: 15px; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer;
          background: none; border-left: none; border-right: none; border-top: none;
          width: 100%; text-align: left; font-family: 'DM Sans', DM Sans, sans-serif;
        }
        .mobile-btn:last-child { border-bottom: none; }

        /* Hero */
        .hero { position: relative; height: auto; min-height: 100svh; display: flex; align-items: center; justify-content: flex-start; overflow: hidden; background: linear-gradient(160deg, #0d1a08 0%, #1e2d12 40%, #2d4019 100%); padding: 0 80px; }
        .hero-bg-pattern { position: absolute; inset: 0; opacity: 1; background: url('../images/atmos-hero.webp') center/cover no-repeat; }
        .hero-bg-pattern::after { content: ''; position: absolute; inset: 0; background: linear-gradient(100deg, rgba(10,18,6,0.82) 0%, rgba(10,18,6,0.65) 45%, rgba(10,18,6,0.35) 100%); }
        .hero-content { position: relative; z-index: 2; margin-top: 15%; }
        .hero-tag {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(95,115,60,0.25); border: 1px solid rgba(95,115,60,0.5);
          color: #b8cc94; padding: 5px 13px; border-radius: 40px;
          font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 500; margin-bottom: 24px;
        }
        .hero-title { font-family: 'Playfair Display', serif; font-size: clamp(3rem, 6vw, 5.5rem); font-weight: 700; color: #fff; line-height: 1.05; margin-bottom: 12px; }
        .hero-title em { font-style: italic; color: #a8c476; }
        .hero-tagline {  font-style: italic; color: rgba(255,255,255,0.65); font-size: clamp(1.1rem, 2vw, 1.4rem); margin-bottom: 40px; max-width: 686px; }
        .hero-tagline span{font-size: 35px; font-weight: bold;}
        .hero-stats { display: flex; gap: 30px 150px; flex-wrap: wrap; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 36px; margin-top: 36px; }
        .hero-stat-num { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 700; color: #a8c476; }
        .hero-stat-label { font-size: 15px; color: rgba(255,255,255,0.6); letter-spacing: 0.1em; text-transform: uppercase; }
        .hero-scroll { position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 8px; color: rgba(255,255,255,0.5); font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; animation: bounce 2s infinite; }
        @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }

        /* Highlights grid */
        .highlights-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: var(--charcoal); width: 100%; }
        @media(max-width:600px) { .green-highlights-banner { grid-template-columns: 1fr !important; }  .highlights-grid{width: 100%} }
        .highlight-cell { background: var(--cream); padding: 44px 32px; text-align: center; transition: background 0.3s; }
        .highlight-cell:hover { background: var(--green); }
        .highlight-cell:hover .hl-num { color: #fff; }
        .highlight-cell:hover .hl-label { color: rgba(255,255,255,0.9); }
        .highlight-cell:hover .hl-sub { color: rgba(255,255,255,0.65); }
        .hl-num { font-family: 'Playfair Display', serif; font-size: clamp(2.4rem,4vw,3.6rem); font-weight: 700; color: var(--green); line-height: 1; }
        .hl-label { font-size: 13px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--charcoal); margin-top: 8px; }
        .hl-sub { font-size: 12px; color: var(--muted); margin-top: 4px; }

        /* Features */
        .features-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
        @media(max-width:700px) { .features-grid { grid-template-columns: 1fr; } }
        .feature-card { background: var(--cream); padding: 40px 36px; border-radius: 12px; border-left: 4px solid var(--green); transition: transform 0.3s, box-shadow 0.3s; }
        .feature-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(95,115,60,0.12); }
        .feature-icon { margin-bottom: 16px; }
        .feature-title { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 600; margin-bottom: 12px; color: var(--charcoal); }
        .feature-desc { font-size: 14px; line-height: 1.7; color: #666; }

        /* Location */
        .location-section { background: var(--charcoal); padding: 80px 0px; }
        .location-section .section-title { color: #fff; }
        .location-section .section-subtitle { color: var(--green-light); }
        .green-zones { display: grid; grid-template-columns: repeat(2,1fr); gap: 24px; }
        @media(max-width:640px) { .green-zones { grid-template-columns: 1fr; } }
        .green-zone-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(95,115,60,0.4); border-radius: 12px; padding: 28px 28px 24px; }
        .gz-dir { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--green-light); margin-bottom: 10px; }
        .gz-places { font-family: 'Playfair Display', serif; font-size: 1.05rem; color: #fff; margin-bottom: 12px; line-height: 1.4; }
        .gz-stat { font-size: 13px; color: rgba(255,255,255,0.5); border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px; }

        /* Amenities */
        .amenity-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 28px; }
        @media(max-width:700px) { .amenity-grid { grid-template-columns: 1fr; } }
        .amenity-card { background: #fff; border: 1.5px solid #e8e8e0; border-radius: 16px; overflow: hidden; transition: box-shadow 0.3s; }
        .amenity-card:hover { box-shadow: 0 12px 40px rgba(95,115,60,0.15); }
        .amenity-card-header { background: var(--green); color: #fff; padding: 20px 24px; display: flex; align-items: center; gap: 14px; }
        .amenity-title { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 600; }
        .amenity-list { padding: 20px 24px; list-style: none; }
        .amenity-list li { font-size: 13.5px; color: #555; padding: 7px 0; border-bottom: 1px solid #f0f0eb; display: flex; align-items: center; gap: 10px; }
        .amenity-list li:last-child { border: none; }
        .amenity-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); flex-shrink: 0; }

        /* Gallery */
        .gallery-section { background: var(--cream); padding: 60px 0px; }
        .gallery-tabs { display: flex; gap: 4px; background: #e8e4dc; border-radius: 8px; padding: 4px; margin-bottom: 36px; flex-wrap: wrap; }
        .gallery-tab { flex: 1; min-width: 110px; padding: 12px 20px; border-radius: 6px; font-size: 13px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; border: none; background: transparent; color: #666; transition: all 0.25s; font-family: 'DM Sans', DM Sans, sans-serif; }
        .gallery-tab.active { background: var(--green); color: #fff; }
        .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
        .gallery-img-wrap { aspect-ratio: 4/3; overflow: hidden; border-radius: 10px; cursor: zoom-in; position: relative; }
        .gallery-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s cubic-bezier(.25,.46,.45,.94); }
        .gallery-img-wrap:hover img { transform: scale(1.07); }

        /* Floor plans */
        .floorplan-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 28px; }

        /* Sustainability */
        .sustain-section { background: var(--green-dark); padding: 60px 0px;}
        .sustain-section .section-title { color: #fff; }
        .sustain-section .section-subtitle { color: var(--green-light); }
        .sustain-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 24px; }
        @media(max-width:640px) { .sustain-grid { grid-template-columns: 1fr; } }
        .sustain-card { background: rgba(255,255,255,0.07); border: 1px solid rgba(168,196,118,0.25); border-radius: 14px; padding: 32px 28px; transition: background 0.3s; }
        .sustain-card:hover { background: rgba(255,255,255,0.12); }
        .sustain-icon { margin-bottom: 16px; }
        .sustain-title { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 600; color: #a8c476; margin-bottom: 10px; }
        .sustain-desc { font-size: 13.5px; color: rgba(255,255,255,0.72); line-height: 1.7; }

        /* Specs */
        .specs-section { background: #fff; padding: 60px 0px; }
        .specs-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
        @media(max-width:800px) { .specs-grid { grid-template-columns: repeat(2,1fr); } }
        @media(max-width:480px) { .specs-grid { grid-template-columns: 1fr; } }
        .spec-card { background: var(--cream); border-radius: 10px; padding: 24px 22px; }
        .spec-category { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--green); font-weight: 600; margin-bottom: 12px; }
        .spec-item { font-size: 13px; color: #555; padding: 5px 0; border-bottom: 1px solid rgba(0,0,0,0.06); line-height: 1.5; }
        .spec-item:last-child { border: none; }

        /* About */
        .about-section { background: linear-gradient(135deg, var(--charcoal) 0%, #1e2d12 100%); color: #fff; text-align: center; padding: 60px 0; }
        .about-section .section-title { color: #fff; }
        .about-stats { display: flex; justify-content: center; gap: 60px; flex-wrap: wrap; margin-top: 60px; padding-top: 60px; border-top: 1px solid rgba(255,255,255,0.15); }
        .about-stat-n { font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #a8c476; }
        .about-stat-l { font-size: 13px; color: rgba(255,255,255,0.6); margin-top: 6px; letter-spacing: 0.1em; text-transform: uppercase; }
        @media(max-width:600px) {.about-stat-n {font-size: 2rem; }}
        /* Contact */
        .contact-section { background: var(--cream); padding: 60px 0px; }
        .contact-card { background: #fff; border-radius: 20px; padding: 60px; box-shadow: 0 24px 80px rgba(95,115,60,0.12); display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        @media(max-width:800px) { .contact-card { grid-template-columns: 1fr; gap: 40px; padding: 40px 28px; } }
        .contact-form input, .contact-form textarea { width: 100%; padding: 14px 18px; border: 1.5px solid #e0ddd5; border-radius: 8px; font-family: 'DM Sans', DM Sans, sans-serif; font-size: 14px; background: var(--cream); transition: border-color 0.2s; outline: none; margin-bottom: 16px; color: var(--charcoal); }
        .contact-form input:focus, .contact-form textarea:focus { border-color: var(--green); }
        .contact-form textarea { height: 120px; resize: none; }
        .contact-info-item { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 28px; }
        .contact-info-icon { width: 44px; height: 44px; border-radius: 10px; background: var(--green); color: #fff; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .contact-info-label { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); margin-bottom: 4px; }
        .contact-info-val { font-size: 14px; color: var(--charcoal); font-weight: 500; }

        /* Footer */
        footer { background: var(--charcoal); color: rgba(255,255,255,0.65); padding: 60px 40px 36px; text-align: center;}

        /* Divider */
        .green-divider { height: 4px; background: linear-gradient(90deg, var(--green-dark), var(--green-light), var(--green-dark)); }

        /* Location responsive */
        .why-img-wrap { overflow: hidden; border-radius: 10px; cursor: zoom-in; position: relative; }
        @media(max-width:800px) { .location-grid { grid-template-columns: 1fr !important; } }

        /* ── Mobile fixes ───────────────────────────────────────── */
        @media(max-width: 400px) {
          .hero {min-height: 110svh !important;}
          .highlight-cell { padding: 20px 10px}
          .nav-inner img { height: 35px !important}
        }
        @media(max-width:600px) {
          /* Hero */
          .hero { padding: 0 24px; align-items: flex-end; padding-bottom: 80px; min-height: 100svh; height: auto; }
          .hero-content { max-width: 100%; }
          .hero-tag { font-size: 9px; padding: 4px 10px; margin-bottom: 16px; }
          .hero-title { font-size: 2.2rem !important; line-height: 1.1; margin-bottom: 10px; }
          .hero-tagline { font-size: 0.95rem !important; margin-bottom: 28px; max-width: 100%; width: 222px;}
          .hero-stats { gap: 20px; padding-top: 24px; margin-top: 24px; }
          .hero-stat-num { font-size: 1.1rem !important; }
          .hero-stat-label { font-size: 10px; }
          .hero-scroll { display: none; }
          .nav-inner img{height: 45px !important;}
          /* Contact */
          .contact-card { padding: 28px 20px !important; gap: 32px !important; }
          .contact-form input, .contact-form textarea { padding: 12px 14px; font-size: 13px; }
          .contact-info-item { gap: 12px; margin-bottom: 20px; }
          .contact-info-icon { width: 36px; height: 36px; border-radius: 8px; flex-shrink: 0; }
          .contact-info-val { font-size: 13px; }
        }

        /* WhatsApp FAB */
        .wa-fab {
          position: fixed; bottom: 96px; right: 32px; z-index: 800;
          width: 48px; height: 48px; border-radius: 50%;
          background: #25D366;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 20px rgba(37,211,102,0.45);
          transition: transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
        }
          .phn-fab {
          position: fixed; bottom: 96px; right: 102px; z-index: 800;
          width: 48px; height: 48px; border-radius: 50%;
          background: #25D366;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 20px rgba(37,211,102,0.45);
          transition: transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
        }
        .wa-fab:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(37,211,102,0.55); }
        @media (max-width: 991px) {
        .stats-banner {
          padding-bottom: 40px !important;
        }
        .stats-floating-grid {
          position: relative !important;
          bottom: 0 !important;
          left: 0 !important;
          right: 0 !important;
          margin-top: 30px !important;
          grid-template-columns: repeat(3, 1fr) !important;
        }
        .recognition-container {
          margin-top: 60px !important;
        }
      }

      @media (max-width: 600px) {
        .stats-floating-grid {
          grid-template-columns: repeat(2, 1fr) !important;
        }
        .awards-grid {
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 30px 10px !important;
        }
      }
      @media (max-width: 991px) {
        .project-overview-section > .container {
          grid-template-columns: 1fr !important;
          gap: 50px !important;
        }
        .form-sticky-container {
          position: relative !important;
          top: 0 !important;
          maxWidth: 500px;
          width: 100%;
          margin: 0 auto;
          box-sizing: border-box;
        }
      }
      @media (max-width: 640px) {
        .features-grid {
          grid-template-columns: 1fr !important;
        }
      }
        @media (max-width: 768px) {
  .footer-inline-form {
    flex-direction: column !important;
    align-items: stretch !important;
    gap: 15px !important;
    padding: 0 10px;
  }
  .footer-inline-form input {
    width: 100% !important;
  }
}
      `}</style>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>×</button>
          <img src={lightbox} alt="Gallery" />
        </div>
      )}

      {/* NAV */}
      <nav style={{ background: navBg, boxShadow: navShadow }}>
        <div className="nav-inner">
          <div>
          <img src="../images/elegant_builders.webp" alt="Elegant Logo"  style={{ height: 60, objectFit: "contain", }}/>
          <img
            src="../images/elegantatmoslogo.webp"
            alt="Elegant Atmos"
            style={{ height: 60, objectFit: "contain",  marginLeft: '20px', }}
          />
          </div>
         
          
          <ul className="nav-links">
            {NAV_LINKS.map((l) => (
              <li key={l}>
                <button className="nav-btn" onClick={() => handleNavClick(l)}>{l}</button>
              </li>
            ))}
          </ul>
          <button className={`hamburger ${menuOpen ? "open" : ""}`}  onClick={() => setMenuOpen(!menuOpen)}>
            <span></span> <span></span> <span></span>
          </button>
        </div>
        {menuOpen && (
          <div
            className="menu-overlay"
            onClick={() => setMenuOpen(false)}
          />
        )}
        {menuOpen && (
          <div className="mobile-menu">
            {NAV_LINKS.map((l) => (
              // <button key={l} className="mobile-btn" onClick={() => scrollTo(l.toLowerCase())}>{l}</button>
              <button key={l} className="mobile-btn" onClick={() => handleNavClick(l)}>{l}</button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="hero" id="overview">
        <div className="hero-bg-pattern" />
          <div className="hero-content fade-up">
            <div className="hero-tag">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1C3.3 1 2 2.3 2 4c0 2.5 3 6 3 6s3-3.5 3-6c0-1.7-1.3-3-3-3z" fill="#b8cc94"/><circle cx="5" cy="4" r="1" fill="#3d4f27"/></svg>
              Yelahanka, Bengaluru — Facing GKVK
            </div>
            <h1 className="hero-title">
              Private. Palatial.<br/> Perfectly<em> Green.</em> 
              {/* A Whole<br />World of <em>Worth</em> */}
            </h1>
            <p className="hero-tagline">
             Discover North Bengaluru’s only Freewall homes where your walls—and your views—are yours alone. 136 limited-edition homes <span>starting from ₹1.8 Cr*</span>
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => scrollTo("contact")}>Schedule a Site Visit →</button>
              {/* <button className="btn-outline" style={{ color: "#a8c476", borderColor: "#a8c476" }} onClick={() => scrollTo("gallery")}>View Gallery</button> */}
              <button  
                className="btn-outline btn-animation"  
                style={{ color: "#a8c476", borderColor: "#a8c476" }}  
                onClick={() => setModalSource("floor-plan")} // 👈 Changed from setShowModal(true)
              > 
               Get Floor Plans & Price Sheet 
               <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1v9M5 7l3 3 3-3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 11v2a1 1 0 001 1h10a1 1 0 001-1v-2" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
               {/* <img src="./images/download.png" alt="download icon"/> */}
              </button>            
            </div>
            <div className="hero-stats">
              {[{ num: "2 Towers", sub: "G+14 Floors" }, { num: "136 Units", sub: "Freewall Homes" }, { num: "50+ Amenities", sub: "Across All Levels" }, { num: "IGBC Silver-Rated ", sub: "Green Community" }, { num: "RERA", sub: "Registered" }].map((s) => (
                <div key={s.num}>
                  <div className="hero-stat-num">{s.num}</div>
                  <div className="hero-stat-label">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        
        <div className="hero-scroll"><span>Scroll</span><span style={{ fontSize: 20 }}>↓</span></div>
      </section>

      {/* HIGHLIGHTS GRID */}
      <div className="highlights-grid">
        {HIGHLIGHTS.map((h) => (
          <div className="highlight-cell" key={h.label}>
            <div className="hl-num">{h.num}</div>
            <div className="hl-label">{h.label}</div>
            <div className="hl-sub">{h.sub}</div>
          </div>
        ))}
      </div>

      <div className="green-divider" />
      <section className="builder-recognition-section" style={{ background: '#fff', paddingBottom: '60px', paddingTop: '0', }}>
        {/* Green Stats Banner */}
        <div className="stats-banner" style={{
          background: '#3d4f27', 
          padding: '60px 20px 80px 20px', 
          textAlign: 'center',
          position: 'relative'
        }}>
          <h2 style={{ color: '#fff', fontSize: '36px', marginBottom: '15px', fontWeight: 'normal', fontFamily: "'Playfair Display', serif" }}>
            Elegant Builders &amp; Developers
          </h2>
          <p style={{ 
            color: '#e0e0e0', 
            maxWidth: '750px', 
            margin: '0 auto 40px auto', 
            fontSize: '15px', 
            lineHeight: '1.6',
            fontFamily: 'DM Sans, DM Sans, sans-serif'
          }}>
            Elegant Builders &amp; Developers has been shaping Bengaluru’s skyline for over two decades with homes built on trust, quality, design and long term value
          </p>

          {/* Floating Grid Container */}
          <div className="stats-floating-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '15px',
            maxWidth: '1200px',
            margin: '0 auto',
            position: 'absolute',
            left: '20px',
            right: '20px',
            bottom: '-40px',
            zIndex: '10'
          }}>
            {BUILDER_STATS.map((stat, i) => (
              <div key={i} style={{
                background: '#fff',
                borderRadius: '10px',
                padding: '20px 15px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                textAlign: 'center'
              }}>
                <div style={{ color: '#333', fontSize: '13px', marginBottom: '8px', fontFamily: 'DM Sans, sans-serif' }}>
                  {stat.label}
                </div>
                <div style={{ color: '#111', fontSize: '24px', fontWeight: 'bold', fontFamily: 'DM Sans, sans-serif' }}>
                  {stat.num}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards & Recognition Container */}
        <div className="recognition-container" style={{ 
          maxWidth: '1200px', 
          margin: '120px auto 0 auto', 
          padding: '0 20px', 
          textAlign: 'center' 
        }}>
          <h2 style={{ fontSize: '42px', color: '#111', marginBottom: '20px', fontWeight: 'bold', fontFamily: "'Playfair Display'", }}>
            Recognised. Consistently.
          </h2>
          <p style={{ 
            color: '#444', 
            maxWidth: '800px', 
            margin: '0 auto 50px auto', 
            fontSize: '15px', 
            lineHeight: '1.6',
            fontFamily: 'DM Sans, sans-serif'
          }}>
            Over the years, our work has been recognised across industry platforms for consistency, design clarity, and commitment to quality. Each acknowledgement reflects an approach rooted in responsibility rather than scale.
          </p>

          {/* Awards Grid Grid */}
          <div className="awards-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px 20px',
            justifyContent: 'center'
          }}>
            {AWARDS.map((award, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                textAlign: 'center' 
              }}>
                {/* Laurel Wreath SVG Graphics Wrapper */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                  {/* Left Wreath */}
                  <img src="../images/left.svg" alt=""/>

                  {/* Award Center Text */}
                  <div style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#111', width: '98px', }}>{award.title}</div>
                    <div style={{ fontSize: '14px', color: '#555', marginTop: '2px' }}>{award.year}</div>
                  </div>

                  {/* Right Wreath */}
                   <img src="../images/right.svg" alt=""/>
                </div>

                {/* Award Sub Description */}
                <p style={{ 
                  fontSize: '12.5px', 
                  color: '#666', 
                  lineHeight: '1.4', 
                  maxWidth: '180px', 
                  margin: '5px 0 0 0',
                  fontFamily: 'DM Sans, sans-serif'
                }}>
                  {award.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* OVERVIEW */}
      {/* THE PROJECT & REGISTRATION SECTION */}
    <section className="project-overview-section" style={{ background: "#fff", padding: "80px 0 0px" }}>
      <div className="container" style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px",
        display: "grid",
        gridTemplateColumns: "1fr 400px",
        gap: "40px",
        alignItems: "start"
      }}>
        
        {/* Left Side: Content & 6 Feature Cards */}
        <div>
          
          <div style={{ textAlign: "start", maxWidth: 620, margin: "0 0 10px" }}>
            <p className="section-subtitle">The Project</p>
            <h2 className="section-title"> Your Whole World of Worth</h2>
            <p style={{ marginTop: 18, fontSize: 15, color: "#666", lineHeight: 1.7 }}>
              A 1.8-acre boutique community in Yelahanka offering a rare balance of city access and peaceful green living.
            </p>
          </div>

          {/* Features Grid - Handles 6 cards seamlessly */}
          <div className="features-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px"
          }}>
            {FEATURES.map((f) => (
              <div className="feature-card" key={f.title} style={{
                background: "#f9f8f4",
                borderLeft: "4px solid #3d5334",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}>
                <div className="feature-icon" style={{ color: "#3d5334", display: "flex" }}>
                  {FEATURE_ICONS[f.iconKey]}
                </div>
                <div className="feature-title" style={{ fontFamily: "serif", fontSize: "18px", color: "#111", fontWeight: "bold" }}>
                  {f.title}
                </div>
                <p className="feature-desc" style={{ fontSize: "12.5px", lineHeight: "1.6", color: "#666", margin: 0 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Exclusive Sticky Form Container */}
        <div className="form-sticky-container" style={{
          background: "#3d5334",
          borderRadius: "28px",
          padding: "40px 30px",
          position: "sticky",
          top: "40px"
        }}>
          <h3 style={{ 
            fontFamily: "serif", 
            fontSize: "26px", 
            color: "#fff", 
            marginBottom: "25px", 
            fontWeight: "normal",
            textAlign: "left" 
          }}>
            Register for Exclusive Offers
          </h3>
          
          <form className="contact-form" onSubmit={(e) => handleSubmit(e, "general")} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            
            {/* Full Name */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ color: "#fff", fontSize: "14px" }}>Full Name <span style={{ color: "#ff6b6b" }}>*</span></label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            {/* Email Address */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ color: "#fff", fontSize: "14px" }}>Email Address <span style={{ color: "#ff6b6b" }}>*</span></label>
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            {/* Phone Number */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ color: "#fff", fontSize: "14px" }}>Phone Number <span style={{ color: "#ff6b6b" }}>*</span></label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter Phone Number"
                value={formData.phone}
                onChange={handlePhoneChange}
                maxLength="10"
                inputMode="numeric"
                pattern="[6-9][0-9]{9}"
                required
                style={inputStyle}
              />
            </div>

            {/* Message */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ color: "#fff", fontSize: "14px" }}>Your Message to Us <span style={{ color: "#ff6b6b" }}>*</span></label>
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                style={{ ...inputStyle, height: "80px", resize: "none", borderRadius: "20px" }}
              />
            </div>

            {/* Form Submit Button */}
            <button
              className="btn-primary"
              disabled={loading}
              style={{
                width: "100%",
                background: "#fff",
                color: "#3d5334",
                border: "none",
                borderRadius: "50px",
                padding: "14px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                marginTop: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "all 0.2s ease"
              }}
            >
              {loading ? "Submitting..." : "Contact Us"}
            </button>

            {success && <p style={{ color: "#a9dfbf", fontSize: "13px", margin: "5px 0 0 0", textAlign: "center" }}>{success}</p>}
            {error && <p style={{ color: "#f5b7b1", fontSize: "13px", margin: "5px 0 0 0", textAlign: "center" }}>{error}</p>}
          </form>
        </div>

      </div>
     <div style={{ display: "flex", justifyContent: "center", width: "100%", padding: '60px 0px', }}>
      <button className="btn-primary" onClick={() => scrollTo("contact")}>
        Schedule a Site Visit →
      </button>
    </div>
    </section>

      {/* LOCATION */}
      <section className="location-section" id="location">
        <div className="container">
          <div className="location-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
            <div>
              <p className="section-subtitle">Drop a Pin on Perfection</p>
              <h2 className="section-title">Surrounded by<br />Living Sanctuaries</h2>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, lineHeight: 1.8, marginTop: 20, marginBottom: 36 }}>
                Elegant Atmos sits at the heart of Yelahanka, Bengaluru — connected to everything that matters, yet wrapped in over 4,000 acres of protected green.
              </p>
              <div style={{ background: "rgba(95,115,60,0.25)", border: "1px solid rgba(95,115,60,0.5)", borderRadius: 12, padding: "20px 24px" }}>
                <p style={{ color: "#a8c476", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>Address</p>
                <p style={{ color: "#fff", fontSize: 14, lineHeight: 1.6 }}>
                  Major Sandeep Unnikrishnan Road, Bettahalli Layout,<br />
                  Vidyaranyapura, Yelahanka New Town,<br />Bengaluru, Karnataka
                </p>
              </div>
            </div>
            <div className="green-zones">
              {GREEN_ZONES.map((g) => (
                <div className="green-zone-card" key={g.dir}>
                  <div className="gz-dir">{g.dir}</div>
                  <div className="gz-places">{g.places}</div>
                  <div className="gz-stat">{g.stat} of pristine nature</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section id="amenities" style={{ background: "#fff", padding: '80px 0px', }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 60px" }}>
            <p className="section-subtitle">World-Class Living</p>
            <h2 className="section-title">Amenities That Make<br />Life Worth Living</h2>
            <p style={{ marginTop: 18, fontSize: 15, color: "#666", lineHeight: 1.7 }}>
              Over 50 amenities scattered across all floors, open spaces, the terrace, and within a clubhouse spanning 10,000 sq.ft.
            </p>
          </div>
          <div className="amenity-grid">
            {AMENITY_CATS.map((cat) => (
              <div className="amenity-card" key={cat.title}>
                <div className="amenity-card-header">
                  <span>{AMENITY_ICONS[cat.iconKey]}</span>
                  <span className="amenity-title">{cat.title}</span>
                </div>
                <ul className="amenity-list">
                  {cat.items.map((item) => (
                    <li key={item}><span className="amenity-dot" />{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY YELAHANKA SECTION */}
      <section className="why-yelahanka-section" style={{ background: "#fff", padding: "20px 0px 80px" }}>
        <div className="container" style={{ maxWidth: "1500px", margin: "0 auto", padding: "0 20px" }}>
          
          {/* Header Block */}
          <div style={{ textAlign: "center", maxWidth: 850, margin: "0 auto 60px" }}>
            <p className="section-subtitle">Location Strategy</p>
            <h2 className="section-title">Why Yelahanka?</h2>
            <p style={{ marginTop: 18, fontSize: 15, color: "#666", lineHeight: 1.7 }}>
              Over the years, our work has been recognised across industry platforms for consistency, design clarity, and commitment to quality. Each acknowledgement reflects an approach rooted in responsibility rather than scale.
            </p>
          </div>

          {/* Top Grid: Structural Map Image + Connectivity Times */}
          <div className="location-grid" style={{ 
            display: "grid", 
            gridTemplateColumns: "1.1fr 0.9fr", 
            gap: "40px", 
            alignItems: "center",
            marginBottom: "40px" 
          }}>
            {/* Left side: Project Layout / Route Outline Mock */}
            <div style={{
              minHeight: "250px"
            }}>
              {/* Replace with your local layout illustration image path if needed */}
              <div className="why-img-wrap" onClick={() => setLightbox("../images/master-map.png")}>
              <img 
                src="../images/map.png" 
                alt="Location Roadmap" 
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
              </div>
            </div>

            {/* Right side: Commute Duration Elements */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              
              {/* Item 1 */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "between", width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <img src="../images/railway.svg" alt="railway station" />
                  <span style={{ fontSize: "14.5px", color: "#222", fontWeight: "500", fontFamily: "DM Sans, sans-serif" }}>Yelahanka Railway Station, Schools &amp; Hospitals</span>
                </div>
                <span style={{ fontSize: "14px", color: "#333", marginLeft: "auto", fontWeight: "bold", fontFamily: "DM Sans, sans-serif" }}>10 Mins</span>
              </div>

              {/* Item 2 */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "between", width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                   <img src="../images/flyover.svg" alt="Flyover" />
                  <span style={{ fontSize: "14.5px", color: "#222", fontWeight: "500", fontFamily: "DM Sans, sans-serif" }}>Hebbal Flyover</span>
                </div>
                <span style={{ fontSize: "14px", color: "#333", marginLeft: "auto", fontWeight: "bold", fontFamily: "DM Sans, sans-serif" }}>15 Mins</span>
              </div>

              {/* Item 3 */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "between", width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                   <img src="../images/tech-park.svg" alt="Tech Park" />
                  <span style={{ fontSize: "14.5px", color: "#222", fontWeight: "500", fontFamily: "DM Sans, sans-serif" }}>Manyata Tech Park, New BEL Road</span>
                </div>
                <span style={{ fontSize: "14px", color: "#333", marginLeft: "auto", fontWeight: "bold", fontFamily: "DM Sans, sans-serif" }}>20 Mins</span>
              </div>

              {/* Item 4 */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "between", width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                   <img src="../images/airport.svg" alt="Airport" />
                  <span style={{ fontSize: "14.5px", color: "#222", fontWeight: "500", fontFamily: "DM Sans, sans-serif" }}>Kempegowda International Airport</span>
                </div>
                <span style={{ fontSize: "14px", color: "#333", marginLeft: "auto", fontWeight: "bold", fontFamily: "DM Sans, sans-serif" }}>25 Mins</span>
              </div>

            </div>
          </div>
       
          {/* Middle Section: Fully Functional Embedded Google Map */}
          <div style={{ width: "100%", height: "320px", borderRadius: "30px", overflow: "hidden", marginBottom: "-20px", position: "relative", zIndex: "1" }}>
            <iframe
              title="Google Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.6728347895475!2d77.5732101!3d13.0881525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1c8711acbc11%3A0x5c55ad4041a6c3e1!2sMajor%20Sandeep%20Unnikrishnan%20Rd%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1716300000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto",  background: "#3d5334", borderRadius: "28px", padding: "50px 40px", }}>
          <h2 style={{ color: '#fff', fontSize: '36px', margin: '10px 0px 20px', fontWeight: 'normal', fontFamily: "'Playfair Display', serif", textAlign: 'center', }}>
           Live in the New Downtown of North Bengaluru
          </h2>
          
          {/* Bottom Section: Three Column Feature Grid Banner */}
          <div className="green-highlights-banner" style={{
           
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "40px",
            textAlign: "center",
            position: "relative",
          }}>
          
            {/* Feature 1 */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img src="../images/heritage.svg" alt="Heritage" />
                <h4 style={{ color: "#fff", textTransform: "uppercase", fontSize: "18px", letterSpacing: "1px", margin: "5px 0 0 0", fontFamily: "DM Sans, sans-serif" }}>
                  The Heritage
                </h4>
              </div>
              <p style={{ color: "#d0ded0", fontSize: "16px", lineHeight: "1.6", margin: 0, maxWidth: "280px", fontFamily: "DM Sans, sans-serif" }}>
                One of Bengaluru's oldest and most established residential belts, now evolving into a high-growth hub.
              </p>
            </div>

            {/* Feature 2 */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img src="../images/green.svg" alt="Greenery" />
                <h4 style={{ color: "#fff", textTransform: "uppercase", fontSize: "18px", letterSpacing: "1px", margin: "5px 0 0 0", fontFamily: "DM Sans, sans-serif" }}>
                  The Greenery
                </h4>
              </div>
              <p style={{ color: "#d0ded0", fontSize: "16px", lineHeight: "1.6", margin: 0, maxWidth: "280px", fontFamily: "DM Sans, sans-serif" }}>
                A proper residential choice surrounded by well-maintained lakes and 4 reserved forest zones.
              </p>
            </div>

            {/* Feature 3 */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img src="../images/connectivity.svg" alt="Connectivity" />
                <h4 style={{ color: "#fff", textTransform: "uppercase", fontSize: "18px", letterSpacing: "1px", margin: "5px 0 0 0", fontFamily: "DM Sans, sans-serif" }}>
                  The Connectivity
                </h4>
              </div>
              <p style={{ color: "#d0ded0", fontSize: "16px", lineHeight: "1.6", margin: 0, maxWidth: "280px", fontFamily: "DM Sans, sans-serif" }}>
                Seamless access to the Airport (25 mins) and the upcoming Airport Metro Line.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery-section" id="gallery">
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: 580, margin: "0 auto 48px" }}>
            <p className="section-subtitle">Visual Journey</p>
            <h2 className="section-title">See Atmos Come to Life</h2>
          </div>
          <div className="gallery-tabs">
            {Object.keys(GALLERY).map((tab) => (
              <button key={tab} className={`gallery-tab${galleryTab === tab ? " active" : ""}`} onClick={() => setGalleryTab(tab)}>{tab}</button>
            ))}
          </div>
          {galleryTab === "Floor Plan" ? (
            <div className="floorplan-section-container" style={{ position: 'relative', width: '100%', height: '450px' }}>
  
            {/* 1. THE ENTIRE GRID CONTAINING YOUR PRE EXISTING CARDS (BLURRED) */}
            <div 
              className="floorplan-grid" 
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // Preserves your layout alignment rules
                gap: "24px",
                width: "100%",
                filter: "blur(15px)", // 👈 Blurs out all images, text tags, and cards combined
                opacity: 0.4, // Softens the background contrast so your button stands out beautifully
                pointerEvents: "none", // Completely blocks user clicks or inspect drags on individual items
                userSelect: "none"
              }}
            >
              {FLOOR_PLANS.map((plan) => (
                <FloorPlanCard key={plan.label} plan={plan} />
              ))}
            </div>

            {/* 2. SOLID ABSOLUTE OVERLAY TO CENTERED BUTTON */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10
            }}>
              <button  
                className="btn-outline"  
                style={{ 
                  color: "#5F733C", 
                  borderColor: "#5F733C",
                  backgroundColor: "#ffffff", // Crisp white background anchors visibility over the multi-colored blur layout
                  padding: "16px 36px",
                  borderRadius: "50px",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "0 10px 30px rgba(95, 115, 60, 0.2)", // Distinct shadow depth matching the template profile
                  letterSpacing: "0.02em",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontFamily: "'DM Sans', sans-serif"
                }}  
                onClick={() => setModalSource("floor-plan")}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#5F733C';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = '#5F733C';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              > 
                {/* Modern lock padlock indicator icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                Unlock Floor Plans
              </button>
            </div>
          </div>
          ) : galleryTab === "Master Plan" ? (
            <div style={{ textAlign: "center" }}>
              <div className="gallery-img-wrap" style={{ maxWidth: 800, margin: "0 auto", aspectRatio: "16/10" }} onClick={() => setLightbox(GALLERY["Master Plan"][0])}>
                <img src={GALLERY["Master Plan"][0]} alt="Master Plan" style={{ width: "100%", height: "100%", objectFit: "contain", background: "#f5f3ed" }} />
              </div>
            </div>
          ) : (
            <div className="gallery-grid">
              {GALLERY[galleryTab].map((src, i) => (
                <div className="gallery-img-wrap" key={i} onClick={() => setLightbox(src)}>
                  <img src={src} alt={`${galleryTab} ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SUSTAINABILITY */}
      <section className="sustain-section" id="sustainability">
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 60px" }}>
            <p className="section-subtitle">Built for the Future</p>
            <h2 className="section-title">Atmos Keeps the<br />Natural Elements in Balance</h2>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, lineHeight: 1.8, marginTop: 18 }}>
              Every design decision is guided by the earth — from renewable energy systems to climate-responsive architecture, this is a home that gives back.
            </p>
          </div>
          <div className="sustain-grid">
            {SUSTAIN.map((s) => (
              <div className="sustain-card" key={s.title}>
                <div className="sustain-icon">{SUSTAIN_ICONS[s.iconKey]}</div>
                <div className="sustain-title">{s.title}</div>
                <p className="sustain-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIFICATIONS */}
      <section className="specs-section">
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 56px" }}>
            <p className="section-subtitle">Premium Finishes</p>
            <h2 className="section-title">The Elegance Shines<br />Through in the Build</h2>
          </div>
          <div className="specs-grid">
            {[
              { cat: "Structure", items: ["RCC framed structure", "Seismic Zone 2 compliant", "Premium construction quality"] },
              { cat: "Flooring", items: ["Vitrified tiles – all areas", "Anti-skid ceramic – bathrooms", "Vitrified / Granite / Kota stone – common areas"] },
              { cat: "Doors & Windows", items: ["8 ft Japanese-tech main door (Sumai)", "7 ft pre-hung internal doors", "UPVC windows (Eureka or equivalent)", "UPVC ventilators with exhaust provision"] },
              { cat: "Finishes", items: ["Emulsion paint – interiors", "Exterior texture paint", "Oil bound distemper – ceilings"] },
              { cat: "Electrical", items: ["Smart home switches (Schneider)", "FRLS wiring (Finolex)", "4 kVA (3BHK) / 5 kVA (3.5BHK)", "EV charging point provision"] },
              { cat: "Kitchen & Baths", items: ["Granite countertop + SS sink", "Grohe-grade CP fittings", "Wall-mounted EWC (Grohe)", "Hot & cold water provision throughout"] },
            ].map((s) => (
              <div className="spec-card" key={s.cat}>
                <div className="spec-category">{s.cat}</div>
                {s.items.map((item) => <div className="spec-item" key={item}>{item}</div>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-section">
        <div className="container">
          <img
            src="../images/elegant_builders.webp"
            alt="Elegant Builders"
            style={{ height: 60, objectFit: "contain", marginBottom: 32, opacity: 0.9 }}
          />
          <p className="section-subtitle" style={{ color: "#a8c476" }}>Since 2004</p>
          <h2 className="section-title" style={{ margin: "0 auto", maxWidth: 700 }}>Crafting Homes Worthy of Time</h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, lineHeight: 1.8, maxWidth: 640, margin: "24px auto 0" }}>
            Elegant Builders & Developers has been quietly shaping the skyline of Bengaluru for over two decades. Our journey is guided by ethics, empathy, and the joy of creating places people are proud to call home.
          </p>
          <div className="about-stats">
            {[{ n: "16,000+", l: "Happy Customers" }, { n: "50+", l: "Projects Delivered" }, { n: "3.5M", l: "Sq.ft Built" }, { n: "2,540+", l: "Amenities Created" }].map((s) => (
              <div key={s.l} style={{ textAlign: "center" }}>
                <div className="about-stat-n">{s.n}</div>
                <div className="about-stat-l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p className="section-subtitle">Get in Touch</p>
            <h2 className="section-title">Your Dream Home Awaits</h2>
            <p style={{ marginTop: 18, fontSize: 15, color: "#666", lineHeight: 1.7 }}>
              Limited Inventory Available. Join 136 families in a community designed for tomorrow’s appreciation.
            </p>
          </div>
          <div className="contact-card">
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", marginBottom: 32, color: "var(--charcoal)" }}>Book a Site Visit</h3>
              <form className="contact-form" onSubmit={(e) => handleSubmit(e, "general")}>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  maxLength="10"
                  inputMode="numeric"
                  pattern="[6-9][0-9]{9}"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="message"
                  placeholder="Any questions or preferences?"
                  value={formData.message}
                  onChange={handleChange}
                />
                <button
                  className="btn-primary"
                  style={{
                    width: "100%",
                    justifyContent: "center"
                  }}
                  disabled={loading}
                >
                  {
                    loading
                      ? "Submitting..."
                      : "Request a Callback →"
                  }
                </button>

                {
                  success &&
                  <p style={{
                    color: "green",
                    marginTop: 15
                  }}>
                    {success}
                  </p>
                }

                {
                  error &&
                  <p style={{
                    color: "red",
                    marginTop: 15
                  }}>
                    {error}
                  </p>
                }
              </form>
            </div>
            <div>
              <div style={{ background: "var(--cream)", borderRadius: 16, padding: "36px 32px", marginBottom: 28 }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontStyle: "italic", color: "var(--charcoal)", lineHeight: 1.5, marginBottom: 20 }}>
                  "Having it all was once a promised whisper… but now, that castle in the sky can have your name on the front door."
                </p>
                <div style={{ width: 40, height: 3, background: "var(--green)", borderRadius: 2 }} />
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2C7.2 2 5 4.2 5 7c0 4.5 5 11 5 11s5-6.5 5-11c0-2.8-2.2-5-5-5z" stroke="#fff" strokeWidth="1.6" fill="none"/><circle cx="10" cy="7" r="2" stroke="#fff" strokeWidth="1.4" fill="none"/></svg>
                </div>
                <div>
                  <div className="contact-info-label">Address</div>
                  <div className="contact-info-val">Major Sandeep Unnikrishnan Road, Bettahalli Layout, Yelahanka New Town, Bengaluru</div>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 3h3l1.5 4-2 1.2a10 10 0 004.3 4.3L12 10.5l4 1.5v3a2 2 0 01-2 2C7.4 17 3 12.6 3 5a2 2 0 012-2z" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div className="contact-info-label">Phone</div>
                  <div className="contact-info-val">+91 888 424 4879</div>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2" stroke="#fff" strokeWidth="1.6" fill="none"/><path d="M2 7l8 5 8-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
                <div>
                  <div className="contact-info-label">RERA</div>
                  <div className="contact-info-val">PRM/KA/RERA/309/125/PR/008010/200025</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer> 
        <div  style={{ height: 48, objectFit: "contain", marginBottom: 20, opacity: 0.9 }} >
          <img src="../images/elegant_builders.webp" alt="Elegant Logo"  style={{ height: 44, objectFit: "contain", }}/>
          <img
            src="../images/elegantatmoslogo.webp"
            alt="Elegant Atmos"
            style={{ height: 44, objectFit: "contain", marginLeft: '20px', }}
          />
          </div>   
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 8, fontFamily: 'DM Sans, sans-serif' }}>Yelahanka, Bengaluru · +91 888 424 4879</p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontFamily: 'DM Sans, sans-serif' }}>© 2026 Elegant Builders & Developers. All rights reserved.</p>
      </footer>

    
      {/* WHATSAPP FLOATING BUTTON */}
      <a
        href="https://wa.me/918884244879"
        target="_blank"
        rel="noopener noreferrer"
        className="wa-fab"
        aria-label="Chat on WhatsApp"
      >
         <img src="../images/whatsapp.svg" alt="Whatsapp"  style={{ height: 44, objectFit: "contain" }}/>
      </a>
      <a
        href="tel:918884244879"
        target="_blank"
        rel="noopener noreferrer"
        className="phn-fab"
        aria-label="Chat on WhatsApp"
      >
         <img src="../images/phone.svg" alt="Phone"  style={{ height: 37, objectFit: "contain" }}/>
      </a>

      {/* FLOATING DOWNLOAD BROCHURE BUTTON */}
      {/* <a
        href="https://kevnitserver.com/projects/elegant_builders/Elegant_atmos_Brochure.pdf"
        target="_blank"
        rel="noopener noreferrer"
        style={{ position: "fixed", bottom: 32, right: 32, zIndex: 800, display: "flex", alignItems: "center", gap: 10, background: "#5F733C", color: "#fff", padding: "13px 22px", borderRadius: 50, fontFamily: "'DM Sans', DM Sans, sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", textDecoration: "none", boxShadow: "0 6px 28px rgba(95,115,60,0.45)", transition: "transform 0.2s, box-shadow 0.2s, background 0.2s" }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.background = "#3d4f27"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "#5F733C"; }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1v9M5 7l3 3 3-3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 11v2a1 1 0 001 1h10a1 1 0 001-1v-2" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
        Download Brochure
      </a> */}
      <button
  onClick={() => setModalSource("brochure")}
  style={{ 
    position: "fixed", 
    bottom: 32, 
    right: 32, 
    zIndex: 800, 
    display: "flex", 
    alignItems: "center", 
    gap: 10, 
    background: "#5F733C", 
    color: "#fff", 
    padding: "13px 22px", 
    borderRadius: 50, 
    fontFamily: "'DM Sans', DM Sans, sans-serif", 
    fontSize: 13, 
    fontWeight: 600, 
    letterSpacing: "0.06em", 
    textDecoration: "none", 
    boxShadow: "0 6px 28px rgba(95,115,60,0.45)", 
    transition: "transform 0.2s, box-shadow 0.2s, background 0.2s",
    border: "none",
    cursor: "pointer"
  }}
  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.background = "#3d4f27"; }}
  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "#5F733C"; }}
>
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 1v9M5 7l3 3 3-3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 11v2a1 1 0 001 1h10a1 1 0 001-1v-2" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
  Download Brochure
</button>
      {/* POPUP MODAL ENVELOPE */}
{/* UNIFIED POPUP MODAL */}
{modalSource && (
  <div 
    className="modal-overlay" 
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(20px)',          
      WebkitBackdropFilter: 'blur(8px)',    
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
      boxSizing: 'border-box'
    }}
    onClick={() => setModalSource("")} 
  >
    <div 
      className="modal-content" 
      style={{
        background: '#fff',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '480px',
        padding: '40px 30px',
        position: 'relative',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        boxSizing: 'border-box'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <button 
        onClick={() => setModalSource("")}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'none',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          color: '#888',
          lineHeight: '1'
        }}
      >
        &times;
      </button>

      {/* Dynamic Header Titles */}
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", marginBottom: 32, color: "var(--charcoal)", marginTop: 0 }}>
        {modalSource === "brochure" 
          ? "Download Project Brochure" 
          : modalSource === "floor-plan" 
          ? "Get Floor plan & Price Sheet" 
          : "Book a Site Visit"}
      </h3>
      
      <form 
        className="contact-form" 
        onSubmit={(e) => handleSubmit(e, modalSource)} // 👈 Dynamically passes "brochure", "floor-plan", or "popup"
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      >
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handlePhoneChange}
          maxLength="10"
          inputMode="numeric"
          pattern="[6-9][0-9]{9}"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Any questions or preferences?"
          value={formData.message}
          onChange={handleChange}
          style={{ minHeight: '80px', resize: 'vertical' }}
        />
        
        <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={loading}>
          {loading 
            ? "Submitting..." 
            : modalSource === "brochure" 
            ? "Get Brochure Now →" 
            : modalSource === "floor-plan"
            ? "Get Now →" 
            : "Request a Callback →"}
        </button>

        {success && <p style={{ color: "green", marginTop: 5, marginBottom: 0 }}>{success}</p>}
        {error && <p style={{ color: "red", marginTop: 5, marginBottom: 0 }}>{error}</p>}
      </form>
    </div>
  </div>
)}
    </>
  );
}