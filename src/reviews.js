// Review data
const reviews = [
  {
    name: "Kim Soo Hyun",
    date: "3 Juni 2025",
    rating: 1,
    text: "Tempatnya sejuk dan nyaman, pasti balik lagi!",
  },
  {
    name: "Kim Soo Hyun",
    date: "2 Juni 2025",
    rating: 5,
    text: "Cocok untuk healing bareng keluarga dan teman.",
  },
  {
    name: "Lee Man Hoo",
    date: "31 Mei 2025",
    rating: 4,
    text: "Tempatnya sejuk dan nyaman, pasti balik lagi!",
  },
  {
    name: "Kim Soo Hyun",
    date: "30 Mei 2025",
    rating: 4,
    text: "Cocok untuk healing bareng keluarga dan teman.",
  },
  {
    name: "Budi Santoso",
    date: "28 Mei 2025",
    rating: 5,
    text: "Sangat memuaskan, pelayanan ramah dan tempat bersih.",
  },
];

let currentlyDisplayed = 0;
const reviewsPerLoad = 4;

// Initialize reviews on page load
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("openReviewBtn").addEventListener("click", openReviewModal);
});



// File reviews.js (harus di-load sebelum HTML)
function openReviewModal() {
    document.getElementById('reviewModal').classList.remove('hidden');
    document.getElementById('reviewModal').classList.add('visible');
}

function closeReviewModal() {
    document.getElementById('reviewModal').classList.remove('visible');
    document.getElementById('reviewModal').classList.add('hidden');
}

// Load initial set of reviews
function loadInitialReviews() {
  const reviewsContainer = document.querySelector(".grid");
  const initialReviews = Math.min(reviewsPerLoad, reviews.length);

  reviews.slice(0, initialReviews).forEach((review) => {
    reviewsContainer.appendChild(createReviewElement(review));
  });

  currentlyDisplayed = initialReviews;

  // Hide "Load More" button if all reviews are displayed
  if (currentlyDisplayed >= reviews.length) {
    document.getElementById("loadMoreContainer").classList.add("hidden");
  }
}

// Load more reviews when button is clicked
function loadMoreReviews() {
  const reviewsContainer = document.querySelector(".grid");
  const nextReviews = reviews.slice(currentlyDisplayed, currentlyDisplayed + reviewsPerLoad);

  nextReviews.forEach((review) => {
    reviewsContainer.appendChild(createReviewElement(review));
  });

  currentlyDisplayed += nextReviews.length;

  // Hide "Load More" button if all reviews are displayed
  if (currentlyDisplayed >= reviews.length) {
    document.getElementById("loadMoreContainer").classList.add("hidden");
  }
}

// Create a review element
function createReviewElement(review) {
  const reviewItem = document.createElement("div");
  reviewItem.className = "bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300";

  // Create star rating
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += i <= review.rating ? '<i class="fas fa-star text-amber-400"></i>' : '<i class="far fa-star text-amber-400"></i>';
  }

  reviewItem.innerHTML = `
        <div class="flex justify-between items-start mb-4">
            <div>
                <h4 class="font-bold text-gray-800">${review.name}</h4>
                <p class="text-gray-500 text-sm">${review.date}</p>
            </div>
            <div class="flex">
                ${stars}
            </div>
        </div>
        <p class="text-gray-700 mb-3">"${review.text}"</p>
        ${review.image ? `<img src="${review.image}" alt="Review image" class="w-full h-auto rounded-lg mb-3">` : ""}
        <div class="flex justify-end mt-4">
            <button onclick="likeReview(this)" class="text-gray-500 hover:text-amber-500 mr-4">
                <i class="far fa-thumbs-up"></i>
                <span class="likes-count ml-1">0</span>
            </button>
        </div>
    `;

  return reviewItem;
}

// Open review modal
function openReviewModal() {
  document.getElementById("reviewModal").classList.remove("hidden");
  document.getElementById("reviewModal").classList.add("visible");
}

// Close review modal
function closeReviewModal() {
  document.getElementById("reviewModal").classList.remove("visible");
  document.getElementById("reviewModal").classList.add("hidden");
}

// Rate stars
function rate(rating) {
  const stars = document.querySelectorAll(".star-rating .star");
  const ratingValue = document.getElementById("ratingValue");
  const ratingText = document.getElementById("ratingText");

  ratingValue.value = rating;
  ratingText.textContent = `(${rating}/5)`;

  stars.forEach((star, index) => {
    if (index < rating) {
      star.innerHTML = '<i class="fas fa-star"></i>';
      star.classList.add("active");
    } else {
      star.innerHTML = '<i class="far fa-star"></i>';
      star.classList.remove("active");
    }
  });
}

// Add hover effects to stars
document.querySelectorAll(".star-rating .star").forEach((star) => {
  star.addEventListener("mouseover", function () {
    const index = parseInt(this.getAttribute("onclick").match(/\d+/)[0]);
    document.querySelectorAll(".star-rating .star").forEach((s, i) => {
      if (i < index) {
        s.classList.add("hovered");
      } else {
        s.classList.remove("hovered");
      }
    });
  });

  star.addEventListener("mouseout", function () {
    document.querySelectorAll(".star-rating .star").forEach((s) => {
      s.classList.remove("hovered");
    });
  });
});

// Submit a new review
function submitReview() {
  const name = document.getElementById("reviewerName").value.trim();
  const rating = parseInt(document.getElementById("ratingValue").value);
  const text = document.getElementById("reviewText").value.trim();
  const imageFile = document.getElementById("reviewImage").files[0];

  if (!name || !rating || !text) {
    alert("Harap isi semua field!");
    return;
  }

  // Create new review object
  let imageUrl = null;

  if (imageFile) {
    // Here you would typically upload the image to a server and get the URL
    // For demo purposes, we'll just use a placeholder
    imageUrl = URL.createObjectURL(imageFile);
  }

  const newReview = {
    name: name,
    date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
    rating: rating,
    text: text,
    image: imageUrl,
  };

  // Add to reviews array
  reviews.unshift(newReview);

  // Update UI
  document.querySelector(".grid").prepend(createReviewElement(newReview));
  document.getElementById("totalReviews").textContent = reviews.length;

  // Reset form
  document.getElementById("reviewerName").value = "";
  document.getElementById("reviewText").value = "";
  document.getElementById("ratingValue").value = "0";
  document.querySelectorAll(".star-rating .star").forEach((star) => {
    star.innerHTML = '<i class="far fa-star"></i>';
    star.classList.remove("active");
  });

  closeReviewModal();
}

// Like a review
function likeReview(button) {
  const likeIcon = button.querySelector("i");
  const likesCount = button.querySelector(".likes-count");

  if (likeIcon.classList.contains("far")) {
    likeIcon.classList.remove("far");
    likeIcon.classList.add("fas");
    likesCount.textContent = parseInt(likesCount.textContent) + 1;
    likesCount.classList.add("text-amber-500");
  } else {
    likeIcon.classList.remove("fas");
    likeIcon.classList.add("far");
    likesCount.textContent = parseInt(likesCount.textContent) - 1;
    if (parseInt(likesCount.textContent) <= 0) {
      likesCount.classList.remove("text-amber-500");
    }
  }
}

// Di akhir file reviews.js
window.openReviewModal = function() {
    document.getElementById('reviewModal').classList.remove('hidden');
    document.getElementById('reviewModal').classList.add('visible');
};
