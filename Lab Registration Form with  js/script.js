const form = document.getElementById('registrationForm');
const formData = document.getElementById('formData');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  // Get the form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const dateOfBirth = document.getElementById('dateOfBirth').value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const program = document.getElementById('program').value;
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;
  const motherName = document.getElementById('motherName').value;
  const fatherName = document.getElementById('fatherName').value;
  const photo = document.getElementById('photo').files[0]; // Get the first selected file

  // Create the output HTML
  let outputHTML = `
    <h2>Registration Form Output</h2>
    <ul>
      <li>Name: ${name}</li>
      <li>Email: ${email}</li>
      <li>Date of Birth: ${dateOfBirth}</li>
      <li>Gender: ${gender}</li>
      <li>Program of Interest: ${program}</li>
      <li>Address: ${address}</li>
      <li>Phone Number: ${phone}</li>
      <li>Mother's Name: ${motherName}</li>
      <li>Father's Name: ${fatherName}</li>
    </ul>`;

  // If a photo was selected, add it to the output with controlled size
  if (photo) {
    const reader = new FileReader();
    reader.readAsDataURL(photo);
    reader.onload = function() {
      const MAX_WIDTH = 200; // Set your desired maximum width for the photo
      const MAX_HEIGHT = 200; // Set your desired maximum height for the photo

      const img = new Image();
      img.src = reader.result;
      img.onload = function() {
        let width = img.width;
        let height = img.height;

        // Maintain aspect ratio if necessary
        if (width > MAX_WIDTH && height <= MAX_HEIGHT) {
          height = MAX_WIDTH * height / width;
          width = MAX_WIDTH;
        } else if (height > MAX_HEIGHT && width <= MAX_WIDTH) {
          width = MAX_HEIGHT * width / height;
          height = MAX_HEIGHT;
        } else if (width > MAX_WIDTH && height > MAX_HEIGHT) {
          const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
          width = width * ratio;
          height = height * ratio;
        }

        outputHTML += `<img src="${reader.result}" alt="Uploaded Photo" style="width: ${width}px; height: ${height}px;">`;
        formData.innerHTML = outputHTML;
      };
    };
  } else {
    formData.innerHTML = outputHTML;
  }
});
