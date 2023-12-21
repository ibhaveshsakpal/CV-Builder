import React from "react";

const TemplateOne = (props) => {
  if (!props.data) {
    return null;
  }

  const {
    image,
    name,
    email,
    phone,
    address,
    city,
    state,
    pincode,
    introduction,
    degreeName,
    institution,
    percentage,
    organization,
    position,
    ctc,
    joiningDate,
    leavingDate,
    technologiesWorkedOn,
    projectTitle,
    teamSize,
    projectDuration,
    projectTechnologies,
    projectDescription,
    technicalSkills,
    linkedin,
    twitter,
    skype,
  } = props?.data;

  return (
    <div className="container mt-5 shadow p-5 bg-light rounded">
      <div className="row bg-primary p-5 text-white">
        <div className="col-md-4">
          <img src={image} alt="Profile" className="img-fluid rounded-circle" />
        </div>
        <div className="col-md-8">
          <h2 className="mt-3">{name}</h2>
          <p>Email: {email}</p>
          <p>Phone: {phone}</p>
          <p>
            Address: {address}, {city}, {state} - {pincode}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-primary">Introduction</h3>
        <p>{introduction}</p>
      </div>

      <div className="mt-5">
        <h3 className="text-primary">Education</h3>
        <table className="table">
          <tbody>
            <tr>
              <td>Degree Name</td>
              <td>{degreeName}</td>
            </tr>
            <tr>
              <td>Institution</td>
              <td>{institution}</td>
            </tr>
            <tr>
              <td>Percentage</td>
              <td>{percentage}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-5">
        <h3 className="text-primary">Work Experience</h3>
        <table className="table">
          <tbody>
            <tr>
              <td>Organization</td>
              <td>{organization}</td>
            </tr>
            <tr>
              <td>Position</td>
              <td>{position}</td>
            </tr>
            <tr>
              <td>CTC</td>
              <td>{ctc}</td>
            </tr>
            <tr>
              <td>Joining Date</td>
              <td>{joiningDate}</td>
            </tr>
            <tr>
              <td>Leaving Date</td>
              <td>{leavingDate}</td>
            </tr>
            <tr>
              <td>Technologies Worked On</td>
              <td>{technologiesWorkedOn}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-5">
        <h3 className="text-primary">Project Details</h3>
        <table className="table">
          <tbody>
            <tr>
              <td>Title</td>
              <td>{projectTitle}</td>
            </tr>
            <tr>
              <td>Team Size</td>
              <td>{teamSize}</td>
            </tr>
            <tr>
              <td>Duration</td>
              <td>{projectDuration}</td>
            </tr>
            <tr>
              <td>Technologies Used</td>
              <td>{projectTechnologies}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{projectDescription}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-5">
        <h3 className="text-primary">Technical Skills</h3>
        <ul className="list-group">
          {technicalSkills.map((skill, index) => (
            <li key={index} className="list-group-item">
              {skill.name}: {skill.percentage}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5">
        <h3 className="text-primary">Social Media</h3>
        <ul className="list-group">
          <li className="list-group-item">LinkedIn: {linkedin}</li>
          <li className="list-group-item">Twitter: {twitter}</li>
          <li className="list-group-item">Skype: {skype}</li>
        </ul>
      </div>
    </div>
  );
};

export default TemplateOne;
