import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Sidebar from '../../components/Sidebar/Sidebar';

const DisposalMethods = [
  { icon: "🚽", name: "Flush", path: "/flush" },
  { icon: "🔥", name: "Burn", path: "/burn" },
  { icon: "🗑", name: "Wrap & Bin", path: "/wrap" },
  { icon: "🌱", name: "Bury", path: "/bury" },
  { icon: "♻️", name: "Compost", path: "/compost" },
  { icon: "♨️", name: "Medical Incineration", path: "/incineration" },
  { icon: "🚮", name: "Throw in Open Waste", path: "/openwaste" },
  { icon: "🏭", name: "Industrial Recycling", path: "/recycle" }
];

function CustomCard({ icon, name, link }) {
  return (
    <Link to={link}>
      <motion.div
        whileTap={{ scale: 0.9 }}
        className="cursor-pointer bg-white shadow-lg hover:shadow-xl transition-all rounded-lg p-6 flex flex-col items-center text-center w-80 h-96"
      >
        <div className="text-[120px] mb-6">{icon}</div>
        <p className="text-3xl font-bold mt-6">{name}</p>
      </motion.div>
    </Link>
  );
}

export default function DisposalCards() {
  return (
    <div className="flex">
      {/* Sidebar on the left */}
      <div className="w-[250px]">
        <Sidebar />
      </div>

      {/* Cards section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-6 p-6 justify-center ml-20">
        {DisposalMethods.map((method, index) => (
          <CustomCard key={index} icon={method.icon} name={method.name} link={method.path} />
        ))}
      </div>
    </div>
  );
}
