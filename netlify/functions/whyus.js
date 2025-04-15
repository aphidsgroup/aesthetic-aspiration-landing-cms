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
        title: "Why Choose Us",
        subtitle: "Our institute stands out through excellence in training, international recognition, and a commitment to producing highly skilled aesthetic medicine professionals",
        footerText: "Join over 5000+ successful alumni from 32 countries",
        features: [
          {
            id: 1,
            icon: "Globe",
            title: "Internationally Recognized Curriculum",
            description: "Our curriculum meets international standards and is recognized by aesthetic medicine bodies worldwide"
          },
          {
            id: 2,
            icon: "UserCheck",
            title: "Hands-On Live Model Training",
            description: "Gain practical experience through extensive hands-on training with real patients under expert supervision"
          },
          {
            id: 3,
            icon: "Award",
            title: "Expert Cosmetic Surgeons as Trainers",
            description: "Learn directly from practicing cosmetic surgeons with decades of clinical and teaching experience"
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
      body: JSON.stringify({ success: true, message: "Why Us content updated successfully" })
    };
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: "Method not allowed" })
  };
};
