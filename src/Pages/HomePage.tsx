import {
  Checkbox,
  Input,
  Space,
  Select,
  Pagination,
  Empty,
  Spin,
  Row,
  Col,
} from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { PaginationProps } from "antd";
import { useSearchParams } from "react-router-dom";

import TopHeader from "../Components/TopHeader";

import useDataLoader from "../Hook/UseDataLoad";
import { useState } from "react";
import ShowData from "../Components/ShowData";

const HomePage = () => {
  let [searchParams, setSearchParams] = useSearchParams({
    rocketName: "",
    status: "",
    date: "",
    upcoming: "",
  });
  const rocketName = searchParams.get("rocketName");
  const missionStatus = searchParams.get("status");
  const [upcoming, setUpcoming] = useState<boolean>(false);
  const { data, total, loading } = useDataLoader(
    rocketName,
    missionStatus,
    upcoming
  );
  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    console.log(current, pageSize);
  };

  return (
    //   style={{ margin: "1rem 20rem" }}
    <div className="container">
      <TopHeader />

      {/* search and filter section */}

      <Row align={"middle"} justify={"space-between"} gutter={[5, 16]}>
        <Col xs={24} sm={24} md={9} lg={6} style={{ marginTop: "2rem" }}>
          <Input.Search
            placeholder="Search by rocket name"
            style={{ width: "100%" }}
            onSearch={(e) =>
              setSearchParams((prv) => {
                prv.set("rocketName", e);
                return prv;
              })
            }
            enterButton
          />
        </Col>

        <Col xs={24} sm={24} md={13} lg={8}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={24} className="upcoming">
              <Checkbox
                onChange={(e: CheckboxChangeEvent) =>
                  setUpcoming(e.target.checked)
                }
              >
                Show upcoming only
              </Checkbox>
            </Col>
            <Col xs={24} md={12} lg={12}>
              <Select
                placeholder="By Launch Status"
                style={{ width: "100%", marginRight: "20px" }}
                onChange={(e) =>
                  setSearchParams((prv) => {
                    prv.set("status", e);
                    return prv;
                  })
                }
                options={[
                  { value: "true", label: "Success" },
                  { value: "false", label: "Failed" },
                ]}
              />
            </Col>
            <Col xs={24} md={12} lg={12}>
              <Select
                placeholder="By Launch Date"
                style={{ width: "100%" }}
                onChange={(e) => {
                  setSearchParams((prv) => {
                    prv.set("date", e);
                    return prv;
                  });
                }}
                options={[
                  { value: "jack", label: "Last week" },
                  { value: "lucy", label: "Last Month" },
                  { value: "Yiminghe", label: "Last Year" },
                ]}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      {/* spaceflights card section  */}
      <Row style={{ marginTop: "50px" }} gutter={[16, 16]}>
        {loading ? (
          <div style={{ textAlign: "center", width: "100%" }}>
            <Spin />
          </div>
        ) : (
          <>
            {" "}
            {data.length ? (
              <>
                {data.map((sMission, index) => (
                  <ShowData sMission={sMission} key={index} />
                ))}
              </>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  marginTop: "5rem",
                }}
              >
                <Empty />
              </div>
            )}
          </>
        )}
      </Row>

      {data.length && !loading ? (
        <Space
          align="center"
          style={{
            width: "100%",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Pagination
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            defaultCurrent={3}
            total={total}
          />
        </Space>
      ) : (
        ""
      )}
    </div>
  );
};

export default HomePage;
