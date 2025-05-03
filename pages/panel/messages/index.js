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
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import excerpts from "excerpts";

export default function Messages() {
  const { setError, setMessage } = useContext(AlertContext);
  const [modal, setModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchQueryInitialState = {
    name: "",
    phone: "",
    email: "",
    content: "",
    subject: "",
  };

  const [searchQuery, setSearchQuery] = useState(searchQueryInitialState);
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
  });

  const [messages, setMessages] = useState({
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
      url: "/api/panel/messages",
      params: queryRemover({ ...searchQuery, ...pagination }),
    })
        .then((res) => {
          setMessages(res.data);
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

  const view = (row) => {
    setSelectedRow(row);
    setModal(true);
  };

  const handleDelete = (row) => {
    setSelectedRow(row);
    setConfirmModal(true);
  };

  const submitDelete = () => {
    ax({
      url: "/api/panel/messages",
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

  // Date formatter for the grid
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

  // Action buttons renderer
  const actionsCellRenderer = (params) => {
    return (
        <div className="flex justify-center">
          <RemoveRedEyeOutlinedIcon
              className="cursor-pointer text-blue-600 mx-1"
              onClick={(e) => {
                e.stopPropagation();
                view(params.data);
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

  // Content excerpt renderer
  const contentCellRenderer = (params) => {
    return <span>{excerpts(params.data.content || "", { words: 5 })}</span>;
  };

  // Subject excerpt renderer
  const subjectCellRenderer = (params) => {
    return <span>{excerpts(params.data.subject || "", { words: 3 })}</span>;
  };


  const columnDefs = [
    {
      field: "name",
      headerName: "Sender Name",
      sortable: true,
      filter: true,
      minWidth: 150
    },
    {
      field: "phone",
      headerName: "Phone",
      sortable: true,
      filter: true,
      minWidth: 120
    },
    {
      field: "email",
      headerName: "Email",
      sortable: true,
      filter: true,
      minWidth: 180
    },
    {
      field: "subject",
      headerName: "Subject",
      cellRenderer: subjectCellRenderer,
      sortable: true,
      filter: true,
      minWidth: 150
    },
    {
      field: "content",
      headerName: "Content",
      cellRenderer: contentCellRenderer,
      sortable: true,
      filter: true,
      minWidth: 200
    },

    {
      headerName: "Received At",
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
  const totalPages = Math.max(1, Math.ceil(messages.total / pagination.size));

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
          <h1 className="font-thin text-gray-400">Messages</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <TextField
              value={searchQuery.name}
              label="Sender Name"
              variant="standard"
              name="name"
              onChange={handleChangeSearch}
          />
          <TextField
              value={searchQuery.subject}
              label="Subject"
              variant="standard"
              name="subject"
              onChange={handleChangeSearch}
          />
          <TextField
              value={searchQuery.content}
              label="Content"
              variant="standard"
              name="content"
              onChange={handleChangeSearch}
          />

        </div>

        {/* Loading indicator */}
        {loading && (
            <div className="flex justify-center my-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        )}

        <div className="ag-theme-material h-[500px] p-2 rounded-lg shadow-lg overflow-x-auto w-full">
          <AgGridReact
              rowData={messages.data}
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
            Showing {messages.data.length > 0 ? (pagination.page - 1) * pagination.size + 1 : 0}
            to {Math.min(pagination.page * pagination.size, messages.total)}
            of {messages.total} messages
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

        {/* View Message Modal */}
        <Modal
            open={modal}
            onClose={() => setModal(false)}
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
            {/* Header with avatar and sender info */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-xl p-6 relative">
              <div className="flex items-center">
                <div className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-2xl font-bold border-2 border-white/30">
                  {selectedRow?.name ? selectedRow.name.charAt(0).toUpperCase() : '?'}
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-white">
                    {selectedRow?.name || 'Unknown Sender'}
                  </h3>
                  <div className="flex items-center text-blue-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm truncate max-w-[200px]">{selectedRow?.email || 'No email provided'}</span>
                  </div>
                </div>
              </div>
              <button
                  onClick={() => setModal(false)}
                  className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors rounded-full p-1 hover:bg-white/10"
                  aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Message content */}
            <div className="p-6">
              {/* Contact info cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 transition-all hover:shadow-md">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Full Name</p>
                      <p className="font-medium text-gray-800 dark:text-white">{selectedRow?.name || "—"}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 transition-all hover:shadow-md">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Phone Number</p>
                      <p className="font-medium text-gray-800 dark:text-white">{selectedRow?.phone || "—"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Subject</p>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 transition-all hover:shadow-md">
                  <p className="font-medium text-gray-800 dark:text-white">{selectedRow?.subject || "—"}</p>
                </div>
              </div>

              {/* Message content */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Message</p>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 transition-all hover:shadow-md min-h-[150px]">
                  <p className="text-gray-800 dark:text-white whitespace-pre-wrap">{selectedRow?.content || "—"}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {selectedRow?.createdAt && (
                    <span>Received: {new Date(selectedRow.createdAt).toLocaleString()}</span>
                )}
              </div>
              <button
                  onClick={() => setModal(false)}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-colors shadow-md flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Close
              </button>
            </div>
          </div>
        </Modal>


        {/* Confirm Delete Dialog */}
        <Dialog open={confirmModal} onClose={() => setConfirmModal(false)}>
          <div className="flex flex-center flex-col p-10 items-center truncate">
            <p>Are you sure?</p>
            <div className="flex justify-center items-center">
              <Button
                  sx={{ margin: 1 }}
                  variant="contained"
                  onClick={submitDelete}
              >
                Yes
              </Button>
              <Button
                  sx={{ margin: 1 }}
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
