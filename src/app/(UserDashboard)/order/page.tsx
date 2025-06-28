"use client";

import { useEffect, useState } from "react";
import { Table, Tag, Button, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";


import UserInvoice from "@/src/components/userInvoice/UserInvoice";
import { getUserOrders } from "@/src/services/UserDashboard";
import { useUser } from "@/src/context/user.proider";

interface OrderItem {
  variantId: string;
  productId: string;
  productName: string;
  productImageUrls: string[];
  size: string;
}

interface Order {
  id: string;
  orderTime: string;
  address: string;
  email: string;
  method: string;
  amount: number;
  status: string;
  createdAt: string;
  customerId: string;
  isPaid: boolean;
  phone: string;
  zipcode: string;
  note: string;
  cartItems: OrderItem[];
  customer: {
    id: string;
    imageUrl: string;
    name: string;
  };
}

const UserOrderList = () => {
  const router = useRouter();
  const { user, isLoading: isUserLoading } = useUser();
  console.log('user data', user);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [meta, setMeta] = useState<any>({});
  const [hasMounted, setHasMounted] = useState(false);

  // Set mounted state to avoid hydration issues
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Debugging logs - only run on client side
  useEffect(() => {
    if (hasMounted) {
      console.log("Current user state:", user);
      console.log("Current orders state:", orders);
      console.log("Current meta state:", meta);
    }
  }, [user, orders, meta, hasMounted]);

  // Fetch orders when user is available
  useEffect(() => {
    const fetchOrders = async () => {
      if (!hasMounted || !user?._id || isUserLoading) {
        console.log("No user ID available yet or user loading, skipping order fetch");
        return;
      }
      
      console.log("Starting to fetch orders for user ID:", user._id);
      setIsLoading(true);
      
      try {
        const response = await getUserOrders(user._id);
        console.log("Full API response:", response);
        
        if (response?.success) {
          console.log("Orders data:", response.Data?.data);
          console.log("Meta data:", response.Data?.meta);
          
          setOrders(response.Data?.data || []);
          setMeta(response.Data?.meta || {});
          
          if (!response.Data?.data || response.Data.data.length === 0) {
            console.log("No orders found for this user");
          }
        } else {
          console.error("API returned success=false:", {
            message: response?.message,
            statusCode: response?.statusCode
          });
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
        console.log("Finished loading orders");
      }
    };

    fetchOrders();
  }, [user, hasMounted, isUserLoading]);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      render: (text: string) => text ? `${text.slice(0, 8)}...` : "N/A",
    },
    {
      title: "Order Time",
      dataIndex: "createdAt",
      key: "orderTime",
      render: (value: string) =>
        value ? new Date(value).toLocaleString() : "N/A",
    },
    {
      title: "Customer",
      key: "customer",
      render: (_: any, record: Order) => record.customer?.name || "N/A",
    },
    {
      title: "Shipping Address",
      dataIndex: "address",
      key: "address",
      render: (text: string) => text || "N/A",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: string) => text || "N/A",
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
      render: (text: string) => text || "N/A",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => amount ? `$${amount}` : "$0",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        if (!status) return <Tag color="gray">UNKNOWN</Tag>;
        
        let color = "blue";
        if (status === "DELIVERED") color = "green";
        else if (status === "CANCELED") color = "red";
        else if (status === "PROCESSING") color = "orange";
        
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Items",
      key: "items",
      render: (_: any, record: Order) => (
        <span>{record.cartItems?.length || 0} items</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Order) => (
        <Tooltip title="View Order Details">
          <Button
            shape="circle"
            icon={<EyeOutlined />}
            onClick={() => router.push(`/orderDetails/${record.id}`)}
          />
        </Tooltip>
      ),
    },
    {
      title: "Invoice",
      key: "invoice",
      render: (_: any, record: Order) => <UserInvoice orderId={record.id} />,
    },
  ];

  if (!hasMounted || isUserLoading) {
    return <div>Loading user data...</div>;
  }

  if (!user) {
    return <div>Please login to view your orders</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey={(record) => record.id}
        loading={isLoading}
        pagination={{
          current: meta?.page || 1,
          pageSize: meta?.limit || 10,
          total: meta?.total || 0,
          showTotal: (total) => `Total ${total} orders`,
        }}
        bordered
        scroll={{ x: true }}
        locale={{
          emptyText: isLoading ? "Loading orders..." : "No orders found"
        }}
      />
    </div>
  );
};

export default UserOrderList;