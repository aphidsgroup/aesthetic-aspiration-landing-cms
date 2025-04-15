exports.handler = async (event, context) => {
  // GET method - return current data
  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        title: "Frequently Asked Questions",
        subtitle: "Find answers to common questions about our courses, certifications, and enrollment process",
        faqs: [
          {
            id: 1,
            question: "What are the eligibility requirements for the courses?",
            answer: "Our courses are designed for medical professionals including doctors, dentists, and nurses. For specific courses, additional criteria may apply. Please contact our admissions team for details relevant to your specific qualifications."
          },
          {
            id: 2,
            question: "How long are the courses and what are the timings?",
            answer: "Course durations range from weekend workshops to comprehensive 3-month programs. Classes typically run from 9am to 5pm for full-day sessions. We offer weekend batches and weekday options to accommodate working professionals."
          },
          {
            id: 3,
            question: "Is the international certification valid worldwide?",
            answer: "Yes, our certifications are internationally recognized and allow you to practice in most countries, subject to local regulatory requirements. We specifically design our curriculum to meet global standards in aesthetic medicine."
          }
        ]
      })
    };
  }
  
  // POST method
  if (event.httpMethod === "POST") {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ success: true, message: "FAQ content updated successfully" })
    };
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: "Method not allowed" })
  };
};
