/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Form, Input, InputNumber, Divider, Row, Col } from "antd";
import { toast } from "sonner";
import { TOrderFormValues, TOrderItem } from "../../types/order.type";
import { useAddOrderMutation } from "../../redux/features/order/orderApi";

const ProductAddForm = () => {
  const [form] = Form.useForm();
  const [items, setItems] = useState<TOrderItem[]>([]);
  const [addOrder, { isLoading }] = useAddOrderMutation();

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      { name: "", unitPrice: 0, quantity: 1, ItemTotalPrice: 0 },
    ]);
  };

  const handleItemChange = (index: number, key: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [key]: value };
    setItems(newItems);
  };

  const handleItemTotalChange = (index: number) => {
    const newItems = [...items];
    newItems[index].ItemTotalPrice =
      newItems[index].unitPrice * newItems[index].quantity;
    setItems(newItems);
  };

  const onFinish = async (values: TOrderFormValues) => {
    const finalValues = { ...values, items };

    console.log("finalValues--=>", finalValues);

    // Add items to final form values
    // const toastId = toast.loading("Adding Order...");

    // const res = await addOrder(finalValues).unwrap();
    // if (res?.success) {
    //   toast.success("Order added successfully!", { id: toastId });
    //   form.resetFields();
    //   setItems([]);
    // } else {
    //   toast.error("Failed to add order!", { id: toastId });
    // }
  };

  const calculateTotal = () =>
    items.reduce((sum, item) => sum + item.ItemTotalPrice, 0);

  return (
    <div className="container">
      <Divider orientation="left" className="!text-xl">
        Add New Order
      </Divider>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ grandTotalPrice: 0, advancedPrice: 0, duePrice: 0 }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Shop Name"
              name="shopName"
              rules={[{ required: true, message: "Shop name is required" }]}
            >
              <Input placeholder="Enter shop name" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Shop Owner Name"
              name="shopOwnerName"
              rules={[
                { required: true, message: "Shop owner name is required" },
              ]}
            >
              <Input placeholder="Enter shop owner's name" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Location"
              name="location"
              rules={[{ required: true, message: "Location is required" }]}
            >
              <Input placeholder="Enter location" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Contact"
              name="contact"
              rules={[
                { required: true, message: "Contact number is required" },
              ]}
            >
              <Input placeholder="Enter contact number" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Address is required" }]}
            >
              <Input placeholder="Enter address" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Delivery Date"
              name="deliveryDate"
              rules={[{ required: true, message: "Delivery date is required" }]}
            >
              <Input type="date" placeholder="Enter delivery date" />
            </Form.Item>
          </Col>
        </Row>

        {/* Order Items */}
        <Divider>Items</Divider>
        {items.map((item, index) => (
          <Row gutter={16} key={index} className="mb-3">
            <Col span={6}>
              <Input
                placeholder="Item Name"
                value={item.name}
                onChange={(e) =>
                  handleItemChange(index, "name", e.target.value)
                }
              />
            </Col>
            <Col span={4}>
              <InputNumber
                min={1}
                placeholder="Unit Price"
                value={item.unitPrice}
                onChange={(value) =>
                  handleItemChange(index, "unitPrice", value)
                }
                onBlur={() => handleItemTotalChange(index)}
              />
            </Col>
            <Col span={4}>
              <InputNumber
                min={1}
                placeholder="Quantity"
                value={item.quantity}
                onChange={(value) => handleItemChange(index, "quantity", value)}
                onBlur={() => handleItemTotalChange(index)}
              />
            </Col>
            <Col span={4}>
              <InputNumber
                disabled
                placeholder="Item Total"
                value={item.ItemTotalPrice}
              />
            </Col>
          </Row>
        ))}

        <Button onClick={handleAddItem} type="dashed">
          Add Item
        </Button>

        <Divider>Order Summary</Divider>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Grand Total Price">
              <InputNumber
                disabled
                value={calculateTotal()}
                placeholder="Grand Total"
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Advanced Price"
              name="advancedPrice"
              rules={[
                { required: true, message: "Advanced price is required" },
              ]}
            >
              <InputNumber
                min={0}
                placeholder="Enter advanced price"
                onChange={() =>
                  form.setFieldsValue({
                    duePrice:
                      calculateTotal() - form.getFieldValue("advancedPrice"),
                  })
                }
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Due Price">
              <InputNumber
                disabled
                value={calculateTotal() - form.getFieldValue("advancedPrice")}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit Order
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductAddForm;
