import React, {useContext, useEffect, useRef, useState} from 'react';
import {DataGrid, GridColumn} from 'rc-easyui';
import {ax} from "../../../utils/axios";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Select from "@mui/material/Select";
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import {queryRemover} from "../../../utils/queryRemover";
import Uploader from "../../../components/Uploader";
import MenuItem from "@mui/material/MenuItem";
import {AlertContext} from "../../_app";
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import Autocomplete from '@mui/material/Autocomplete';
import 'react-quill/dist/quill.snow.css';
import {modules, toolbarOptions} from "../../../utils/quilOptions";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(
    async () => {
        const {default: RQ} = await import("react-quill");
        return ({forwardedRef, ...props}) => <RQ ref={forwardedRef} {...props} />;
    },
    {
        ssr: false
    }
);


export default function Index() {
    const {setError, setMessage} = useContext(AlertContext)
    const [selectedRow, setSelectedRow] = useState(null)
    const [modal, setModal] = useState(false)
    const [uploaderModal, setUploaderModal] = useState(false)
    const [confirmModal, setConfirmModal] = useState(false)
    const [mode, setMode] = useState(0)
    const quillRef = useRef();


    const imageHandler = (quill) => {
        setUploaderModal(true);
    }

    const insertImage = (picObject) => {
        const range = quillRef.current.editor.getSelection(true);
        quillRef.current.editor.insertEmbed(range.index, 'image', picObject?.path);
        handleCloseUploader();
    }

    useEffect(() => {
        if (quillRef.current) {
            const toolbar = quillRef.current.editor.getModule('toolbar');
            toolbar.addHandler('image', () => imageHandler(quillRef.current.editor))
        }
    }, [quillRef.current])


    const searchQueryInitialState = {
        title: '',
        content: '',
        tags: [],
        status: '',
    }
    const [searchQuery, setSearchQuery] = useState(searchQueryInitialState)

    const addQueryInitialState = {
        title: '',
        content: '',
        tags: [],
        status: '',
        slug: '',
    }
    const [addQuery, setAddQuery] = useState(addQueryInitialState)

    const [pagination, setPagination] = useState({
        page: 1,
        size: 5,
    })
    const [posts, setPosts] = useState({
        data: [],
        total: '',
    })
    useEffect(() => {
        search()
    }, [pagination.page, pagination.size])

    const search = () => {
        ax({
            url: '/panel/posts',
            params: queryRemover({...searchQuery, ...pagination})
        }).then(res => {
            setPosts(res.data);
            setSelectedRow(res.data.data[0])
        }).catch(e => {
            setError(e.response.data.message)
        })
    }

    const handleChangeSearch = (e) => {
        setSearchQuery({...searchQuery, [e.target.name]: e.target.value})
    }

    const handleChangeAdd = (e) => {
        setAddQuery({...addQuery, [e.target.name]: e.target.value})
    }
    const add = () => {
        setMode(0);
        setAddQuery({...addQuery, roles: ['customer']})
        setModal(true)
    }
    const edit = () => {
        setMode(1);
        setAddQuery(selectedRow);
        setModal(true)
    }

    const handleDelete = () => {
        setConfirmModal(true)
    }

    const handleCloseModal = () => {
        setModal(false);
        setUploaderModal(false);
    }

    const handleCloseUploader = () => {
        setUploaderModal(false);
    }
    const submitDelete = () => {
        ax({
            url: '/panel/posts',
            method: 'delete',
            data: selectedRow
        }).then(res => {
            search()
            setMessage(res.data.message)
            setConfirmModal(false);
        }).catch(e => {
            setError(e.response.data.message)
        })
    }


    const submitAdd = () => {
        ax({
            url: '/panel/posts',
            method: 'post',
            data: addQuery
        }).then(res => {
            search()
            setMessage(res.data.message)
            cancelAdd();
        }).catch(e => {
            setError(e.response.data.message)
        })
    }

    const submitEdit = () => {
        ax({
            url: '/panel/posts',
            method: 'patch',
            data: addQuery
        }).then(res => {
            search()
            cancelAdd();
            setMessage(res.data.message)
        }).catch(e => {
            setError(e.response.data.message)
        })
    }

    const cancelAdd = () => {
        setAddQuery(addQueryInitialState)
        setModal(false);
    }

    const handleEditorChange = (content, delta, source, editor) => {
        setAddQuery({...addQuery, content: content});
    }


    return (
        <div className='ml-56 max-[600px]:ml-20 mr-8'>
            <div className='pt-10'>
                <div className='flex flex-wrap justify-evenly'>
                    <TextField value={searchQuery.title} label="Title" variant="standard" name="title"
                               onChange={handleChangeSearch}
                               sx={{width: 300}}/>
                    <TextField value={searchQuery.content} label="Content" variant="standard" name="content"
                               onChange={handleChangeSearch}
                               sx={{width: 300}}/>

                    <Autocomplete
                        multiple
                        options={[]}
                        getOptionLabel={(option) => option.title}
                        onChange={handleChangeSearch}
                        renderInput={(params) => (
                            <TextField {...params} label="limitTags" placeholder="Tags"/>
                        )}
                        sx={{width: '400px'}}
                    />

                    <Select
                        value={searchQuery.roles}
                        label="Status"
                        name="status"
                        onChange={handleChangeSearch}
                        displayEmpty
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value='published'>Customer</MenuItem>
                        <MenuItem value='draft'>Admin</MenuItem>
                    </Select>


                </div>

                <div className='flex flex-wrap justify-evenly w-100 my-4'>
                    <Button onClick={search} variant="contained" startIcon={<PersonSearchOutlinedIcon/>}>Search</Button>
                    <Button onClick={add} variant="contained" startIcon={<PersonAddOutlinedIcon/>}>Add</Button>
                    <Button onClick={edit} variant="contained" disabled={!selectedRow}
                            startIcon={<ManageAccountsOutlinedIcon/>}>Edit</Button>
                    <Button onClick={handleDelete} variant="contained" disabled={!selectedRow}
                            startIcon={<PersonRemoveOutlinedIcon/>}>Delete</Button>
                </div>

                <DataGrid data={posts?.data}
                          total={posts?.total}
                          pageNumber={pagination.page}
                          pageSize={pagination.size}
                          idField="_id"
                          lazy
                          selectionMode="single"
                          pagination
                          onPageChange={(e) => setPagination({page: e.pageNumber, size: e.pageSize})}
                          pagePosition="bottom"
                          pageOptions={{layout: ['list', 'sep', 'first', 'prev', 'next', 'last', 'sep', 'sep', 'manual', 'info']}}
                          selection={selectedRow}
                          onSelectionChange={(row) => (setSelectedRow(row))}
                >
                    <GridColumn field="title" title="Id" align="center" width="20%"/>
                    <GridColumn field="content" title="Full Name" align="center" width="30%"/>
                    <GridColumn field="tags" title="Email" align="center" width="30%"/>
                    <GridColumn field="status" title="Roles" align="center" width="20%"/>
                </DataGrid>


                {/*Add Modal*/}
                <Modal
                    open={modal}
                    onClose={handleCloseModal}
                    keepMounted
                >
                    <div className="modal">
                        <div className="flex justify-center items-start flex-wrap">
                            <TextField value={addQuery.title} label="Email" variant="standard" name="title"
                                       onChange={handleChangeAdd}
                                       sx={{width: 300, margin: 2}}/>
                            <TextField value={addQuery.slug} label="Slug" variant="standard" name="slug"
                                       onChange={handleChangeAdd}
                                       sx={{width: 300, margin: 2}}/>


                            <Select
                                value={addQuery.roles}
                                sx={{margin: 2}}
                                label="Status"
                                name="status"
                                onChange={handleChangeAdd}
                                displayEmpty
                            >
                                <MenuItem value='draft'>Customer</MenuItem>
                                <MenuItem value='published'>Admin</MenuItem>
                            </Select>

                            <div className="w-screen">
                                <ReactQuill forwardedRef={quillRef} placeholder='Content...' value={addQuery.content}
                                            modules={modules}
                                            onChange={handleEditorChange}/>

                            </div>
                        </div>
                        <div className="flex justify-center items-start">
                            <Button sx={{margin: 2}} onClick={mode ? submitEdit : submitAdd} variant="contained"
                                    startIcon={mode ? <ManageAccountsOutlinedIcon/> :
                                        <PersonAddOutlinedIcon/>}>{mode ? "Edit Post" : "Add Post"}</Button>
                            <Button sx={{margin: 2}} onClick={cancelAdd} variant="contained">Cancel</Button>
                        </div>

                    </div>
                </Modal>
                {/*Uploader Modal*/}
                <Modal
                    open={uploaderModal}
                    onClose={handleCloseModal}
                >
                    <div className="modal">
                        <Uploader onClose={handleCloseUploader} onSelect={insertImage}/>
                    </div>
                </Modal>

                <Dialog
                    open={confirmModal}
                    onClose={() => setConfirmModal(false)}
                >
                    <div className="flex flex-center flex-col p-10 items-center truncate">
                        <p>Are you sure?</p>
                        <div className="flex justify-center items-center ">
                            <Button sx={{margin: 1}} variant="contained" onClick={submitDelete}>Agree</Button>
                            <Button sx={{margin: 1}} onClick={() => setConfirmModal(false)} autoFocus>
                                Cancel
                            </Button>
                        </div>
                    </div>


                </Dialog>


            </div>
        </div>
    )
}
