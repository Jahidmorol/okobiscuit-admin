/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Button,
  Divider,
  Table,
  TableColumnsType,
  Input,
  Popconfirm,
} from "antd";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "sonner";
import { TOrderFormValues } from "../../types/order.type";
import SynerPagination from "../../utils/Pagination/pagination";
import {
  useDeleteOrderMutation,
  useGetAllOrderQuery,
} from "../../redux/features/order/orderApi";
// import UpdateOrder from "./UpdateOrder";

const AllOrderList = () => {
  const [params, setParams] = useState([{ name: "limit", value: 10 }]);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [orderData, setOrderData] = useState<TOrderFormValues | null>(null);
  const { data, isLoading } = useGetAllOrderQuery(params);
  const [deleteOrder] = useDeleteOrderMutation();

  const handleUpdateOrder = (order: TOrderFormValues) => {
    setUpdateModalOpen(true);
    setOrderData(order);
  };

  const handleDeleteOrder = async (id: string) => {
    const toastId = toast.loading("Deleting order...");
    const res = await deleteOrder(id).unwrap();
    if (res?.success) {
      toast.success("Order deleted successfully", { id: toastId });
    } else {
      toast.error("Failed to delete order", { id: toastId });
    }
  };

  const columns: TableColumnsType<TOrderFormValues> = [
    {
      title: "SL",
      width: 50,
      align: "center",
      render: (_: any, __: TOrderFormValues, index: number) => (
        <p>{index + 1}</p>
      ),
    },
    {
      title: "Shop Name",
      dataIndex: "shopName",
      width: 200,
    },
    {
      title: "Owner Name",
      dataIndex: "shopOwnerName",
      width: 200,
    },
    {
      title: "Contact",
      dataIndex: "contact",
      width: 150,
    },
    {
      title: "Grand Total Price",
      dataIndex: "grandTotalPrice",
      render: (price: number) => <p>{price}</p>,
      width: 150,
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      fixed: "right",
      width: 150,
      render: (_, record: TOrderFormValues) => (
        <div className="flex justify-center gap-2">
          <Button onClick={() => handleUpdateOrder(record)}>Update</Button>
          <Popconfirm
            title="Delete this order?"
            onConfirm={() => handleDeleteOrder(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button>
              <AiFillDelete fontSize={16} />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handlePaginationChange = (page: number) => {
    setParams((prevParams) => [
      ...prevParams.filter((param) => param.name !== "page"),
      { name: "page", value: page },
      { name: "limit", value: 10 },
    ]);
  };

  const meta = data?.data?.meta;
  const result = data?.data?.result;

  return (
    <>
      <div className="flex items-center gap-5 mb-5">
        <div className="grow">
          <Divider orientation="left" className="!my-0 !text-xl !text-primary">
            All Orders
          </Divider>
        </div>
        <div className="w-[250px]">
          <Input
            type="primary"
            placeholder="Search"
            onChange={(e) =>
              setParams([
                { name: "searchTerm", value: e.target.value },
                { name: "limit", value: 10 },
              ])
            }
          />
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={result}
        pagination={false}
        loading={isLoading}
      />
      <SynerPagination
        meta={meta}
        handlePaginationChange={handlePaginationChange}
      />
      {/* {orderData && (
        <UpdateOrder
          updateModalOpen={updateModalOpen}
          setUpdateModalOpen={setUpdateModalOpen}
          orderData={orderData}
        />
      )} */}
    </>
  );
};

export default AllOrderList;
