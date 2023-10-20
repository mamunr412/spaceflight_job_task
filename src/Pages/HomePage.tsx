import {
  Checkbox,
  Input,
  Space,
  Select,
  Row,
  Pagination,
  Empty,
  Spin,
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
    <div style={{ margin: "1rem 20rem" }}>
      <TopHeader />

      {/* search and filter section */}
      <Space
        align="center"
        style={{
          width: "100%",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <div style={{ marginTop: "20px" }}>
          <Input.Search
            placeholder="input search text"
            style={{ width: 350 }}
            onSearch={(e) =>
              setSearchParams((prv) => {
                prv.set("rocketName", e);
                return prv;
              })
            }
            enterButton
          />
        </div>
        <div>
          <div style={{ textAlign: "end", marginBottom: "5px" }}>
            <Checkbox
              onChange={(e: CheckboxChangeEvent) =>
                setUpcoming(e.target.checked)
              }
            >
              show upcoming only
            </Checkbox>
          </div>

          <Select
            placeholder="By Launch Status"
            style={{ width: 220, marginRight: "20px" }}
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
          <Select
            placeholder="By Launch Date"
            style={{ width: 220 }}
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
        </div>
      </Space>

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
