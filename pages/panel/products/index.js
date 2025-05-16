import React, { useContext, useEffect, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { ax } from '../../../utils/axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { queryRemover } from '../../../utils/queryRemover';
import Uploader from '../../../components/Uploader';
import MenuItem from '@mui/material/MenuItem';
import { AlertContext } from '../../_app';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import excerpts from 'excerpts';
import 'react-quill/dist/quill.snow.css';
import { modules } from '../../../utils/quilOptions';
import dynamic from 'next/dynamic';
import slug from 'slug';
import { MiniUploader } from '../../../components/MiniUploader';
import Link from 'next/link';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import InputTags from '../../../components/InputTags';
import {
  Chip,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  Tooltip,
} from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FilterListIcon from '@mui/icons-material/FilterList';
import RefreshIcon from '@mui/icons-material/Refresh';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { FiShoppingBag } from 'react-icons/fi';

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    // eslint-disable-next-line react/display-name
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
  }
);

export default function Products() {
  const { setError, setMessage } = useContext(AlertContext);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modal, setModal] = useState(false);
  const [uploaderModal, setUploaderModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [mode, setMode] = useState(0);
  const [insertMode, setInsertMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const quillRef = useRef();

  const imageHandler = () => {
    setInsertMode(true);
    setUploaderModal(true);
  };

  const insertImage = picObject => {
    if (insertMode) {
      const range = quillRef.current.editor.getSelection(true);
      quillRef.current.editor.insertEmbed(range.index, 'image', picObject?.path);
      handleCloseUploader();
      setInsertMode(false);
    } else {
      setAddQuery({
        ...addQuery,
        imageUrls: [...addQuery.imageUrls, picObject.path],
      });
      setUploaderModal(false);
    }
  };

  useEffect(() => {
    if (quillRef.current) {
      const toolbar = quillRef.current.editor.getModule('toolbar');
      toolbar.addHandler('image', () => imageHandler(quillRef.current.editor));
    }
  }, [quillRef.current]);

  const searchQueryInitialState = {
    title: '',
    content: '',
    status: '',
    price: '',
    tags: [],
    sort: 'createdAt',
    order: 'desc',
  };
  const [searchQuery, setSearchQuery] = useState(searchQueryInitialState);

  const addQueryInitialState = {
    title: '',
    content: '',
    tags: [],
    status: 'available',
    slug: '',
    price: '',
    imageUrls: [],
    metaTitle: '',
    metaDescription: '',
  };
  const [addQuery, setAddQuery] = useState(addQueryInitialState);

  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
  });

  const [products, setProducts] = useState({
    data: [],
    total: 0,
    pages: 0,
  });

  // Search whenever pagination or search filters change
  useEffect(() => {
    search();
  }, [pagination.page, pagination.size, searchQuery]);

  const search = () => {
    setLoading(true);
    ax({
      url: '/api/panel/products',
      params: queryRemover({ ...searchQuery, ...pagination }),
    })
      .then(res => {
        setProducts(res.data);
        if (res.data.data.length > 0 && !selectedRow) {
          setSelectedRow(res.data.data[0]);
        }
        setLoading(false);
      })
      .catch(e => {
        setError(e.response?.data?.message || e.message);
        setLoading(false);
      });
  };

  const resetFilters = () => {
    setSearchQuery(searchQueryInitialState);
    setPagination(prev => ({
      ...prev,
      page: 1,
    }));
  };

  const handleChangeSearch = e => {
    setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value });
    // Reset to first page when search changes
    setPagination(prev => ({
      ...prev,
      page: 1,
    }));
  };

  const handleSortChange = (field, order) => {
    setSearchQuery(prev => ({
      ...prev,
      sort: field,
      order: order,
    }));
    setPagination(prev => ({
      ...prev,
      page: 1,
    }));
  };

  const handleChangeAdd = e => {
    if (e.target.name === 'title') {
      setAddQuery({
        ...addQuery,
        slug: slug(e.target.value),
        title: e.target.value,
        metaTitle: addQuery.metaTitle || e.target.value, // Auto-populate metaTitle if empty
      });
    } else {
      setAddQuery({ ...addQuery, [e.target.name]: e.target.value });
    }
  };

  const handleContentChange = content => {
    setAddQuery(prev => {
      // Auto-generate meta description from content if empty
      let newState = { ...prev, content };
      if (!prev.metaDescription) {
        const plainText = content.replace(/<[^>]*>/g, '');
        newState.metaDescription = plainText.substring(0, 160);
      }
      return newState;
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!addQuery.title.trim()) errors.title = 'Title is required';
    if (!addQuery.slug.trim()) errors.slug = 'Slug is required';
    if (!addQuery.price) errors.price = 'Price is required';
    if (!addQuery.content.trim()) errors.content = 'Content is required';
    if (addQuery.imageUrls.length === 0) errors.imageUrls = 'At least one image is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const add = () => {
    setMode(0);
    setAddQuery(addQueryInitialState);
    setFormErrors({});
    setModal(true);
  };

  const edit = () => {
    if (!selectedRow) return;
    setMode(1);
    setAddQuery(selectedRow);
    setFormErrors({});
    setModal(true);
  };

  const handleDelete = () => {
    if (!selectedRow) return;
    setConfirmModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const handleCloseUploader = () => {
    setUploaderModal(false);
  };

  const submitDelete = () => {
    ax({
      url: `/api/panel/products/${selectedRow._id}`,
      method: 'delete',
    })
      .then(res => {
        search();
        setMessage(res.data.message);
        setConfirmModal(false);
      })
      .catch(e => {
        setError(e.response?.data?.message || e.message);
      });
  };

  const submitAdd = () => {
    if (!validateForm()) return;

    ax({
      url: '/api/panel/products',
      method: 'post',
      data: addQuery,
    })
      .then(res => {
        search();
        setMessage(res.data.message);
        cancelAdd();
      })
      .catch(e => {
        setError(e.response?.data?.message || e.message);
      });
  };

  const submitEdit = () => {
    if (!validateForm()) return;

    ax({
      url: `/api/panel/products/${addQuery._id}`,
      method: 'patch',
      data: addQuery,
    })
      .then(res => {
        search();
        cancelAdd();
        setMessage(res.data.message);
      })
      .catch(e => {
        setError(e.response?.data?.message || e.message);
      });
  };

  const cancelAdd = () => {
    setAddQuery(addQueryInitialState);
    setFormErrors({});
    setModal(false);
  };

  const handleEditorChange = (content, delta, source, editor) => {
    handleContentChange(content);
  };

  const onSelectionChanged = event => {
    const selectedRows = event.api.getSelectedRows();
    if (selectedRows.length > 0) {
      setSelectedRow(selectedRows[0]);
    }
  };

  // Custom pagination handlers
  const handlePageChange = newPage => {
    setPagination(prev => ({
      ...prev,
      page: newPage,
    }));
  };

  const handlePageSizeChange = e => {
    const newSize = parseInt(e.target.value);
    setPagination({
      page: 1, // Reset to first page when changing page size
      size: newSize,
    });
  };

  // Action buttons renderer
  const actionsCellRenderer = params => {
    return (
      <div className="flex justify-center">
        <Tooltip title="Edit product">
          <ModeEditOutlineOutlinedIcon
            className="cursor-pointer text-blue-600 mx-1 hover:text-blue-800"
            onClick={e => {
              e.stopPropagation();
              setMode(1);
              setAddQuery(params.data);
              setFormErrors({});
              setModal(true);
            }}
          />
        </Tooltip>
        <Tooltip title="Delete product">
          <DeleteOutlineOutlinedIcon
            className="cursor-pointer text-red-600 mx-1 hover:text-red-800"
            onClick={e => {
              e.stopPropagation();
              setSelectedRow(params.data);
              setConfirmModal(true);
            }}
          />
        </Tooltip>
        <Tooltip title="View product">
          <Link href={'/products/' + params.data.slug} target="_blank">
            <VisibilityIcon className="cursor-pointer text-green-600 mx-1 hover:text-green-800" />
          </Link>
        </Tooltip>
      </div>
    );
  };

  // Price cell renderer
  const priceCellRenderer = params => {
    return <span className="font-medium">€{params.value.toFixed(2)}</span>;
  };

  // Status cell renderer
  const statusCellRenderer = params => {
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          params.value === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}
      >
        {params.value}
      </span>
    );
  };

  // Tags cell renderer
  const tagsCellRenderer = params => {
    if (!params.value || params.value.length === 0) {
      return <span className="text-gray-400 text-xs">No tags</span>;
    }

    return (
      <div className="flex flex-wrap justify-center">
        {params.value.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 m-1 text-xs bg-blue-100 text-blue-800 rounded-full"
          >
            {tag}
          </span>
        ))}
        {params.value.length > 3 && (
          <span className="px-2 py-1 m-1 text-xs bg-gray-100 text-gray-800 rounded-full">
            +{params.value.length - 3} more
          </span>
        )}
      </div>
    );
  };

  // Image cell renderer
  const imageCellRenderer = params => {
    if (!params.value || params.value.length === 0) {
      return <span className="text-gray-400 text-xs">No images</span>;
    }

    return (
      <div className="flex items-center justify-center">
        <img src={params.value[0]} alt="Product" className="w-10 h-10 object-cover rounded-md" />
        {params.value.length > 1 && (
          <span className="ml-2 text-xs text-gray-500">+{params.value.length - 1} more</span>
        )}
      </div>
    );
  };

  const columnDefs = [
    {
      field: 'imageUrls',
      headerName: 'Image',
      sortable: false,
      filter: false,
      width: 100,
      cellRenderer: imageCellRenderer,
    },
    {
      field: 'title',
      headerName: 'Title',
      sortable: true,
      filter: true,
      minWidth: 180,
      flex: 1,
      valueGetter: params => excerpts(params.data.title, { words: 5 }),
    },
    {
      field: 'content',
      headerName: 'Content',
      sortable: true,
      filter: true,
      minWidth: 200,
      flex: 1.5,
      valueGetter: params => excerpts(params.data.content.replace(/<[^>]*>/g, ''), { words: 8 }),
    },
    {
      field: 'tags',
      headerName: 'Tags',
      sortable: true,
      filter: true,
      minWidth: 150,
      cellRenderer: tagsCellRenderer,
    },
    {
      field: 'price',
      headerName: 'Price',
      sortable: true,
      filter: true,
      minWidth: 100,
      cellRenderer: priceCellRenderer,
    },
    {
      field: 'status',
      headerName: 'Status',
      sortable: true,
      filter: true,
      minWidth: 120,
      cellRenderer: statusCellRenderer,
    },
    {
      headerName: 'Actions',
      cellRenderer: actionsCellRenderer,
      width: 150,
      sortable: false,
      filter: false,
    },
  ];

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(products.total / pagination.size));

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
      <div className="flex items-center mb-4 mt-4">
        <div className="h-12 w-0.5 bg-blue-500 mr-4"></div>
        <FiShoppingBag className="text-blue-500 mr-3" size={28} />
        <h1 className="text-2xl font-light text-gray-800 tracking-wide">
          Products Management
          <span className="block h-[2px] w-12 bg-blue-500 mt-1"></span>
        </h1>
      </div>
      <div className="flex items-end mb-4 flex-wrap gap-4 ">
        <Button
          onClick={() => setFiltersVisible(!filtersVisible)}
          variant="outlined"
          startIcon={<FilterListIcon />}
          className="mr-2"
          color={
            Object.values(searchQuery).some(v => v !== '' && v.length !== 0) ? 'primary' : 'default'
          }
        >
          Filters
          {Object.values(searchQuery).some(v => v !== '' && v.length !== 0) && (
            <span className="ml-1 px-1.5 py-0.5 bg-blue-500 text-white text-xs rounded-full">
              {Object.values(searchQuery).filter(v => v !== '' && v.length !== 0).length}
            </span>
          )}
        </Button>
        <Button
          onClick={resetFilters}
          variant="outlined"
          startIcon={<RefreshIcon />}
          className="mr-2"
          disabled={!Object.values(searchQuery).some(v => v !== '' && v.length !== 0)}
        >
          Reset
        </Button>
        <Button
          onClick={add}
          variant="contained"
          startIcon={<AddOutlinedIcon />}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Add Product
        </Button>
      </div>

      {/* Filters section */}
      {filtersVisible && (
        <div className="bg-white dark:bg-gray-100 rounded-lg shadow-md p-4 mb-6 animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-700">Search Filters</h2>
            <Button onClick={() => setFiltersVisible(false)} size="small" className="min-w-0 p-1">
              <CloseIcon fontSize="small" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextField
              value={searchQuery.title}
              label="Title"
              variant="outlined"
              name="title"
              onChange={handleChangeSearch}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              value={searchQuery.content}
              label="Content"
              variant="outlined"
              name="content"
              onChange={handleChangeSearch}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              value={searchQuery.price}
              label="Price (exact or range: 10-50)"
              variant="outlined"
              name="price"
              onChange={handleChangeSearch}
              size="small"
              InputProps={{
                startAdornment: <InputAdornment position="start">€</InputAdornment>,
              }}
            />
            <FormControl variant="outlined" size="small">
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                value={searchQuery.status}
                label="Status"
                name="status"
                onChange={handleChangeSearch}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="sold">Sold</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" size="small">
              <InputLabel id="sort-label">Sort By</InputLabel>
              <Select
                labelId="sort-label"
                value={searchQuery.sort}
                label="Sort By"
                name="sort"
                onChange={e => handleSortChange(e.target.value, searchQuery.order)}
              >
                <MenuItem value="createdAt">Date Created</MenuItem>
                <MenuItem value="updatedAt">Date Updated</MenuItem>
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="price">Price</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" size="small">
              <InputLabel id="order-label">Order</InputLabel>
              <Select
                labelId="order-label"
                value={searchQuery.order}
                label="Order"
                name="order"
                onChange={e => handleSortChange(searchQuery.sort, e.target.value)}
              >
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>
            <div className="md:col-span-3">
              <InputTags
                onChange={e => {
                  setSearchQuery({ ...searchQuery, tags: e });
                  setPagination(prev => ({ ...prev, page: 1 }));
                }}
                value={searchQuery.tags}
                label="Filter by Tags"
                placeholder="Add tags to filter..."
              />
            </div>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center my-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Products grid */}
      <div className="bg-white dark:bg-gray-100 rounded-lg shadow-lg overflow-hidden mb-6">
        <div className="ag-theme-material h-[600px] w-full">
          <AgGridReact
            rowData={products.data}
            columnDefs={columnDefs}
            pagination={false}
            rowSelection="single"
            onSelectionChanged={onSelectionChanged}
            defaultColDef={{
              resizable: true,
              sortable: true,
              filter: true,
            }}
            domLayout="autoHeight"
            suppressCellFocus={true}
            animateRows={true}
            rowClass="hover:bg-gray-50 cursor-pointer"
            overlayNoRowsTemplate={
              loading
                ? '<span class="text-gray-500">Loading products...</span>'
                : '<span class="text-gray-500">No products found. Try adjusting your filters.</span>'
            }
          />
        </div>
      </div>

      {/* Custom Pagination */}
      <div className="bg-white dark:bg-gray-100 rounded-lg shadow-md p-4 flex flex-col md:flex-row justify-between items-center mb-8">
        {/* Pagination info */}
        <div className="text-sm text-gray-600 mb-4 md:mb-0">
          Showing {products.data.length > 0 ? (pagination.page - 1) * pagination.size + 1 : 0}
          {' to '}
          {Math.min(pagination.page * pagination.size, products.total)}
          {' of '}
          {products.total} products
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
              <option key={size} value={size}>
                {size}
              </option>
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
        style={!modal ? { display: 'none' } : {}}
      >
        <div
          className="bg-white dark:bg-gray-100 rounded-xl shadow-2xl w-11/12 max-w-4xl transform transition-all "
          style={{
            maxHeight: '90vh',
            overflowY: 'auto',
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-xl p-6 relative">
            <h3 className="text-xl font-semibold text-white">
              {mode ? 'Edit Product' : 'Add New Product'}
            </h3>
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors rounded-full p-1 hover:bg-white/10"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Form content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <TextField
                required
                value={addQuery.title}
                label="Title"
                variant="outlined"
                name="title"
                onChange={handleChangeAdd}
                fullWidth
                error={!!formErrors.title}
                helperText={formErrors.title}
              />
              <TextField
                required
                value={addQuery.slug}
                label="Slug"
                variant="outlined"
                name="slug"
                onChange={handleChangeAdd}
                fullWidth
                error={!!formErrors.slug}
                helperText={formErrors.slug}
              />
              <TextField
                required
                value={addQuery.price}
                label="Price"
                variant="outlined"
                name="price"
                onChange={handleChangeAdd}
                fullWidth
                error={!!formErrors.price}
                helperText={formErrors.price}
                InputProps={{
                  startAdornment: <InputAdornment position="start">€</InputAdornment>,
                }}
              />
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="status-select-label">Status</InputLabel>
                <Select
                  labelId="status-select-label"
                  value={addQuery.status}
                  label="Status"
                  name="status"
                  onChange={handleChangeAdd}
                >
                  <MenuItem value="available">Available</MenuItem>
                  <MenuItem value="sold">Sold</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <TextField
                value={addQuery.metaTitle}
                label="Meta Title (SEO)"
                variant="outlined"
                name="metaTitle"
                onChange={handleChangeAdd}
                fullWidth
                placeholder="Leave empty to use product title"
                helperText="Optimized title for search engines"
              />
              <TextField
                value={addQuery.metaDescription}
                label="Meta Description (SEO)"
                variant="outlined"
                name="metaDescription"
                onChange={handleChangeAdd}
                fullWidth
                placeholder="Leave empty to generate from content"
                helperText="Brief description for search results (max 160 characters)"
              />
            </div>

            <div className="mb-6">
              <InputTags
                onChange={e => setAddQuery({ ...addQuery, tags: e })}
                value={addQuery.tags}
                label="Product Tags"
                placeholder="Add product tags..."
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images
                {formErrors.imageUrls && (
                  <span className="text-red-500 ml-2 text-xs">{formErrors.imageUrls}</span>
                )}
              </label>
              <div className="flex flex-wrap items-center gap-3">
                {addQuery.imageUrls.map((imageUrl, i) => (
                  <MiniUploader
                    key={i}
                    selectedImageUrl={imageUrl}
                    onDelete={() =>
                      setAddQuery(prevState => ({
                        ...prevState,
                        imageUrls: prevState.imageUrls.filter((val, j) => j !== i),
                      }))
                    }
                  />
                ))}
                <Button
                  onClick={() => setUploaderModal(true)}
                  variant="outlined"
                  startIcon={<AddPhotoAlternateOutlinedIcon />}
                  className={`${formErrors.imageUrls ? 'border-red-500 text-red-500' : ''}`}
                >
                  Add Image
                </Button>
              </div>
            </div>

            <div className="w-full mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Content
                {formErrors.content && (
                  <span className="text-red-500 ml-2 text-xs">{formErrors.content}</span>
                )}
              </label>
              <div
                className={`border rounded-md ${
                  formErrors.content ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <ReactQuill
                  forwardedRef={quillRef}
                  placeholder="Enter detailed product description..."
                  value={addQuery.content}
                  modules={modules}
                  onChange={handleEditorChange}
                  style={{ height: '250px' }}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-end">
            <Button onClick={cancelAdd} className="mr-2" variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={mode ? submitEdit : submitAdd}
              variant="contained"
              startIcon={mode ? <ModeEditOutlineOutlinedIcon /> : <AddOutlinedIcon />}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {mode ? 'Update' : 'Add'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Uploader Modal */}
      <Modal
        open={uploaderModal}
        onClose={handleCloseUploader}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(5px)',
        }}
        style={!uploaderModal ? { display: 'none' } : {}}
      >
        <div className="bg-white dark:bg-gray-100 rounded-xl shadow-2xl w-11/12 max-w-3xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">
              {insertMode ? 'Insert Image in Content' : 'Add Product Image'}
            </h3>
            <button
              onClick={handleCloseUploader}
              className="text-gray-500 hover:text-gray-700 transition-colors rounded-full p-1"
              aria-label="Close modal"
            >
              <CloseIcon />
            </button>
          </div>
          <Uploader onClose={handleCloseUploader} onSelect={insertImage} />
        </div>
      </Modal>

      {/* Confirm Delete Dialog */}
      <Dialog
        open={confirmModal}
        onClose={() => setConfirmModal(false)}
        PaperProps={{
          className: 'rounded-lg',
        }}
      >
        <div className="flex flex-center flex-col p-6 items-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <DeleteOutlineOutlinedIcon className="text-red-600" fontSize="large" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Delete Product</h3>
          <p className="text-gray-500 mb-6 text-center">
            Are you sure you want to delete{' '}
            <span className="font-medium text-gray-700">&#34;{selectedRow?.title}&#34;</span>?<br />
            This action cannot be undone.
          </p>
          <div className="flex justify-center items-center w-full">
            <Button
              className="mr-2 min-w-[100px]"
              variant="outlined"
              onClick={() => setConfirmModal(false)}
              autoFocus
            >
              Cancel
            </Button>
            <Button
              className="min-w-[100px]"
              variant="contained"
              color="error"
              onClick={submitDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </Dialog>

      {/* Product Details Drawer (optional) */}
      {selectedRow && (
        <Dialog
          open={false} // Set to true to enable this feature
          onClose={() => {}}
          maxWidth="md"
          fullWidth
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{selectedRow.title}</h2>
              <Button onClick={() => {}} size="small">
                <CloseIcon />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                {selectedRow.imageUrls && selectedRow.imageUrls.length > 0 && (
                  <img
                    src={selectedRow.imageUrls[0]}
                    alt={selectedRow.title}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedRow.tags &&
                    selectedRow.tags.map((tag, index) => (
                      <Chip key={index} label={tag} size="small" />
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-semibold">€{selectedRow.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-semibold capitalize">{selectedRow.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Created</p>
                    <p className="font-semibold">
                      {new Date(selectedRow.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="font-semibold">
                      {new Date(selectedRow.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Content</h3>
                <div
                  className="prose prose-sm max-w-none border border-gray-200 rounded-lg p-4 h-64 overflow-y-auto"
                  dangerouslySetInnerHTML={{ __html: selectedRow.content }}
                />

                <div className="mt-4">
                  <h3 className="font-medium mb-2">SEO Information</h3>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Meta Title</p>
                    <p className="mb-2">{selectedRow.metaTitle || selectedRow.title}</p>

                    <p className="text-sm text-gray-500">Meta Description</p>
                    <p className="text-sm">
                      {selectedRow.metaDescription || 'No meta description'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button
                variant="outlined"
                startIcon={<ModeEditOutlineOutlinedIcon />}
                onClick={() => {
                  setMode(1);
                  setAddQuery(selectedRow);
                  setModal(true);
                }}
                className="mr-2"
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteOutlineOutlinedIcon />}
                onClick={() => setConfirmModal(true)}
              >
                Delete
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}
