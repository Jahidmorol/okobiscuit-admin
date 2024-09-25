/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { useState } from "react";
import {
  Button,
  Divider,
  Image,
  Input,
  Popconfirm,
  Table,
  TableColumnsType,
} from "antd";
import { AiFillDelete } from "react-icons/ai";
import SynerPagination from "../../utils/Pagination/pagination";
import { TQueryParam } from "../../types/global.type";
import { toast } from "sonner";

import {
  useDeleteProductMutation,
  useGetAllProductQuery,
} from "../../redux/features/products/productApi";
import { TProductFormValues } from "../../types/product.type";
import { IoSearchOutline } from "react-icons/io5";
import UpdateProduct from "./UpdateProducti";

const AllProductsList = () => {
  const [params, setParams] = useState<TQueryParam[]>([
    { name: "limit", value: 10 },
  ]);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const [productData, setProductData] = useState<TProductFormValues>(
    {} as TProductFormValues
  );

  const [deleteProduct] = useDeleteProductMutation();

  const { data, isLoading: isDataLoading } = useGetAllProductQuery(params);

  const handleUpdateData = (product: TProductFormValues) => {
    setUpdateModalOpen(true);
    setProductData(product);
  };

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting...");
    const res = await deleteProduct(id).unwrap();
    if (res?.success) {
      toast.success("Product Delete Successful", { id: toastId });
    } else {
      toast.error("Something want wrong!", { id: toastId });
    }
  };

  const columns: TableColumnsType<TProductFormValues> = [
    {
      title: "SL",
      width: 50,
      align: "center",
      render: (_: any, __: TProductFormValues, index: number) => (
        <p>{index + 1}</p>
      ),
    },
    {
      title: "Product Name",
      width: 220,
      render: (record: TProductFormValues) => (
        <div className="flex items-center gap-1">
          <div className="size-12 rounded-full overflow-hidden">
            <Image
              alt={record?.title}
              className="w-full h-full origin-center"
              src={record?.productImg}
            />
          </div>
          <p>{record?.title}</p>
        </div>
      ),
    },
    {
      title: "Product Sub Title",
      dataIndex: "subTitle",
      width: 280,
    },
    {
      title: "P Description",
      dataIndex: "description",
      // width: 250,
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      fixed: "right",
      width: 150,
      render: (_, record: TProductFormValues) => (
        <div className="flex justify-center gap-2">
          <Button onClick={() => handleUpdateData(record)}>Update </Button>
          <Popconfirm
            title="Delete the product"
            description="Are you sure to delete this product?"
            placement="topRight"
            onConfirm={() => handleDelete(record._id)}
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
    setParams((prevParams) => {
      const filteredParams = prevParams?.filter(
        (param) => param.name !== "page"
      );

      // Check if "limit" with value 10 exists
      const limitExists = prevParams.some(
        (param) => param.name === "limit" && param.value === 10
      );

      // Build the new params array
      const newParams = [...filteredParams, { name: "page", value: page }];

      // If "limit" with value 10 does not exist, add it
      if (!limitExists) {
        newParams.push({ name: "limit", value: 10 });
      }

      return newParams;
    });
  };

  const meta = data?.data?.meta;
  const result = data?.data?.result;

  return (
    <>
      <div className="flex items-center gap-5 md:gap-16 mb-5 md:mb-8">
        <div className="grow">
          <Divider orientation="left" className="!my-0 !text-xl !text-primary">
            All Product List
          </Divider>
        </div>
        <div className="w-[250px]">
          <Input
            type="primary"
            prefix={<IoSearchOutline />}
            placeholder="Search"
            className="focus:placeholder:!text-primary"
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
        scroll={{ x: 1800 }}
        pagination={false}
        loading={isDataLoading}
      />
      <SynerPagination
        meta={meta}
        handlePaginationChange={handlePaginationChange}
      />
      <UpdateProduct
        updateModalOpen={updateModalOpen}
        setUpdateModalOpen={setUpdateModalOpen}
        productData={productData}
      />
    </>
  );
};

export default AllProductsList;
