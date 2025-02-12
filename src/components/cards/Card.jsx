import { useState } from "react";
import { FaHeart, FaEye } from "react-icons/fa";

const Card = () => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="container">
      {/* First Row - 4 Cards */}
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {/* Card 1 */}
        <div className="col">
          <div className="card w-20 h-20 shadow-lg border-0 rounded flex items-center justify-center">
            <video
              src="1st.mp4"
              className="w-16 h-16 object-cover rounded"
              controls
            />
            <div className="card-footer bg-light">
              <div className="text-muted">Last updated 3 mins ago</div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col">
          <div className="card w-20 h-20 shadow-lg border-0 rounded flex items-center justify-center">
            <img
              src="2nd.webp"
              className="card-img-top w-16 h-16 object-contain"
              alt="Card 2"
            />

            <div className="card-footer bg-light d-flex justify-content-between align-items-center w-100 p-2">
              <div className="text-muted">Last updated 30 mins ago</div>

              <div className="d-flex gap-2">
                {/* Like Button */}
                <FaHeart
                  className={`cursor-pointer ${
                    liked ? "text-danger" : "text-secondary"
                  }`}
                  onClick={() => setLiked(!liked)}
                  size={20}
                />

                {/* View Icon */}
                <FaEye className="text-primary" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col">
          <div className="card w-20 h-20 shadow-lg border-0 rounded flex items-center justify-center">
            <img
              src="3rd.webp"
              className="card-img-top w-16 h-16 object-contain"
              alt="Card 3"
            />

            <div className="card-footer bg-light d-flex justify-content-between align-items-center w-100 p-2">
              <div className="text-muted">Last updated 30 mins ago</div>

              <div className="d-flex gap-2">
                {/* Like Button */}
                <FaHeart
                  className={`cursor-pointer ${
                    liked ? "text-danger" : "text-secondary"
                  }`}
                  onClick={() => setLiked(!liked)}
                  size={20}
                />

                {/* View Icon */}
                <FaEye className="text-primary" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="col">
          <div className="card w-20 h-20 shadow-lg border-0 rounded flex items-center justify-center">
            <img
              src="12th.webp"
              className="card-img-top w-16 h-16 object-contain"
              alt="Card 12"
            />

            <div className="card-footer bg-light d-flex justify-content-between align-items-center w-100 p-2">
              <div className="text-muted">Last updated 30 mins ago</div>

              <div className="d-flex gap-2">
                {/* Like Button */}
                <FaHeart
                  className={`cursor-pointer ${
                    liked ? "text-danger" : "text-secondary"
                  }`}
                  onClick={() => setLiked(!liked)}
                  size={20}
                />

                {/* View Icon */}
                <FaEye className="text-primary" size={20} />
              </div>
            </div>
          </div>
        </div>


      {/* Second Row - 4 More Cards */}
      <div className="row row-cols-1 row-cols-md-4 g-4 mt-3">
        {/* Card 5 */}
        <div className="col">
          <div className="card w-20 h-20 shadow-lg border-0 rounded flex items-center justify-center">
            <img
              src="5th.webp"
              className="card-img-top w-16 h-16 object-contain"
              alt="Card 5"
            />
            <div className="card-footer bg-light">
              <div className="text-muted">Last updated 20 mins ago</div>
            </div>
          </div>
        </div>

        {/* Card 6 */}
        <div className="col">
          <div className="card w-20 h-20 shadow-lg border-0 rounded flex items-center justify-center">
            <img
              src="6th.webp"
              className="card-img-top w-16 h-16 object-contain"
              alt="Card 6"
            />
            <div className="card-footer bg-light">
              <div className="text-muted">Last updated 25 mins ago</div>
            </div>
          </div>
        </div>

        {/* Card 7 */}
        <div className="col">
          <div className="card w-20 h-20 shadow-lg border-0 rounded flex items-center justify-center">
            <img
              src="7th.webp"
              className="card-img-top w-16 h-16 object-contain"
              alt="Card 7"
            />
            <div className="card-footer bg-light">
              <div className="text-muted">Last updated 30 mins ago</div>
            </div>
          </div>
        </div>

        {/* Card 8 */}
        <div className="col">
          <div className="card w-20 h-20 shadow-lg border-0 rounded flex items-center justify-center">
            <img
              src="8th.webp"
              className="card-img-top w-16 h-16 object-contain"
              alt="Card 8"
            />
            <div className="card-footer bg-light">
              <div className="text-muted">Last updated 35 mins ago</div>
            </div>
          </div>
        </div>
      </div>

      {/* Third Row - 4 More Cards */}
      <div className="row row-cols-1 row-cols-md-4 g-4 mt-3">
        {/* Card 9 */}
        <div className="col">
          <div className="card w-20 h-20 shadow-lg border-0 rounded flex items-center justify-center">
            <img
              src="9th.webp"
              className="card-img-top w-16 h-16 object-contain"
              alt="Card 9"
            />

            <div className="card-footer bg-light d-flex justify-content-between align-items-center w-100 p-2">
              <div className="text-muted">Last updated 30 mins ago</div>

              <div className="d-flex gap-2">
                {/* Like Button */}
                <FaHeart
                  className={`cursor-pointer ${
                    liked ? "text-danger" : "text-secondary"
                  }`}
                  onClick={() => setLiked(!liked)}
                  size={20}
                />

                {/* View Icon */}
                <FaEye className="text-primary" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Card 10 */}
        <div className="col">
          <div className="card w-20 h-20 shadow-lg border-0 rounded flex items-center justify-center">
            <img
              src="10th.webp"
              className="card-img-top w-16 h-16 object-contain"
              alt="Card 10"
            />

            <div className="card-footer bg-light d-flex justify-content-between align-items-center w-100 p-2">
              <div className="text-muted">Last updated 30 mins ago</div>

              <div className="d-flex gap-2">
                {/* Like Button */}
                <FaHeart
                  className={`cursor-pointer ${
                    liked ? "text-danger" : "text-secondary"
                  }`}
                  onClick={() => setLiked(!liked)}
                  size={20}
                />

                {/* View Icon */}
                <FaEye className="text-primary" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Card 11 */}

        <div className="col">
          <div className="card w-20 h-20 shadow-lg border-0 rounded flex items-center justify-center">
            <img
              src="11th.webp"
              className="card-img-top w-16 h-16 object-contain"
              alt="Card 11"
            />

            <div className="card-footer bg-light d-flex justify-content-between align-items-center w-100 p-2">
              <div className="text-muted">Last updated 30 mins ago</div>

              <div className="d-flex gap-2">
                {/* Like Button */}
                <FaHeart
                  className={`cursor-pointer ${
                    liked ? "text-danger" : "text-secondary"
                  }`}
                  onClick={() => setLiked(!liked)}
                  size={20}
                />

                {/* View Icon */}
                <FaEye className="text-primary" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Card 12 */}
        <div className="col">
          <div className="card w-20 h-20 shadow-lg border-0 rounded flex items-center justify-center">
            <img
              src="12th.webp"
              className="card-img-top w-16 h-16 object-contain"
              alt="Card 12"
            />

            <div className="card-footer bg-light d-flex justify-content-between align-items-center w-100 p-2">
              <div className="text-muted">Last updated 30 mins ago</div>

              <div className="d-flex gap-2">
                {/* Like Button */}
                <FaHeart
                  className={`cursor-pointer ${
                    liked ? "text-danger" : "text-secondary"
                  }`}
                  onClick={() => setLiked(!liked)}
                  size={20}
                />

                {/* View Icon */}
                <FaEye className="text-primary" size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
