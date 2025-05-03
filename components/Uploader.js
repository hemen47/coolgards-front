import React, { useContext, useEffect, useState } from 'react';
import { ax } from '../utils/axios';
import { queryRemover } from '../utils/queryRemover';
import { AlertContext } from '../pages/_app';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Pagination from '@mui/material/Pagination';
import DeleteIcon from '@mui/icons-material/Delete';

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);

export default function Uploader({ onSelect, onClose, mediaMode = false }) {
  const { setError, setMessage } = useContext(AlertContext);
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});
  const [imageToDelete, setImageToDelete] = useState(null);
  const [files, setFiles] = useState([]);
  const [downloadedFiles, setDownloadedFiles] = useState({
    data: [],
    total: 0,
    page: 1,
    totalPages: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    search(currentPage);
  }, [currentPage]);

  const search = (page = 1) => {
    ax({
      url: '/api/media/all',
      params: queryRemover({ page, limit: itemsPerPage }),
    })
      .then(res => {
        setDownloadedFiles(res.data);
        if (res.data.data.length > 0 && !selectedImage._id) {
          setSelectedImage(res.data.data[0]);
        }
      })
      .catch(e => {
        setError(e.response?.data?.message || e.message);
      });
  };

  const serverConfigs = {
    url: `/api/media`,
    process: {
      method: 'POST',
      withCredentials: true,
      onload: res => search(currentPage),
      onerror: err => setError(err.data),
    },
  };

  const handleSelect = p => {
    setSelectedImage(p);
  };

  const handleCloseUploader = () => {
    setSelectedImage({});
    onClose();
  };

  const handleDeleteImage = () => {
    const imageToRemove = imageToDelete || selectedImage;
    if (imageToRemove) {
      ax({
        url: '/api/media',
        method: 'delete',
        data: imageToRemove,
      })
        .then(res => {
          search(currentPage);
          setMessage(res.data.message);
          setConfirmModal(false);
          setImageToDelete(null);
          if (selectedImage._id === imageToRemove._id) {
            setSelectedImage(downloadedFiles.data[0] || {});
          }
        })
        .catch(e => {
          setError(e.response?.data?.message || e.message);
        });
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const confirmDelete = (image, e) => {
    e.stopPropagation();
    setImageToDelete(image);
    setConfirmModal(true);
  };

  return (
    <div className={`${mediaMode ? 'bg-gray-50 p-6 rounded-lg shadow-sm' : ''}`}>
      <div className="pt-10">
        <div>
          <FilePond
            credits={false}
            files={files}
            onupdatefiles={setFiles}
            allowMultiple={true}
            maxFiles={20}
            acceptedFileTypes={['image/*']}
            server={serverConfigs}
            name="files"
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          />
        </div>
        {!mediaMode && (
          <div className="flex justify-center">
            {selectedImage && selectedImage._id && (
              <Button
                sx={{ margin: '1rem' }}
                variant="contained"
                onClick={() => onSelect(selectedImage)}
              >
                Select
              </Button>
            )}
            <Button sx={{ margin: '1rem' }} onClick={handleCloseUploader}>
              Cancel
            </Button>
          </div>
        )}

        <Dialog open={confirmModal} onClose={() => setConfirmModal(false)}>
          <div className="flex flex-center flex-col p-10 items-center truncate">
            <p>Are you sure you want to delete this image?</p>
            <div className="flex justify-center items-center ">
              <Button
                sx={{ margin: 1 }}
                variant="contained"
                color="error"
                onClick={handleDeleteImage}
              >
                Yes, Delete
              </Button>
              <Button
                sx={{ margin: 1 }}
                onClick={() => {
                  setConfirmModal(false);
                  setImageToDelete(null);
                }}
                autoFocus
              >
                Cancel
              </Button>
            </div>
          </div>
        </Dialog>

        <div className={`${mediaMode ? 'mt-6' : 'mt-2'}`}>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: mediaMode ? 4 : 3 }}
          >
            <Masonry columnsCount={3} gutter="20px">
              {downloadedFiles.data.map(pic => (
                <div key={pic._id} className="relative group">
                  <div
                    className={`
                      transform transition-transform duration-300 ease-out 
                      ${
                        selectedImage?._id === pic._id
                          ? 'border-4 border-dashed border-blue-500'
                          : ''
                      } 
                      hover:scale-105 hover:shadow-lg rounded overflow-hidden
                    `}
                    onClick={() => handleSelect(pic)}
                    onDoubleClick={() => {
                      handleSelect(pic);
                      if (!mediaMode) onSelect(pic);
                    }}
                  >
                    {/* Using img instead of Next.js Image for masonry layout compatibility */}
                    <img id={pic._id} alt={pic.name} src={pic.path} className="w-full block" />
                  </div>
                  <button
                    onClick={e => confirmDelete(pic, e)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                    title="Delete image"
                  >
                    <DeleteIcon fontSize="small" />
                  </button>
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>

          {downloadedFiles.totalPages > 1 && (
            <div className="flex justify-center mt-8 mb-4">
              <Pagination
                count={downloadedFiles.totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size={mediaMode ? 'large' : 'medium'}
                showFirstButton
                showLastButton
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
