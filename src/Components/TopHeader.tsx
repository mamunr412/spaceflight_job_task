import { Typography, Space } from "antd";

const TopHeader = () => {
  return (
    <Space align="center" style={{ width: "100%", justifyContent: "center" }}>
      <div>
        <Typography.Title level={2} style={{ paddingLeft: "40px" }}>
          Spaceflight details
        </Typography.Title>
        <Typography.Text>
          Find out the elaborate feature of all the past big spaceflights
        </Typography.Text>
      </div>
    </Space>
  );
};

export default TopHeader;
