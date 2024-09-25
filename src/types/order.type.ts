import { Dispatch } from "react";
import { TUser } from "../redux/features/auth/authSlice";

export type TOrderItem = {
  name: string;
  unitPrice: number;
  quantity: number;
  ItemTotalPrice: number;
};

export type TOrderFormValues = {
  _id: string;
  seller: TUser;
  location: string;
  shopName: string;
  shopOwnerName: string;
  contact: string;
  address: string;
  deliveryDate: string;
  items: TOrderItem[];
  grandTotalPrice: number;
  advancedPrice: number;
  duePrice: number;
  lastDue: number;
  totalPrice: number;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TProductUpdateParams = {
  updateModalOpen: boolean;
  setUpdateModalOpen: Dispatch<React.SetStateAction<boolean>>;
  productData: TOrderFormValues;
};
