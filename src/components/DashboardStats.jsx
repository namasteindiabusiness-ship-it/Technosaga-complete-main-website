import React from "react";

export default function DashboardStats({ stat }) {
  return (
    <div className={`stat-box stat${stat._id}`}>
      <h2>{stat.value}</h2>
      <p>{stat.title}</p>
    </div>
  );
}
