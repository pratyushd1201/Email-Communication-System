import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteTask } from "../../../redux/reducer/tasksReducer";
import "./index.css";

const TaskList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.task);
  console.log("Tasks: ", tasks);
  const handleDelete = (id) => {
    dispatch(
      deleteTask({
        id: id,
      })
    );
    navigate(".....\nextjs-emails-main\app\template\page.jsx");
  };
  return (
    <div>
    </div>
  );
};

export default TaskList;
