import React, { useState } from "react";
import { Book, ListChecks, ShieldCheck, GraduationCap, LifeBuoy, MessageCircle, Menu } from "lucide-react";

const Sidebar = ({ onSelect }) => {
  const [active, setActive] = useState("Myth vs Facts");
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Blogs", icon: <Book size={collapsed ? 26 : 20} /> },
    { name: "Tracker", icon: <ListChecks size={collapsed ? 26 : 20} /> },
    { name: "Myth vs Facts", icon: <ShieldCheck size={collapsed ? 26 : 20} /> },
    { name: "Tutorials", icon: <GraduationCap size={collapsed ? 26 : 20} /> },
    { name: "Help & Support", icon: <LifeBuoy size={collapsed ? 26 : 20} /> },
    { name: "Discord", icon: <MessageCircle size={collapsed ? 26 : 20} /> },
  ];

  return (
    <div
      className={`h-screen ${
        collapsed ? "w-[80px]" : "w-[250px]"
      } text-white shadow-lg fixed left-0 top-0 flex flex-col p-4 transition-all duration-300`}
      style={{ backgroundColor: "#D991A3" }} // Custom Background Color
    >
      {/* Menu Toggle Button */}
      <div
        className="flex items-center gap-2 cursor-pointer hover:text-gray-200 transition"
        onClick={() => setCollapsed(!collapsed)}
      >
        <Menu size={28} />
        {!collapsed && <span className="text-xl font-bold">Menu</span>}
      </div>

      {/* Navigation List */}
      <ul className="mt-11 space-y-3">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`flex items-center ${
              collapsed ? "justify-center" : "gap-3"
            } px-4 py-3 rounded-lg cursor-pointer transition-all ${
              active === item.name ? "bg-opacity-30 bg-white" : "hover:bg-opacity-20 hover:bg-white"
            }`}
            onClick={() => {
              setActive(item.name);
              onSelect(item.name);
            }}
          >
            {item.icon}
            {!collapsed && <span className="text-lg">{item.name}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
