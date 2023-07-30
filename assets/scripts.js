let filters = document.querySelectorAll("#filters li");

for(let filter of filters) {
    filter.addEventListener("click", function(){
        let tag = this.id;
        let images = document.querySelectorAll("#gallery img");

        for(let image of images){
            image.classList.replace("active", "inactive");
            image.parentElement.style.display = "none";

            if (tag in image.dataset || tag === "tous"){
                image.classList.replace("inactive", "active");
                image.parentElement.style.display = "block";
            }
        }
    });
}