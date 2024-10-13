const words = document.querySelectorAll('.word');
        let currentIndex = 0;

        function showWord(index) {
            // Hide all words
            words.forEach(word => {
                word.classList.remove('visible');
            });
            // Show the current word
            words[index].classList.add('visible');

            // Move to the right if it's not the first word
            const translateX = index * 10; // 10px for each word
            document.querySelector('.animated-paragraph').style.transform = `translateX(${translateX}px)`;
        }

        function animateWords() {
            showWord(currentIndex);
            currentIndex++;

            // Reset index if it exceeds the number of words
            if (currentIndex >= words.length) {
                currentIndex = 0; // Reset to the first word
            }
        }

        // Start the animation and change words every 2 seconds
        setInterval(animateWords, 2500);




// Placeholder animation

// Function to create the typing effect
function typePlaceholder(element, text, delay = 100, pause = 1000) {
    let i = 0;
  
    function type() {
      if (i < text.length) {
        element.placeholder += text.charAt(i);  // Add one character at a time
        i++;
        setTimeout(type, delay);  // Call the function again after a delay
      } else {
        // Pause for a moment, then clear the placeholder and restart typing
        setTimeout(() => {
          element.placeholder = "";  // Clear placeholder
          i = 0;  // Reset counter
          setTimeout(type, delay);  // Restart typing
        }, pause);  // Pause before restarting
      }
    }
    
    type();
  }
  
  const input = document.getElementById('email');
  const placeholderText = "myemail@gmail.com";
  
  // Start the continuous typing animation
  typePlaceholder(input, placeholderText, 150, 2000);  // Adjust delay and pause duration
  
  document.getElementById("emailForm").addEventListener("submit", function (e) {
    e.preventDefault(); 

    const email = document.getElementById("email").value;

    fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
        } else {
            alert(data.error);
        }
    })
    .catch(error => console.error("Error:", error));
});
