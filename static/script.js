const form = document.getElementById("orderForm");
const result = document.getElementById("result");
const clearBtn = document.getElementById("clearBtn");

form.addEventListener("submit", async function(e){
    e.preventDefault();

    let formData = new FormData(form);

    let response = await fetch("/order", {
        method: "POST",
        body: formData
    });

    if(response.ok){
        let data = await response.json();
        result.innerHTML = "✅ Total Price: ₹" + data.total;

        // Clear inputs automatically after success
        form.reset();
    } else {
        let error = await response.json();
        result.innerHTML = "❌ " + error.error;
    }
});

// Clear button logic
clearBtn.addEventListener("click", function(){
    form.reset();
    result.innerHTML = "";
});

async function updateTrending() {
    try {
        let response = await fetch("/top-trending");
        let data = await response.json();

        if (data.top) {
            let poster = document.getElementById("trendingPoster");
            poster.src = "/static/images/" + data.top.toLowerCase() + "_poster.png";
        }
    } catch (error) {
        console.log("Trending update failed");
    }
}

// Check every 3 seconds
setInterval(updateTrending, 3000);

// Run once on page load
updateTrending();