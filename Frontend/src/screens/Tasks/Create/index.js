import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../../redux/reducer/tasksReducer";
import "./index.css";
import dateFormat from "dateformat";
import { useNavigate } from "react-router-dom";

const TaskCreateForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { members } = useSelector((state) => state.member);
  const { tasks } = useSelector((state) => state.task);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleMemberChange = (event) => {
    setSelectedMember(members[+event.target.value]);
    console.log("seleced member: ", members[+event.target.value])
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title) {
      alert("Title is requred");
    } else {
      const now = new Date();
      dispatch(
        addTask({
          id: tasks[tasks.length - 1].id + 1,
          title,
          description,
          member: {
            id: selectedMember.id,
            name: selectedMember.name,
            email: selectedMember.email,
          },
          created_at: dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT"),
        })
      );
      navigate("/tasks");
    }
  };
  return (
    <div className="container">
      <h2>Create New Task</h2>
      <form className="create__form" onSubmit={(event) => handleSubmit(event)}>
        <div className="form_element">
          <label>Title: </label>
          <input
            type="text"
            placeholder="Title"
            onChange={(event) => handleTitleChange(event)}
          />
        </div>
        <div className="form_element">
          <label>Description: </label>
          <input
            type="text"
            placeholder="Description"
            onChange={(event) => handleDescriptionChange(event)}
          />
        </div>
        <div className="form_element">
          <label>Assign to: </label>
          <select onChange={handleMemberChange}>
            {members.map((option, index) => (
              <option key={index} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form_submit">
          <button type="submit" className="submit__btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskCreateForm;
