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
import { useSearchParams } from "react-router-dom";

import TopHeader from "../Components/TopHeader";

import useDataLoader from "../Hook/UseDataLoad";
import { useEffect, useState } from "react";
import ShowData from "../Components/ShowData";

const HomePage = () => {
  let [searchParams, setSearchParams] = useSearchParams({
    rocketName: "",
    status: "",
    upcoming: "",
    currentPage: "",
  });
  const rocketName = searchParams.get("rocketName");
  const missionStatus = searchParams.get("status");
  const currentPage: string = searchParams.get("currentPage") || "1";
  const [upcoming, setUpcoming] = useState<boolean>(false);
  const { data, total, loading } = useDataLoader(
    rocketName,
    missionStatus,
    upcoming
  );
  // Get current posts
  const indexOfLastPost = Number(currentPage) * 9;
  const indexOfFirstPost = indexOfLastPost - 9;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    if (data.length < 1) {
      setSearchParams((prv) => {
        prv.set("currentPage", String(1));
        return prv;
      });
    }
  }, [currentPage, missionStatus, rocketName]);
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
                {currentPosts.map((sMission, index) => (
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
            showSizeChanger={false}
            current={Number(currentPage)}
            onChange={(page) =>
              setSearchParams((prv) => {
                prv.set("currentPage", String(page));
                return prv;
              })
            }
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
