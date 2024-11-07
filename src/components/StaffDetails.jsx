// src/pages/StaffDetails.jsx
import React from "react";
import "../css/StaffDetails.css";

const staffData = [
  {
    id: 1,
    name: "Abhishek Jadhav",
    branch: "Marketing",
    description: "Senior Marketing Manager with 10 years of experience.",
    contact: "999999999",
    email: "abhishek@gamil.com",
    address: "Kothrud, pune",
  },
  {
    id: 2,
    name: "Kunal Bhosale",
    branch: "Sales",
    description: "Experienced Sales Executive specializing in B2B sales.",
    contact: "8888888888",
    email: "kunal@gmail.com",
    address: "Naregaon, pune",
  },
  {
    id: 3,
    name: "Ganesh Jadhav",
    branch: "Human Resources",
    description: "HR specialist with a focus on talent development.",
    contact: "7777777777",
    email: "ganesh@gmail.com",
    address: "Pashan, pune",
  },
  {
    id: 4,
    name: "Abhay Jadhav",
    branch: "Engineering",
    description: "Lead Engineer with expertise in software architecture.",
    contact: "66666666666",
    email: "abhay@gmail.com",
    address: "Warje, pune",
  },
];

const StaffDetails = () => {
  return (
    <div className="staff-details">
      <h2>Staff Details</h2>
      <div className="staff-cards">
        {staffData.map((staff) => (
          <div key={staff.id} className="staff-card">
            <h3>{staff.name}</h3>
            <p>
              <strong>Branch:</strong> {staff.branch}
            </p>
            <p>
              <strong>Description:</strong> {staff.description}
            </p>
            <p>
              <strong>Contact:</strong> {staff.contact}
            </p>
            <p>
              <strong>Email:</strong> {staff.email}
            </p>
            <p>
              <strong>Address:</strong> {staff.address}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffDetails;
