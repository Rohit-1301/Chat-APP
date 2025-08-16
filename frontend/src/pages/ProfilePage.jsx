import React, { useState } from "react";
import { Upload, Twitter, Linkedin, Github, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const ProfilePage = () => {
  const { authUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    username: authUser?.username || "",
    email: authUser?.email || "",
    profilepic: authUser?.profilepic || "",
    bio: "",
    skills: [],
    socialLinks: {
      twitter: "",
      linkedin: "",
      github: ""
    }
  });
  
  const [newSkill, setNewSkill] = useState("");
  const [skillInputs, setSkillInputs] = useState([""]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setProfileData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          profilepic: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addSkillInput = () => {
    setSkillInputs(prev => [...prev, ""]);
  };

  const updateSkillInput = (index, value) => {
    const newInputs = [...skillInputs];
    newInputs[index] = value;
    setSkillInputs(newInputs);
  };

  const removeSkillInput = (index) => {
    if (skillInputs.length > 1) {
      const newInputs = skillInputs.filter((_, i) => i !== index);
      setSkillInputs(newInputs);
    }
  };

  const addSkill = () => {
    const validSkills = skillInputs.filter(skill => skill.trim() !== "");
    setProfileData(prev => ({
      ...prev,
      skills: [...prev.skills, ...validSkills]
    }));
    setSkillInputs([""]);
  };

  const removeSkill = (index) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">DevChat</span>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              <Link to="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                Login
              </Link>
              <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm">
                Chat Workspace
              </Link>
              <Link to="/settings" className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm">
                Chat Settings
              </Link>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm">
                Developer Resources
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Avatar and Bio */}
          <div className="space-y-6">
            {/* Avatar Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <img
                    src={profileData.profilepic || `https://i.pravatar.cc/150?u=${profileData.username}`}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-100 dark:border-gray-700"
                  />
                </div>
                <label className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm font-medium cursor-pointer transition-colors">
                  Upload Avatar
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Bio Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Bio</h3>
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                placeholder="Write your bio here..."
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Right Column - Skills and Social Links */}
          <div className="space-y-6">
            
            {/* Skills Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Skills</h3>
              
              {/* Skill Input Fields */}
              <div className="space-y-3 mb-4">
                {skillInputs.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => updateSkillInput(index, e.target.value)}
                      placeholder={index === 0 ? "Add a skill" : "Add another skill"}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    />
                    {skillInputs.length > 1 && (
                      <button
                        onClick={() => removeSkillInput(index)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Add More Skill Input Button */}
              <button
                onClick={addSkillInput}
                className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium mb-4 flex items-center"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add another skill
              </button>

              {/* Add Skills Button */}
              <button
                onClick={addSkill}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
              >
                Add Skill
              </button>

              {/* Display Added Skills */}
              {profileData.skills.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(index)}
                          className="ml-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Social Media Links Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Social Media Links</h3>
              
              {/* Social Media Icons Display */}
              <div className="flex items-center space-x-4 mb-6">
                <a
                  href={profileData.socialLinks.twitter || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full transition-colors ${
                    profileData.socialLinks.twitter 
                      ? 'text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20' 
                      : 'text-gray-400 dark:text-gray-600'
                  }`}
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href={profileData.socialLinks.linkedin || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full transition-colors ${
                    profileData.socialLinks.linkedin 
                      ? 'text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20' 
                      : 'text-gray-400 dark:text-gray-600'
                  }`}
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={profileData.socialLinks.github || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full transition-colors ${
                    profileData.socialLinks.github 
                      ? 'text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700' 
                      : 'text-gray-400 dark:text-gray-600'
                  }`}
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>

              {/* Social Media Input Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Twitter className="inline w-4 h-4 mr-2 text-blue-500" />
                    Twitter
                  </label>
                  <input
                    type="url"
                    value={profileData.socialLinks.twitter}
                    onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                    placeholder="https://twitter.com/username"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Linkedin className="inline w-4 h-4 mr-2 text-blue-700" />
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    value={profileData.socialLinks.linkedin}
                    onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Github className="inline w-4 h-4 mr-2 text-gray-900 dark:text-white" />
                    GitHub
                  </label>
                  <input
                    type="url"
                    value={profileData.socialLinks.github}
                    onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                    placeholder="https://github.com/username"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>

            {/* User Info Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={profileData.username}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <button
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    setIsLoading(false);
                    alert("Profile updated successfully!");
                  }, 1000);
                }}
                disabled={isLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  'Save Profile'
                )}
              </button>
            </div>
          </div>

          {/* Right Column - Skills */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 h-fit">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Skills</h3>
            
            {/* Skill Input Fields */}
            <div className="space-y-3 mb-4">
              {skillInputs.map((skill, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => updateSkillInput(index, e.target.value)}
                    placeholder={index === 0 ? "Add a skill" : "Add another skill"}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  />
                  {skillInputs.length > 1 && (
                    <button
                      onClick={() => removeSkillInput(index)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add More Skill Input Button */}
            <button
              onClick={addSkillInput}
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium mb-4 flex items-center"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add another skill
            </button>

            {/* Add Skills Button */}
            <button
              onClick={addSkill}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors mb-6"
            >
              Add Skill
            </button>

            {/* Display Added Skills */}
            {profileData.skills.length > 0 && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Your Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(index)}
                        className="ml-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;