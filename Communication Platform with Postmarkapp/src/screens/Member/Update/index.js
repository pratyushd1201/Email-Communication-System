import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";
import { updateMember } from "../../../redux/reducer/memberReducer";

const MemberUpdateForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [assignedTaskList, setAssignedTaskList] = useState([]);

  const { members } = useSelector((state) => state.member);
  const { tasks } = useSelector((state) => state.task);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentMember = members.find((member) => member.id === parseInt(id));
  useEffect(() => {
    if (currentMember) {
      setName(currentMember.name);
      setEmail(currentMember.email);
      const assignedTasks = tasks.filter(
        (task) => task.member.id === currentMember.id
      );
      setAssignedTaskList(assignedTasks);
    }
  }, [currentMember, tasks]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name) {
      alert("Name is requred");
    } else {
      dispatch(
        updateMember({
          id: currentMember.id,
          name,
          email,
        })
      );
      navigate("/members");
    }
  };
  return (
    <div className="container">
      <h2>Member Details</h2>
      <form className="create__form" onSubmit={(event) => handleSubmit(event)}>
        <div className="form_element">
          <label>Name: </label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event) => handleNameChange(event)}
          />
        </div>
        <div className="form_element">
          <label>Email: </label>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(event) => handleEmailChange(event)}
          />
        </div>
        <div className="form_element">
          <label>Assigned Tasks: </label>
          <table>
            <thead>
              <tr>
                <th>Serial</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {assignedTaskList.length ? (
                assignedTaskList.map((data, index) => (
                  <tr key={index}>
                    <td>{data ? data.id : null}</td>
                    <td>
                      <span>{data ? data.title : null}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>-</td>
                </tr>
              )}
            </tbody>
          </table>
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

export default MemberUpdateForm;
