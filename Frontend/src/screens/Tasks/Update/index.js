import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../../redux/reducer/tasksReducer";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";

const TaskUpdateForm = () => {
  const [selectedMember, setSelectedMember] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const { tasks } = useSelector((state) => state.task);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentTask = tasks.find((task) => task.id === parseInt(id));
  useEffect(() => {
    if (currentTask) {
        console.log("Current task: ", currentTask);
      setTitle(currentTask.title);
      setDescription(currentTask.description);
      setSelectedMember(currentTask.member ? currentTask.member.name : null);
      setCreatedAt(currentTask.created_at);
    }
  }, [currentTask]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title) {
      alert("Title is requred");
    } else {
      dispatch(
        updateTask({
          id: currentTask.id,
          title,
          description,
          member: {
            id: currentTask.member.id,
            name: currentTask.member.name,
            email: currentTask.member.email,
          },
          created_at: currentTask.created_at,
        })
      );
      navigate("/tasks");
    }
  };
  return (
    <div className="container">
      <h2>Task Details</h2>
      <form className="create__form" onSubmit={(event) => handleSubmit(event)}>
        <div className="form_element">
          <label>Title: </label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(event) => handleTitleChange(event)}
          />
        </div>
        <div className="form_element">
          <label>Description: </label>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(event) => handleDescriptionChange(event)}
          />
        </div>
        <div className="form_element">
          <label>Assigned to: </label>
          <label className="selected__member__label">
            {selectedMember ? selectedMember : null}
          </label>
        </div>
        <div className="form_element">
          <label>Created At: </label>
          <label className="selected__member__label">
            {createdAt ? createdAt : null}
          </label>
        </div>
        <div className="form_submit">
          <button type="submit" className="submit__btn">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskUpdateForm;
