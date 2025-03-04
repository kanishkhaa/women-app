import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { 
  Book, ListChecks, ShieldCheck, Droplet, HeartPulse, Trash2, 
  MessageCircle, Menu, Landmark 
} from "lucide-react";


const Sidebar = () => {
  const [active, setActive] = useState(""); // Tracks active item
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { category: "Natural Processes", items: [
        { name: "Reproductive Phenomena", icon: <Droplet size={20} />, path: "/reproductive-phenomena" },
        { name: "Maternal Health", icon: <HeartPulse size={20} />, path: "/maternal-health" },
        { name: "Sexual & Intimate Health", icon: <ShieldCheck size={20} />, path: "/sexual-intimate-health" }
      ]
    },
    { category: "Diseases & Disorders", items: [
        { name: "Blogs", icon: <Book size={20} />, path: "/blogs" },
        { name: "Cancer Awareness", icon: <HeartPulse size={20} />, path: "/cancer" },
        { name: "Hormonal Disorders", icon: <ShieldCheck size={20} />, path: "/hormonal-disorders" },
        { name: "Reproductive Disorders", icon: <ListChecks size={20} />, path: "/reproductive-disorders" }
      ]
    },
    { category: "Sanitary Guidance", items: [
        { name: "Sanitary Products", icon: <HeartPulse size={20} />, path: "/sanitary" },
        { name: "Decomposition Techniques", icon: <Trash2 size={20} />, path: "/" }
      ]
    },
    { category: "Home Remedies", path: "/remedies", items: [] },
    { category: "Trackers", items: [
        { name: "Period Tracker", icon: <ListChecks size={20} />, path: "/period-tracker" },
        { name: "Pregnancy Tracker", icon: <ListChecks size={20} />, path: "/pregnancy-tracker" }
      ]
    },
    { category: "Myths vs Facts", path: "/spinner", items: [] },
    { category: "Government Schemes", items: [
        { name: "Schemes & Benefits", icon: <Landmark size={20} />, path: "/schemes" }
      ]
    },
    { category: "Community Forum", items: [
        { name: "Discord", icon: <MessageCircle size={20} />, path: "/community-forum" }
      ]
    },
    { category: "Help & Support", path: "/help", items: [] }
  ];

  return (
    <div
      className={`absolute left-0 top-0 ${collapsed ? "w-[80px]" : "w-[250px]"} min-h-screen text-white shadow-lg flex flex-col p-4 transition-all duration-300`}
      style={{ backgroundColor: "#2C3E50" }}
    >
      {/* Menu Toggle Button */}
      <div
        className="flex items-center gap-2 cursor-pointer hover:text-gray-200 transition p-2 rounded-lg hover:bg-opacity-20 hover:bg-white"
        onClick={() => setCollapsed(!collapsed)}
      >
        <Menu size={28} />
        {!collapsed && <span className="text-xl font-bold">Menu</span>}
      </div>

      {/* Navigation List */}
      <ul className="mt-6 space-y-2">
        {menuItems.map((section) => (
          <div key={section.category}>
            {/* Clickable Category Title - Navigates if `path` exists */}
            <h3
              className={`text-lg font-semibold text-white opacity-80 mb-2 cursor-pointer transition p-2 rounded-lg ${
                active === section.category ? "bg-opacity-30 bg-white" : "hover:bg-opacity-20 hover:bg-white"
              }`}
              onClick={() => {
                if (section.path) {
                  navigate(section.path);
                  setActive(section.category); // Set only category active
                }
              }}
            >
              {section.category}
            </h3>

            {/* Render items if available */}
            {section.items.length > 0 && section.items.map((item) => (
              <li
                key={item.name}
                className={`flex items-center ${collapsed ? "justify-center" : "gap-3"} px-4 py-3 rounded-lg cursor-pointer transition-all ${
                  active === item.name ? "bg-opacity-30 bg-white" : "hover:bg-opacity-20 hover:bg-white"
                }`}
                onClick={() => {
                  navigate(item.path);
                  setActive(item.name); // Set only item active
                }}
              >
                {item.icon}
                {!collapsed && <span className="text-lg">{item.name}</span>}
              </li>
            ))}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;