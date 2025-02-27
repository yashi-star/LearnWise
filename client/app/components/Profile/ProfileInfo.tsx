/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { FC, useEffect, useState } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import { FaInstagram, FaYoutube, FaLinkedin, FaFacebook } from 'react-icons/fa';
import Image from 'next/image';
import { styles } from '../../../app/styles/style';
import avatarIcon from '../../../public/images/avatar.png';
import { useEditProfileMutation, useUpdateAvatarMutation } from '@/redux/features/user/userApi';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import toast from 'react-hot-toast';

type Props = {
  user: any;
  avatar: string | null;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState( user  && user.name ); 
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess: success, error: updateError }] = useEditProfileMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true});

  const [headline, setHeadline] = useState(user?.headline || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [organization, setOrganization] = useState(user?.organization || '');
  const [skills, setSkills] = useState(user?.skills || '');
  const [projectLinks, setProjectLinks] = useState(user?.projectLinks || '');
  const [experience, setExperience] = useState(user?.experience || '');
  const [gender, setGender] = useState(user?.gender || '');
  

  const [socialLinks, setSocialLinks] = useState({
    linkedin: "",
    facebook: "",
    youtube: "",
    instagram: "",
  });

  const [errors, setErrors] = useState({
    linkedin: false,
    facebook: false,
    youtube: false,
    instagram: false,
  });

  const handleChange = (platform: string, value: string) => {
    setSocialLinks((prev) => ({ ...prev, [platform]: value }));

    // URL validation
    const urlPattern = /^(https?:\/\/)?([\w\d-]+\.)+[\w\d]{2,}(\/.*)?$/;
    setErrors((prev) => ({
      ...prev,
      [platform]: value && !urlPattern.test(value),
    }));
  };


  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar); 
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || success) {
      setLoadUser(true);
    }
    if (error || updateError) {
      console.log(error || updateError); 
    }
    if (success) {
      toast.success("Profile updated successfully");
    }
  }, [isSuccess, error, success, updateError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      await editProfile({ name: name });
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
          />

          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} className="z-1" />
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
              <label className="block pb-2 dark:text-white text-black">Full Name</label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0 `}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-[100%] pt-2">
              <label className="block pb-2 dark:text-white text-black">Email Address</label>
              <input
                type="text"
                readOnly
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0 `}
                required
                value={user?.email}
              />
            </div>

            <div className="w-[100%] pt-2">
            <label className="block pb-2 dark:text-white text-black">Headline</label>
          <input type="text" 
          className={`${styles.input}!w-[95%] mb-1 800px:mb-0`} 
          required 
          value={headline} 
          onChange={(e) => setHeadline(e.target.value)} />
          </div>

        <div className="w-[100%] pt-2">
        <label className="block pb-2 dark:text-white text-black">Bio/About</label>
        <textarea 
        className={`${styles.input} !w-[95%] mb-1 800px:mb-0`} 
        required value={bio} 
        onChange={(e) => setBio(e.target.value)} />
        </div>

        <div className="w-[100%] pt-2">
        <label className="block pb-2 dark:text-white text-black">Organization</label>
        <input type="text" 
        className={`${styles.input} !w-[95%] mb-1 800px:mb-0`} 
        required value={organization} 
        onChange={(e) => setOrganization(e.target.value)} />
        </div>

        <div className="w-[100%] pt-2">
        <label className="block pb-2 dark:text-white text-black">Skills</label>
        <input type="text"
         className={`${styles.input} !w-[95%] mb-1 800px:mb-0`} 
        required value={skills} 
        onChange={(e) => setSkills(e.target.value)} />
</div>
<div className="w-[100%] pt-2">
        <label className="block pb-2 dark:text-white text-black">Project Links</label>
        <input type="text"
            className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
         required value={projectLinks} 
         onChange={(e) => setProjectLinks(e.target.value)} />
</div>

<div className="w-[100%] pt-2">
        <label className="block pb-2  dark:text-white text-black">Experience (Years)</label>
        <input type="text" 
          className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
        required value={experience}
         onChange={(e) => setExperience(e.target.value)} />
</div>

<div className="w-[100%] pt-2">
        <label className="block pb-2 dark:text-white text-black">Gender</label>
        <div className="flex gap-4 pb-4 dark:text-white text-black">
          {['Female', 'Male', 'Transgender', 'Other'].map((option) => (
            <button
              key={option}
              type="button"
              className={`px-4 py-2 border ${gender === option ? 'bg-[#37a39a] text-black  dark:text-white' : 'bg-white text-black '}`}
              onClick={() => setGender(option)}
            >
              {option}
            </button>
          ))}
        </div>
        </div>


        <div className="w-full max-w-lg mx-auto p-4">
      <label className="block font-semibold dark:text-white text-black pb-2">
        Social Media Handles <span className="text-red-500">*</span>
      </label>

      <div className="space-y-3">
        {[
          { name: "LinkedIn", icon: FaLinkedin, color: "text-blue-700", key: "linkedin" },
          { name: "Facebook", icon: FaFacebook, color: "text-blue-600", key: "facebook" },
          { name: "YouTube", icon: FaYoutube, color: "text-red-600", key: "youtube" },
          { name: "Instagram", icon: FaInstagram, color: "text-pink-500", key: "instagram" },
        ].map(({ name, icon: Icon, color, key }) => (
          <div key={key} className="relative flex items-center border rounded-md p-2 bg-white shadow-sm">
            <Icon size={24} className={`mr-2 ${color}`} />
            <input
              type="url"
              placeholder={`https://${name} Link`}
              className={`w-full outline-none bg-transparent px-2 ${
                errors[key as keyof typeof errors] ? "border-red-500 text-red-500" : "border-gray-300"
              }`}
              value={socialLinks[key as keyof typeof socialLinks]}
              onChange={(e) => handleChange(key, e.target.value)}
              required
            />
            {errors[key as keyof typeof errors] && (
              <span className="absolute right-2 text-xs text-red-500">*Please Enter Valid URL</span>
            )}
          </div>
        ))}
      </div>
    </div>
            <input
              className="w-full 800px:w-[250px] h-[40px] border border-[#376da3] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer"
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
        <br />
      </div>
    </>
  );
};

export default ProfileInfo;
