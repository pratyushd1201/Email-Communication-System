import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteMember } from "../../../redux/reducer/memberReducer";
import "./index.css";

const MemberList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { members } = useSelector((state) => state.member);
  console.log("Members: ", members);
  const handleDelete = (id) => {
    dispatch(
      deleteMember({
        id: id,
      })
    );
    navigate("/members");
  };
  return (
    <div className="container">
      <div className="task__list__head">
        <h2>Members</h2>
        <button onClick={() => navigate("/create-member")}>Add Member</button>
      </div>
      <div className="data__table__box">
        <table>
          <thead>
            <tr>
              <th>Serial</th>
              <th>Name</th>
              <th>Number of Assigned Tasks</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {members.length ? (
              members.map((data, index) => (
                <tr key={index}>
                  <td>{data ? data.id : null}</td>
                  <td>
                    <Link
                      className="update__member"
                      to={`/update-member/${data.id}`}
                    >
                      {data ? data.name : null}
                    </Link>
                  </td>
                  <td>
                    <span>{data ? data.email : null}</span>
                  </td>
                  <td>
                    <button
                      className="delete__item"
                      onClick={() => handleDelete(data.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberList;
