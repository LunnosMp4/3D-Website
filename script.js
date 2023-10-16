import { Application } from "https://cdn.skypack.dev/@splinetool/runtime@0.9.416";

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

const canvas = document.getElementById("cvs");
const app = new Application(canvas);
app
  .load("https://prod.spline.design/KFyYB2mnJqxTb9-l/scene.splinecode")
  .then(() => {
    const macbook = app.findObjectByName("Macbook");

    gsap.set(macbook.scale, { x: 0.6, y: 0.6, z: 0.6 });
    gsap.set(macbook.position, { x: -600, y: 400 });
    
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#subTitle",
          start: "top 60%",
          end: "bottom bottom",
          scrub: true,
          onLeave: () => {
            const event = new KeyboardEvent("keydown", { key: "k" });
            document.dispatchEvent(event);
          },
        }
      })
      .to(macbook.scale, { x: 0.4, y: 0.4, z: 0.4 }, 0)
      .to(macbook.position, { x: 180, y: 100 }, 0)

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#firstTrigger",
          start: "top 60%",
          end: "bottom bottom",
          scrub: true,
        }
      })
      .to(macbook.rotation, { x: -Math.PI / 1.8 }, 0)
      .to(macbook.position, { x: -200, y: 300, z: 400 }, 0)
      .to(macbook.scale, { x: 0.6, y: 0.6, z: 0.6 }, 0)

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#secondTrigger",
          start: "top bottom",
          end: "center bottom",
          scrub: true,
          
        }
      })
      .to(macbook.rotation, { x: Math.PI / 36, y: -Math.PI / 10, z: -Math.PI / 120 }, 0)
      .to(macbook.position, { x: 200, y: 50, z: 0 }, 0)
      .to(macbook.scale, { x: 0.7, y: 0.7, z: 0.7 }, 0);

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#thirdTrigger",
          start: "top 20%",
          end: "bottom bottom",
          scrub: true,

          onEnter: () => {
            console.log("enter");
              const event = new KeyboardEvent("keydown", { key: "l" });
              document.dispatchEvent(event);
          },
        }
      })
      .to(macbook.rotation, { x: 0, y: 0, z: 0 }, 0)
      .to(macbook.position, { x: 0, y: 200 }, 0);
  });



function animateBar(triggerElement, onEnterWidth, onLeaveBackWidth) {
  gsap.to(".backgroundColor", {
    scrollTrigger: {
      trigger: triggerElement,
      start: "top center",
      end: "bottom bottom",
      scrub: true,
      onEnter: () => {
        gsap.to(".backgroundColor", {
          width: onEnterWidth,
          duration: 0.2,
          ease: "none"
        });
      },
      onLeaveBack: () => {
        gsap.to(".backgroundColor", {
          width: onLeaveBackWidth,
          duration: 0.2,
          ease: "none"
        });
      }
    }
  });
}

animateBar("#firstTrigger", "35%", "0%");
animateBar("#secondTrigger", "65%", "35%");
animateBar("#thirdTrigger", "100%", "65%");
