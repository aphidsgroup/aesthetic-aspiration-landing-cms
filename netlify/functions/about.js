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
        title: "About the Institute",
        subtitle: "Established in 2005, the Institute of Aesthetic Sciences is a premier center for aesthetic education, combining modern infrastructure with world-class faculty to deliver exceptional training programs. Our international certification and state-of-the-art facilities ensure students receive the best education to excel in the growing field of aesthetic medicine.",
        imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        credentials: [
          {
            id: 1,
            icon: "Medal",
            title: "ISO Certified",
            description: "9001:2015 certified institution for quality management systems"
          },
          {
            id: 2,
            icon: "Building",
            title: "15+ Years of Excellence",
            description: "Pioneering aesthetic medicine education since 2005"
          },
          {
            id: 3,
            icon: "Users",
            title: "5000+ Alumni Network",
            description: "Professionals thriving in clinics across 32 countries"
          },
          {
            id: 4,
            icon: "GraduationCap",
            title: "Expert Faculty",
            description: "Learn from renowned cosmetic surgeons and practitioners"
          }
        ]
      })
    };
  }
  
  // POST method - update data
  if (event.httpMethod === "POST") {
    // Here you would save data to a database
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ 
        success: true, 
        message: "About content updated successfully" 
      })
    };
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: "Method not allowed" })
  };
};
