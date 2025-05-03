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
import { InputAdornment } from "@mui/material";
import Button from "@mui/material/Button";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Link from "next/link";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Image from "next/image";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function Index() {
  const { setError, setMessage } = useContext(AlertContext);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modal, setModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [addressModal, setAddressModal] = useState(false);

  const searchQueryInitialState = {
    status: "",
  };
  const [searchQuery, setSearchQuery] = useState(searchQueryInitialState);
  const [query, setQuery] = useState(searchQueryInitialState);

  const [pagination, setPagination] = useState({
    page: 1,
    size: 5,
  });
  const [orders, setOrders] = useState({
    data: [],
    total: 0,
  });


  const [loading, setLoading] = useState(false);

  // Search whenever pagination or search filters change
  useEffect(() => {
    search();
  }, [pagination.page, pagination.size, searchQuery]);

  const search = () => {
    setLoading(true);
    ax({
      url: "/api/panel/orders",
      params: queryRemover({ ...searchQuery, ...pagination }),
    })
        .then((res) => {
          setOrders(res.data);
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

  const handleChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const edit = (row) => {
    console.log("Edit clicked", row);
    setSelectedRow(row);
    setQuery(row);
    setModal(true);
  };

  const handleDelete = (row) => {
    console.log("Delete clicked", row);
    setSelectedRow(row);
    setConfirmModal(true);
  };

  const handleAddressClick = (row) => {
    console.log("Address clicked", row);
    setSelectedRow(row);
    setAddressModal(true);
  };

  const submitDelete = () => {
    ax({
      url: "/api/panel/orders",
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

  const submitEdit = () => {
    ax({
      url: "/api/panel/orders",
      method: "patch",
      data: query,
    })
        .then((res) => {
          search();
          cancel();
          setMessage(res.data.message);
        })
        .catch((e) => {
          setError(e.response?.data?.message || e.message);
        });
  };

  const handleSubmitOrder = () => {
    submitEdit();
  };

  const cancel = () => {
    setQuery(searchQueryInitialState);
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

  const cartCellRenderer = (params) => {
    return (
        <div className="flex flex-wrap gap-2 ">
          {params.value && params.value.map((item) => (
              <Link
                  href={`/products/${item.slug}`}
                  className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors p-1.5"
                  key={item._id}
              >
                {item.imageUrls && item.imageUrls[0] && (
                    <div className="h-10 w-10 mr-2 rounded overflow-hidden flex-shrink-0">
                      <img
                          src={item.imageUrls[0]}
                          alt={item.title}
                          className="h-full w-full object-cover"
                      />
                    </div>
                )}
                <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700 truncate max-w-[150px]">
                {item.title}
              </span>
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="mr-2">Qty: {item.quantity}</span>
                    <span>€{item.price}</span>
                  </div>
                </div>
              </Link>
          ))}
        </div>
    );
  };

  const priceCellRenderer = (params) => {
    return <span>€ {params.value}</span>;
  };

  const addressCellRenderer = (params) => {
    return (
        <LocationOnOutlinedIcon
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              handleAddressClick(params.data);
            }}
        />
    );
  };

  const dateCellRenderer = (params) => {
    if (!params.data.createdAt) return '';

    const date = new Date(params.data.createdAt);

    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    return (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-800">{formattedDate}</span>
          <span className="text-xs text-gray-500">{formattedTime}</span>
        </div>
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

  const columnDefs = [
    {
      field: "_id",
      headerName: "Order ID",
      sortable: true,
      filter: true,
      minWidth: 120
    },
    {
      field: "paypalId",
      headerName: "Paypal ID",
      sortable: true,
      filter: true,
      minWidth: 120
    },
    {
      field: "userEmail",
      headerName: "User Email",
      sortable: true,
      filter: true,
      minWidth: 150
    },
    {
      field: "status",
      headerName: "Status",
      sortable: true,
      filter: true,
      minWidth: 90
    },
    {
      field: "cart",
      headerName: "Cart Items",
      cellRenderer: cartCellRenderer,
      minWidth: 250
    },
    {
      field: "totalItems",
      headerName: "Total Items",
      sortable: true,
      filter: true,
      minWidth: 50
    },
    {
      field: "totalItemsPrice",
      headerName: "Items Price",
      cellRenderer: priceCellRenderer,
      sortable: true,
      filter: true,
      minWidth: 80
    },
    {
      field: "totalShipmentPrice",
      headerName: "Shipment",
      cellRenderer: priceCellRenderer,
      sortable: true,
      filter: true,
      minWidth: 120
    },
    {
      field: "totalVatPrice",
      headerName: "VAT",
      cellRenderer: priceCellRenderer,
      sortable: true,
      filter: true,
      minWidth: 120
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      cellRenderer: priceCellRenderer,
      sortable: true,
      filter: true,
      minWidth: 120
    },
    {
      field: "address",
      headerName: "Address",
      cellRenderer: addressCellRenderer,
      width: 100
    },
    {
      headerName: "Created At",
      cellRenderer: dateCellRenderer,
      sortable: true,
      filter: true,
      minWidth: 150
    },
    {
      headerName: "Actions",
      cellRenderer: actionsCellRenderer,
      width: 120,
      sortable: false,
      filter: false
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
  const totalPages = Math.max(1, Math.ceil(orders.total / pagination.size));

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
          <h1 className="font-thin text-gray-400">Orders</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <Select
              defaultValue=""
              variant="standard"
              value={searchQuery.status}
              label="Status"
              name="status"
              onChange={handleChangeSearch}
              displayEmpty
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="CREATED">CREATED</MenuItem>
            <MenuItem value="PAID">PAID</MenuItem>
          </Select>
        </div>

        {/* Loading indicator */}
        {loading && (
            <div className="flex justify-center my-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        )}

        <div className="ag-theme-material h-[500px] p-2 rounded-lg shadow-lg  overflow-x-auto w-full">
          <AgGridReact
              rowData={orders.data}
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
            Showing {orders.data.length > 0 ? (pagination.page - 1) * pagination.size + 1 : 0}
            to {Math.min(pagination.page * pagination.size, orders.total)}
            of {orders.total} orders
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
              <ChevronLeftIcon fontSize="small"/>
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
              <ChevronRightIcon fontSize="small"/>
            </button>
          </div>
        </div>


        {/* Edit Modal */}
        <Modal
            open={modal}
            onClose={() => setModal(false)}
            keepMounted
        >
          <div className="mx-auto my-20 bg-white rounded-lg p-8 max-w-xl w-11/12 overflow-auto" style={modalStyle}>
            <div className="flex justify-center items-start flex-wrap">
              <Select
                  defaultValue=""
                  sx={{marginRight: "5rem", marginBottom: "1rem"}}
                  variant="standard"
                  value={query.status}
                  label="Status"
                  name="status"
                  onChange={handleChange}
                  displayEmpty
              >
                <MenuItem value="CREATED">CREATED</MenuItem>
                <MenuItem value="PAID">PAID</MenuItem>
              </Select>
            </div>
            <div className="flex justify-center items-start">
              <Button
                  sx={{margin: 2}}
                  onClick={() => handleSubmitOrder()}
                  variant="contained"
                  startIcon={<ModeEditOutlineOutlinedIcon/>}
              >
                Edit Order
              </Button>
              <Button sx={{margin: 2}} onClick={cancel} variant="contained">
                Cancel
              </Button>
            </div>
          </div>
        </Modal>

        <Dialog open={confirmModal} onClose={() => setConfirmModal(false)}>
          <div className="flex flex-center flex-col p-10 items-center truncate">
            <p>Are you sure?</p>
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

        {/* Address Modal */}
        <Modal
            open={addressModal}
            onClose={() => setAddressModal(false)}
            keepMounted
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(5px)',
            }}
        >
          <div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-11/12 max-w-3xl transform transition-all"
              style={{
                maxHeight: '90vh',
                overflowY: 'auto',
                animation: 'fadeIn 0.3s ease-out'
              }}
          >
            {/* Header */}
            <div className="relative p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center">
                User Information
              </h3>
              <button
                  onClick={() => setAddressModal(false)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* User Profile Section */}
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                      <Image
                          src="/avatar.png"
                          width={72}
                          height={72}
                          alt="user avatar"
                          className="rounded-full object-cover border-2 border-white"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-800 dark:text-white">{selectedRow?.address?.fullName}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {selectedRow?.userEmail}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Full Name</p>
                        <p className="font-medium text-gray-800 dark:text-white">{selectedRow?.address?.fullName || "—"}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                        <p className="font-medium text-gray-800 dark:text-white">{selectedRow?.userEmail || "—"}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Mobile Phone</p>
                        <p className="font-medium text-gray-800 dark:text-white">{selectedRow?.address?.mobilePhone || "—"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-gray-800 dark:text-white">Shipping Address</h4>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Country</p>
                        <p className="font-medium text-gray-800 dark:text-white">{selectedRow?.address?.country || "—"}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-500 dark:text-gray-400">City</p>
                        <p className="font-medium text-gray-800 dark:text-white">{selectedRow?.address?.city || "—"}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Postal Code</p>
                        <p className="font-medium text-gray-800 dark:text-white">{selectedRow?.address?.postalCode || "—"}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Address</p>
                        <p className="font-medium text-gray-800 dark:text-white">{selectedRow?.address?.address || "—"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-end">
              <button
                  onClick={() => setAddressModal(false)}
                  className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 mr-2 transition-colors"
              >
                Cancel
              </button>
              <button
                  onClick={() => setAddressModal(false)}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-colors shadow-md"
              >
                Ok
              </button>
            </div>
          </div>
        </Modal>

      </div>
  );
}
