import React, { useState } from "react";
import Layout from "../components/layout";
import TemplateTwo from "../resumetemplates/template_two";
import TemplateOne from "../resumetemplates/template_one";
import { useNavigate } from "react-router-dom";

const AddCv = () => {
  const [formData, setFormData] = useState({
    technicalSkills: [{ name: "", percentage: "" }],
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSkillChange = (index, type, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [type]: [
        ...prevData[type].slice(0, index),
        { ...prevData[type][index], [field]: value },
        ...prevData[type].slice(index + 1),
      ],
    }));
  };

  const handleAddSkill = (type) => {
    setFormData((prevData) => ({
      ...prevData,
      [type]: [...prevData[type], { name: "", percentage: "" }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name) {
      const isConfirmed = window.confirm("Are you sure want to submit?");

      if (isConfirmed) {
        const formDataToSend = {
          username: localStorage.getItem("username"),
          resume_data: formData,
        };

        try {
          const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/add-cv-form`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formDataToSend),
            }
          );

          if (response.ok) {
            navigate("/");
          } else {
            console.error("Failed to submit form data.");
          }
        } catch (error) {
          console.error("Error submitting form data:", error);
        }
      }
    } else {
      alert("Name is mandatory!");
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <h3 className="text-center">Add new resume details</h3>
              <hr />
              <h4>Basic Details</h4>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Image URL
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="image"
                  name="image"
                  onChange={handleChange}
                  value={formData?.image}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={formData?.name}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={formData?.email}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  onChange={handleChange}
                  value={formData?.phone}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  onChange={handleChange}
                  value={formData?.address}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  onChange={handleChange}
                  value={formData?.city}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  name="state"
                  onChange={handleChange}
                  value={formData?.state}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="pincode" className="form-label">
                  Pincode
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="pincode"
                  name="pincode"
                  onChange={handleChange}
                  value={formData?.pincode}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="introduction" className="form-label">
                  Introduction
                </label>
                <textarea
                  className="form-control"
                  id="introduction"
                  name="introduction"
                  rows="4"
                  onChange={handleChange}
                  value={formData?.introduction}
                ></textarea>
              </div>
              <hr />

              <h4>Education</h4>
              <div className="mb-3">
                <label htmlFor="degreeName" className="form-label">
                  Degree Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="degreeName"
                  name="degreeName"
                  onChange={handleChange}
                  value={formData?.degreeName}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="institution" className="form-label">
                  Institution
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="institution"
                  name="institution"
                  onChange={handleChange}
                  value={formData?.institution}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="percentage" className="form-label">
                  Percentage
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="percentage"
                  name="percentage"
                  onChange={handleChange}
                  value={formData?.percentage}
                />
              </div>
              <hr />

              <h4>Experience</h4>
              <div className="mb-3">
                <label htmlFor="organization" className="form-label">
                  Organization
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="organization"
                  name="organization"
                  onChange={handleChange}
                  value={formData?.organization}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="joiningLocation" className="form-label">
                  Joining Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="joiningLocation"
                  name="joiningLocation"
                  onChange={handleChange}
                  value={formData?.joiningLocation}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="position" className="form-label">
                  Position
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="position"
                  name="position"
                  onChange={handleChange}
                  value={formData?.position}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="ctc" className="form-label">
                  CTC
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ctc"
                  name="ctc"
                  onChange={handleChange}
                  value={formData?.ctc}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="joiningDate" className="form-label">
                  Joining Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="joiningDate"
                  name="joiningDate"
                  onChange={handleChange}
                  value={formData?.joiningDate}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="leavingDate" className="form-label">
                  Leaving Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="leavingDate"
                  name="leavingDate"
                  onChange={handleChange}
                  value={formData?.leavingDate}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="technologiesWorkedOn" className="form-label">
                  Technologies Worked On
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="technologiesWorkedOn"
                  name="technologiesWorkedOn"
                  onChange={handleChange}
                  value={formData?.technologiesWorkedOn}
                />
              </div>
              <hr />

              <h4>Projects</h4>
              <div className="mb-3">
                <label htmlFor="projectTitle" className="form-label">
                  Project Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="projectTitle"
                  name="projectTitle"
                  onChange={handleChange}
                  value={formData?.projectTitle}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="teamSize" className="form-label">
                  Team Size
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="teamSize"
                  name="teamSize"
                  onChange={handleChange}
                  value={formData?.teamSize}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="projectDuration" className="form-label">
                  Project Duration
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="projectDuration"
                  name="projectDuration"
                  onChange={handleChange}
                  value={formData?.projectDuration}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="projectTechnologies" className="form-label">
                  Project Technologies
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="projectTechnologies"
                  name="projectTechnologies"
                  onChange={handleChange}
                  value={formData?.projectTechnologies}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="projectDescription" className="form-label">
                  Project Description
                </label>
                <textarea
                  className="form-control"
                  id="projectDescription"
                  name="projectDescription"
                  rows="4"
                  onChange={handleChange}
                  value={formData?.projectDescription}
                ></textarea>
              </div>
              <hr />

              <h4>Skills</h4>
              <div className="mb-3">
                <label>Technical Skills</label>
                {formData?.technicalSkills?.map((skill, index) => (
                  <div key={index} className="row mb-2">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Skill Name"
                        value={skill.name}
                        onChange={(e) =>
                          handleSkillChange(
                            index,
                            "technicalSkills",
                            "name",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Percentage"
                        value={skill.percentage}
                        onChange={(e) =>
                          handleSkillChange(
                            index,
                            "technicalSkills",
                            "percentage",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => handleAddSkill("technicalSkills")}
                >
                  Add Technical Skill
                </button>
              </div>
              <hr />
              <h4>Social Profiles</h4>
              <div className="mb-3">
                <label htmlFor="linkedin" className="form-label">
                  LinkedIn
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="linkedin"
                  name="linkedin"
                  onChange={handleChange}
                  value={formData?.linkedin}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="twitter" className="form-label">
                  Twitter
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="twitter"
                  name="twitter"
                  onChange={handleChange}
                  value={formData?.twitter}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="skype" className="form-label">
                  Skype
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="skype"
                  name="skype"
                  onChange={handleChange}
                  value={formData?.skype}
                />
              </div>
              <hr />

              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            </form>
          </div>

          <div className="col-md-6">
            {window.location.pathname.split("/")[2] === "TEMPLATE_ONE" ? (
              <TemplateOne data={formData}></TemplateOne>
            ) : (
              <TemplateTwo data={formData}></TemplateTwo>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddCv;
