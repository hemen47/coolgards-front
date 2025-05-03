import React, { useContext, useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { ax } from "../../../utils/axios";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { queryRemover } from "../../../utils/queryRemover";
import MenuItem from "@mui/material/MenuItem";
import { AlertContext } from "../../_app";
import Modal from "@mui/material/Modal";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Link from "next/link";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function Index({ shipments }) {
  const { setError, setMessage } = useContext(AlertContext);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modal, setModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [mode, setMode] = useState(0);
  const [loading, setLoading] = useState(false);

  const searchQueryInitialState = {
    fullName: "",
    email: "",
    roles: "",
  };
  const [searchQuery, setSearchQuery] = useState(searchQueryInitialState);

  const addQueryInitialState = {
    fullName: "",
    email: "",
    roles: "",
    password: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
    mobilePhone: "",
  };
  const [addQuery, setAddQuery] = useState(addQueryInitialState);

  const [pagination, setPagination] = useState({
    page: 1,
    size: 5, // Changed to match the orders component
  });
  const [users, setUsers] = useState({
    data: [],
    total: 0,
  });

  // Search whenever pagination or search filters change
  useEffect(() => {
    search();
  }, [pagination.page, pagination.size, searchQuery]);

  const search = () => {
    setLoading(true);
    ax({
      url: "/api/panel/users",
      params: queryRemover({ ...searchQuery, ...pagination }),
    })
        .then((res) => {
          setUsers(res.data);
          if (res.data.data.length > 0) {
            setSelectedRow(res.data.data[0]);
          }
          setLoading(false);
        })
        .catch((e) => {
          setError(e.response?.data?.message || e.message);
          setLoading(false);
        });
  };

  const handleChangeSearch = (e) => {
    setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value });
    // Reset to first page when search changes
    setPagination(prev => ({
      ...prev,
      page: 1
    }));
  };

  const handleChangeAdd = (e) => {
    setAddQuery({ ...addQuery, [e.target.name]: e.target.value });
  };

  const add = () => {
    setMode(0);
    setAddQuery({ ...addQueryInitialState, roles: "customer" });
    setModal(true);
  };

  const edit = (row) => {
    setMode(1);
    setAddQuery(row || selectedRow);
    setModal(true);
  };

  const handleDelete = (row) => {
    setSelectedRow(row || selectedRow);
    setConfirmModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const submitDelete = () => {
    ax({
      url: "/api/panel/users",
      method: "delete",
      data: selectedRow,
    })
        .then((res) => {
          search();
          setMessage(res.data.message);
          setConfirmModal(false);
        })
        .catch((e) => {
          setError(e.response?.data?.message || e.message);
        });
  };

  const submitAdd = () => {
    ax({
      url: "/api/panel/users",
      method: "post",
      data: addQuery,
    })
        .then((res) => {
          search();
          setMessage(res.data.message);
          cancelAdd();
        })
        .catch((e) => {
          setError(e.response?.data?.message || e.message);
        });
  };

  const submitEdit = () => {
    ax({
      url: "/api/panel/users",
      method: "patch",
      data: addQuery,
    })
        .then((res) => {
          search();
          cancelAdd();
          setMessage(res.data.message);
        })
        .catch((e) => {
          setError(e.response?.data?.message || e.message);
        });
  };

  const handleSubmitUser = (mode) => {
    if (!mode) {
      submitAdd();
    } else {
      submitEdit();
    }
  };

  const cancelAdd = () => {
    setAddQuery(addQueryInitialState);
    setModal(false);
  };

  const onSelectionChanged = (event) => {
    const selectedRows = event.api.getSelectedRows();
    if (selectedRows.length > 0) {
      setSelectedRow(selectedRows[0]);
    }
  };

  // Custom pagination handlers
  const handlePageChange = (newPage) => {
    setPagination(prev => ({
      ...prev,
      page: newPage
    }));
  };

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setPagination({
      page: 1, // Reset to first page when changing page size
      size: newSize
    });
  };

  // AG-Grid cell renderers
  const fullNameCellRenderer = (params) => {
    return <p className="text-sm font-medium text-gray-800">{params.value}</p>;
  };

  const emailCellRenderer = (params) => {
    return <p className="text-sm text-gray-600">{params.value}</p>;
  };

  const rolesCellRenderer = (params) => {
    if (!params.value) return '';

    const roles = Array.isArray(params.value) ? params.value : [params.value];

    return (
        <div className="flex flex-wrap gap-1">
          {roles.map((role) => (
              <span
                  key={role}
                  className={`px-2 py-1 text-xs rounded-full ${
                      role === 'admin'
                          ? 'bg-purple-200 text-purple-800'
                          : 'bg-blue-200 text-blue-800'
                  }`}
              >
            {role}
          </span>
          ))}
        </div>
    );
  };

  const ordersCellRenderer = (params) => {
    return (
        <Link href={"/panel/orders/" + params.data._id} target="_blank">
          <LocalMallOutlinedIcon className="cursor-pointer text-blue-600" />
        </Link>
    );
  };

  const actionsCellRenderer = (params) => {
    return (
        <div className="flex justify-center">
          <ModeEditOutlineOutlinedIcon
              className="cursor-pointer text-blue-600 mx-1"
              onClick={(e) => {
                e.stopPropagation();
                edit(params.data);
              }}
          />
          <DeleteOutlineOutlinedIcon
              className="cursor-pointer text-red-600 mx-1"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(params.data);
              }}
          />
        </div>
    );
  };

  const locationCellRenderer = (params) => {
    const country = params.data.country || '';
    const city = params.data.city || '';

    if (!country && !city) return '—';

    return (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-800">{country}</span>
          {city && <span className="text-xs text-gray-500">{city}</span>}
        </div>
    );
  };

  const columnDefs = [
    {
      field: "_id",
      headerName: "ID",
      sortable: true,
      filter: true,
      width: 100
    },
    {
      field: "fullName",
      headerName: "Full Name",
      cellRenderer: fullNameCellRenderer,
      sortable: true,
      filter: true,
      minWidth: 150
    },
    {
      field: "email",
      headerName: "Email",
      cellRenderer: emailCellRenderer,
      sortable: true,
      filter: true,
      minWidth: 200
    },
    {
      field: "mobilePhone",
      headerName: "Mobile Phone",
      sortable: true,
      filter: true,
      minWidth: 150
    },
    {
      field: "roles",
      headerName: "Roles",
      cellRenderer: rolesCellRenderer,
      sortable: true,
      filter: true,
      minWidth: 120
    },
    {
      headerName: "Location",
      cellRenderer: locationCellRenderer,
      sortable: true,
      filter: true,
      minWidth: 150
    },
    {
      headerName: "Orders",
      cellRenderer: ordersCellRenderer,
      sortable: false,
      filter: false,
      width: 100
    },
    {
      headerName: "Actions",
      cellRenderer: actionsCellRenderer,
      sortable: false,
      filter: false,
      width: 120
    }
  ];

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1300
  };

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(users.total / pagination.size));

  // Generate page numbers to display
  const getPageNumbers = () => {
    let pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // If we have fewer pages than maxPagesToShow, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);

      // Calculate start and end of page numbers to show
      let start = Math.max(2, pagination.page - 1);
      let end = Math.min(totalPages - 1, pagination.page + 1);

      // Adjust if we're near the beginning
      if (pagination.page <= 3) {
        end = Math.min(totalPages - 1, 4);
      }

      // Adjust if we're near the end
      if (pagination.page >= totalPages - 2) {
        start = Math.max(2, totalPages - 3);
      }

      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push('...');
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push('...');
      }

      // Always include last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
      <div className="ml-20 mr-4 p-2 h-screen lg:ml-64 lg:mr-8">
        <div className="flex justify-center">
          <h1 className="font-thin text-gray-400">Users</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <TextField
              value={searchQuery.email}
              label="Email"
              variant="standard"
              name="email"
              onChange={handleChangeSearch}
          />
          <TextField
              value={searchQuery.fullName}
              label="Full Name"
              variant="standard"
              name="fullName"
              onChange={handleChangeSearch}
          />
          <Select
              defaultValue=""
              variant="standard"
              value={searchQuery.roles}
              label="Role"
              name="roles"
              onChange={handleChangeSearch}
              displayEmpty
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="customer">Customer</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </div>

        <div className="flex justify-end mb-4">
          <Button
              onClick={add}
              variant="contained"
              className="bg-blue-600"
          >
            Add New User
          </Button>
        </div>

        {/* Loading indicator */}
        {loading && (
            <div className="flex justify-center my-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        )}

        <div className="ag-theme-material h-[500px] p-2 rounded-lg shadow-lg overflow-x-auto w-full">
          <AgGridReact
              rowData={users.data}
              columnDefs={columnDefs}
              pagination={false}
              rowSelection="single"
              onSelectionChanged={onSelectionChanged}
              defaultColDef={{
                resizable: true,
              }}
              domLayout="autoHeight"
              suppressCellFocus={true}
          />
        </div>

        {/* Custom Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 pb-12">
          {/* Pagination info */}
          <div className="text-sm text-gray-600 mb-4 md:mb-0">
            Showing {users.data.length > 0 ? (pagination.page - 1) * pagination.size + 1 : 0}
            &nbsp;to {Math.min(pagination.page * pagination.size, users.total)}
            &nbsp;of {users.total} users
          </div>

          {/* Page size selector */}
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-sm text-gray-600 mr-2">Show:</span>
            <select
                value={pagination.size}
                onChange={handlePageSizeChange}
                className="bg-white border border-gray-300 text-gray-700 py-1 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              {[5, 10, 20, 50, 100].map(size => (
                  <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          {/* Page numbers */}
          <div className="flex items-center space-x-1">
            {/* Previous button */}
            <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="flex cursor-pointer items-center justify-center px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous page"
            >
              <ChevronLeftIcon fontSize="small" />
            </button>

            {/* Page numbers */}
            {getPageNumbers().map((pageNum, index) => (
                <React.Fragment key={index}>
                  {pageNum === '...' ? (
                      <span className="px-3 py-1.5 text-gray-500">...</span>
                  ) : (
                      <button
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-3 py-1.5 rounded-md cursor-pointer ${
                              pageNum === pagination.page
                                  ? 'bg-blue-600 text-white font-medium'
                                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                      >
                        {pageNum}
                      </button>
                  )}
                </React.Fragment>
            ))}

            {/* Next button */}
            <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page >= totalPages}
                className="flex cursor-pointer items-center justify-center px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next page"
            >
              <ChevronRightIcon fontSize="small" />
            </button>
          </div>
        </div>

        {/* Edit/Add Modal */}
        <Modal
            open={modal}
            onClose={() => setModal(false)}
            keepMounted
        >
          <div className="mx-auto my-20 bg-white rounded-lg p-8 max-w-4xl w-11/12 overflow-auto" style={modalStyle}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <TextField
                  required
                  value={addQuery.email}
                  label="Email"
                  variant="outlined"
                  name="email"
                  onChange={handleChangeAdd}
                  fullWidth
              />
              <TextField
                  required
                  value={addQuery.fullName}
                  label="Full Name"
                  variant="outlined"
                  name="fullName"
                  onChange={handleChangeAdd}
                  fullWidth
              />
              {mode === 0 && (
                  <TextField
                      required
                      value={addQuery.password}
                      label="Password"
                      variant="outlined"
                      type="password"
                      name="password"
                      onChange={handleChangeAdd}
                      fullWidth
                  />
              )}
              <Select
                  variant="outlined"
                  value={addQuery.roles}
                  label="Role"
                  name="roles"
                  onChange={handleChangeAdd}
                  fullWidth
              >
                <MenuItem value="customer">Customer</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
              <Select
                  variant="outlined"
                  value={addQuery.country}
                  label="Country"
                  name="country"
                  onChange={handleChangeAdd}
                  fullWidth
              >
                {shipments.map((item) => (
                    <MenuItem key={item._id} value={item.country}>
                      {item.country}
                    </MenuItem>
                ))}
              </Select>
              <TextField
                  value={addQuery.city}
                  label="City"
                  variant="outlined"
                  name="city"
                  onChange={handleChangeAdd}
                  fullWidth
              />
              <TextField
                  value={addQuery.address}
                  label="Address"
                  variant="outlined"
                  name="address"
                  onChange={handleChangeAdd}
                  fullWidth
                  multiline
                  rows={2}
              />
              <TextField
                  value={addQuery.postalCode}
                  label="Postal Code"
                  variant="outlined"
                  name="postalCode"
                  onChange={handleChangeAdd}
                  fullWidth
              />
              <TextField
                  value={addQuery.mobilePhone}
                  label="Mobile Phone"
                  variant="outlined"
                  name="mobilePhone"
                  onChange={handleChangeAdd}
                  fullWidth
              />
            </div>

            <div className="flex justify-center items-start mt-8">
              <Button
                  sx={{margin: 2}}
                  onClick={() => handleSubmitUser(mode)}
                  variant="contained"
                  startIcon={mode ? <ModeEditOutlineOutlinedIcon /> : null}
                  className="bg-blue-600"
              >
                {mode ? "Update User" : "Create User"}
              </Button>
              <Button
                  sx={{margin: 2}}
                  onClick={cancelAdd}
                  variant="contained"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>

        {/* Confirm Delete Modal */}
        <Dialog open={confirmModal} onClose={() => setConfirmModal(false)}>
          <div className="flex flex-center flex-col p-10 items-center truncate">
            <p>Are you sure you want to delete this user?</p>
            <p className="text-sm text-gray-500 mt-2 mb-4">"{selectedRow?.email}"</p>
            <div className="flex justify-center items-center">
              <Button
                  sx={{margin: 1}}
                  variant="contained"
                  onClick={submitDelete}
              >
                Yes
              </Button>
              <Button
                  sx={{margin: 1}}
                  onClick={() => setConfirmModal(false)}
                  autoFocus
              >
                Cancel
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/shipments`);
    const jsonRes = await res.json();
    return { props: { shipments: jsonRes.data } };
  } catch (err) {
    return { props: { error: err.response?.data?.message || err.message } };
  }
}
