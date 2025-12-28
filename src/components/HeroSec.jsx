import React from "react";

function HeroSec(props) {
  const residentialImgs = [
    {
      Image: "/images/Residential-1.avif",
      slideNo: "slide1",
    },
    {
      Image: "/images/Residential-2.jpg",
      slideNo: "slide2",
    },
    {
      Image: "/images/Residential-3.jpg",
      slideNo: "slide3",
    },
    {
      Image: "/images/Residential-4.jpg",
      slideNo: "slide4",
    },
  ];

  return (
    <div className="carousel w-full">
      {residentialImgs.map((img, index) => (
        <div id={img.slideNo} className="carousel-item  relative w-full h-140">
          <img src={img.Image} className="object-cover w-full" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a
              href={`#${
                residentialImgs[
                  (index - 1 + residentialImgs.length) % residentialImgs.length
                ].slideNo
              }`}
              className="btn btn-circle"
            >
              ❮
            </a>
            <a
              href={`#${
                residentialImgs[(index + 1) % residentialImgs.length].slideNo
              }`}
              className="btn btn-circle"
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HeroSec;
