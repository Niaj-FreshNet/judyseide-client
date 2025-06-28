"use client";

import { useEffect, useMemo, useState } from "react";
import { Table, Tag, Button, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import UserInvoice from "./UserInvoice";
import { getCurrentUser } from "@/src/services/AuthService";

const UserOrderList = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [meta, setMeta] = useState<any>({});

const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser(); // Fetch the user from cookies
      setUser(currentUser);
    };

    fetchUser();
  }, []);

const userId = user.id;
console.log("User ID:", userId);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) return;

      try {
        setIsLoading(true);
        const res = await fetch(`/api/orders/user/${userId}`);
        const json = await res.json();

        if (json.success) {
          setOrders(json.Data?.data || []);
          setMeta(json.Data?.meta || {});
        } else {
          console.error("Failed to fetch orders:", json.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      render: (text: string) => text.slice(0, 8) + "...",
    },
    {
      title: "Order Time",
      dataIndex: "orderTime",
      key: "orderTime",
      render: (value: string) =>
        value ? new Date(value).toLocaleString() : "N/A",
    },
    {
      title: "Shipping Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `$${amount}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = "blue";
        if (status === "DELIVERED") color = "green";
        else if (status === "CANCELED") color = "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Tooltip title="View Product Details">
            <Button
              shape="circle"
              icon={<EyeOutlined />}
              onClick={() =>
                router.push(`/dashboard/order-list/${record.id}`)
              }
            />
          </Tooltip>
        </div>
      ),
    },
    {
      title: "Invoice",
      key: "invoice",
      render: (_: any, record: any) => <UserInvoice orderId={record.id} />,
    },
  ];

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
      />
    </div>
  );
};

export default UserOrderList;
