import React, {useContext, useEffect, useState} from 'react';
import {ax} from "../utils/axios";
import {queryRemover} from "../utils/queryRemover";
import {AlertContext} from "../pages/_app";
import {FilePond, registerPlugin} from 'react-filepond'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import 'filepond/dist/filepond.min.css'
import Masonry from "react-responsive-masonry";
import styles from './Uploader.module.scss'
import Button from "@mui/material/Button";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType)

export default function Uploader({onSelect, onClose}) {
    const {setError, setMessage} = useContext(AlertContext)
    const [hovered, setHovered] = useState('')
    const [selectedImage, setSelectedImage] = useState({})
    const [files, setFiles] = useState([])
    const [downloadedFiles, setDownloadedFiles] = useState({
        data: [],
        total: '',
    })
    useEffect(() => {
        search()
    }, [])

    const search = () => {
        ax({
            url: '/media/all',
            params: queryRemover({})
        }).then(res => {
            setDownloadedFiles(res.data)
        }).catch(e => {
            setError(e.response.data.message)
        })
    }
    const serverConfigs = {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
        process: {
            url: `./upload/public`,
            method: 'POST',
            withCredentials: true,
            // onload: (res) => console.log('onload', res),
            // onerror: (res) => setError(res.data),
        },
    }
    const handleSelect = (p) => {
        setSelectedImage(p)
    }

    return (
        <div className='ml-56 max-[600px]:ml-20 mr-8'>
            <div className='pt-10'>
                <div>
                    <FilePond
                        credits={false}
                        files={files}
                        onupdatefiles={setFiles}
                        allowMultiple={true}
                        maxFiles={3}
                        acceptedFileTypes={['image/*']}
                        server={serverConfigs}
                        name="files"
                        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                    />
                </div>
                <div>
                    <Button onClick={() => onSelect(selectedImage)}>Select</Button>
                    <Button onClick={() => onClose()}>Cancel</Button>
                </div>

                <div>
                    <Masonry columnsCount={5} gutter="15px">
                        {downloadedFiles.data.map((pic) => (
                            <img
                                onClick={()=>handleSelect(pic)}
                                id={pic._id}
                                className={hovered === pic._id ? styles.hovered : styles.not-hovered}
                                onMouseOver={() => setHovered(pic._id)}
                                onMouseLeave={() => setHovered('')}
                                alt={pic.name}
                                key={pic._id}
                                src={pic.path}
                                style={selectedImage?._id === pic._id ? {width: "100%", display: "block", border: "dotted #fdd700 2px"} :{width: "100%", display: "block"}}
                            />
                        ))}
                    </Masonry>
                </div>


            </div>
        </div>
    )
}
