import React from "react";
import AdminPostCard from "./AdminPostCard";

const AdminPostCardHold = ({ dataA }) => {
  return (
    <>
      {dataA?.toReversed().map((dataD) => {
        return <AdminPostCard data={dataD} key={dataD?.id} />;
      })}
    </>
  );
};

export default AdminPostCardHold;
