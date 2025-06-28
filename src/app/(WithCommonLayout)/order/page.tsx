"use client";

import { useEffect, useState } from "react";
import { Table, Tag, Button, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

import UserInvoice from "@/src/components/userInvoice/UserInvoice";
import { getUserOrders } from "@/src/services/UserDashboard";
import { useUser } from "@/src/context/user.proider";
import Container from "@/src/components/UI/Container";

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
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [hasMounted, setHasMounted] = useState(false);

  // Set mounted state to avoid hydration issues
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Fetch orders when user or pagination changes
  useEffect(() => {
    const fetchOrders = async () => {
      if (!hasMounted || !user?._id || isUserLoading) {
        console.log("No user ID available yet or user loading, skipping order fetch");
        return;
      }
      
      setIsLoading(true);
      
      try {
        const response = await getUserOrders(
          user._id, 
          pagination.current, 
          pagination.pageSize
        );
        
        if (response?.success) {
          setOrders(response.Data?.data || []);
          setPagination(prev => ({
            ...prev,
            total: response.Data?.meta?.total || 0,
          }));
          
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
      }
    };

    fetchOrders();
  }, [user, hasMounted, isUserLoading, pagination.current, pagination.pageSize]);

  const handleTableChange = (newPagination: any) => {
    setPagination({
      current: newPagination.current,
      pageSize: newPagination.pageSize,
      total: newPagination.total,
    });
  };

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
      render: (amount: number) => amount ? `$${amount.toFixed(2)}` : "$0.00",
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
        else if (status === "PENDING") color = "gold";
        
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
    return (
      <Container>
        <div style={{ padding: 20, textAlign: "center" }}>Loading user data...</div>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <div style={{ padding: 20, textAlign: "center" }}>Please login to view your orders</div>
      </Container>
    );
  }

  return (
    <Container>
      <div style={{ padding: 20 }}>
        <Table
          columns={columns}
          dataSource={orders}
          rowKey={(record) => record.id}
          loading={isLoading}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} orders`,
          }}
          onChange={handleTableChange}
          bordered
          scroll={{ x: true }}
          locale={{
            emptyText: isLoading ? "Loading orders..." : "No orders found"
          }}
        />
      </div>
    </Container>
  );
};

export default UserOrderList;