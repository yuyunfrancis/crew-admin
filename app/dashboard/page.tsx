"use client";

import { motion } from "framer-motion";
import { FiHeart, FiImage, FiActivity, FiPlus } from "react-icons/fi";
import Button from "@/components/Button";

const stats = [
  { label: "Total Vibes", value: "24", icon: FiHeart, color: "bg-pink-500" },
  { label: "Total Scenes", value: "18", icon: FiImage, color: "bg-blue-500" },
  {
    label: "Total Hobbies",
    value: "32",
    icon: FiActivity,
    color: "bg-green-500",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Manage your vibes, scenes, and hobbies
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button icon={<FiPlus />}>Quick Add</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button
            variant="secondary"
            className="justify-start h-16"
            icon={<FiHeart />}
          >
            <div className="text-left">
              <div className="font-medium">Add Vibe</div>
              <div className="text-sm text-gray-500">Create new vibe</div>
            </div>
          </Button>
          <Button
            variant="secondary"
            className="justify-start h-16"
            icon={<FiImage />}
          >
            <div className="text-left">
              <div className="font-medium">Add Scene</div>
              <div className="text-sm text-gray-500">Create new scene</div>
            </div>
          </Button>
          <Button
            variant="secondary"
            className="justify-start h-16"
            icon={<FiActivity />}
          >
            <div className="text-left">
              <div className="font-medium">Add Hobby</div>
              <div className="text-sm text-gray-500">Create new hobby</div>
            </div>
          </Button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
              <FiHeart className="w-4 h-4 text-pink-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">
                New vibe "Adventurous" added
              </p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <FiImage className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">
                Scene "Beach Sunset" updated
              </p>
              <p className="text-sm text-gray-500">4 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <FiActivity className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">
                Hobby "Photography" added
              </p>
              <p className="text-sm text-gray-500">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
