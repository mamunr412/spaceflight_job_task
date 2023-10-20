import { Col, Card, Typography, Tag } from "antd";
import { dateFormat } from "../utils/DateFormate";
import { IMission } from "../Types/Types";
const ShowData = ({ sMission }: { sMission: IMission }) => {
  return (
    <Col xs={24} md={12} lg={8}>
      <Card style={{ textAlign: "center" }}>
        <img src={sMission.photo} alt="" height={124} width={124} />
        <div style={{ paddingTop: "20px" }}>
          <Typography
            style={{
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "24px",
              color: "#343A40",
            }}
          >
            Launch Date:{" "}
            <span
              style={{
                color: "#343A40",
              }}
            >
              {dateFormat(sMission.date)}
            </span>
          </Typography>
          <Typography
            style={{
              fontSize: "24px",
              fontWeight: "500",
              lineHeight: "28px",
              paddingTop: "8px",
            }}
          >
            {sMission.mission_name}
          </Typography>
          <Typography
            style={{
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "21px",
              paddingTop: "5px",
            }}
          >
            {sMission.rocket_name}
          </Typography>
        </div>
        <div style={{ marginTop: "18px" }}>
          <Typography
            style={{
              fontSize: "16px",
              fontWeight: "500",
              lineHeight: "19px",
              color: "#6C757D",
              marginBottom: "7px",
            }}
          >
            Launch Status:{" "}
          </Typography>
          <Tag color={sMission.status ? "#198754" : "#DC3545"}>
            {sMission.status ? "Success" : "Failed"}
          </Tag>
        </div>
      </Card>
    </Col>
    // <div style={{ margin: "1rem 20rem" }}>
    //   <TopHeader />

    //   {/* search and filter section */}
    //   <Space
    //     align="center"
    //     style={{
    //       width: "100%",
    //       justifyContent: "space-between",
    //       marginTop: "10px",
    //       flexDirection: "column", // Change to column layout on smaller screens
    //     }}
    //   >
    //     <Input.Search
    //       placeholder="input search text"
    //       style={{ width: "100%", marginBottom: "10px" }} // Expand the width to 100% and add some bottom margin
    //       onSearch={(e) =>
    //         setSearchParams((prv) => {
    //           prv.set("rocketName", e);
    //           return prv;
    //         })
    //       }
    //       enterButton
    //     />
    //     <div style={{ display: "flex", flexDirection: "column" }}>
    //       <Checkbox
    //         onChange={(e: CheckboxChangeEvent) => setUpcoming(e.target.checked)}
    //       >
    //         Show upcoming only
    //       </Checkbox>
    //       <Select
    //         placeholder="By Launch Status"
    //         style={{ width: "100%", marginBottom: "10px" }} // Expand the width to 100% and add some bottom margin
    //         onChange={(e) =>
    //           setSearchParams((prv) => {
    //             prv.set("status", e);
    //             return prv;
    //           })
    //         }
    //         options={[
    //           { value: "true", label: "Success" },
    //           { value: "false", label: "Failed" },
    //         ]}
    //       />
    //       <Select
    //         placeholder="By Launch Date"
    //         style={{ width: "100%" }} // Expand the width to 100%
    //         onChange={(e) => {
    //           setSearchParams((prv) => {
    //             prv.set("date", e);
    //             return prv;
    //           });
    //         }}
    //         options={[
    //           { value: "jack", label: "Last week" },
    //           { value: "lucy", label: "Last Month" },
    //           { value: "Yiminghe", label: "Last Year" },
    //         ]}
    //       />
    //     </div>
    //   </Space>

    //   {/* spaceflights card section  */}
    //   <Row style={{ marginTop: "50px" }} gutter={[16, 16]}>
    //     {data.length ? (
    //       <>
    //         {data.map((sMission, index) => (
    //           <Col key={index} xs={24} md={16} lg={8}>
    //             <Card style={{ maxWidth: 400, textAlign: "center" }}>
    //               <img src={sMission.photo} alt="" height={124} width={124} />
    //               <div style={{ paddingTop: "20px" }}>
    //                 <Typography
    //                   style={{
    //                     fontSize: "16px",
    //                     fontWeight: "400",
    //                     lineHeight: "24px",
    //                     color: "#343A40",
    //                   }}
    //                 >
    //                   Launch Date:{" "}
    //                   <span
    //                     style={{
    //                       color: "#343A40",
    //                     }}
    //                   >
    //                     {dateFormat(sMission.date)}
    //                   </span>
    //                 </Typography>
    //                 <Typography
    //                   style={{
    //                     fontSize: "24px",
    //                     fontWeight: "500",
    //                     lineHeight: "28px",
    //                     paddingTop: "8px",
    //                   }}
    //                 >
    //                   {sMission.mission_name}
    //                 </Typography>
    //                 <Typography
    //                   style={{
    //                     fontSize: "14px",
    //                     fontWeight: "400",
    //                     lineHeight: "21px",
    //                     paddingTop: "5px",
    //                   }}
    //                 >
    //                   {sMission.rocket_name}
    //                 </Typography>
    //               </div>
    //               <div style={{ marginTop: "18px" }}>
    //                 <Typography
    //                   style={{
    //                     fontSize: "16px",
    //                     fontWeight: "500",
    //                     lineHeight: "19px",
    //                     color: "#6C757D",
    //                     marginBottom: "7px",
    //                   }}
    //                 >
    //                   Launch Status:{" "}
    //                 </Typography>
    //                 <Tag color={sMission.status ? "#198754" : "#DC3545"}>
    //                   {sMission.status ? "Success" : "Failed"}
    //                 </Tag>
    //               </div>
    //             </Card>
    //           </Col>
    //         ))}
    //       </>
    //     ) : (
    //       <div
    //         style={{ textAlign: "center", width: "100%", marginTop: "5rem" }}
    //       >
    //         <Empty />
    //       </div>
    //     )}
    //   </Row>

    //   {data.length ? (
    //     <Space
    //       align="center"
    //       style={{
    //         width: "100%",
    //         justifyContent: "center",
    //         marginTop: "20px",
    //       }}
    //     >
    //       <Pagination
    //         showSizeChanger
    //         onShowSizeChange={onShowSizeChange}
    //         defaultCurrent={3}
    //         total={total}
    //       />
    //     </Space>
    //   ) : (
    //     ""
    //   )}
    // </div>
    //   <Row style={{ marginTop: "50px" }} gutter={[16, 16]}>
    //     {data.length ? (
    //       <>
    //         {data.map((sMission, index) => (

    //         ))}
    //       </>
    //     ) : (
    //       <div
    //         style={{ textAlign: "center", width: "100%", marginTop: "5rem" }}
    //       >
    //         <Empty />
    //       </div>
    //     )}
    //   </Row></div>
  );
};

export default ShowData;
