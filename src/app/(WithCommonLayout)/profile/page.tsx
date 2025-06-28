"use client";

import React, { useState, useEffect } from "react";
import { Row, Col, Input, Button, Avatar, Typography, Card, Form, Modal, Upload, message } from "antd";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { getProfile, updateProfile } from "@/src/services/UserDashboard";
import Container from "@/src/components/UI/Container";

const { Text } = Typography;

interface ProfileData {
  name: string | null;
  email: string | null;
  contact: string | null;
  imageUrl: string | null;
  address: string | null;
}

const UserProfile: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const data = await getProfile();
      if (data) {
        setProfileData(data.Data);
        form.setFieldsValue({
          name: data.Data?.name,
          email: data.Data?.email,
          contact: data.Data?.contact,
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
    if (profileData) {
      form.setFieldsValue({
        name: profileData.name,
        email: profileData.email,
        contact: profileData.contact,
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setFileList([]);
  };

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      const values = await form.validateFields();

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("contact", values.contact);
      formData.append("address", profileData?.address || "");

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      } else if (profileData?.imageUrl) {
        formData.append("imageUrl", profileData.imageUrl);
      }

      const updatedProfile = await updateProfile(formData);
      
      if (updatedProfile) {
        toast.success("Profile updated successfully!");
        setIsModalVisible(false);
        await fetchProfile();
      }
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Update error:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const uploadProps = {
    beforeUpload: (file: File) => {
      const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
        return false;
      }
      const isLt25M = file.size / 1024 / 1024 < 25;
      if (!isLt25M) {
        message.error("Image must be smaller than 25MB!");
        return false;
      }
      return false;
    },
    fileList,
    onChange: ({ fileList: newFileList }: { fileList: any[] }) => setFileList(newFileList),
    onRemove: () => setFileList([]),
  };

  return (
    <Container>
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        {/* Profile Header Card */}
        <Card 
          bordered={false} 
          className="mb-6 sm:mb-8 shadow-none"
        >
          <Row 
            align="middle" 
            gutter={[16, 16]} 
            className="flex-col sm:flex-row"
          >
            <Col flex="none">
              <Avatar 
                src={profileData?.imageUrl || "/default-avatar.png"} 
                size={{ xs: 64, sm: 76 }}
                className="border border-gray-200"
              />
            </Col>
            <Col flex="auto">
              <Text strong className="text-lg sm:text-xl block">
                {profileData?.name || "No name set"}
              </Text>
              <Text type="secondary" className="text-base sm:text-lg">
                {profileData?.email || "No email set"}
              </Text>
            </Col>
            <Col flex="none" className="w-full sm:w-auto text-left sm:text-right mt-4 sm:mt-0">
              <Button
                type="primary"
                onClick={showModal}
                loading={isLoading}
                className="bg-orange-400 border-orange-400 h-10 w-full sm:w-32 text-sm sm:text-base"
              >
                {isLoading ? 'Loading...' : 'Edit Profile'}
              </Button>
            </Col>
          </Row>
        </Card>

        {/* Profile Details */}
        <div className="border-t-2 border-gray-200 pt-6 sm:pt-8">
          <Form layout="vertical">
            <Form.Item label={<span className="text-lg sm:text-xl font-normal">Name</span>}>
              <Input
                value={profileData?.name || "Not set"}
                className="h-10 rounded border-orange-400"
                readOnly
              />
            </Form.Item>

            <Row gutter={[16, 16]} className="flex-col sm:flex-row">
              <Col xs={24} sm={12}>
                <Form.Item label={<span className="text-lg sm:text-xl font-normal">Email</span>}>
                  <Input
                    value={profileData?.email || "Not set"}
                    className="h-10 rounded border-orange-400"
                    readOnly
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label={<span className="text-lg sm:text-xl font-normal">Contact Number</span>}>
                  <Input
                    value={profileData?.contact || "Not set"}
                    className="h-10 rounded border-orange-400"
                    readOnly
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>

        {/* Edit Profile Modal */}
        <Modal
          title={
            <div className="flex justify-between items-center pr-6">
              <span className="text-orange-400 text-lg font-normal">Edit Profile</span>
              <CloseOutlined 
                onClick={handleCancel} 
                className="text-orange-400 text-base cursor-pointer" 
              />
            </div>
          }
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          closable={false}
          width={600}
          className="max-w-[95vw]"
          styles={{
            header: {
              borderBottom: "none",
              paddingBottom: "16px",
            },
          }}
        >
          <Form form={form} layout="vertical" className="mt-5">
            <Form.Item
              label={<span className="text-base font-normal text-black">Name</span>}
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input
                placeholder="Name"
                className="h-11 rounded border-orange-400 text-sm"
              />
            </Form.Item>

            <Form.Item label={<span className="text-base font-normal text-black">Image</span>}>
              <Upload.Dragger
                {...uploadProps}
                className="border-orange-400 rounded bg-gray-50 py-10 px-5"
              >
                <div className="text-center">
                  <UploadOutlined className="text-gray-500 text-2xl mb-2" />
                  <div className="text-black text-base mb-1">Drop file or browse</div>
                  <div className="text-gray-500 text-xs mb-4">
                    Format: .jpeg, .png & Max file size: 25 MB
                  </div>
                  <Button
                    className="bg-orange-400 border-orange-400 text-white text-xs h-8 px-4"
                  >
                    Browse Files
                  </Button>
                </div>
              </Upload.Dragger>

              {fileList.length > 0 && (
                <div className="mt-4">
                  <div className="relative inline-block w-28 h-20 bg-gray-200 rounded overflow-hidden">
                    <img
                      src={URL.createObjectURL(fileList[0].originFileObj as File) || "/placeholder.svg"}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                    <CloseOutlined
                      onClick={() => setFileList([])}
                      className="absolute top-1 right-1 text-orange-400 bg-white rounded-full p-1 text-xs cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </Form.Item>

            <Form.Item
              label={<span className="text-base font-normal text-black">Email</span>}
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                placeholder="admin@email.com"
                className="h-11 rounded border-orange-400 text-sm"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-base font-normal text-black">Contact Number</span>}
              name="contact"
              rules={[{ required: true, message: "Please input your contact number!" }]}
            >
              <Input
                placeholder="0123456789"
                className="h-11 rounded border-orange-400 text-sm mb-10"
              />
            </Form.Item>

            <div className="flex justify-end gap-3 mt-10">
              <Button
                onClick={handleCancel}
                className="h-11 w-28 sm:w-32 border-orange-400 text-orange-400 text-sm font-normal"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={handleUpdate}
                loading={isUpdating}
                className="bg-orange-400 border-orange-400 h-11 w-36 text-sm font-normal"
              >
                {isUpdating ? 'Updating...' : 'Update Profile'}
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </Container>
  );
};

export default UserProfile;