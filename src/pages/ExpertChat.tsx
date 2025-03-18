import React from 'react';
import { Send, PlusCircle, Image, Paperclip } from 'lucide-react';

export function ExpertChat() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-12 gap-6 h-[calc(100vh-12rem)]">
        {/* Experts List */}
        <div className="md:col-span-4 lg:col-span-3 bg-gray-800 rounded-xl p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Available Experts</h2>
          {[1, 2, 3, 4, 5].map((expert) => (
            <div
              key={expert}
              className="flex items-center p-3 rounded-lg mb-2 hover:bg-gray-700 cursor-pointer transition-colors"
            >
              <img
                src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                alt={`Expert ${expert}`}
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <h3 className="font-medium">Tech Expert {expert}</h3>
                <p className="text-sm text-gray-400">Windows & macOS</p>
              </div>
              <div className="ml-auto w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          ))}
        </div>

        {/* Chat Area */}
        <div className="md:col-span-8 lg:col-span-9 bg-gray-800 rounded-xl flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Current Expert"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <h3 className="font-medium">Tech Expert 1</h3>
                <p className="text-sm text-gray-400">Online</p>
              </div>
              <button className="ml-auto bg-primary hover:bg-primary-dark px-4 py-2 rounded-lg transition-colors">
                Start Session
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {/* Expert Message */}
              <div className="flex items-start">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Expert"
                  className="w-8 h-8 rounded-full"
                />
                <div className="ml-3 bg-gray-700 rounded-lg p-3 max-w-[80%]">
                  <p>Hello! How can I help you today?</p>
                </div>
              </div>

              {/* User Message */}
              <div className="flex items-start justify-end">
                <div className="mr-3 bg-primary/20 rounded-lg p-3 max-w-[80%]">
                  <p>Hi, I'm having issues with my laptop's performance.</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  You
                </div>
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <PlusCircle className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <Image className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="p-2 bg-primary hover:bg-primary-dark rounded-lg transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}