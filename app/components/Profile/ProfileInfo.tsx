/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FC, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { FaInstagram, FaYoutube, FaLinkedin, FaFacebook } from "react-icons/fa";
import Image from "next/image";
import { styles } from "../../styles/style";
import avatarIcon from "../../../public/images/avatar.png";
import toast from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";

type Props = {
  user: any;
  avatar: string | null;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const { update } = useSession();
  const [name, setName] = useState(user && user.name);
  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);

  const [headline, setHeadline] = useState(user?.headline || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [organization, setOrganization] = useState(user?.organization || "");
  const [skills, setSkills] = useState(user?.skills || "");
  const [projectLinks, setProjectLinks] = useState(user?.projectLinks || "");
  const [experience, setExperience] = useState(user?.experience || "");
  const [gender, setGender] = useState(user?.gender || "");

  const [socialLinks, setSocialLinks] = useState({
    linkedin: user?.socialLinks?.linkedin || "",
    facebook: user?.socialLinks?.facebook || "",
    youtube: user?.socialLinks?.youtube || "",
    instagram: user?.socialLinks?.instagram || "",
  });

  const [errors, setErrors] = useState({
    linkedin: false,
    facebook: false,
    youtube: false,
    instagram: false,
  });

  const handleChange = (platform: string, value: string) => {
    setSocialLinks(prev => ({ ...prev, [platform]: value }));

    // URL validation
    const urlPattern = /^(https?:\/\/)?([\w\d-]+\.)+[\w\d]{2,}(\/.*)?$/;
    setErrors(prev => ({
      ...prev,
      [platform]: value && !urlPattern.test(value),
    }));
  };

  const imageHandler = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatarLoading(true);
    const fileReader = new FileReader();

    fileReader.onload = async () => {
      if (fileReader.readyState === 2) {
        try {
          const avatar = fileReader.result;
          const response = await axios.put("/api/user/update-avatar", {
            avatar,
          });

          // Update session to reflect changes
          await update();

          toast.success("Avatar updated successfully");
        } catch (error: any) {
          toast.error(
            error.response?.data?.message || "Failed to update avatar"
          );
        } finally {
          setAvatarLoading(false);
        }
      }
    };
    fileReader.readAsDataURL(file);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (name === "") {
      toast.error("Name cannot be empty");
      return;
    }

    setLoading(true);
    try {
      // Collect profile data
      const profileData = {
        name,
        headline,
        bio,
        organization,
        skills,
        projectLinks,
        experience,
        gender,
        socialLinks,
      };

      await axios.put("/api/user/edit-profile", profileData);

      // Update session to reflect changes
      await update();

      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative">
          <Image
            src={user.avatar || avatar ? user.avatar.url || avatar : avatarIcon}
            alt="User Avatar" // Added alt text for accessibility
            width={120}
            height={120}
            className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
          />

          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png,image/jpg,image/jpeg,image/webp"
            disabled={avatarLoading}
          />

          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              {avatarLoading ? (
                <div className="w-4 h-4 border-2 border-white border-dashed rounded-full animate-spin"></div>
              ) : (
                <AiOutlineCamera size={20} className="z-1" />
              )}
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4 ">
            <div className="w-[100%]">
              <label className="block pb-2 dark:text-white text-black">
                Full Name
              </label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0 `}
                required
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="w-[100%] pt-2">
              <label className="block pb-2 dark:text-white text-black">
                Email Address
              </label>
              <input
                type="text"
                readOnly
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0 `}
                required
                value={user?.email}
              />
            </div>

            <div className="w-[100%] pt-2">
              <label className="block pb-2 dark:text-white text-black">
                Headline
              </label>
              <input
                type="text"
                className={`${styles.input}!w-[95%] mb-1 800px:mb-0`}
                required
                value={headline}
                onChange={e => setHeadline(e.target.value)}
              />
            </div>

            <div className="w-[100%] pt-2">
              <label className="block pb-2 dark:text-white text-black">
                Bio/About
              </label>
              <textarea
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                required
                value={bio}
                onChange={e => setBio(e.target.value)}
              />
            </div>

            <div className="w-[100%] pt-2">
              <label className="block pb-2 dark:text-white text-black">
                Organization
              </label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                required
                value={organization}
                onChange={e => setOrganization(e.target.value)}
              />
            </div>

            <div className="w-[100%] pt-2">
              <label className="block pb-2 dark:text-white text-black">
                Skills
              </label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                required
                value={skills}
                onChange={e => setSkills(e.target.value)}
              />
            </div>
            <div className="w-[100%] pt-2">
              <label className="block pb-2 dark:text-white text-black">
                Project Links
              </label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                required
                value={projectLinks}
                onChange={e => setProjectLinks(e.target.value)}
              />
            </div>

            <div className="w-[100%] pt-2">
              <label className="block pb-2  dark:text-white text-black">
                Experience (Years)
              </label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                required
                value={experience}
                onChange={e => setExperience(e.target.value)}
              />
            </div>

            <div className="w-[100%] pt-2">
              <label className="block pb-2 dark:text-white text-black">
                Gender
              </label>
              <div className="flex gap-4 pb-4 dark:text-white text-black">
                {["Female", "Male", "Transgender", "Other"].map(option => (
                  <button
                    key={option}
                    type="button"
                    className={`px-4 py-2 border ${
                      gender === option
                        ? "bg-[#37a39a] text-black  dark:text-white"
                        : "bg-white text-black "
                    }`}
                    onClick={() => setGender(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full pt-5">
              <button
                className={`${styles.button} !w-[95%] mb-1 800px:mb-0 ${
                  loading ? "opacity-70" : ""
                }`}
                disabled={loading}
                type="submit"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;
