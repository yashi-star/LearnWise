/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { FC, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Modal } from '@mui/material';
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import { FiEdit2 } from 'react-icons/fi';
import Loader from '../../Loader/Loader';
import { format } from 'timeago.js';
import {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} from '@/redux/features/user/userApi';
import { styles } from '@/app/styles/style';
import toast from 'react-hot-toast';

const AllUsers = () => {
  const { theme } = useTheme();
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('admin');
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState('');
  const [updateUserRole, { error: updateError, isSuccess }] =
    useUpdateUserRoleMutation({});
  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation({});
  useEffect(() => {
    if (updateError) {
      if ('data' in updateError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (isSuccess) {
      refetch();
      toast.success('User role updated Sucessfully');
      setActive(false);
    }
    if (deleteSuccess) {
      refetch();
      toast.success('Delete user successfully');
      setOpen(false);
    }
    if (deleteError) {
      if ('data' in deleteError) {
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }
  });

  const handleDelete = async () => {
    try {
      await deleteUser(userId).unwrap();
      alert('User deleted successfully!');
      setOpen(false); // Close modal after deletion
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user');
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.3 },
    { field: 'name', headerName: 'Name', flex: 0.5 },
    { field: 'email', headerName: 'Email', flex: 0.5 },
    { field: 'role', headerName: 'Role', flex: 0.5 },
    { field: 'courses', headerName: 'Purchased Courses', flex: 0.5 },
    { field: 'created_at', headerName: 'Joined At', flex: 0.5 },
    {
      field: 'delete',
      headerName: 'Delete',
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button>
              <AiOutlineDelete className="dark:text-white text-black  size={20}" />
            </Button>
          </>
        );
      },
    },
    {
      field: 'email_action',
      headerName: 'Email',
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <a href={`mailto:${params.row.email}`}>
              <AiOutlineMail className="dark:text-white text-black  size={20}" />
            </a>
          </>
        );
      },
    },
  ];

  const rows: any = [];
  data?.users.forEach(
    (item: {
      _id: string;
      name: string;
      email: string;
      role: string;
      courses: any[];
      createdAt: string;
    }) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        courses: item.courses.length,
        created_at: format(item.createdAt),
      });
    }
  );

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-[200px] dark:bg-[#5780c7] !h-[35px] dark:border-[#ffffff6c]`}
              onClick={() => setActive(!active)}
            >
              Add New Member
            </div>
          </div>
          <Box
            m="40px 0 0 0 "
            height="80vh"
            sx={{
              '& .MuiDataGrid-root': {
                border: 'none',
                outline: 'none',
              },
              '& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon': {
                color: theme === 'dark' ? '#fff' : '#000',
              },
              '& .MuiDataGrid-sortIcon': {
                color: theme === 'dark' ? '#fff' : '#000',
              },
              '& .MuiDataGrid-row': {
                color: theme === 'dark' ? '#fff' : '#000',
                borderBottom:
                  theme === 'dark'
                    ? '1px solid #ffffff30 !important'
                    : '1px solid #ccc !important',
              },
              '& .MuiTablePagination-root': {
                color: theme === 'dark' ? '#fff' : '#000',
              },
              '& .MuiDataGrid-cell': {
                borderBottom: 'none !important',
              },
              '& .name-column--cell': {
                color: theme === 'dark' ? '#fff' : '#000',
              },
              '& .MuiDataGrid-columnHeader': {
                backgroundColor: theme === 'dark' ? '#3e4396' : '#A4A9FC',
                borderBottom: 'none',
                color: theme === 'dark' ? '#fff' : '#000',
              },
              '& .MuiDataGrid-virtualScroller': {
                backgroundColor: theme === 'dark' ? '#1F2A40' : '#F2F0F0',
              },
              '& .MuiDataGrid-footerContainer': {
                color: theme === 'dark' ? '#fff' : '#000',
                borderTop: 'none',
                backgroundColor: theme === 'dark' ? '#3e4396' : '#A4A9FC',
              },
              '& .MuiCheckbox-root': {
                color:
                  theme === 'dark' ? '#b7ebde !important' : '#000 !important',
              },
              '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                color: theme === 'dark' ? '#fff' : '#000',
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
          {/* code here */}
          {active && <div>Add New Member Form</div>}
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] -translate-x-1/2 ">
                <h1 className={`${styles.title}`}>
                  Are you sure you want to delete this user?
                </h1>
                <div className="flex w-full items-center justify-between mb-6 ">
                  <div
                    className={`${styles.button} !w-[120px] h-[30px]  bg-[#4180b3]`}
                    onClick={() => setOpen(!open)}
                  >
                    Cancel
                  </div>
                  <div
                    className={`${styles.button}  !w-[120px] h-[30px] bg-[#ba4450]`}
                    onClick={handleDelete}
                  >
                    Delete
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};
export default AllUsers;
