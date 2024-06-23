import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="container">
    <h1>Email History</h1>
    <ul class="email-list">
        <li class="email-item">
            <div class="email-subject">Meeting Reminder</div>
            <div class="email-sender">From: Alice</div>
            <div class="email-date">Date: 2024-06-23</div>
            <div class="email-body">Don't forget our meeting at 10 AM tomorrow.</div>
        </li>
        <li class="email-item">
            <div class="email-subject">Project Update</div>
            <div class="email-sender">From: Bob</div>
            <div class="email-date">Date: 2024-06-22</div>
            <div class="email-body">The project is on track for the deadline.</div>
        </li>
        <li class="email-item">
            <div class="email-subject">Party Invitation</div>
            <div class="email-sender">From: Carol</div>
            <div class="email-date">Date: 2024-06-21</div>
            <div class="email-body">You're invited to a party this Saturday!</div>
        </li>
    </ul>
    </div>
  );
}

export default Dashboard;
