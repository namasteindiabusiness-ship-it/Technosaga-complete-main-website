import React from "react";
import DashboardStats from "../../components/DashboardStats";

export default function Dashboard() {
  const tourStat = [
    { _id: 1, title: "Total Registered User", value: 455 },
    {
      _id: 2,
      title: "Total Tour",
      value: 120,
    },
    { _id: 3, title: "Completed Tour", value: 234 },
    { _id: 4, title: "Upcoming Tour", value: 120 },
  ];

  return (
    <div className="dashboard">
      <div className="stat-data">
        {tourStat.map((stat) => (
          <DashboardStats key={stat._id} stat={stat} />
        ))}
      </div>
    </div>
  );
}
