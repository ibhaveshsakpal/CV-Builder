import React, { useEffect, useState } from "react";
import TemplateOne from "../resumetemplates/template_one";
import TemplateTwo from "../resumetemplates/template_two";
import html2pdf from "html2pdf.js";
import Layout from "../components/layout";
import Loader from "../components/loader";

const Preview = () => {
  const [cvs, setCVs] = useState();

  useEffect(() => {
    async function fetchResume() {
      try {
        const queryParam = window.location.pathname.split("/")[2];
        const fetchResume = await fetch(
          `${process.env.REACT_APP_BASE_URL}/editcv/${queryParam}`
        );
        const res = await fetchResume.json();
        setCVs(res?.data?.resume_data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchResume();
  }, []);

  const handleDownload = () => {
    const content = document.getElementById("pdf-content");
    html2pdf(content);
  };

  return (
    <>
      {!cvs ? (
        <Loader />
      ) : (
        <Layout>
          <div className="text-center pt-2">
            <button
              className="btn btn-primary-outline"
              onClick={handleDownload}
            >
              Download CV
            </button>
          </div>
          <div id="pdf-content">
            {window.location.pathname.split("/")[3] === "TEMPLATE_ONE" ? (
              <TemplateOne data={cvs}></TemplateOne>
            ) : (
              <TemplateTwo data={cvs}></TemplateTwo>
            )}
          </div>
        </Layout>
      )}
    </>
  );
};

export default Preview;
