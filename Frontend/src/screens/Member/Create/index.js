import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addMember } from "../../../redux/reducer/memberReducer";
import "./index.css";

const MemberCreateForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { members } = useSelector((state) => state.member);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const member = members.find((item) => item.email === email);

    if (!name) {
      alert("Name is required !!");
    } else if (member) {
      alert("Member with this email already exists !!");
    } else {
      dispatch(
        addMember({
          id: members[members.length - 1].id + 1,
          name,
          email,
        })
      );
      navigate("/members");
    }
  };
  return (
    <div className="container">
      <h2>Create New Member</h2>
      <form className="create__form" onSubmit={(event) => handleSubmit(event)}>
        <div className="form_element">
          <label>Name: </label>
          <input
            type="text"
            placeholder="Name"
            onChange={(event) => handleNameChange(event)}
          />
        </div>
        <div className="form_element">
          <label>Email: </label>
          <input
            type="email"
            placeholder="Email"
            onChange={(event) => handleEmailChange(event)}
          />
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

export default MemberCreateForm;
