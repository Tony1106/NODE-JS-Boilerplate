import React from "react";

export default function TicketFooter(props) {
  const classVariable = {
    status: {
      open: "badge-danger",
      pending: "badge-warning",
      solved: "badge-success"
    },
    priority: {
      low: "badge-dark",
      normal: "badge-info",
      high: "badge-success",
      urgent: "badge-danger"
    }
  };
  const renderClass = status => {
    if (classVariable.status.hasOwnProperty(status)) {
      return classVariable.status[status.toLowerCase()];
    }
    if (classVariable.priority.hasOwnProperty(status)) {
      return classVariable.priority[status.toLowerCase()];
    }
  };
  let outputClass = renderClass(props.status);
  return (
    <>
      <div> {props.name}</div>
      <div class={`badge badge-pill ${props.status && outputClass} `}>
        {props.status || "Not set"}
      </div>
    </>
  );
}
