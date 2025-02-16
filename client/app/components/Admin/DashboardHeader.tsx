/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';
import React, { FC, useEffect, useState } from 'react';
import { ThemeSwitcher } from '../../utils/ThemeSwitcher';
import { IoMdNotificationsOutline } from 'react-icons/io';
import socketIO from 'socket.io-client';
import { useGetAllNotificationsQuery, useUpdateNotificationStatusMutation } from '@/redux/features/notifications/notificationsApi';
import { format } from 'timeago.js';

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";

type Props = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
};

const DashboardHeader: FC<Props> = ({ open = false, setOpen }) => {
  const { data, refetch } = useGetAllNotificationsQuery(undefined, { refetchOnMountOrArgChange: true });

  const [updateNotificationStatus, { isSuccess }] = useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState<any>([]);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

useEffect(() => {
  setAudio(new Audio("https://res.cloudinary.com/dhcc2rwis/video/upload/v1739600695/notification-2-269292_iqpgrz.mp3"));
}, []);

  const playNotificationSound = () => {
    if (audio) {
      audio.play();
    }
  };
  
  useEffect(() => {
    if (data) {
      setNotifications(data.notifications.filter((item: any) => item.status === "unread"));
    }
    if (isSuccess) {
      refetch();
    }
  }, [data, isSuccess]);

  useEffect(() => {
    const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

    socket.on("newNotification", () => {
      refetch();
      playNotificationSound();
    });

    return () => {
      socket.disconnect(); // Cleanup to prevent duplicate listeners
    };
  }, [refetch]);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  return (
    <div className="w-full flex items-center justify-end py-6 fixed top-5 right-0">
      <ThemeSwitcher />
      <div className="relative cursor-pointer m-2" onClick={() => setOpen?.(!open)}>
        <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black " />
        {notifications.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
            {notifications.length}
          </span>
        )}
      </div>
      {open && (
        <div className="w-[350px] h-[50vh] dark:bg-[#111C43] bg-white shadow-xl absolute top-16 z-10 rounded">
          <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">
            Notifications
          </h5>
          {notifications.length > 0 ? (
            notifications.map((item: any, index: number) => (
              <div key={index} className="dark:bg-[#2d3a4ea1] bg-[#f3f4f6] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#d1d5db]">
                <div className="w-full flex items-center justify-between p-3">
                  <p className="text-[#1e228a] dark:text-[#93c5fd] font-semibold cursor-pointer hover:underline">
                    {item.title}
                  </p>
                  <p
                    className="text-[#960574] dark:text-[#8f54c5] font-semibold cursor-pointer hover:underline"
                    onClick={() => handleNotificationStatusChange(item._id)}
                  >
                    Mark As Read
                  </p>
                </div>
                <p className="px-3 text-[#374151] dark:text-[#e5e7eb] text-sm">
                  {item.message}
                </p>
                <p className="p-3 text-[#6b7280] dark:text-[#9ca3af] text-[13px] italic">
                  {format(item.createdAt)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-300 mt-4">No new notifications</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
