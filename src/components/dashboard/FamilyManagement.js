/*
 * File: src/app/components/dashboard/FamilyManagement.js
 * Folder Structure:
 * src/app/
 * ├── components/
 * │   ├── dashboard/
 * │   │   ├── FamilyManagement.js (this file)
 * │   │   ├── DashboardOverview.js
 * │   │   ├── PortfolioSummary.js
 * │   │   └── OnboardingPrompt.js
 * │   ├── layout/Header.js
 * │   └── ui/Button.js, Input.js
 * ├── lib/utils.js, constants.js
 * └── styles/globals.css
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlusIcon,
  UserGroupIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ShieldCheckIcon,
  BanknotesIcon,
  ChartBarIcon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { formatCurrency } from '../../lib/utils';

const FamilyManagement = ({ userData, setUserData }) => {
  const [showAddMember, setShowAddMember] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [newMember, setNewMember] = useState({
    name: '',
    relationship: '',
    email: '',
    access: 'View Only'
  });

  const relationshipOptions = [
    'Spouse',
    'Child',
    'Parent',
    'Sibling',
    'Guardian',
    'Other'
  ];

  const accessLevels = [
    { value: 'View Only', description: 'Can view portfolio but cannot make changes' },
    { value: 'View & Invest', description: 'Can view and make investments' },
    { value: 'Full Access', description: 'Complete access including withdrawals' }
  ];

  const handleAddMember = () => {
    if (newMember.name && newMember.relationship && newMember.email) {
      const member = {
        id: Date.now(),
        ...newMember,
        portfolioValue: 0,
        joinedDate: new Date().toISOString()
      };
      
      setUserData(prev => ({
        ...prev,
        familyMembers: [...prev.familyMembers, member]
      }));
      
      setNewMember({ name: '', relationship: '', email: '', access: 'View Only' });
      setShowAddMember(false);
    }
  };

  const handleEditMember = (member) => {
    setEditingMember(member);
  };

  const handleUpdateMember = (updatedMember) => {
    setUserData(prev => ({
      ...prev,
      familyMembers: prev.familyMembers.map(member => 
        member.id === updatedMember.id ? updatedMember : member
      )
    }));
    setEditingMember(null);
  };

  const handleRemoveMember = (memberId) => {
    setUserData(prev => ({
      ...prev,
      familyMembers: prev.familyMembers.filter(member => member.id !== memberId)
    }));
  };

  const getTotalFamilyValue = () => {
    return userData.totalPortfolioValue + userData.familyMembers.reduce((sum, member) => sum + member.portfolioValue, 0);
  };

  const getAccessIcon = (access) => {
    switch (access) {
      case 'View Only':
        return <EyeIcon className="w-4 h-4" />;
      case 'View & Invest':
        return <BanknotesIcon className="w-4 h-4" />;
      case 'Full Access':
        return <ShieldCheckIcon className="w-4 h-4" />;
      default:
        return <EyeIcon className="w-4 h-4" />;
    }
  };

  const getAccessColor = (access) => {
    switch (access) {
      case 'View Only':
        return 'text-gray-400 bg-gray-500/20';
      case 'View & Invest':
        return 'text-blue-400 bg-blue-500/20';
      case 'Full Access':
        return 'text-green-400 bg-green-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="space-y-8">
      {/* Family Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-2xl text-black"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <UserGroupIcon className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Family Wealth</h2>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-80">Total Family Portfolio</p>
            <p className="text-3xl font-bold">{formatCurrency(getTotalFamilyValue())}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-black/10 p-3 rounded-xl">
            <p className="text-xs opacity-80 mb-1">Your Portfolio</p>
            <p className="font-bold">{formatCurrency(userData.totalPortfolioValue)}</p>
          </div>
          {userData.familyMembers.slice(0, 3).map((member) => (
            <div key={member.id} className="bg-black/10 p-3 rounded-xl">
              <p className="text-xs opacity-80 mb-1">{member.name}</p>
              <p className="font-bold">{formatCurrency(member.portfolioValue)}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Add Member Button */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Family Members ({userData.familyMembers.length}/5)</h2>
        <motion.button
          onClick={() => setShowAddMember(true)}
          disabled={userData.familyMembers.length >= 5}
          className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
            userData.familyMembers.length >= 5
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-yellow-500 text-black hover:bg-yellow-400 hover:scale-105'
          }`}
          whileHover={userData.familyMembers.length < 5 ? { scale: 1.05 } : {}}
          whileTap={userData.familyMembers.length < 5 ? { scale: 0.95 } : {}}
        >
          <UserPlusIcon className="w-5 h-5" />
          <span>Add Member</span>
        </motion.button>
      </div>

      {/* Family Members List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userData.familyMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-lg">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{member.name}</h3>
                  <p className="text-gray-400 text-sm">{member.relationship}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEditMember(member)}
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <PencilIcon className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  onClick={() => handleRemoveMember(member.id)}
                  className="p-2 bg-gray-800 rounded-lg hover:bg-red-500/20 transition-colors"
                >
                  <TrashIcon className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Portfolio Value</span>
                <span className="text-white font-semibold">{formatCurrency(member.portfolioValue)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Access Level</span>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getAccessColor(member.access)}`}>
                  {getAccessIcon(member.access)}
                  <span>{member.access}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-800">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-yellow-500 text-sm hover:text-yellow-400 transition-colors">
                    <ChartBarIcon className="w-4 h-4" />
                    <span>View Portfolio</span>
                  </button>
                  {member.access !== 'View Only' && (
                    <button className="flex items-center space-x-1 text-blue-400 text-sm hover:text-blue-300 transition-colors">
                      <BanknotesIcon className="w-4 h-4" />
                      <span>Make Investment</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Member Modal */}
      <AnimatePresence>
        {showAddMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddMember(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 p-6 rounded-2xl border border-gray-800 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Add Family Member</h3>
                <button
                  onClick={() => setShowAddMember(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    className="w-full input-primary"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Relationship</label>
                  <select
                    value={newMember.relationship}
                    onChange={(e) => setNewMember({ ...newMember, relationship: e.target.value })}
                    className="w-full input-primary"
                  >
                    <option value="">Select relationship</option>
                    {relationshipOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    className="w-full input-primary"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Access Level</label>
                  <div className="space-y-2">
                    {accessLevels.map((level) => (
                      <label key={level.value} className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="access"
                          value={level.value}
                          checked={newMember.access === level.value}
                          onChange={(e) => setNewMember({ ...newMember, access: e.target.value })}
                          className="mt-1 text-yellow-500 focus:ring-yellow-500"
                        />
                        <div>
                          <p className="text-white font-medium">{level.value}</p>
                          <p className="text-gray-400 text-sm">{level.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 mt-6">
                <button
                  onClick={handleAddMember}
                  className="flex-1 bg-yellow-500 text-black py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors"
                >
                  Add Member
                </button>
                <button
                  onClick={() => setShowAddMember(false)}
                  className="flex-1 bg-gray-800 text-white py-3 rounded-full font-semibold hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Member Modal */}
      <AnimatePresence>
        {editingMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setEditingMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 p-6 rounded-2xl border border-gray-800 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Edit Member Access</h3>
                <button
                  onClick={() => setEditingMember(null)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-800 p-4 rounded-xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-black font-bold">
                        {editingMember.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{editingMember.name}</h4>
                      <p className="text-gray-400 text-sm">{editingMember.relationship}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Access Level</label>
                  <div className="space-y-2">
                    {accessLevels.map((level) => (
                      <label key={level.value} className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="editAccess"
                          value={level.value}
                          checked={editingMember.access === level.value}
                          onChange={(e) => setEditingMember({ ...editingMember, access: e.target.value })}
                          className="mt-1 text-yellow-500 focus:ring-yellow-500"
                        />
                        <div>
                          <p className="text-white font-medium">{level.value}</p>
                          <p className="text-gray-400 text-sm">{level.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 mt-6">
                <button
                  onClick={() => handleUpdateMember(editingMember)}
                  className="flex-1 bg-yellow-500 text-black py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors"
                >
                  Update Access
                </button>
                <button
                  onClick={() => setEditingMember(null)}
                  className="flex-1 bg-gray-800 text-white py-3 rounded-full font-semibold hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FamilyManagement;