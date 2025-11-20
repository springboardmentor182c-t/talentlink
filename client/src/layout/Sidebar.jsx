import React, { useState } from 'react';
import { Menu, X, Briefcase, MessageSquare, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const navigate = useNavigate();
  
  const menuItems = [
    { icon: <Menu className="w-5 h-5" />, label: 'Dashboard', active: true },
    { icon: <Users className="w-5 h-5" />, label: 'Candidates' },
    { icon: <Briefcase className="w-5 h-5" />, label: 'Jobs' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Messages' }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-[#1e3a8e] text-white
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-[#3b4f87]">
            <h1 className="text-xl font-bold">Talent Link</h1>
            <button onClick={onClose} className="lg:hidden hover:bg-[#2d3875] p-1 rounded transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Menu Items */}
          <nav className="flex-1 p-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveItem(item.label);

                  // navigate to correct route
                  if (item.label === 'Dashboard') {
                    navigate('/');
                  } else if (item.label === 'Candidates') {
                    navigate('/candidates');
                  } else if (item.label === 'Jobs') {
                    navigate('/jobs');
                  } else if (item.label === 'Messages') {
                    navigate('/messages');
                  }

                  // close sidebar on mobile
                  if (onClose) onClose();
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2
                  transition-colors duration-200
                  ${activeItem === item.label 
                    ? 'bg-[#2d3875] text-white font-semibold' 
                    : 'text-gray-200 hover:bg-[#2d3875] hover:text-white'
                  }
                `}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;