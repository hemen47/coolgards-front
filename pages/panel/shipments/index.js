import React, { useContext, useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { ax } from "../../../utils/axios";
import TextField from "@mui/material/TextField";
import { queryRemover } from "../../../utils/queryRemover";
import { AlertContext } from "../../_app";
import Modal from "@mui/material/Modal";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function Shipments() {
  const { setError, setMessage } = useContext(AlertContext);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modal, setModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [mode, setMode] = useState(0);
  const [loading, setLoading] = useState(false);

  const searchQueryInitialState = {
    country: "",
    shipmentPrice: "",
    vat: "",
  };
  const [searchQuery, setSearchQuery] = useState(searchQueryInitialState);

  const addQueryInitialState = {
    country: "",
    shipmentPrice: "",
    vat: "",
  };
  const [addQuery, setAddQuery] = useState(addQueryInitialState);

  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
  });

  const [shipments, setShipments] = useState({
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
      url: "/api/panel/shipments",
      params: queryRemover({ ...searchQuery, ...pagination }),
    })
        .then((res) => {
          setShipments(res.data);
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
    setAddQuery(addQueryInitialState);
    setModal(true);
  };

  const edit = () => {
    if (!selectedRow) return;
    setMode(1);
    setAddQuery(selectedRow);
    setModal(true);
  };

  const handleDelete = () => {
    if (!selectedRow) return;
    setConfirmModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const submitDelete = () => {
    ax({
      url: "/api/panel/shipments",
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
      url: "/api/panel/shipments",
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
      url: "/api/panel/shipments",
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

  // Action buttons renderer
  const actionsCellRenderer = (params) => {
    return (
        <div className="flex justify-center">
          <ModeEditOutlineOutlinedIcon
              className="cursor-pointer text-blue-600 mx-1"
              onClick={(e) => {
                e.stopPropagation();
                setMode(1);
                setAddQuery(params.data);
                setModal(true);
              }}
          />
          <DeleteOutlineOutlinedIcon
              className="cursor-pointer text-red-600 mx-1"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedRow(params.data);
                setConfirmModal(true);
              }}
          />
        </div>
    );
  };

  const columnDefs = [
    {
      field: "country",
      headerName: "Country",
      sortable: true,
      filter: true,
      minWidth: 150,
      flex: 1
    },
    {
      field: "shipmentPrice",
      headerName: "Shipment Price",
      sortable: true,
      filter: true,
      minWidth: 150
    },
    {
      field: "vat",
      headerName: "VAT",
      sortable: true,
      filter: true,
      minWidth: 120
    },
    {
      headerName: "Actions",
      cellRenderer: actionsCellRenderer,
      width: 120,
      sortable: false,
      filter: false
    }
  ];

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(shipments.total / pagination.size));

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
          <h1 className="font-thin text-gray-400">Shipments</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <TextField
              value={searchQuery.country}
              label="Country"
              variant="standard"
              name="country"
              onChange={handleChangeSearch}
          />
          <TextField
              value={searchQuery.shipmentPrice}
              label="Shipment Price"
              variant="standard"
              name="shipmentPrice"
              onChange={handleChangeSearch}
          />
          <TextField
              value={searchQuery.vat}
              label="VAT"
              variant="standard"
              name="vat"
              onChange={handleChangeSearch}
          />
        </div>

        {/* Add button */}
        <div className="flex justify-end mb-4">
          <Button
              onClick={add}
              variant="contained"
              startIcon={<AddOutlinedIcon />}
              className="bg-blue-600 hover:bg-blue-700"
          >
            Add Shipment
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
              rowData={shipments.data}
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
            Showing {shipments.data.length > 0 ? (pagination.page - 1) * pagination.size + 1 : 0}
            to {Math.min(pagination.page * pagination.size, shipments.total)}
            of {shipments.total} shipments
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

        {/* Add/Edit Modal */}
        <Modal
            open={modal}
            onClose={handleCloseModal}
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
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-xl p-6 relative">
              <h3 className="text-xl font-semibold text-white">
                {mode ? "Edit Shipment" : "Add New Shipment"}
              </h3>
              <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors rounded-full p-1 hover:bg-white/10"
                  aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Form content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextField
                    required
                    value={addQuery.country}
                    label="Country"
                    variant="outlined"
                    name="country"
                    onChange={handleChangeAdd}
                    fullWidth
                    className="mb-4"
                    sx={{
                      '& .MuiInputBase-input': {color: 'white'},
                      '& .MuiInputLabel-root': {color: 'rgba(255, 255, 255, 0.7)'},
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {borderColor: 'rgba(255, 255, 255, 0.23)'},
                        '&:hover fieldset': {borderColor: 'rgba(255, 255, 255, 0.5)'},
                        '&.Mui-focused fieldset': {borderColor: '#90caf9'}
                      }
                    }}
                    InputLabelProps={{
                      style: {color: 'rgba(255, 255, 255, 0.7)'},
                    }}
                />
                <TextField
                    required
                    value={addQuery.shipmentPrice}
                    label="Shipment Price"
                    variant="outlined"
                    name="shipmentPrice"
                    onChange={handleChangeAdd}
                    fullWidth
                    className="mb-4"
                    sx={{
                      '& .MuiInputBase-input': {color: 'white'},
                      '& .MuiInputLabel-root': {color: 'rgba(255, 255, 255, 0.7)'},
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {borderColor: 'rgba(255, 255, 255, 0.23)'},
                        '&:hover fieldset': {borderColor: 'rgba(255, 255, 255, 0.5)'},
                        '&.Mui-focused fieldset': {borderColor: '#90caf9'}
                      }
                    }}
                    InputLabelProps={{
                      style: {color: 'rgba(255, 255, 255, 0.7)'},
                    }}
                />
                <TextField
                    required
                    value={addQuery.vat}
                    label="VAT"
                    variant="outlined"
                    name="vat"
                    onChange={handleChangeAdd}
                    fullWidth
                    className="mb-4"
                    sx={{
                      '& .MuiInputBase-input': { color: 'white' },
                      '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                        '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                        '&.Mui-focused fieldset': { borderColor: '#90caf9' }
                      }
                    }}
                    InputLabelProps={{
                      style: { color: 'rgba(255, 255, 255, 0.7)' },
                    }}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-end">
              <Button
                  onClick={cancelAdd}
                  className="mr-2"
                  variant="outlined"
              >
                Cancel
              </Button>
              <Button
                  onClick={mode ? submitEdit : submitAdd}
                  variant="contained"
                  startIcon={mode ? <ModeEditOutlineOutlinedIcon/> : <AddOutlinedIcon/>}
                  className="bg-blue-600 hover:bg-blue-700"
              >
                {mode ? "Update" : "Add"}
              </Button>
            </div>
          </div>
        </Modal>

        {/* Confirm Delete Dialog */}
        <Dialog open={confirmModal} onClose={() => setConfirmModal(false)}>
          <div className="flex flex-center flex-col p-10 items-center truncate">
            <p className="text-lg mb-4">Are you sure you want to delete this shipment?</p>
            <p className="text-sm text-gray-500 mb-6">This action cannot be undone.</p>
            <div className="flex justify-center items-center">
              <Button
                  sx={{margin: 1}}
                  variant="outlined"
                  onClick={() => setConfirmModal(false)}
                  autoFocus
              >
                Cancel
              </Button>
              <Button
                  sx={{margin: 1}}
                  variant="contained"
                  color="error"
                  onClick={submitDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
  );
}
