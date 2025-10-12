import React, { useRef } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export default function ZoomImage({ images = [] }) {
  const [slideIndex, setSlideIndex] = React.useState(0);
  const zoomSliderBig = useRef();
  const zoomSliderSml = useRef();

  const goto = (index) => {
    setSlideIndex(index);
    zoomSliderSml.current.swiper.slideTo(index);
    zoomSliderBig.current.swiper.slideTo(index);
  };

  return (
    <div>
      {/* Swiper chính */}
      <Swiper
        ref={zoomSliderBig}
        slidesPerView={1}
        spaceBetween={0}
        navigation={false}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <InnerImageZoom
              src={img.url}
              zoomType="hover"
              zoomPreload={true}
              hideHint={true}
              className="transition-transform duration-300 hover:scale-110 rounded-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swiper nhỏ (thumbnail) */}
      <div className="categoryImage py-1">
        <Swiper
          ref={zoomSliderSml}
          slidesPerView={3}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation]}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div
                className={`rounded-md overflow-hidden cursor-pointer ${
                  slideIndex === index ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => goto(index)}
              >
                <img src={img.url} alt={`thumbnail-${index}`} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
