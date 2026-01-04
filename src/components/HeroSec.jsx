import React from "react";

function HeroSec(props) {
  const residentialImgs = [
    {
      title: "The House Title",
      discription:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur quae repudiandae minima labore earum quisquam debitis, alias officiis numquam, consequatur magnam. Provident reprehenderit nisi quia veritatis obcaecati minima earum fugiat?",
      Image: "/images/Residential-4.jpg",
      slideNo: "slide1",
    },
    {
      title: "The House Title",
      discription:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur quae repudiandae minima labore earum quisquam debitis, alias officiis numquam, consequatur magnam. Provident reprehenderit nisi quia veritatis obcaecati minima earum fugiat?",
      Image: "/images/Residential-2.jpg",
      slideNo: "slide2",
    },
    {
      title: "The House Title",
      discription:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur quae repudiandae minima labore earum quisquam debitis, alias officiis numquam, consequatur magnam. Provident reprehenderit nisi quia veritatis obcaecati minima earum fugiat?",
      Image: "/images/Residential-3.jpg",
      slideNo: "slide3",
    },
    {
      title: "The House Title",
      discription:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur quae repudiandae minima labore earum quisquam debitis, alias officiis numquam, consequatur magnam. Provident reprehenderit nisi quia veritatis obcaecati minima earum fugiat?",
      Image: "/images/Residential-1.avif",
      slideNo: "slide4",
    },
  ];

  return (
    <div className="carousel w-full">
      {residentialImgs.map((img, index) => (
        <div
          id={img.slideNo}
          key={img.slideNo}
          className="carousel-item  relative w-full h-140"
        >
          <img src={img.Image} className="object-cover w-full" />
          <div className="h-full w-full absolute bg-black/20"></div>
          <div className="absolute space-y-10 left-20 top-[35%] max-w-2xl">
            <h1 className="text-7xl font-bold text-white">{img.title}</h1>
            <p className="text-gray-200">{img.discription}</p>
          </div>
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
