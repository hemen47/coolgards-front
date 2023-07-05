import React, { useContext, useEffect, useRef, useState } from "react";
import { DataGrid, GridColumn } from "rc-easyui";
import { ax } from "../../../utils/axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { queryRemover } from "../../../utils/queryRemover";
import MenuItem from "@mui/material/MenuItem";
import { AlertContext } from "../../_app";
import Modal from "@mui/material/Modal";
import Dialog from "@mui/material/Dialog";
import InputTags from "../../../components/InputTags";
import { InputAdornment } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


export default function Index() {
  const { setError, setMessage } = useContext(AlertContext);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modal, setModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);


  const searchQueryInitialState = {
    userId: "",
    status: "",
    totalItems: "",
    totalItemsPrice: "",
    totalShipmentPrice: "",
    totalVatPrice: "",
    totalPrice: "",
  };
  const [searchQuery, setSearchQuery] = useState(searchQueryInitialState);
  const [query, setQuery] = useState(searchQueryInitialState);

  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
  });
  const [orders, setOrders] = useState({
    data: [],
    total: "",
  });
  useEffect(() => {
    search();
  }, [pagination.page, pagination.size]);

  const search = () => {
    ax({
      url: "/api/panel/orders",
      params: queryRemover({ ...searchQuery, ...pagination }),
    })
      .then((res) => {
        setOrders(res.data);
        setSelectedRow(res.data.data[0]);
      })
      .catch((e) => {
        setError(e.response?.data?.message || e.message);
      });
  };

  const handleChangeSearch = (e) => {
    setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value });
  };
  const handleChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const edit = () => {
    setQuery(selectedRow);
    setModal(true);
  };

  const handleDelete = () => {
    setConfirmModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
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

  const handleEditorChange = (content, delta, source, editor) => {
    setQuery((prev) => ({ ...prev, content: content }));
  };

  return (
    <div className="ml-56 max-[600px]:ml-20 mr-8">
      <div className="pt-10">
        <div className="flex justify-center">
          <h1 className="font-thin	text-gray-400	">Orders</h1>
        </div>
        <div className="flex flex-wrap justify-evenly">
          <TextField
            value={searchQuery.userId}
            label="User Id"
            variant="standard"
            name="title"
            onChange={handleChangeSearch}
            sx={{ width: 300 }}
          />
          <TextField
            sx={{ width: 300, marginTop: ".8rem" }}
            value={searchQuery.totalPrice}
            label="Total Price"
            variant="standard"
            name="totalPrice"
            onChange={handleChangeSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">€</InputAdornment>
              ),
            }}
          />
        </div>

        <div className="mt-5 flex flex-wrap justify-evenly">
          <Select
            defaultValue=""
            sx={{ marginRight: "5rem", marginBottom: "1rem" }}
            variant="standard"
            value={searchQuery.status}
            label="Status"
            name="status"
            onChange={handleChangeSearch}
            displayEmpty
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="canceled">canceled </MenuItem>
            <MenuItem value="pendingPayment">pending payment</MenuItem>
            <MenuItem value="processing">processing</MenuItem>
            <MenuItem value="completed">completed</MenuItem>
            <MenuItem value="refunded">refunded</MenuItem>
          </Select>
        </div>

        <div className="flex flex-wrap justify-evenly w-144 my-4">
          <Button
            onClick={search}
            variant="contained"
            startIcon={<SearchOutlinedIcon />}
          >
            Search
          </Button>

          <Button
            onClick={edit}
            variant="contained"
            disabled={!selectedRow}
            startIcon={<ModeEditOutlineOutlinedIcon />}
          >
            Edit
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            disabled={!selectedRow}
            startIcon={<DeleteOutlineOutlinedIcon />}
          >
            Delete
          </Button>
        </div>

        <DataGrid
          columnResizing
          data={orders?.data}
          total={orders?.total}
          pageNumber={pagination.page}
          pageSize={pagination.size}
          idField="_id"
          lazy
          selectionMode="single"
          pagination
          onPageChange={(e) =>
            setPagination({ page: e.pageNumber, size: e.pageSize })
          }
          pagePosition="bottom"
          pageOptions={{
            layout: [
              "list",
              "sep",
              "first",
              "prev",
              "next",
              "last",
              "sep",
              "sep",
              "manual",
              "info",
            ],
          }}
          selection={selectedRow}
          onSelectionChange={(row) => setSelectedRow(row)}
        >
          <GridColumn field="_id" title="order id" align="center" width="10%" />
          <GridColumn field="userId" title="user id" align="center" width="10%" />
          <GridColumn field="status" title="status" align="center" width="10%" />

          <GridColumn
            field="cart"
            title="cart items"
            align="center"
            width="30%"
            render={({ row }) => (
              <>
                {row.tags.map((item) => {
                  return (
                    <p
                      className="p-2 m-1 inline-block text-slate-50 bg-slate-400 rounded-3xl"
                      key={iten_id}
                    >
                      {item.title} ({item.quantity})
                    </p>
                  );
                })}
              </>
            )}
          />
          <GridColumn
            fielt="totalItems"
            title="total items"
            align="center"
            width="5%"
          />
          <GridColumn
              fielt="totalItemsPrice"
              title="items price"
              align="center"
              width="5%"
          />
          <GridColumn
              fielt="totalShipmentPrice"
              title="shipment"
              align="center"
              width="5%"
          />
          <GridColumn
              fielt="totalVatPrice"
              title="vat"
              align="center"
              width="5%"
          />
          <GridColumn
              fielt="totalPrice"
              title="total price"
              align="center"
              width="10%"
          />

        </DataGrid>

        {/*Edit Modal*/}
        <Modal open={modal} onClose={handleCloseModal} keepMounted>
          <div className="modal">
            <div className="flex justify-center items-start flex-wrap">
              <TextField
                value={query.title}
                label="title"
                variant="standard"
                name="title"
                onChange={(e) => handleChange(e)}
                sx={{ width: 300, margin: 2 }}
              />
              <TextField
                value={query.slug}
                label="slug"
                variant="standard"
                name="slug"
                onChange={handleChange}
                sx={{ width: 300, margin: 2 }}
              />

              <Select
                sx={{ margin: "2rem" }}
                defaultValue=""
                label="Status"
                name="status"
                variant="standard"
                value={query.status}
                onChange={handleChange}
              >
                <MenuItem value="available">available</MenuItem>
                <MenuItem value="sold">sold</MenuItem>
              </Select>

              <InputTags
                onChange={(e) => setQuery({ ...query, tags: e })}
                value={query.tags}
              />

              <TextField
                sx={{ width: 300, marginTop: ".8rem" }}
                value={query.price}
                label="Price"
                variant="standard"
                name="price"
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">€</InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="flex justify-center items-start">
              <Button
                sx={{ margin: 2 }}
                onClick={() => handleSubmitOrder()}
                variant="contained"
                startIcon={<ModeEditOutlineOutlinedIcon />}
              >
                Edit Order
              </Button>
              <Button sx={{ margin: 2 }} onClick={cancel} variant="contained">
                Cancel
              </Button>
            </div>
          </div>
        </Modal>

        <Dialog open={confirmModal} onClose={() => setConfirmModal(false)}>
          <div className="flex flex-center flex-col p-10 items-center truncate">
            <p>Are you sure?</p>
            <div className="flex justify-center items-center ">
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
    </div>
  );
}
