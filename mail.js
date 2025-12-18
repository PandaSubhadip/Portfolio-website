// Initialize EmailJS with your public key
emailjs.init("YOUR_PUBLIC_KEY"); // Get this from EmailJS dashboard

const serviceID = "service_nwrundp";
const templateID = "template_putqemc";

function sendMail(event) {
  // Prevent default form submission
  event.preventDefault();
  
  // Get form values
  let params = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    subject: document.getElementById("subject").value.trim(),
    message: document.getElementById("message").value.trim(),
  };

  // Validate form fields
  if (!params.name || !params.email || !params.subject || !params.message) {
    alert("Please fill in all fields");
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(params.email)) {
    alert("Please enter a valid email address");
    return;
  }

  // Show loading message
  const submitBtn = document.querySelector(".btn-pink");
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // Send email
  emailjs.send(serviceID, templateID, params)
    .then((res) => {
      // Clear form fields
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("subject").value = "";
      document.getElementById("message").value = "";
      
      console.log("Email sent:", res);
      alert("Your message sent successfully!");
    })
    .catch((err) => {
      console.error("Error sending email:", err);
      alert("Failed to send message. Please try again.");
    })
    .finally(() => {
      // Restore button state
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
}