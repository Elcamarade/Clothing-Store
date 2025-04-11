                       // Single Product

  var MainImg = document.getElementById("MainImg");
var smallimg = document.getElementsByClassName("small-img");

for (let i = 0; i < smallimg.length; i++) {
    smallimg[i].onclick = function() {
        MainImg.src = this.src;
    }
}                     


document.querySelectorAll('.pro').forEach(function(element, index) {
    element.addEventListener('click', function() {
        // Verificăm dacă este al doilea element (index 1)
        if (index === 1) {
            const secondImage = document.querySelector('.second-img');
            // Adăugăm clasa "enlarged" pentru a mări imaginea
            secondImage.classList.toggle('enlarged');
        }
    });
});