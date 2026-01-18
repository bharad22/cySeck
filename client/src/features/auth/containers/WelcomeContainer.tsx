"use client";

import { useAuth } from "../hooks";
import { LoadingSpinner, Button, ErrorMessage } from "@/components";

export const WelcomeContainer: React.FC = () => {
  const { user, isLoading, error } = useAuth();

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
            />
            <div>
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <p className="text-blue-100">{user?.role}</p>
            </div>
          </div>
          {user?.verified && (
            <div className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
              Verified
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Email</p>
            <p className="font-semibold text-gray-800">{user?.email}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Phone</p>
            <p className="font-semibold text-gray-800">{user?.phone}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Account Status</p>
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
              {user?.accountStatus}
            </span>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Member Since</p>
            <p className="font-semibold text-gray-800">
              {user?.memberSince &&
                new Date(user.memberSince).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
            </p>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-600 mb-1">Last Login</p>
          <p className="font-semibold text-gray-800">
            {user?.lastLogin &&
              new Date(user.lastLogin).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
          </p>
        </div>
      </div>
    </div>
  );
};
