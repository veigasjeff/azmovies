
    const images = [
        "/wp-content/uploads/2023/06/For.All.Mankind._S04.webp",
        "/wp-content/uploads/2023/06/For_All_Mankind_S03.webp",
        "/wp-content/uploads/2023/06/For_All_Mankind_S02.webp",
        "/wp-content/uploads/2023/06/For_All_Mankind_S01.webp"
    ];

    let index = 0;

    function changeImage() {
        document.getElementById("tvShowImage1").src = images[index];
        index = (index + 1) % images.length;
    }

    setInterval(changeImage, 3000); // Change image every 3 seconds

    const modalImages = [
        "/wp-content/uploads/2023/06/For.All.Mankind._S04.webp",
        "/wp-content/uploads/2023/06/For_All_Mankind_S03.webp",
        "/wp-content/uploads/2023/06/For_All_Mankind_S02.webp",
        "/wp-content/uploads/2023/06/For_All_Mankind_S01.webp"
    ];

    let modalIndex = 0;

    function changeModalImage() {
        document.getElementById("modalImage").src = modalImages[modalIndex];
        modalIndex = (modalIndex + 1) % modalImages.length;
    }

    setInterval(changeModalImage, 3000); // Change image every 3 seconds in the modal box

    const movie1Images = [
        "/wp-content/uploads/2023/06/John-Wick-Chapter-4-2023.webp",
        "/wp-content/uploads/2023/06/John_Wick_2019.webp",
        "/wp-content/uploads/2023/06/John_Wick_2017.webp",
        "/wp-content/uploads/2023/06/John_Wick_2014.webp"
    ];
    
    let movie1Index = 0;
    
    function changeMovie1Image() {
        document.getElementById("movie1Image").src = movie1Images[movie1Index];
        movie1Index = (movie1Index + 1) % movie1Images.length;
    }
    
    setInterval(changeMovie1Image, 3000); // Change image every 3 seconds in the modal box
    
    const movie2Images = [
        "/wp-content/uploads/2023/06/The-Equalizer-3-2023.webp",
        "/wp-content/uploads/2023/06/The Equalizer_2.webp",
        "/wp-content/uploads/2023/06/The_Equalizer_1.webp"
    ];
    
    let movie2Index = 0;
    
    function changeMovie2Image() {
        document.getElementById("movie2Image").src = movie2Images[movie2Index];
        movie2Index = (movie2Index + 1) % movie2Images.length;
    }
    
    setInterval(changeMovie2Image, 3000); // Change image every 3 seconds in the modal box
    
    const movie3Images = [
        "/wp-content/uploads/2023/06/upload-2023.webp",
        "/wp-content/uploads/2023/06/upload_s02.webp",
        "/wp-content/uploads/2023/06/upload_s01.webp"
    ];
    
    let movie3Index = 0;
    
    function changeMovie3Image() {
        document.getElementById("movie3Image").src = movie3Images[movie3Index];
        movie3Index = (movie3Index + 1) % movie3Images.length;
    }
    
    setInterval(changeMovie3Image, 3000); // Change image every 3 seconds in the modal box

    const movie4Images = [
        "/wp-content/uploads/2023/06/Slow-Horses-S03.webp",
        "/wp-content/uploads/2023/06/slow_horses_s2.webp",
        "/wp-content/uploads/2023/06/slow_horses_s1.webp"
    ];
    
    let movie4Index = 0;
    
    function changeMovie4Image() {
        document.getElementById("movie4Image").src = movie4Images[movie4Index];
        movie4Index = (movie4Index + 1) % movie4Images.length;
    }
    
    setInterval(changeMovie4Image, 3000); // Change image every 3 seconds in the modal box

    const movie5Images = [
        "/wp-content/uploads/2023/06/Transplant_S04.webp",
        "/wp-content/uploads/2023/06/Transplant_S03.webp",
        "/wp-content/uploads/2023/06/Transplant_S02.webp",
        "/wp-content/uploads/2023/06/Transplant_S01.webp"
    ];
    
    let movie5Index = 0;
    
    function changeMovie5Image() {
        document.getElementById("movie5Image").src = movie5Images[movie5Index];
        movie5Index = (movie5Index + 1) % movie5Images.length;
    }
    
    setInterval(changeMovie5Image, 3000); // Change image every 3 seconds in the modal box

    const movie6Images = [
        "/wp-content/uploads/2023/06/Halo_2024.webp",
        "/wp-content/uploads/2023/06/Halo_S02_2024.webp"
    ];
    
    let movie6Index = 0;
    
    function changeMovie5Image() {
        document.getElementById("movie6Image").src = movie6Images[movie6Index];
        movie6Index = (movie6Index + 1) % movie6Images.length;
    }
    
    setInterval(changeMovie6Image, 3000); // Change image every 3 seconds in the modal box