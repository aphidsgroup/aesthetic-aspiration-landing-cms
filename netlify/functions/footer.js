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
        companyName: "Institute of Aesthetic Sciences",
        copyrightText: "© 2023 Institute of Aesthetic Sciences. All rights reserved.",
        tagline: "Transforming careers in aesthetic medicine with world-class education",
        address: "123 Medical Center Boulevard, Bangalore - 560001, India",
        email: "admissions@aestheticsciences.edu",
        phone: "+91 1234567890",
        footerLogo: "/logo-white.png",
        socialLinks: [
          {
            id: 1,
            platform: "Facebook",
            icon: "Facebook",
            url: "https://facebook.com/institute-aesthetic-sciences"
          },
          {
            id: 2,
            platform: "Instagram",
            icon: "Instagram",
            url: "https://instagram.com/aesthetic_sciences"
          }
        ],
        quickLinks: [
          { id: 1, label: "Courses", url: "/courses" },
          { id: 2, label: "About Us", url: "/about" }
        ]
      })
    };
  }
  
  // POST method - update data
  if (event.httpMethod === "POST") {
    // Here you would save data to a database
    // For demonstration, we just return success
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ 
        success: true, 
        message: "Footer content updated successfully" 
      })
    };
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: "Method not allowed" })
  };
};
