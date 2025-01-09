const subtitle = document.getElementById("subtitle");
    const text = subtitle.textContent;
    subtitle.textContent = "";
    const chars = text.split("").map(char => {
    const span = document.createElement("span");
    span.textContent = char;
    subtitle.appendChild(span);
    return span;
});

gsap.timeline({ repeat: -1, yoyo: true })
.fromTo(
    chars,
    {
        opacity: 0,
        y: 50,
    },
    {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.05,
        
    }
);

gsap.to(".body-content", {
    marginTop: "50px",
    marginBottom: "auto",
    duration: 1.5,
    delay: 2,
});

gsap.to(".slider-section", {
    height: "10vh",
    duration: 1.5,
    delay: 2,
});

gsap.to(".rectangle", {
    duration: 1.5,
    border: "solid 1px white",
    width: "60%",
    height: "55%",
    
    delay: 2,
});

gsap.to(".text-container", {
    opacity: 1,
    duration: 1,
    delay: 3.5,
});

gsap.to(".carre", {
    opacity: "1",
    duration: 2,
    delay: 6,
});


gsap.to(".albumCanvas", {
    opacity: 1,
    duration: 2,
    delay: 3,
    visibility: "inherit",
});


gsap.to(".carres", {
    gap: "150px",
    duration: 4,
    
    delay: 8,
});

const skipButton = document.querySelector(".skip-button");
firstText = document.querySelector(".desc-album");

skipButton.addEventListener("click", () => {

    skipButton.classList.toggle('clicked')

    if (skipButton.classList.contains("clicked")) {
        gsap.to(".desc-album", {
            opacity: 0,
            duration: 1,
            delay: 0,
        });

        gsap.to(".desc-album", {
            height: 0,
            marginTop: 0,
            duration: 0,
            delay: 1,
        });

        gsap.to(".second-text", {
            opacity: 1,
            duration: 2,
            delay: 1,
        });

        gsap.to(".second-text", {
            height: "auto",
            marginTop: "55px",
            duration: 0,
            delay: 1,
        });
    } else {
        gsap.to(".rectangle", {
            duration: 1,
            width: 0,
            height: 0,
            delay: 1,
            border: 0,
        });

        gsap.to(".carre", {
            opacity: "1",
            duration: 2,
            delay: 1,
        });

        gsap.to(".carres", {
            gap: "150px",
            duration: 0,
            delay: 1,
            duration: 0,
        });

        gsap.to(".carres", {
            opacity: 1,
            duration: 2,
            delay: 2,
        });

        gsap.to(".text-container", {
            opacity: 0,
            duration: 1,
            delay: 0,
        });

        gsap.to(".controls", {
            opacity: 1,
            duration: 1,
            delay: 3,
        })

        gsap.to("#albumCanvas", {
            opacity: 1,
            duration: 1,
            delay: 3,
        })
    }    
})