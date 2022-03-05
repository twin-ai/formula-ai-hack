import React, { useEffect, useContext } from "react";
import Button from "./Button";
import DataContext from "./DataContext";
import Visual from "./visual";

export default function Output({ data }) {
  const gen = useContext(DataContext);
  const clear = () => gen.setData("");

  const weatherImage = (weather_num) => {
    return weather_num === 0
      ? "https://s7d2.scene7.com/is/image/TWCNews/img_3214_jpg-1?wid=1250&hei=703&$wide-bg$"
      : weather_num === 1
      ? "https://www.thoughtco.com/thmb/6NNZQHeEhR-wNWA8pZrm1MXtrAs=/768x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/clouds-5b6b4e50c9e77c0050491212.jpg"
      : weather_num === 2
      ? "https://www.thoughtco.com/thmb/R0sYtSecbtf36JxNiMVJNvrW7k8=/768x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-528903279-599d1549aad52b001107054d.jpg"
      : weather_num === 3
      ? "https://images.news18.com/ibnlive/uploads/2020/04/1587217394_image-2020-04-18t191248.086.jpg?impolicy=website&width=510&height=356"
      : weather_num === 4
      ? "https://i2-prod.coventrytelegraph.net/incoming/article4308606.ece/ALTERNATES/s810/1_rainjpeg.jpg"
      : weather_num === 5
      ? "https://media.istockphoto.com/photos/dark-ominous-rain-clouds-and-lightning-picture-id111969828?k=20&m=111969828&s=612x612&w=0&h=x5HWV7VQItYICcA3MhM30FvbOx90M3qX8qzpP8hEMxI="
      : null;
  };

  const weather = (weather_num) => {
    return weather_num === 0
      ? "Clear"
      : weather_num === 1
      ? "Light Cloud"
      : weather_num === 2
      ? "Overcast"
      : weather_num === 3
      ? "Light Rain"
      : weather_num === 4
      ? "Heavy Rain"
      : weather_num === 5
      ? "Storm"
      : null;
  };

  return (
    <>
      {gen.data && (
        <>
          <Button />
          <div className="row">
            <div className="col-md-4">
              <Visual />
            </div>
            <div className="col-md-8">
              <div className="row justify-content-center">
                <div className="col-md-12">
                  <h3 className="display-6 text-center">Prediction!!!</h3> <br />
                </div>
                {Object.entries(gen.data).map((data, index) => (
                  <div key={index} className="col-4 pb-2 text-center">
                    <div className="card">
                      <img
                        className="card-img-top"
                        src={weatherImage(data[1]["type"])}
                        alt="Weather type"
                      />
                    </div>
                    <ul class="list-group">
                      <li class="list-group-item">{data[0]} min</li>
                      <li class="list-group-item">{weather(data[1]["type"])}</li>
                      <li class="list-group-item">
                        {data[1]["rain_percentage"]}% rain
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={clear} className="btn btn-lg btn-block btn-success">
              Make Another Prediction
            </button>
          </div>
        </>
      )}
    </>
  );
}
