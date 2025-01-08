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
        ease: "power1.out",
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
    width: "50%",
    height: "50%",
    ease: "power1.out",
    delay: 2,
});

gsap.to(".rectangle", {
    opacity: 0,
    duration: 0,
    delay: 8,
});

gsap.to(".carre", {
    opacity: "1",
    duration: 2,
    delay: 6,
});

gsap.to(".carre", {
    width: "35%",
    duration: 2,
    delay: 8,
});

gsap.to(".carre", {
    height: "auto",
    duration: 2,
    delay: 10,
});


gsap.to(".albumCanvas", {
    display: "block",
    duration: 2,
    delay: 9,
});

gsap.to(".carres", {
    gap: "150px",
    duration: 4,
    ease: "power1.out",
    delay: 8,
});

gsap.to("#subtitle", {
    opacity: "0",
    duration: 1.5,
    delay: 2,
});