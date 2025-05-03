import React, { useContext, useEffect, useRef, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { ax } from "../../../utils/axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { queryRemover } from "../../../utils/queryRemover";
import Uploader from "../../../components/Uploader";
import { AlertContext } from "../../_app";
import Modal from "@mui/material/Modal";
import Dialog from "@mui/material/Dialog";
import excerpts from "excerpts";
import "react-quill/dist/quill.snow.css";
import { modules } from "../../../utils/quilOptions";
import dynamic from "next/dynamic";
import slug from "slug";
import { MiniUploader } from "../../../components/MiniUploader";
import Link from "next/link";
import InputTags from "../../../components/InputTags";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const ReactQuill = dynamic(
    async () => {
      const { default: RQ } = await import("react-quill");
      // eslint-disable-next-line react/display-name
      return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
    },
    {
      ssr: false,
    }
);

export default function Index() {
  const { setError, setMessage } = useContext(AlertContext);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modal, setModal] = useState(false);
  const [uploaderModal, setUploaderModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [mode, setMode] = useState(0);
  const [insertMode, setInsertMode] = useState(false);
  const quillRef = useRef();
  const [loading, setLoading] = useState(false);

  const imageHandler = () => {
    setInsertMode(true);
    setUploaderModal(true);
  };

  const insertImage = (picObject) => {
    if (insertMode) {
      const range = quillRef.current.editor.getSelection(true);
      quillRef.current.editor.insertEmbed(
          range.index,
          "image",
          picObject?.path
      );
      handleCloseUploader();
      setInsertMode(false);
    } else {
      setAddQuery({ ...addQuery, imageUrl: picObject.path });
      setUploaderModal(false);
    }
  };

  useEffect(() => {
    if (quillRef.current) {
      const toolbar = quillRef.current.editor.getModule("toolbar");
      toolbar.addHandler("image", () => imageHandler(quillRef.current.editor));
    }
  }, [quillRef.current]);

  const searchQueryInitialState = {
    title: "",
    content: "",
    status: "",
    tags: [],
    metaTitle: "",
    metaDescription: ""
  };
  const [searchQuery, setSearchQuery] = useState(searchQueryInitialState);

  const addQueryInitialState = {
    title: "",
    content: "",
    tags: [],
    status: "published",
    slug: "",
    imageUrl: "",
    metaTitle: "",
    metaDescription: ""
  };
  const [addQuery, setAddQuery] = useState(addQueryInitialState);

  const [pagination, setPagination] = useState({
    page: 1,
    size: 5, // Changed to match the orders component
  });
  const [posts, setPosts] = useState({
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
      url: "/api/panel/posts",
      params: queryRemover({ ...searchQuery, ...pagination }),
    })
        .then((res) => {
          setPosts(res.data);
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
    if (e.target.name === "title") {
      setAddQuery({
        ...addQuery,
        slug: slug(e.target.value),
        title: e.target.value,
        metaTitle: addQuery.metaTitle || e.target.value // Set metaTitle to title if not explicitly set
      });
    } else {
      setAddQuery({ ...addQuery, [e.target.name]: e.target.value });
    }
  };

  const add = () => {
    setMode(0);
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
    setUploaderModal(false);
  };

  const handleCloseUploader = () => {
    setUploaderModal(false);
  };

  const submitDelete = () => {
    ax({
      url: "/api/panel/posts",
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
      url: "/api/panel/posts",
      method: "post",
      data: addQuery,
    })
        .then((res) => {
          search();
          setAddQuery(addQueryInitialState);
          setMessage(res.data.message);
          cancelAdd();
        })
        .catch((e) => {
          setError(e.response?.data?.message || e.message);
        });
  };

  const submitEdit = () => {
    ax({
      url: "/api/panel/posts",
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

  const handleSubmitPost = (mode) => {
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

  const handleEditorChange = (content, delta, source, editor) => {
    setAddQuery((prev) => ({ ...prev, content: content }));
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

  const onSelectionChanged = (event) => {
    const selectedRows = event.api.getSelectedRows();
    if (selectedRows.length > 0) {
      setSelectedRow(selectedRows[0]);
    }
  };

  // AG-Grid cell renderers
  const titleCellRenderer = (params) => {
    return <p className="text-sm font-medium text-gray-800">{excerpts(params.data.title, {words: 3})}</p>;
  };

  const contentCellRenderer = (params) => {
    return <p className="text-sm text-gray-600">{excerpts(params.data.content, {words: 5})}</p>;
  };

  const tagsCellRenderer = (params) => {
    return (
        <div className="flex flex-wrap gap-1">
          {params.value && params.value.map((tag) => (
              <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full"
              >
                {tag}
              </span>
          ))}
        </div>
    );
  };

  const urlCellRenderer = (params) => {
    return (
        <Link href={"/news/" + params.data.slug} target="_blank">
          <InsertLinkOutlinedIcon className="cursor-pointer text-blue-600" />
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

  const metaFieldsCellRenderer = (params) => {
    return (
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-800">{params.data.metaTitle ? excerpts(params.data.metaTitle, {words: 3}) : "—"}</span>
          <span className="text-xs text-gray-500">{params.data.metaDescription ? excerpts(params.data.metaDescription, {words: 3}) : "—"}</span>
        </div>
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

  const columnDefs = [
    {
      field: "title",
      headerName: "Title",
      cellRenderer: titleCellRenderer,
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
      field: "metaFields",
      headerName: "Meta Fields",
      cellRenderer: metaFieldsCellRenderer,
      sortable: false,
      filter: false,
      minWidth: 150
    },
    {
      field: "tags",
      headerName: "Tags",
      cellRenderer: tagsCellRenderer,
      sortable: true,
      filter: true,
      minWidth: 150
    },
    {
      field: "status",
      headerName: "Status",
      sortable: true,
      filter: true,
      minWidth: 120
    },
    {
      headerName: "Created At",
      cellRenderer: dateCellRenderer,
      sortable: true,
      filter: true,
      minWidth: 150
    },
    {
      field: "url",
      headerName: "URL",
      cellRenderer: urlCellRenderer,
      sortable: false,
      filter: false,
      width: 80
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
  const totalPages = Math.max(1, Math.ceil(posts.total / pagination.size));

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
          <h1 className="font-thin text-gray-400">News Posts</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <TextField
              value={searchQuery.title}
              label="Title"
              variant="standard"
              name="title"
              onChange={handleChangeSearch}
          />
          <TextField
              value={searchQuery.content}
              label="Content"
              variant="standard"
              name="content"
              onChange={handleChangeSearch}
          />
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
            <MenuItem value="published">Published</MenuItem>
            <MenuItem value="draft">Draft</MenuItem>
          </Select>
          <TextField
              value={searchQuery.metaTitle}
              label="Meta Title"
              variant="standard"
              name="metaTitle"
              onChange={handleChangeSearch}
          />
          <TextField
              value={searchQuery.metaDescription}
              label="Meta Description"
              variant="standard"
              name="metaDescription"
              onChange={handleChangeSearch}
          />
          <div>
            <InputTags
                onChange={(e) => {
                  setSearchQuery({...searchQuery, tags: e});
                  setPagination(prev => ({...prev, page: 1}));
                }}
                value={searchQuery.tags}
            />
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <Button
              onClick={add}
              variant="contained"
              className="bg-blue-600"
          >
            Add New Post
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
              rowData={posts.data}
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
            Showing {posts.data.length > 0 ? (pagination.page - 1) * pagination.size + 1 : 0}
            &nbsp;to {Math.min(pagination.page * pagination.size, posts.total)}
            &nbsp;of {posts.total} posts
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
          <div className="mx-auto my-20 bg-white rounded-lg p-8 max-w-4xl w-11/12 overflow-auto max-h-[500px]" style={modalStyle}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <TextField
                  value={addQuery.title}
                  label="Title"
                  variant="outlined"
                  name="title"
                  onChange={(e) => handleChangeAdd(e)}
                  fullWidth
              />
              <TextField
                  value={addQuery.slug}
                  label="Slug"
                  variant="outlined"
                  name="slug"
                  onChange={handleChangeAdd}
                  fullWidth
              />
              <TextField
                  value={addQuery.metaTitle}
                  label="Meta Title (SEO)"
                  variant="outlined"
                  name="metaTitle"
                  onChange={handleChangeAdd}
                  fullWidth
              />
              <TextField
                  value={addQuery.metaDescription}
                  label="Meta Description (SEO)"
                  variant="outlined"
                  name="metaDescription"
                  onChange={handleChangeAdd}
                  fullWidth
                  multiline
                  rows={2}
              />
              <div>
                <Select
                    fullWidth
                    variant="outlined"
                    label="Status"
                    name="status"
                    value={addQuery.status}
                    onChange={handleChangeAdd}
                >
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="published">Published</MenuItem>
                </Select>
              </div>
              <div>
                <InputTags
                    onChange={(e) => setAddQuery({...addQuery, tags: e})}
                    value={addQuery.tags}
                />
              </div>
            </div>

            <div className="mb-6">
              {addQuery.imageUrl ? (
                  <div className="flex items-center">
                    <MiniUploader
                        selectedImageUrl={addQuery.imageUrl}
                        onDelete={() =>
                            setAddQuery((prevState) => ({
                              ...prevState,
                              imageUrl: "",
                            }))
                        }
                    />
                    <span className="ml-4 text-sm text-gray-600">Cover image selected</span>
                  </div>
              ) : (
                  <Button
                      onClick={() => setUploaderModal(true)}
                      variant="outlined"
                      startIcon={<AddPhotoAlternateOutlinedIcon />}
                      className="mb-4"
                  >
                    Add Cover Image
                  </Button>
              )}
            </div>

            <div className="mb-6">
              <ReactQuill
                  forwardedRef={quillRef}
                  placeholder="Content..."
                  value={addQuery.content}
                  modules={modules}
                  onChange={handleEditorChange}
                  style={{ height: '250px', marginBottom: '50px' }}
              />
            </div>

            <div className="flex justify-center items-start mt-8">
              <Button
                  sx={{margin: 2}}
                  onClick={() => handleSubmitPost(mode)}
                  variant="contained"
                  startIcon={mode ? <ModeEditOutlineOutlinedIcon /> : null}
                  className="bg-blue-600"
              >
                {mode ? "Update Post" : "Create Post"}
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

        {/* Uploader Modal */}
        <Modal open={uploaderModal} onClose={handleCloseModal}>
          <div className="mx-auto my-20 bg-white rounded-lg p-8 max-w-4xl w-11/12" style={modalStyle}>
            <Uploader onClose={handleCloseUploader} onSelect={insertImage} />
          </div>
        </Modal>

        {/* Confirm Delete Modal */}
        <Dialog open={confirmModal} onClose={() => setConfirmModal(false)}>
          <div className="flex flex-center flex-col p-10 items-center truncate">
            <p>Are you sure you want to delete this post?</p>
            <p className="text-sm text-gray-500 mt-2 mb-4">"{selectedRow?.title}"</p>
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
